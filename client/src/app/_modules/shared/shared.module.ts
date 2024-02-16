import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule.forRoot({
      type: 'ball-atom'
    }),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    ToastrModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    BsDropdownModule
  ]
})
export class SharedModule { }
