import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: any = {};
  
  constructor(private accountService: AccountService, private router: Router){}

  login(){
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.router.navigateByUrl('/');
      }
    })
  }

  logout(){
    this.accountService.logout();
  }
}
