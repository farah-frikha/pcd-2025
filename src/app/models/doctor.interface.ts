export interface Doctor {
  id?: number;
  nom: string;
  specialite: string;
  email: string;
  image?: string;
  disponibilites?: string[];
}
