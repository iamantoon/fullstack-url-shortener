import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor() { }
}
