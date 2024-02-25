import { Component, Input } from '@angular/core';
import { Link } from '../_models/link';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.scss']
})
export class LinkItemComponent {
  baseUrl = environment.apiUrl;

  @Input() link?: Link;
}
