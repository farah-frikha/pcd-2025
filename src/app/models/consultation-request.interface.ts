export interface ConsultationRequest {
  id?: number;
  patientId: number;
  patientName: string;
  reason: string;
  requestDate: string;
  preferredDate?: string;
  status: 'pending' | 'accepted' | 'rejected';
}
