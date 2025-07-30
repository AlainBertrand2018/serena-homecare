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

export type Visit = {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatarUrl: string;
  clientAddress: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'In Progress';
  tasks: string[];
};

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
];

export const visits: Visit[] = [
  {
    id: 'v1',
    clientId: '1',
    clientName: 'Eleanor Vance',
    clientAvatarUrl: 'https://placehold.co/100x100.png',
    clientAddress: '456 Oak Avenue, Springfield, IL 62704',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(),
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
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
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
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    time: '10:00 AM - 12:00 PM',
    status: 'Upcoming',
    tasks: ['Tidy up living room', 'Play a game of cards', 'Prepare a light snack'],
  },
];

export const getClientById = (id: string): Client | undefined => {
    return clients.find(c => c.id === id);
}

export const getVisitById = (id: string): Visit | undefined => {
    return visits.find(v => v.id === id);
}
