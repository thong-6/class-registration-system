export interface Course {
  id: number;
  courseCode: string;
  name: string;
  credits: number;
  description: string;
  learningOutcomes: string;
  departmentId: number; // Tương ứng với Department entity
  departmentName?: string; // Dùng để hiển thị trên bảng
  curriculumId: number; // Tương ứng với Curriculum entity
  curriculumName?: string; // Dùng để hiển thị trên bảng
  prerequisites: string; // Môn tiên quyết
  corequisites: string; // Môn song hành
  isActive: boolean;
}