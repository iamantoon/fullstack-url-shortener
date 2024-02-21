import { Component, OnInit } from '@angular/core';
import { LinkService } from '../_services/link.service';
import { Link } from '../_models/link';
import { Pagination } from '../_models/pagination';
import { LinkParams } from '../_models/linkParams';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
export class LinkListComponent implements OnInit {
  links: Link[] | undefined;
  pagination: Pagination | undefined;
  linkParams: LinkParams = new LinkParams;

  constructor(private linkService: LinkService){}

  ngOnInit(): void {
    this.loadLinks();
  }

  loadLinks(){
    this.linkService.loadLinks(this.linkParams).subscribe({
      next: response => {
        if (response.pagination && response.result){
          this.links = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  pageChanged(event: any){
    if (this.linkParams.pageNumber !== event.page){
      this.linkParams.pageNumber = event.page;
      this.loadLinks();
    }
  }

  resetFilters(){
    this.linkParams = new LinkParams();
    this.loadLinks();
  }
}
