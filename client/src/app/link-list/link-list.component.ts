import { Component, OnInit } from '@angular/core';
import { LinkService } from '../_services/link.service';
import { Link } from '../_models/link';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
export class LinkListComponent implements OnInit {
  links$: Observable<Link[]> | undefined;

  constructor(private linkService: LinkService){}

  ngOnInit(): void {
    this.links$ = this.linkService.loadLinks();
  }
}
