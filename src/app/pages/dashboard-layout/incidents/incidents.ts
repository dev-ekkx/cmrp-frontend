import {Component, signal} from '@angular/core';
import {incidentsSummary, incidentTable, incidentTableHeaders} from "@/constants/index";
import {IncidentHighlight} from "@/pages/dashboard-layout/incidents/incident-highlight/incident-highlight";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Select} from "primeng/select";
import {FormsModule} from "@angular/forms";
import {cn, getIncidentSeverity} from "@/lib/utils";
import {TableModule} from "primeng/table";
import {TitleCasePipe} from "@angular/common";
import {Tag} from "primeng/tag";
import {Button, ButtonDirective} from "primeng/button";
import {Tooltip} from "primeng/tooltip";
import {Dialog} from "primeng/dialog";
import {IncidentDetails} from "@/pages/dashboard-layout/incidents/incident-details/incident-details";

@Component({
    selector: 'cmrp-incidents',
    imports: [
        IncidentHighlight,
        IconField,
        InputIcon,
        InputText,
        Select,
        FormsModule,
        TableModule,
        TitleCasePipe,
        Tag,
        Button,
        Tooltip,
        Dialog,
        IncidentDetails,
        ButtonDirective
    ],
    templateUrl: './incidents.html',
    styleUrl: './incidents.css'
})
export class Incidents {
    protected readonly cn = cn;
    protected readonly getIncidentSeverity = getIncidentSeverity;
    protected selectedIncident = signal("")
    protected readonly incidentTable = incidentTable;
    protected readonly incidentTableHeaders = incidentTableHeaders;
    protected showIncidentDetailsModal = false
    protected showEditDetailsOptions = signal(false)
    protected readonly incidentsSummary = incidentsSummary;
    protected selectedFilter = {
        name: "All Status",
        code: "all"
    }


    protected filters = [
        {name: 'All Status', code: 'all'},
        {name: 'Active', code: 'active'},
        {name: 'Pending', code: 'pending'},
        {name: 'Investigating', code: 'investigating'},
        {name: 'Resolved', code: 'resolved'}
    ];

    protected getIncidentDetails() {
        return this.incidentTable.find(incident => incident.id === this.selectedIncident()) ?? {
            id: "",
            assignedOfficer: "",
            priority: "",
            description: "",
            status: "",
            reported: "",
            location: "",
            title: ""
        };
    }

    protected incidentAction(incidentId: string, showEditOptions: boolean) {
        this.selectedIncident.set(incidentId);
        this.showIncidentDetailsModal = true;
        this.showEditDetailsOptions.set(showEditOptions);
        this.getIncidentDetails()
    }
}
