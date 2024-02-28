import { ResolveFn } from '@angular/router';

export const urlResolver: ResolveFn<string> = (route, state) => {
  
  return window.location.href;
};