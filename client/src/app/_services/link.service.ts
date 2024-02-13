import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Link } from '../_models/link';
import { map, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  baseUrl = environment.apiUrl;
  links: Link[] = [];

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
}
