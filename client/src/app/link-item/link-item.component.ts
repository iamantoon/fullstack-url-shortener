import { Component, Input } from '@angular/core';
import { Link } from '../_models/link';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.scss']
})
export class LinkItemComponent {
  @Input() link?: Link;
}
