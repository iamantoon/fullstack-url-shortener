import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LinkService } from '../_services/link.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  linkForm: FormGroup = new FormGroup({});
  initialLinks: any[] = [];

  constructor(public linkService: LinkService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.linkForm = new FormGroup({
      link: new FormControl('', [Validators.required, Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)])
    })
  }

  shortenLink(){
    this.linkService.shortenLink(this.linkForm?.value);
    this.linkForm.reset();
  }

  copyLink(){
    this.toastr.success("Copied");
  }

  saveLink(){
    
  }
  
  deleteLink(id: number){
    this.linkService.currentLinks$.pipe(take(1)).subscribe({
      next: links => this.initialLinks = links
    })
    this.initialLinks = this.initialLinks.filter(link => link.id !== id);
    this.linkService.updateLinks(this.initialLinks);
  }
}