import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  linkForm: FormGroup = new FormGroup({}); // 1st

  ngOnInit(): void {
    this.initializeForm(); // 3rd
  }

  initializeForm(){ // 2nd
    this.linkForm = new FormGroup({
      link: new FormControl('', [Validators.required, Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)])
    })
  }

  convertLink(){ // 4th
    console.log(this.linkForm?.value);
  }
}
