import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Stats } from '../_models/stats';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStats(){
    return this.http.get<Stats>(this.baseUrl + 'statistics');
  }
}
