import {PrimeIcons} from 'primeng/api';
import {IIncidentDetails, IIncidentSummary} from '@/interfaces/incident-interface';
import {IUserData, RegionI} from "@/interfaces/user-interface";

export const sidebarData = [
  {
    title: "Dashboard",
    route: "",
    icon: PrimeIcons.HOME,
    isAccessible: true,
  }, {
    title: "Incidents",
    route: "/incidents",
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    isAccessible: false,
  },
  {
    title: "Users",
    route: "/users",
    icon: PrimeIcons.USERS,
    isAccessible: false
  },
  {
    title: "My Incidents",
    route: "/my-incidents",
    icon: PrimeIcons.EXCLAMATION_CIRCLE,
    isAccessible: false
  },
  // {
  //   title: "Roles and Permissions",
  //   route: "/dashboard/roles",
  //   icon: PrimeIcons.SHIELD
  // }
]


export const ghanaRegions: RegionI[] = [
  {
    label: "Greater Accra",
    value: "greater-accra",
    cities: [
      {label: "Accra", value: "accra"},
      {label: "Tema", value: "tema"},
      {label: "Madina", value: "madina"},
      {label: "Ashaiman", value: "ashaiman"},
      {label: "Dansoman", value: "dansoman"},
    ],
  },
  {
    label: "Ashanti",
    value: "ashanti",
    cities: [
      {label: "Kumasi", value: "kumasi"},
      {label: "Obuasi", value: "obuasi"},
      {label: "Ejisu", value: "ejisu"},
      {label: "Bekwai", value: "bekwai"},
      {label: "Mampong", value: "mampong"},
    ],
  },
  {
    label: "Western",
    value: "western",
    cities: [
      {label: "Sekondi-Takoradi", value: "sekondi-takoradi"},
      {label: "Tarkwa", value: "tarkwa"},
      {label: "Axim", value: "axim"},
      {label: "Prestea", value: "prestea"},
      {label: "Shama", value: "shama"},
    ],
  },
  {
    label: "Northern",
    value: "northern",
    cities: [
      {label: "Tamale", value: "tamale"},
      {label: "Yendi", value: "yendi"},
      {label: "Savelugu", value: "savelugu"},
      {label: "Bimbilla", value: "bimbilla"},
      {label: "Walewale", value: "walewale"},
    ],
  },
  {
    label: "Volta",
    value: "volta",
    cities: [
      {label: "Ho", value: "ho"},
      {label: "Keta", value: "keta"},
      {label: "Hohoe", value: "hohoe"},
      {label: "Sogakope", value: "sogakope"},
      {label: "Anloga", value: "anloga"},
    ],
  },
];

export const incidentsData = [
  {
    title: "Total incidents",
    description: "All reported incidents",
    increment: true,
    incOrDecValue: 12,
    total: 156,
    icon: PrimeIcons.EXCLAMATION_TRIANGLE
  }, {
    title: "pending review",
    description: "awaiting assignment",
    increment: false,
    incOrDecValue: 8,
    total: 24,
    icon: PrimeIcons.CLOCK
  }, {
    title: "in progress",
    description: "currently being resolved",
    increment: true,
    incOrDecValue: 15,
    total: 18,
    icon: PrimeIcons.CHART_LINE
  }, {
    title: "resolved",
    description: "successfully completed",
    increment: true,
    incOrDecValue: 25,
    total: 144,
    icon: PrimeIcons.CHECK_CIRCLE
  },
] as const


export const recentIncidentsData = [
  {
    title: "pothole on main street",
    status: "in progress",
    severity: "high",
    details: "Large pothole causing traffic disruption near the intersection of Main Street and Oak Avenue.",
    region: "Greater Accra",
    city: "Accra",
    location: "main street & Oak Avenue",
    date: "07/05/2025",
    reporter: "Sarah Doe",
    assignedTo: "Road minister"
  },
  {
    title: "Broken Street Light",
    status: "pending",
    severity: "medium",
    details: "Street light has been non-functional for three days, creating safety concerns for pedestrians.",
    region: "Western",
    city: "Takoradi",
    location: "Park Avenue, Block 200",
    date: "07/01/2025",
    reporter: "John Doe",
    assignedTo: ""
  },
  {
    title: "Water Main Break",
    status: "resolved",
    severity: "critical",
    details: "Water flooding the street and affecting multiple households in the area.",
    region: "Greater accra",
    city: "tema c10",
    location: "Elm Street, Block 100",
    date: "28/07/2025",
    reporter: "Mike Johnson",
    assignedTo: "Water Department"
  },
]

export const incidentsSummary: IIncidentSummary[] = [
  {
    title: "active incidents",
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    number: 23,
    description: "3+ since yesterday",
  },
  {
    title: "under investigation",
    icon: PrimeIcons.CLOCK,
    number: 15,
    description: "Average resolution: 4.2h",
  },
  {
    title: "resolved today",
    icon: PrimeIcons.CHECK_CIRCLE,
    number: 41,
    description: "+18% fro yesterday",
  },
  {
    title: "response time",
    icon: PrimeIcons.CLOCK,
    number: 2.1,
    description: "average response time",
  },
]

export const incidentTableHeaders = [
  "incident id", "title", "location", "priority", "status", "assigned officer", "reported", "actions"
]

