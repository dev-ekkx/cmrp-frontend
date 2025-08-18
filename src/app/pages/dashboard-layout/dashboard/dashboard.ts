import {Component} from '@angular/core';
import {incidentsData, recentIncidentsData} from "@/constants/index";
import {Card} from 'primeng/card';
import {cn} from '@/lib/utils';
import {IncidentCard} from '@/components/incident-card/incident-card';

@Component({
  selector: 'cmrp-dashboard',
  imports: [
    Card,
    IncidentCard,
    IncidentCard
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  protected readonly incidentsData = incidentsData;
  protected readonly cn = cn;
  protected readonly recentIncidentsData = recentIncidentsData;
}
