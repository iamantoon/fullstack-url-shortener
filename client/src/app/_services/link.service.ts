import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Link } from '../_models/link';
import { BehaviorSubject, map, of, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  baseUrl = environment.apiUrl;
  links: Link[] = [];
  private currentLinksSource = new BehaviorSubject<any | null>(null);
  currentLinks$ = this.currentLinksSource.asObservable();
  currentLinks: any[] = [];

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  loadLinks(){
    if (this.links.length > 0) return of(this.links);
    return this.http.get<Link[]>(this.baseUrl + 'links').pipe(
      map(links => {
        this.links = links;
        return links;
      })
    )
  }

  loadLink(id: number){
    const link = this.links.find(link => link.id === id);
    if (link) return of(link);
    return this.http.get<Link>(this.baseUrl + 'links/' + id);
  }

  createLink(link: string, expiryDate: string){
    return this.http.post(this.baseUrl + 'links', {link, expiryDate});
  }

  getCurrentLinks() {
    return this.currentLinksSource.pipe(take(1)).subscribe({
      next: links => {
        if (links) {
          this.currentLinks = links;
        }
      }
    });
  }

  updateLinks(links: any[]){
    this.currentLinksSource.next(links);
  }

  shortenLink(link: string){
    // link short logic
    this.getCurrentLinks();
    this.currentLinksSource.next([
      ...this.currentLinks, 
      {
        id: uuidv4(),
        link: link.link, 
        shortLink: 'https://t.ly/Ks8y1', 
        expiryDate: this.getValidDate(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000))
      }
    ]);
  }

  public getValidDate(date: any){
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 || 12;

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    return `${formattedMonth}/${formattedDay}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
  }
}
