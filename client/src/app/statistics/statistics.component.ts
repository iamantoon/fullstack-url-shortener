import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../_services/statistics.service';
import { Stats } from '../_models/stats';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  statistics: Stats | undefined;

  constructor(private statisticsService: StatisticsService){}

  ngOnInit(): void {
    this.getStats();
  }

  getStats(){
    this.statisticsService.getStats().subscribe({
      next: stats => this.statistics = stats
    })
  }
}
