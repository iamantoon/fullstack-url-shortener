import { Component, Input } from '@angular/core';
import { Link } from '../_models/link';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { LinkService } from '../_services/link.service';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.scss']
})
export class LinkItemComponent {
  baseUrl = environment.apiUrl;
  @Input() link?: Link;
  
  constructor(private linkService: LinkService, private toastr: ToastrService){}

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.toastr.success('Link copied to clipboard');
    }, (err) => {
      console.error('Failed to copy text: ', err);
    });
  }

  deleteLink(id: number){
    this.linkService.deleteLink(id).subscribe({
      next: response => {
        if (response) {
          this.toastr.info('Link was deleted');
          this.linkService.loadPersonalLinks(this.linkService.getLinkParams()!);
        }
      }
    })
  }  
}