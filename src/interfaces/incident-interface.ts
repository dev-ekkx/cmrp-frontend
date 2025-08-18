export interface IIncident {
    title: string
    status: string
    severity: string
    details: string
    region: string
    city: string
    location: string
    date: string
    reporter: string
    assignedTo: string
}

export interface IIncidentSummary {
    title: string
    number: number
    description: string
    icon: string
}

export interface IIncidentDetails extends Pick<IIncident, "title" | "location" | "status"> {
    assignedOfficer: string
    reported: string
    priority: string
    id: string
    description?: string
}
