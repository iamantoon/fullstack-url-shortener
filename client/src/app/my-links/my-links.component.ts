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
  createLinkForm: FormGroup = new FormGroup({
    link: new FormControl('', [Validators.required, Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)]),
    expiryDate: new FormControl('12', [Validators.required]),
  }); 
  filterForm: FormGroup = new FormGroup({filterByExpiryDate: new FormControl('8640')});

  constructor(private linkService: LinkService, private toastr: ToastrService){
    this.linkParams = new LinkParams();
  }

  ngOnInit(): void {
    this.loadPersonalLinks(false);
    this.initializeForm();
  }

  initializeForm(){
    this.createLinkForm = new FormGroup({
      link: new FormControl('', [Validators.required, Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)]),
      expiryDate: new FormControl('12', [Validators.required])
    })
    this.filterForm = new FormGroup({
      filterByExpiryDate: new FormControl('8640')
    })
  }

  loadPersonalLinks(force: boolean){
    this.linkParams.maxExpiryDate = this.filterForm.get('filterByExpiryDate')?.value;    
    
    if (!this.linkParams) return;

    this.linkService.loadPersonalLinks(this.linkParams, force).subscribe({
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
    const howManyHoursAccessible = this.createLinkForm.get('expiryDate')?.value;

    if (link && howManyHoursAccessible){
      this.linkService.createLink(link, howManyHoursAccessible).subscribe({
        next: response => {
          if (response!) this.toastr.success("Link was successfully created");
          else this.toastr.error("Error during creating link");
        },
        error: error => console.log(error)
      })
      this.createLinkForm.get('link')?.setValue('');
      this.createLinkForm.get('expiryDate')?.setValue('12');
      this.loadPersonalLinks(true);
    }
  }

  pageChanged(event: any){
    if (this.linkParams.pageNumber !== event.page){
      this.linkParams.pageNumber = event.page;
      this.loadPersonalLinks(false);
    }
  }

  resetFilters(){
    this.linkParams = new LinkParams();
    this.filterForm.get('filterByExpiryDate')?.setValue('8640');
    this.loadPersonalLinks(false);
  }
}
