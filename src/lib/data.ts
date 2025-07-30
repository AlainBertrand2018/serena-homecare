
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
    name: 'Eleanor Vance',
    avatarUrl: 'https://placehold.co/100x100.png',
    address: '456 Oak Avenue, Springfield, IL 62704',
    emergencyContact: {
      name: 'John Vance',
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
    name: 'Arthur Pendelton',
    avatarUrl: 'https://placehold.co/100x100.png',
    address: '789 Pine Street, Metropolis, IL 62960',
    emergencyContact: {
      name: 'Susan Pendelton',
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
    name: 'Beatrice Miller',
    avatarUrl: 'https://placehold.co/100x100.png',
    address: '123 Maple Lane, Fairview, TX 75069',
    emergencyContact: {
      name: 'George Miller',
      phone: '555-0103',
      relationship: 'Husband',
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
    name: 'Samantha Reed',
    avatarUrl: 'https://placehold.co/100x100.png',
    status: 'Available',
    skills: ['Personal Care', 'Dementia Care', 'Medication Management'],
  },
  {
    id: 'c2',
    name: 'Michael Chen',
    avatarUrl: 'https://placehold.co/100x100.png',
    status: 'On Assignment',
    skills: ['Companion Care', 'Meal Prep', 'Mobility Assistance'],
  },
  {
    id: 'c3',
    name: 'Brenda Davis',
    avatarUrl: 'https://placehold.co/100x100.png',
    status: 'Available',
    skills: ['Skilled Nursing', 'Wound Care', 'Post-operative Care'],
  },
  {
    id: 'c4',
    name: 'David Rodriguez',
    avatarUrl: 'https://placehold.co/100x100.png',
    status: 'Unavailable',
    skills: ['Personal Care', 'Hospice Care', 'Bilingual (Spanish)'],
  },
];


export const visits: Visit[] = [
  {
    id: 'v1',
    clientId: '1',
    clientName: 'Eleanor Vance',
    clientAvatarUrl: 'https://placehold.co/100x100.png',
    clientAddress: '456 Oak Avenue, Springfield, IL 62704',
    caregiverId: 'c1',
    caregiverName: 'Samantha Reed',
    date: 'July 25, 2024',
    time: '9:00 AM - 11:00 AM',
    status: 'Upcoming',
    tasks: ['Prepare breakfast', 'Administer morning medication', 'Light housekeeping'],
  },
  {
    id: 'v2',
    clientId: '2',
    clientName: 'Arthur Pendelton',
    clientAvatarUrl: 'https://placehold.co/100x100.png',
    clientAddress: '789 Pine Street, Metropolis, IL 62960',
    caregiverId: 'c2',
    caregiverName: 'Michael Chen',
    date: 'July 26, 2024',
    time: '1:00 PM - 3:00 PM',
    status: 'Upcoming',
    tasks: ['Assist with walk', 'Check blood sugar', 'Prepare lunch'],
  },
  {
    id: 'v3',
    clientId: '1',
    clientName: 'Eleanor Vance',
    clientAvatarUrl: 'https://placehold.co/100x100.png',
    clientAddress: '456 Oak Avenue, Springfield, IL 62704',
    caregiverId: 'c1',
    caregiverName: 'Samantha Reed',
    date: 'July 28, 2024',
    time: '10:00 AM - 12:00 PM',
    status: 'Upcoming',
    tasks: ['Tidy up living room', 'Play a game of cards', 'Prepare a light snack'],
  },
  {
    id: 'v4',
    clientId: '3',
    clientName: 'Beatrice Miller',
    clientAvatarUrl: 'https://placehold.co/100x100.png',
    clientAddress: '123 Maple Lane, Fairview, TX 75069',
    caregiverId: 'c3',
    caregiverName: 'Brenda Davis',
    date: 'July 23, 2024',
    time: '2:00 PM - 5:00 PM',
    status: 'Completed',
    tasks: ['Monitor oxygen levels', 'Administer afternoon medications', 'Assist with dinner prep'],
  },
  {
    id: 'v5',
    clientId: '2',
    clientName: 'Arthur Pendelton',
    clientAvatarUrl: 'https://placehold.co/100x100.png',
    clientAddress: '789 Pine Street, Metropolis, IL 62960',
    caregiverId: 'c2',
    caregiverName: 'Michael Chen',
    date: 'July 24, 2024',
    time: '11:00 AM - 1:00 PM',
    status: 'In Progress',
    tasks: ['Lunch preparation', 'Accompany to physical therapy appointment', 'Read newspaper aloud'],
  },
];

export const recentTransactions: Transaction[] = [
    { id: 't1', name: 'Eleanor Vance', description: 'Invoice #INV001', type: 'Invoice', status: 'Paid', date: 'July 20, 2024', amount: 'MUR4,200.00' },
    { id: 't2', name: 'Samantha Reed', description: 'Payroll Payout', type: 'Payroll', status: 'Sent', date: 'July 15, 2024', amount: 'MUR8,500.00' },
    { id: 't3', name: 'Arthur Pendelton', description: 'Invoice #INV002', type: 'Invoice', status: 'Pending', date: 'July 22, 2024', amount: 'MUR3,000.00' },
    { id: 't4', name: 'Michael Chen', description: 'Payroll Payout', type: 'Payroll', status: 'Sent', date: 'July 15, 2024', amount: 'MUR7,800.00' },
    { id: 't5', name: 'Beatrice Miller', description: 'Invoice #INV003', type: 'Invoice', status: 'Overdue', date: 'July 18, 2024', amount: 'MUR5,500.00' },
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
