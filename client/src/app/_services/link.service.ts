import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Link } from '../_models/link';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { LinkParams } from '../_models/linkParams';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  baseUrl = environment.apiUrl;
  links: Link[] = [];
  linkCache = new Map();
  personalLinkCache = new Map();
  linkParams: LinkParams | undefined;

  constructor(private http: HttpClient) {
    this.linkParams = new LinkParams();
  }

  loadLinks(linkParams: LinkParams){
    const response = this.linkCache.get(Object.values(linkParams).join('-'));
    
    if (response) return of(response);

    let params = this.getPaginationHeaders(linkParams.pageNumber, linkParams.pageSize);

    params = params.append('maxExpiryDate', linkParams.maxExpiryDate);
    params = params.append('orderBy', linkParams.orderBy);

    return this.getPaginatedResult<Link[]>(this.baseUrl + 'links', params).pipe(
      map(response => {
        this.linkCache.set(Object.values(linkParams).join('-'), response);
        return response;
      })
    )
  }

  loadPersonalLinks(linkParams: LinkParams){
    const response = this.personalLinkCache.get(Object.values(linkParams).join('-'));

    if (response) return of(response);
    
    let params = this.getPaginationHeaders(linkParams.pageNumber, linkParams.pageSize);

    params = params.append('maxExpiryDate', linkParams.maxExpiryDate);
    params = params.append('orderBy', linkParams.orderBy);

    return this.getPaginatedResult<Link[]>(this.baseUrl + 'links/my', params).pipe(
      map(response => {
        this.personalLinkCache.set(Object.values(linkParams).join('-'), response);
        return response;
      })
    )
  }

  deleteLink(id: number){
    return this.http.delete(this.baseUrl + 'links/delete-link/' + id);
  }

  getLinkParams(){
    return this.linkParams;
  }

  setLinkParams(params: LinkParams){
    this.linkParams = params;
  }

  resetLinkParams(){
    this.linkParams = new LinkParams();
    return this.linkParams;
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number){
    let params = new HttpParams();
    
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    
    return params;
  }

  private getPaginatedResult<T>(url: string, params: HttpParams){
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;

    return this.http.get<T>(url, {observe: 'response', params}).pipe(
      map(response => {
        if (response.body){
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination){
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    )
  }

  loadLink(id: number){
    const link = [...this.linkCache.values()]
      .reduce((arr, element) => arr.concat(element.result), [])
      .find((link: Link) => link.id === id);

    if (link) return of(link);

    return this.http.get<Link>(this.baseUrl + 'links/' + id);
  }

  createLink(link: string, howManyHoursAccessible: number){
    return this.http.post(this.baseUrl + 'links/create', {link, howManyHoursAccessible});
  }

  public getValidDate(date: any){
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    return `${year}-${formattedMonth}-${formattedDay} ${hours}:${formattedMinutes}:${formattedSeconds}`;
  }
}
