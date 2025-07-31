
export type Client = {
  id: string;
  name: string;
  avatarUrl: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalInfo: {
    allergies: string[];
    conditions: string[];
    medications: { name: string; dosage: string; frequency: string }[];
  };
  carePlan: string;
};

export type Caregiver = {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'Available' | 'On Assignment' | 'Unavailable';
  skills: string[];
};

export type Visit = {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatarUrl: string;
  clientAddress: string;
  caregiverId: string;
  caregiverName: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'In Progress' | 'Cancelled';
  tasks: string[];
};

export type Transaction = {
    id: string;
    name: string;
    description: string;
    type: 'Invoice' | 'Payroll';
    status: 'Paid' | 'Pending' | 'Sent' | 'Overdue';
    date: string;
    amount: string;
}

export const clients: Client[] = [
  {
    id: '1',
    name: 'Azizza MOOTTEE',
    avatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/aziza.png',
    address: '456, Avenue des Longanes, Quatre Bornes',
    emergencyContact: {
      name: 'Abdoulah MOOTTEE',
      phone: '555-0101',
      relationship: 'Son',
    },
    medicalInfo: {
        allergies: ['Penicillin'],
        conditions: ['Hypertension', 'Arthritis'],
        medications: [
            { name: 'Lisinopril', dosage: '10mg', frequency: 'Once a day' },
            { name: 'Ibuprofen', dosage: '200mg', frequency: 'As needed for pain' },
        ]
    },
    carePlan: 'Loves classical music and has a cat named Whiskers. Prefers tea over coffee. Needs help with meal preparation and light housekeeping. Encourage fluid intake.',
  },
  {
    id: '2',
    name: 'Mario DINDAR',
    avatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/mario.png',
    address: '789, Rue des Pies, Port Louis',
    emergencyContact: {
      name: 'Julie DINDAR',
      phone: '555-0102',
      relationship: 'Daughter',
    },
     medicalInfo: {
        allergies: ['None'],
        conditions: ['Type 2 Diabetes', 'Glaucoma'],
        medications: [
            { name: 'Metformin', dosage: '500mg', frequency: 'Twice a day' },
            { name: 'Latanoprost', dosage: '1 drop', frequency: 'Once a day in evening' },
        ]
    },
    carePlan: 'Enjoys watching old movies, especially westerns. Needs assistance with mobility, uses a walker. Monitor blood sugar levels before meals.',
  },
   {
    id: '3',
    name: 'Preety NAANKI',
    avatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/preety.png',
    address: '123, Rue des tulipes, Sodnac, Quatre Bornes',
    emergencyContact: {
      name: 'Anoop Azaghen',
      phone: '555-0103',
      relationship: 'Son in Law',
    },
    medicalInfo: {
      allergies: ['Sulfa Drugs'],
      conditions: ['Congestive Heart Failure', 'COPD'],
      medications: [
        { name: 'Furosemide', dosage: '40mg', frequency: 'Once a day' },
        { name: 'Albuterol Inhaler', dosage: '2 puffs', frequency: 'As needed' },
      ],
    },
    carePlan: 'Requires assistance with oxygen tank. Enjoys gardening and reading. Keep apartment cool and well-ventilated.',
  },
];

export const caregivers: Caregiver[] = [
  {
    id: 'c1',
    name: 'Samantha RENÉ',
    avatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/caregivers/samantha.png',
    status: 'Available',
    skills: ['Personal Care', 'Dementia Care', 'Medication Management'],
  },
  {
    id: 'c2',
    name: 'David LELOUP',
    avatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/caregivers/david.png',
    status: 'On Assignment',
    skills: ['Companion Care', 'Meal Prep', 'Mobility Assistance'],
  },
  {
    id: 'c3',
    name: 'Brenda CHONG',
    avatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/caregivers/brenda.png',
    status: 'Available',
    skills: ['Skilled Nursing', 'Wound Care', 'Post-operative Care'],
  },
  {
    id: 'c4',
    name: 'Nathalie JEANPIERRE-RODRIGUEZ',
    avatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/caregivers/nathalie.png',
    status: 'Unavailable',
    skills: ['Personal Care', 'Hospice Care', 'Bilingual (Spanish)'],
  },
];


