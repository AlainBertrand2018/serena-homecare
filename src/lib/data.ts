export type Client = {
  id: string;
  name: string;
  avatarUrl: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
  notes: string;
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
};

export const clients: Client[] = [
  {
    id: '1',
    name: 'Eleanor Vance',
    avatarUrl: 'https://placehold.co/100x100.png',
    address: '456 Oak Avenue, Springfield, IL 62704',
    emergencyContact: {
      name: 'John Vance (Son)',
      phone: '555-0101',
    },
    notes: 'Loves classical music and has a cat named Whiskers. Prefers tea over coffee. Allergic to penicillin.',
  },
  {
    id: '2',
    name: 'Arthur Pendelton',
    avatarUrl: 'https://placehold.co/100x100.png',
    address: '789 Pine Street, Metropolis, IL 62960',
    emergencyContact: {
      name: 'Susan Pendelton (Daughter)',
      phone: '555-0102',
    },
    notes: 'Enjoys watching old movies, especially westerns. Needs assistance with mobility, uses a walker.',
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
  },
];

export const getClientById = (id: string): Client | undefined => {
    return clients.find(c => c.id === id);
}

export const getVisitById = (id: string): Visit | undefined => {
    return visits.find(v => v.id === id);
}
