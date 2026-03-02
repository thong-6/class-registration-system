import React, { useEffect, useState } from 'react';
import { Plus, Search, Download } from 'lucide-react';
import { Course } from '../../../type/course';
import CourseTable from './component/CourseTable';
import CourseModal from './component/CourseModal';
import { createACourse, deleteACourse, getAllCourse, updateACourse } from '../../../services/courseService';
import { getAllDepartment } from '../../../services/departmentService';
import { getAllCurriculum } from '../../../services/curriculumService';

// Mock Data cho Dropdowns (Call API thực tế)
const mockDepartments = [
  { id: 1, name: 'Viện Công nghệ Thông tin' },
  { id: 2, name: 'Viện Điện tử Viễn thông' }
];

const mockCurriculums = [
  { id: 101, name: 'Kỹ sư CNTT Đại trà 2023' },
  { id: 102, name: 'Cử nhân Khoa học Máy tính' }
];

// Mock Data khóa học
const initialCourses: Course[] = [
  {
    id: 1,
    courseCode: "IT3011",
    name: "Cấu trúc dữ liệu và Giải thuật",
    credits: 3,
    description: "Học về các cấu trúc dữ liệu cơ bản...",
    learningOutcomes: "- Nắm vững cây, đồ thị...",
    departmentId: 1,
    departmentName: "Viện Công nghệ Thông tin",
    curriculumId: 101,
    curriculumName: "Kỹ sư CNTT Đại trà 2023",
    prerequisites: "IT1110",
    corequisites: "",
    isActive: true
  },
  {
    id: 2,
    courseCode: "MI2020",
    name: "Xác suất thống kê",
    credits: 2,
    description: "Lý thuyết xác suất và ứng dụng thống kê",
    learningOutcomes: "- Tính được kỳ vọng, phương sai...",
    departmentId: 2,
    departmentName: "Viện Toán ứng dụng",
    curriculumId: 101,
    prerequisites: "MI1111",
    corequisites: "",
    isActive: false
  }
];

const AdminCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [department, setDepartment] = useState(mockDepartments);
  const [curriculum, setCurriculum] = useState(mockCurriculums);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const fetch = async () =>{
    try {
      const dataCourse = await getAllCourse();
      setCourses(dataCourse);
      const dataDepartment = await getAllDepartment();
      const dataCurriculum = await getAllCurriculum();
      console.log(dataCourse);
      setDepartment(dataDepartment);
      setCurriculum(dataCurriculum);
    } catch (error) {
      console.error(error);
      alert('Cannot download data');
    }
  }
  useEffect(()=>{
    fetch();
  }, []);
  const handleOpenAddNew = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa môn học này? Nếu đã có lớp học phần, thao tác này có thể lỗi.')) {
      try {
        await deleteACourse(id);
        setCourses(courses.filter(c => c.id !== id));
      } catch (error) {
        alert('Cannot delete this course now');
      }
      
    }
  };

  const handleSaveData = async (formData: Partial<Course>, id?: number) => {
    // Tìm tên Department và Curriculum để hiển thị đẹp trên bảng sau khi lưu
    const deptName = department.find(d => d.id === formData.departmentId)?.name;
    const currName = curriculum.find(c => c.id === formData.curriculumId)?.name;
    
    const preparedData = {
      ...formData,
      departmentName: deptName,
      curriculumName: currName,
    } as Course;

    if (id) {
      try {
        await updateACourse(id, formData);
        console.log({id, formData})
        setCourses(courses.map(c => c.id === id ? { ...preparedData } : c));
      } catch (error) {
        alert('Cannot edit this course');
      }
    } else {
      try {
        const created = await createACourse(formData);
        setCourses([...courses, created]);
      } catch (error) {
        alert('Cannot create course now');
      }
      
    }
    setIsModalOpen(false);
  };

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Môn học</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý danh mục học phần, cấu hình tín chỉ và khoa/viện quản lý.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium rounded-lg shadow-sm">
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
          <button 
            onClick={handleOpenAddNew}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Thêm môn học
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo mã môn hoặc tên môn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Bộ lọc mở rộng (Có thể thêm vào sau) */}
        <select className="block w-full md:w-48 border border-gray-300 rounded-lg py-2 px-3 bg-white focus:ring-indigo-500 sm:text-sm text-gray-700">
          <option value="">Tất cả các Khoa</option>
          {department.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>

      <CourseTable 
        data={filteredCourses} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete} 
      />

      <CourseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveData}
        initialData={editingCourse}
        departments={department}
        curriculums={curriculum}
      />
    </div>
  );
};

export default AdminCoursesPage;