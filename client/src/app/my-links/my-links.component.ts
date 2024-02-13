import { Component, OnInit } from '@angular/core';
import { LinkService } from '../_services/link.service';
import { Observable, map, of } from 'rxjs';
import { Link } from '../_models/link';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-links',
  templateUrl: './my-links.component.html',
  styleUrls: ['./my-links.component.scss']
})
export class MyLinksComponent implements OnInit {
  myLinks$: Observable<Link[]> | undefined;
  createLinkForm: FormGroup = new FormGroup({}); 

  constructor(private linkService: LinkService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.loadMyLinks();
    this.initializeForm();
  }

  initializeForm(){
    this.createLinkForm = new FormGroup({
      link: new FormControl('', [Validators.required, Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)]),
      expiryDate: new FormControl('', [Validators.required])
    })
  }

  loadMyLinks(){
    this.myLinks$ = this.linkService.loadLinks().pipe(
      map(links => {
        return links.filter(l => l.userId === 1)
      })
    )
  }

  createLink(){
    const link = this.createLinkForm.get('link')?.value; 
    let expiryDate;
    switch (this.createLinkForm.get('expiryDate')?.value) {
      case '12':
          expiryDate = this.formatDate(new Date(Date.now() + 12 * 60 * 60 * 1000));
          break;
      case '24':
          expiryDate = this.formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
          break;
      case '168':
          expiryDate = this.formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
          break;
      case '336':
          expiryDate = this.formatDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000));
          break;
      case '720':
          expiryDate = this.formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
          break;
      case '2160':
          expiryDate = this.formatDate(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000));
          break;
      case '4320':
          expiryDate = this.formatDate(new Date(Date.now() + 180 * 24 * 60 * 60 * 1000));
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
        }
      })
      this.createLinkForm.reset();
    }
  }

  private formatDate(date: any) {
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
