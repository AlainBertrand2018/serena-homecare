

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

export type CaregiverStatus = 'Disponible' | 'En mission' | 'Indisponible';

export type Caregiver = {
  id: string;
  name: string;
  avatarUrl: string;
  status: CaregiverStatus;
  skills: string[];
};

export type VisitStatus = 'À venir' | 'Terminée' | 'En cours' | 'Annulée';

export type Visit = {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatarUrl: string;
  clientAddress: string;
  caregiverId: string;
  caregiverName: string;
  date: Date;
  time: string;
  status: VisitStatus;
  tasks: string[];
};

export type TransactionStatus = 'Payée' | 'En attente' | 'Envoyée' | 'En retard';
export type TransactionType = 'Facture' | 'Paie';

export type Transaction = {
    id: string;
    name: string;
    description: string;
    type: TransactionType;
    status: TransactionStatus;
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
      relationship: 'Fils',
    },
    medicalInfo: {
        allergies: ['Pénicilline'],
        conditions: ['Hypertension', 'Arthrite'],
        medications: [
            { name: 'Lisinopril', dosage: '10mg', frequency: 'Une fois par jour' },
            { name: 'Ibuprofène', dosage: '200mg', frequency: 'Au besoin pour la douleur' },
        ]
    },
    carePlan: 'Aime la musique classique et a un chat nommé Moustaches. Préfère le thé au café. A besoin d\'aide pour la préparation des repas et les tâches ménagères légères. Encourager la consommation de liquides.',
  },
  {
    id: '2',
    name: 'Mario DINDAR',
    avatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/mario.png',
    address: '789, Rue des Pies, Port Louis',
    emergencyContact: {
      name: 'Julie DINDAR',
      phone: '555-0102',
      relationship: 'Fille',
    },
     medicalInfo: {
        allergies: ['Aucune'],
        conditions: ['Diabète de type 2', 'Glaucome'],
        medications: [
            { name: 'Metformine', dosage: '500mg', frequency: 'Deux fois par jour' },
            { name: 'Latanoprost', dosage: '1 goutte', frequency: 'Une fois par jour le soir' },
        ]
    },
    carePlan: 'Aime regarder de vieux films, surtout les westerns. A besoin d\'aide pour la mobilité, utilise un déambulateur. Surveiller la glycémie avant les repas.',
  },
   {
    id: '3',
    name: 'Preety NAANKI',
    avatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/preety.png',
    address: '123, Rue des tulipes, Sodnac, Quatre Bornes',
    emergencyContact: {
      name: 'Anoop Azaghen',
      phone: '555-0103',
      relationship: 'Gendre',
    },
    medicalInfo: {
      allergies: ['Sulfamides'],
      conditions: ['Insuffisance cardiaque congestive', 'MPOC'],
      medications: [
        { name: 'Furosémide', dosage: '40mg', frequency: 'Une fois par jour' },
        { name: 'Inhalateur d\'Albutérol', dosage: '2 bouffées', frequency: 'Au besoin' },
      ],
    },
    carePlan: 'Nécessite une assistance avec le réservoir d\'oxygène. Aime jardiner et lire. Garder l\'appartement frais et bien ventilé.',
  },
];

