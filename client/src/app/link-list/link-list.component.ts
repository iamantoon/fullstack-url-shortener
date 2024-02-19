import { Component, OnInit } from '@angular/core';
import { LinkService } from '../_services/link.service';
import { Link } from '../_models/link';
import { Observable } from 'rxjs';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
export class LinkListComponent implements OnInit {
  links: Link[] | undefined;
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 5;

  constructor(private linkService: LinkService){}

  ngOnInit(): void {
    this.loadLinks();
  }

  loadLinks(){
    this.linkService.loadLinks(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.pagination && response.result){
          this.links = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  pageChanged(event: any){
    if (this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.loadLinks();
    }
  }
}