export const visits: Visit[] = [
  {
    id: 'v1',
    clientId: '1',
    clientName: 'Azizza MOOTTEE',
    clientAvatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/aziza.png',
    clientAddress: '456, Avenue des Longanes, Quatre Bornes',
    caregiverId: 'c1',
    caregiverName: 'Samantha RENÉ',
    date: 'July 25, 2024',
    time: '9:00 AM - 11:00 AM',
    status: 'Upcoming',
    tasks: ['Prepare breakfast', 'Administer morning medication', 'Light housekeeping'],
  },
  {
    id: 'v2',
    clientId: '2',
    clientName: 'Mario DINDAR',
    clientAvatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/mario.png',
    clientAddress: '789, Rue des Pies, Port Louis',
    caregiverId: 'c2',
    caregiverName: 'David LELOUP',
    date: 'July 26, 2024',
    time: '1:00 PM - 3:00 PM',
    status: 'Upcoming',
    tasks: ['Assist with walk', 'Check blood sugar', 'Prepare lunch'],
  },
  {
    id: 'v3',
    clientId: '1',
    clientName: 'Azizza MOOTTEE',
    clientAvatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/aziza.png',
    clientAddress: '456, Avenue des Longanes, Quatre Bornes',
    caregiverId: 'c1',
    caregiverName: 'Samantha RENÉ',
    date: 'July 28, 2024',
    time: '10:00 AM - 12:00 PM',
    status: 'Upcoming',
    tasks: ['Tidy up living room', 'Play a game of cards', 'Prepare a light snack'],
  },
  {
    id: 'v4',
    clientId: '3',
    clientName: 'Preety NAANKI',
    clientAvatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/preety.png',
    clientAddress: '123, Rue des tulipes, Sodnac, Quatre Bornes',
    caregiverId: 'c3',
    caregiverName: 'Nathalie JEANPIERRE-RODRIGUEZ',
    date: 'July 23, 2024',
    time: '2:00 PM - 5:00 PM',
    status: 'Completed',
    tasks: ['Monitor oxygen levels', 'Administer afternoon medications', 'Assist with dinner prep'],
  },
  {
    id: 'v5',
    clientId: '2',
    clientName: 'Mario DINDAR',
    clientAvatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/mario.png',
    clientAddress: '789, Rue des Pies, Port Louis',
    caregiverId: 'c2',
    caregiverName: 'David LELOUP',
    date: 'July 24, 2024',
    time: '11:00 AM - 1:00 PM',
    status: 'In Progress',
    tasks: ['Lunch preparation', 'Accompany to physical therapy appointment', 'Read newspaper aloud'],
  },
];

export const recentTransactions: Transaction[] = [
    { id: 't1', name: 'Azizza MOOTTEE', description: 'Invoice #INV001', type: 'Invoice', status: 'Paid', date: 'July 20, 2024', amount: 'MUR4,200.00' },
    { id: 't2', name: 'Samantha RENÉ', description: 'Payroll Payout', type: 'Payroll', status: 'Sent', date: 'July 15, 2024', amount: 'MUR8,500.00' },
    { id: 't3', name: 'Mario DINDAR', description: 'Invoice #INV002', type: 'Invoice', status: 'Pending', date: 'July 22, 2024', amount: 'MUR3,000.00' },
    { id: 't4', name: 'David LELOUP', description: 'Payroll Payout', type: 'Payroll', status: 'Sent', date: 'July 15, 2024', amount: 'MUR7,800.00' },
    { id: 't5', name: 'Preety NAANKI', description: 'Invoice #INV003', type: 'Invoice', status: 'Overdue', date: 'July 18, 2024', amount: 'MUR5,500.00' },
];

export const getClientById = (id: string): Client | undefined => {
    return clients.find(c => c.id === id);
}

export const getVisitById = (id: string): Visit | undefined => {
    return visits.find(v => v.id === id);
}

export const getCaregiverById = (id: string): Caregiver | undefined => {
  return caregivers.find(c => c.id === id);
};