export const incidentTable: IIncidentDetails[] = [
  {
    id: "INC-001",
    title: "Water on road",
    location: "Town",
    priority: "urgent",
    status: "active",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  }, {
    id: "INC-002",
    title: "Water on road",
    location: "Town",
    priority: "low",
    status: "resolved",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  }, {
    id: "INC-003",
    title: "Water on road",
    location: "Town",
    priority: "urgent",
    status: "active",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  }, {
    id: "INC-004",
    title: "Water on road",
    location: "Town",
    priority: "urgent",
    status: "active",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  }, {
    id: "INC-005",
    title: "Water on road",
    location: "Town",
    priority: "medium",
    status: "investigating",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  }, {
    id: "INC-006",
    title: "Water on road",
    location: "Town",
    priority: "high",
    status: "active",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  }, {
    id: "INC-007",
    title: "Water on road",
    location: "Town",
    priority: "urgent",
    status: "resolved",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  },
]


export const userSummaryCards = [
  {
    title: "administrators",
    count: 4,
  },
  {
    title: "city officials",
    count: 10
  },
  {
    title: "citizens",
    count: 60
  }
]

export const userTableHeaders = [
  "User ID", "Name", "Email", "Phone", "Region", "City", "Role", "Action"
]

export const usersTableData: IUserData[] = [
  {
    id: "AD-3244",
    name: "John Doe",
    email: "john.doe@example.com",
    telephone: "+233241234567",
    region: "Greater Accra",
    city: "Tema",
    role: "admin"
  },
  {
    id: "CO-1123",
    name: "John Elikem",
    email: "john.elikem@example.com",
    telephone: "+233242345678",
    region: "Central",
    city: "Cape Coast",
    role: "city official"
  },
  {
    id: "CT-2301",
    name: "Ama Mensah",
    email: "ama.mensah@example.com",
    telephone: "+233243456789",
    region: "Ashanti",
    city: "Kumasi",
    role: "citizen"
  },
  {
    id: "AD-4785",
    name: "Michael Owusu",
    email: "michael.owusu@example.com",
    telephone: "+233244567890",
    region: "Eastern",
    city: "Koforidua",
    role: "admin"
  },
  {
    id: "CO-5321",
    name: "Abena Serwaa",
    email: "abena.serwaa@example.com",
    telephone: "+233245678901",
    region: "Volta",
    city: "Ho",
    role: "city official"
  },
  {
    id: "CT-7623",
    name: "Kwame Boateng",
    email: "kwame.boateng@example.com",
    telephone: "+233246789012",
    region: "Northern",
    city: "Tamale",
    role: "citizen"
  },
  {
    id: "AD-8821",
    name: "Grace Adjei",
    email: "grace.adjei@example.com",
    telephone: "+233247890123",
    region: "Western",
    city: "Takoradi",
    role: "admin"
  },
  {
    id: "CO-9934",
    name: "Yaw Kofi",
    email: "yaw.kofi@example.com",
    telephone: "+233248901234",
    region: "Upper East",
    city: "Bolgatanga",
    role: "city official"
  },
  {
    id: "CT-1045",
    name: "Akosua Afriyie",
    email: "akosua.afriyie@example.com",
    telephone: "+233249012345",
    region: "Upper West",
    city: "Wa",
    role: "citizen"
  },
  {
    id: "AD-2190",
    name: "Daniel Koomson",
    email: "daniel.koomson@example.com",
    telephone: "+233250123456",
    region: "Greater Accra",
    city: "Accra",
    role: "admin"
  },
  {
    id: "CO-3322",
    name: "Efua Hammond",
    email: "efua.hammond@example.com",
    telephone: "+233251234567",
    region: "Central",
    city: "Elmina",
    role: "city official"
  },
  {
    id: "CT-4433",
    name: "Joseph Owusu",
    email: "joseph.owusu@example.com",
    telephone: "+233252345678",
    region: "Eastern",
    city: "Nkawkaw",
    role: "citizen"
  },
  {
    id: "AD-5544",
    name: "Linda Owusu",
    email: "linda.owusu@example.com",
    telephone: "+233253456789",
    region: "Ashanti",
    city: "Obuasi",
    role: "admin"
  },
  {
    id: "CO-6655",
    name: "Nana Badu",
    email: "nana.badu@example.com",
    telephone: "+233254567890",
    region: "Western North",
    city: "Sefwi Wiawso",
    role: "city official"
  },
  {
    id: "CT-7766",
    name: "Mabel Asante",
    email: "mabel.asante@example.com",
    telephone: "+233255678901",
    region: "Oti",
    city: "Dambai",
    role: "citizen"
  },
  {
    id: "AD-8877",
    name: "Francis Mensah",
    email: "francis.mensah@example.com",
    telephone: "+233256789012",
    region: "Bono",
    city: "Sunyani",
    role: "admin"
  },
  {
    id: "CO-9988",
    name: "Sandra Aboagye",
    email: "sandra.aboagye@example.com",
    telephone: "+233257890123",
    region: "Bono East",
    city: "Techiman",
    role: "city official"
  },
  {
    id: "CT-1099",
    name: "Isaac Kumi",
    email: "isaac.kumi@example.com",
    telephone: "+233258901234",
    region: "Savannah",
    city: "Damongo",
    role: "citizen"
  },
  {
    id: "AD-2100",
    name: "Rebecca Anane",
    email: "rebecca.anane@example.com",
    telephone: "+233259012345",
    region: "North East",
    city: "Nalerigu",
    role: "admin"
  },
  {
    id: "CT-3201",
    name: "Kojo Amankwah",
    email: "kojo.amankwah@example.com",
    telephone: "+233260123456",
    region: "Western",
    city: "Sekondi",
    role: "citizen"
  }
];

