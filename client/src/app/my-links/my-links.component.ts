import { Component, OnInit } from '@angular/core';
import { LinkService } from '../_services/link.service';
import { Link } from '../_models/link';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LinkParams } from '../_models/linkParams';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-my-links',
  templateUrl: './my-links.component.html',
  styleUrls: ['./my-links.component.scss']
})
export class MyLinksComponent implements OnInit {
  links: Link[] | undefined;
  pagination: Pagination | undefined;
  linkParams: LinkParams = new LinkParams;
  createLinkForm: FormGroup = new FormGroup({}); 

  constructor(private linkService: LinkService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.loadPersonalLinks();
    this.initializeForm();
  }

  initializeForm(){
    this.createLinkForm = new FormGroup({
      link: new FormControl('', [Validators.required, Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)]),
      expiryDate: new FormControl('12', [Validators.required])
    })
  }

  loadPersonalLinks(){
    this.linkService.loadPersonalLinks(this.linkParams).subscribe({
      next: response => {
        if (response.pagination && response.result){
          this.links = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  createLink(){
    const link = this.createLinkForm.get('link')?.value; 
    let expiryDate;
    switch (this.createLinkForm.get('expiryDate')?.value) {
      case '12':
          expiryDate = this.linkService.getValidDate(new Date(Date.now() + 12 * 60 * 60 * 1000));
          break;
      case '24':
          expiryDate = this.linkService.getValidDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
          break;
      case '168':
          expiryDate = this.linkService.getValidDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
          break;
      case '336':
          expiryDate = this.linkService.getValidDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000));
          break;
      case '720':
          expiryDate = this.linkService.getValidDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
          break;
      case '2160':
          expiryDate = this.linkService.getValidDate(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000));
          break;
      case '4320':
          expiryDate = this.linkService.getValidDate(new Date(Date.now() + 180 * 24 * 60 * 60 * 1000));
          break;
      default:
          this.toastr.error('Invalid date');
          break;
    }

    if (link && expiryDate){
      this.linkService.createLink(link, expiryDate).subscribe({
        next: response => {
          if (response!) this.toastr.success("Link was successfully created");
          else this.toastr.error("Error during creating link");
        },
        error: error => console.log(error)
      })
      this.createLinkForm.get('link')?.setValue('');
      this.createLinkForm.get('expiryDate')?.setValue('12');
      this.loadPersonalLinks();
    }
  }

  pageChanged(event: any){
    if (this.linkParams.pageNumber !== event.page){
      this.linkParams.pageNumber = event.page;
      this.loadPersonalLinks();
    }
  }

  resetFilters(){
    this.linkParams = new LinkParams();
    this.loadPersonalLinks();
  }
}
