import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { ClassSection } from '../../../type/classSection';
import ClassSectionTable from './component/ClassSectionTable';
import ClassSectionModal from './component/ClassSectionModel';
import { createAClassSection, getAllClassSection, updateAClassSection } from '../../../services/classSectionService';
import { getAllCourse } from '../../../services/courseService';
import { getAllSemester } from '../../../services/semesterService';

// --- MOCK DATA (Thay thế bằng API calls) ---
const mockCourses = [
  { id: 1, name: 'Cấu trúc dữ liệu và Giải thuật (IT3011)' },
  { id: 2, name: 'Xác suất thống kê (MI2020)' }
];
const mockSemesters = [
  { id: 1, name: 'Học kỳ 1 2023-2024' },
  { id: 2, name: 'Học kỳ 2 2023-2024' }
];
const mockInstructors = [
  { id: 2, name: 'PGS. TS. Nguyễn Văn A' },
  { id: 3, name: 'ThS. Trần Thị B' }
];

const initialSections: ClassSection[] = [
  {
    id: 1, sectionCode: "IT3011-01", courseId: 1, courseName: "Cấu trúc dữ liệu và Giải thuật",
    semesterId: 1, semesterName: "Học kỳ 1 2023-2024", instructorId: 101, instructorName: "PGS. TS. Nguyễn Văn A",
    maxStudents: 40, currentStudents: 38, status: "OPEN", notes: "Học tại nhà D3"
  },
  {
    id: 2, sectionCode: "MI2020-02", courseId: 2, courseName: "Xác suất thống kê",
    semesterId: 1, semesterName: "Học kỳ 1 2023-2024", instructorId: 102, instructorName: "ThS. Trần Thị B",
    maxStudents: 60, currentStudents: 60, status: "CLOSED", notes: ""
  }
];

const AdminClassSectionsPage: React.FC = () => {
  const [sections, setSections] = useState<ClassSection[]>(initialSections);
  const [courses, setCourses] = useState(mockCourses);
  const [instructors, setInstructors] = useState(mockInstructors);
  const [searchTerm, setSearchTerm] = useState('');
  const [semesters, setSemesters] = useState(mockSemesters)
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<ClassSection | null>(null);

  const handleOpenAddNew = () => {
    setEditingSection(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (section: ClassSection) => {
    setEditingSection(section);
    setIsModalOpen(true);
  };
  const fetch = async() =>{
    try {
      const dataSection = await getAllClassSection();
      setSections(dataSection);
      const dataCourse = await getAllCourse();
      setCourses(dataCourse);
      // const dataInstructor = await getAllInstructor();
      // setInstructors(dataInstructor);
      const dataSemester = await getAllSemester();
      setSemesters(dataSemester);
      console.log(dataSection);
    } catch (error) {
      alert('Cannot download data');
    }
    
  }
  useEffect(()=>{
      fetch();
    }, []);
  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lớp học phần này? Tất cả sinh viên đã đăng ký sẽ bị hủy.')) {
      setSections(sections.filter(s => s.id !== id));
    }
  };

  const handleSaveData = async (formData: Partial<ClassSection>, id?: number) => {
    if (id) {
      try {
      const updated = await updateAClassSection(id, formData);
      setSections(sections.map(s => s.id === id ? updated : s));
      } catch (error) {
        alert('Cannot edit this class-section now')
      }
 
    } else {
      try {
        const created = await createAClassSection(formData);
        setSections([...sections, created]);
      } catch (error) {
        alert('Cannot create a class-section now')
      }
      
    }
    setIsModalOpen(false);
  };

  // Filter theo mã lớp hoặc tên khóa học
  const filteredSections = sections.filter(s => 
    s.sectionCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.courseName && s.courseName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lớp Học Phần</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý mở lớp, phân công giảng viên và theo dõi sĩ số đăng ký.</p>
        </div>
        <button onClick={handleOpenAddNew} className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm">
          <Plus className="w-5 h-5 mr-2" />
          Mở lớp mới
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm theo mã lớp (VD: IT3011-01)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        
        {/* Bộ lọc theo Học kỳ (Demo UI) */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-5 w-5 text-gray-400" />
          <select className="block w-full md:w-48 border border-gray-300 rounded-lg py-2 px-3 bg-white focus:ring-indigo-500 sm:text-sm text-gray-700">
            <option value="">Tất cả Học kỳ</option>
            {semesters.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
      </div>

      <ClassSectionTable data={filteredSections} onEdit={handleOpenEdit} onDelete={handleDelete} />

      <ClassSectionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveData}
        initialData={editingSection}
        courses={courses}
        semesters={semesters}
        instructors={instructors}
      />
    </div>
  );
};

export default AdminClassSectionsPage;