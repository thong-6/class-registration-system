import React, { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Semester } from '../../../type/semester';
import SemesterTable from './component/SemesterTable';
import SemesterModal from './component/SemesterModel';
import { createASemester, deleteASemester, getAllSemester, updateASemester } from '../../../services/semesterService';




const AdminSemestersPage: React.FC = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]= useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSemester, setEditingSemester] = useState<Semester | null>(null);
  const fetchSemesters = async() =>{
    try {
      setLoading(true)
      setError(null)
      const data = await getAllSemester();
      setSemesters(data);
    } catch (error) {
      console.error(error)
      setError('Cannot download semester');
    } finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchSemesters();
  }, []);
  const handleOpenAddNew = () => {
    setEditingSemester(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (semester: Semester) => {
    setEditingSemester(semester);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa học kỳ này không?')) {
      try {
        await deleteASemester(id);
        setSemesters(semesters.filter(s => s.id !== id));

        return;
      } catch (error) {
        alert('Cannot delete this semester')
      }
    }
  };

  const handleSaveData = async (formData: Partial<Semester>, id?: number) => {
    if (id) {
      
      try {
        const updated = await updateASemester(id, formData);
        setSemesters(semesters.map(s => s.id === id ? updated : s));
      } catch (error) {
        alert('Cannot edit this semester')
      }
    } else {
      try {
        const created = await createASemester(formData);
        setSemesters([...semesters, created]);
      } catch (error) {
        alert('Cannot create a semester now')
      }
      
    }
    setIsModalOpen(false);
  };

  const filteredSemesters = semesters.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Học kỳ</h1>
          <p className="text-sm text-gray-500 mt-1">Cấu hình thời gian học và mở/đóng cổng đăng ký.</p>
        </div>
        <button 
          onClick={handleOpenAddNew}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm học kỳ mới
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên học kỳ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <SemesterTable 
        data={filteredSemesters} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete} 
      />

      <SemesterModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveData}
        initialData={editingSemester}
      />
    </div>
  );
};

export default AdminSemestersPage;