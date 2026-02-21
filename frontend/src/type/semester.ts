export interface Semester {
  id: number; 
  name: string;
  year: number;
  term: number;
  startDate: string;
  endDate: string; 
  registrationStart: string;
  registrationEnd: string;
  isCurrent: boolean;
  isRegistrationOpen: boolean;
}