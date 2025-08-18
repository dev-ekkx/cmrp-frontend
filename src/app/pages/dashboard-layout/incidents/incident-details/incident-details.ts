import {ChangeDetectionStrategy, Component, effect, input, OnInit, output} from '@angular/core';
import {IIncidentDetails} from '@/interfaces/incident-interface';
import {Tag} from 'primeng/tag';
import {getIncidentSeverity} from '@/lib/utils';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'cmrp-incident-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Tag,
    Select,
    FormsModule,
    Textarea,
  ],
  templateUrl: './incident-details.html',
  styleUrl: './incident-details.css'
})
export class IncidentDetails implements OnInit {
  public showEditOptions = input(false)
  public incident = input<IIncidentDetails>({
    title: "",
    assignedOfficer: "",
    id: "",
    location: "",
    priority: "",
    reported: "",
    status: " "
  })
  public updateInfo = output()
  protected readonly getIncidentSeverity = getIncidentSeverity;
  protected updateValue = "";

  protected selectedStatus = {
    name: "",
    code: ""
  }
  protected statuses = [
    {name: 'Active', code: 'active'},
    {name: 'Pending', code: 'pending'},
    {name: 'Investigating', code: 'investigating'},
    {name: 'Resolved', code: 'resolved'}
  ];


  constructor() {
    effect(() => {
      if (this.selectedStatus || this.updateValue) {
        console.log(this.updateValue, this.selectedStatus);
      }
    });
  }

  ngOnInit() {
    this.selectedStatus = {
      name: this.incident().status.charAt(0).toUpperCase() + this.incident().status.slice(1),
      code: this.incident().status
    }
  }
}
