import { Component, OnInit } from '@angular/core';
import { LinkService } from '../_services/link.service';
import { Link } from '../_models/link';
import { LinkParams } from '../_models/linkParams';
import { Pagination } from '../_models/pagination';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-my-statistics',
  templateUrl: './my-statistics.component.html',
  styleUrls: ['./my-statistics.component.scss']
})
export class MyStatisticsComponent implements OnInit {
  baseUrl = environment.apiUrl;
  links: Link[] = [];
  pagination: Pagination | undefined;
  linkParams: LinkParams = new LinkParams;

  constructor(private linkService: LinkService){
    this.linkParams = new LinkParams(8640, 1, 25, 'oldest', true);
  }

  ngOnInit(): void {
    this.getLinks();
  }

  getLinks(){
    this.linkService.loadPersonalLinks(this.linkParams).subscribe({
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
      this.getLinks();
    }
  }
}