export const caregivers: Caregiver[] = [
  {
    id: 'c1',
    name: 'Samantha RENÉ',
    avatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/caregivers/samantha.png',
    status: 'Disponible',
    skills: ['Soins personnels', 'Soins de la démence', 'Gestion des médicaments'],
  },
  {
    id: 'c2',
    name: 'David LELOUP',
    avatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/caregivers/david.png',
    status: 'En mission',
    skills: ['Accompagnement', 'Préparation de repas', 'Aide à la mobilité'],
  },
  {
    id: 'c3',
    name: 'Brenda CHONG',
    avatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/caregivers/brenda.png',
    status: 'Disponible',
    skills: ['Soins infirmiers qualifiés', 'Soins des plaies', 'Soins post-opératoires'],
  },
  {
    id: 'c4',
    name: 'Nathalie JEANPIERRE-RODRIGUEZ',
    avatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/caregivers/nathalie.png',
    status: 'Indisponible',
    skills: ['Soins personnels', 'Soins palliatifs', 'Bilingue (espagnol)'],
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
    date: new Date('2024-07-25T09:00:00'),
    time: '09:00 - 11:00',
    status: 'À venir',
    tasks: ['Préparer le petit-déjeuner', 'Administrer les médicaments du matin', 'Ménage léger'],
  },
  {
    id: 'v2',
    clientId: '2',
    clientName: 'Mario DINDAR',
    clientAvatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/mario.png',
    clientAddress: '789, Rue des Pies, Port Louis',
    caregiverId: 'c2',
    caregiverName: 'David LELOUP',
    date: new Date('2024-07-26T13:00:00'),
    time: '13:00 - 15:00',
    status: 'À venir',
    tasks: ['Aide à la marche', 'Vérifier la glycémie', 'Préparer le déjeuner'],
  },
  {
    id: 'v3',
    clientId: '1',
    clientName: 'Azizza MOOTTEE',
    clientAvatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/aziza.png',
    clientAddress: '456, Avenue des Longanes, Quatre Bornes',
    caregiverId: 'c1',
    caregiverName: 'Samantha RENÉ',
    date: new Date('2024-07-28T10:00:00'),
    time: '10:00 - 12:00',
    status: 'À venir',
    tasks: ['Ranger le salon', 'Jouer aux cartes', 'Préparer une collation légère'],
  },
  {
    id: 'v4',
    clientId: '3',
    clientName: 'Preety NAANKI',
    clientAvatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/preety.png',
    clientAddress: '123, Rue des tulipes, Sodnac, Quatre Bornes',
    caregiverId: 'c3',
    caregiverName: 'Nathalie JEANPIERRE-RODRIGUEZ',
    date: new Date('2024-07-23T14:00:00'),
    time: '14:00 - 17:00',
    status: 'Terminée',
    tasks: ['Surveiller les niveaux d\'oxygène', 'Administrer les médicaments de l\'après-midi', 'Aide à la préparation du dîner'],
  },
  {
    id: 'v5',
    clientId: '2',
    clientName: 'Mario DINDAR',
    clientAvatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/mario.png',
    clientAddress: '789, Rue des Pies, Port Louis',
    caregiverId: 'c2',
    caregiverName: 'David LELOUP',
    date: new Date('2024-07-24T11:00:00'),
    time: '11:00 - 13:00',
    status: 'En cours',
    tasks: ['Préparation du déjeuner', 'Accompagner au rendez-vous de physiothérapie', 'Lire le journal à haute voix'],
  },
  {
    id: 'v6',
    clientId: '1',
    clientName: 'Azizza MOOTTEE',
    clientAvatarUrl: 'https://9000-firebase-studio-1753869203732.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev/images/customers/aziza.png',
    clientAddress: '456, Avenue des Longanes, Quatre Bornes',
    caregiverId: 'c1',
    caregiverName: 'Samantha RENÉ',
    date: new Date('2024-07-24T09:00:00'),
    time: '09:00 - 11:00',
    status: 'À venir',
    tasks: ['Préparer le petit-déjeuner', 'Administrer les médicaments du matin', 'Ménage léger'],
  },
];

export const recentTransactions: Transaction[] = [
    { id: 't1', name: 'Azizza MOOTTEE', description: 'Facture #INV001', type: 'Facture', status: 'Payée', date: '20 juillet 2024', amount: 'MUR4,200.00' },
    { id: 't2', name: 'Samantha RENÉ', description: 'Virement de paie', type: 'Paie', status: 'Envoyée', date: '15 juillet 2024', amount: 'MUR8,500.00' },
    { id: 't3', name: 'Mario DINDAR', description: 'Facture #INV002', type: 'Facture', status: 'En attente', date: '22 juillet 2024', amount: 'MUR3,000.00' },
    { id: 't4', name: 'David LELOUP', description: 'Virement de paie', type: 'Paie', status: 'Envoyée', date: '15 juillet 2024', amount: 'MUR7,800.00' },
    { id: 't5', name: 'Preety NAANKI', description: 'Facture #INV003', type: 'Facture', status: 'En retard', date: '18 juillet 2024', amount: 'MUR5,500.00' },
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
