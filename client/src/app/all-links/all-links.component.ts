import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pagination } from '../_models/pagination';
import { LinkParams } from '../_models/linkParams';
import { Link } from '../_models/link';
import { LinkService } from '../_services/link.service';

@Component({
  selector: 'app-all-links',
  templateUrl: './all-links.component.html',
  styleUrls: ['./all-links.component.scss']
})
export class AllLinksComponent implements OnInit {
  links: Link[] | undefined;
  pagination: Pagination | undefined;
  linkParams: LinkParams | undefined = new LinkParams();
  filterForm: FormGroup = new FormGroup({filterByExpiryDate: new FormControl('8640', Validators.required)});

  constructor(private linkService: LinkService){
    this.linkParams = this.linkService.getLinkParams();
  }

  ngOnInit(): void {
    this.loadLinks();
    this.initializeForm();
  }

  initializeForm(){
    this.filterForm = new FormGroup({
      filterByExpiryDate: new FormControl('8640', Validators.required)
    })
  }

  loadLinks(){
    if (!this.linkParams) return;
    this.linkParams.maxExpiryDate = this.filterForm.get('filterByExpiryDate')?.value;    
    this.linkService.setLinkParams(this.linkParams);
    
    if (this.linkParams){
      this.linkService.setLinkParams(this.linkParams);
      this.linkService.loadLinks(this.linkParams).subscribe({
        next: response => {
          if (response.pagination && response.result){
            this.links = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }
  }

  resetFilters(){
    this.linkParams = this.linkService.resetLinkParams();
    this.filterForm.get('filterByExpiryDate')?.setValue('8640');
    this.loadLinks();
  }

  pageChanged(event: any){
    if (this.linkParams && this.linkParams.pageNumber !== event.page){
      this.linkParams.pageNumber = event.page;
      this.linkService.setLinkParams(this.linkParams);
      this.loadLinks();
    }
  }
}
