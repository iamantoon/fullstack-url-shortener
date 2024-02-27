import { Component, Input } from '@angular/core';
import { Link } from '../_models/link';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.scss']
})
export class LinkItemComponent {
  baseUrl = environment.apiUrl;
  @Input() link?: Link;

  constructor(private toastr: ToastrService){}

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.toastr.success('Link copied to clipboard');
    }, (err) => {
      console.error('Failed to copy text: ', err);
    });
  }
}