import { Component, Input } from '@angular/core';
import { Link } from '../_models/link';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
export class LinkListComponent {
  @Input() links: Link[] | undefined;
}
