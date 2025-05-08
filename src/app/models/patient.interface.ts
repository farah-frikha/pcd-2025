export interface Patient {
    id: number;
    name: string;
    birthDate: string;
    phone: string;
    email: string;
    address: string;
    medicalNotes?: string;
    lastConsultation?: string;
    history?: string;
    documents?: File[];
  }
  