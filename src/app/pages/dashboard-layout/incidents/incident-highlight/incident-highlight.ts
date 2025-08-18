import {Component, input} from '@angular/core';
import {IIncidentSummary} from '@/interfaces/incident-interface';
import {cn} from '@/lib/utils';

@Component({
  selector: 'cmrp-incident-highlight',
  imports: [],
  templateUrl: './incident-highlight.html',
  styleUrl: './incident-highlight.css'
})
export class IncidentHighlight {
  public incident = input<IIncidentSummary>({
    title: "",
    description: "",
    icon: "",
    number: 0,
  })
  protected readonly cn = cn;
}
