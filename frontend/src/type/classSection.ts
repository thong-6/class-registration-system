export interface ClassSection {
  id: number;
  sectionCode: string; // Mã lớp học phần (VD: IT3011-01)
  courseId: number;
  courseName?: string;
  semesterId: number;
  semesterName?: string;
  instructorId: number;
  instructorName?: string;
  maxStudents: number;
  currentStudents: number;
  status: 'OPEN' | 'CLOSED' | 'CANCELLED' | 'IN_PROGRESS'; 
  notes: string;
}