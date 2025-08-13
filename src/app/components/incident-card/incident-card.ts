import {Component, input} from '@angular/core';
import {Chip} from "primeng/chip";
import {cn} from '@/lib/utils';
import {IIncident} from '@/interfaces/incident-interface';

@Component({
  selector: 'cmrp-incident-card',
  imports: [
    Chip
  ],
  templateUrl: './incident-card.html',
  styleUrl: './incident-card.css'
})
export class IncidentCard {

  public incident = input<IIncident>({
    title: "",
    status: 'pending',
    severity: "low",
    details: "",
    location: "",
    reporter: "",
    date: "",
    assignedTo: "",
    region: "",
    city: ""
  })
  protected readonly cn = cn;
}
