import React, { useState, useEffect } from 'react';
import { X, Layers, Settings, Users } from 'lucide-react';
import { ClassSection } from '../../../../type/classSection';

interface OptionItem { id: number; name: string; }

interface ClassSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ClassSection>, id?: number) => void;
  initialData: ClassSection | null;
  courses: OptionItem[];
  semesters: OptionItem[];
  instructors: OptionItem[];
}

const ClassSectionModal: React.FC<ClassSectionModalProps> = ({ 
  isOpen, onClose, onSave, initialData, courses, semesters, instructors 
}) => {
  const [formData, setFormData] = useState<Partial<ClassSection>>({
    sectionCode: '', courseId: 0, semesterId: 0, instructorId: 0, 
    maxStudents: 40, currentStudents: 0, status: 'OPEN', notes: ''
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ 
      sectionCode: '', courseId: courses[0]?.id || 0, 
      semesterId: semesters[0]?.id || 0, instructorId: instructors[0]?.id || 0, 
      maxStudents: 40, currentStudents: 0, status: 'OPEN', notes: '' 
    });
  }, [initialData, isOpen, courses, semesters, instructors]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSave(formData, initialData?.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100 flex-shrink-0">
          <h3 className="text-lg font-bold text-gray-900">{initialData ? 'Cập nhật Lớp học phần' : 'Mở Lớp học phần mới'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500"><X className="h-6 w-6" /></button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form id="sectionForm" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Block 1: Phân bổ môn và học kỳ */}
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <h4 className="text-sm font-semibold text-indigo-900 flex items-center mb-4">
                <Layers className="w-4 h-4 mr-2"/> Thông tin tổ chức
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Môn học (Course) *</label>
                  <select required value={formData.courseId} onChange={(e) => setFormData({...formData, courseId: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 bg-white focus:ring-indigo-500 sm:text-sm">
                    <option value={0} disabled>-- Chọn Môn học --</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mã lớp học phần *</label>
                  <input type="text" required value={formData.sectionCode} onChange={(e) => setFormData({...formData, sectionCode: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 sm:text-sm font-mono" placeholder="VD: IT3011-01" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Học kỳ *</label>
                  <select required value={formData.semesterId} onChange={(e) => setFormData({...formData, semesterId: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 bg-white focus:ring-indigo-500 sm:text-sm">
                    <option value={0} disabled>-- Chọn Học kỳ --</option>
                    {semesters.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Block 2: Giảng viên & Sĩ số */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-4">
                <Users className="w-4 h-4 mr-2"/> Giảng viên & Sĩ số
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Giảng viên phụ trách *</label>
                  <select required value={formData.instructorId} onChange={(e) => setFormData({...formData, instructorId: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 bg-white focus:ring-indigo-500 sm:text-sm">
                    <option value={0} disabled>-- Chọn Giảng viên --</option>
                    {instructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sĩ số tối đa *</label>
                  <input type="number" min="1" max="200" required value={formData.maxStudents} onChange={(e) => setFormData({...formData, maxStudents: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Đã đăng ký (Tự động)</label>
                  <input type="number" disabled value={formData.currentStudents} className="mt-1 block w-full border border-gray-200 bg-gray-50 text-gray-500 rounded-lg py-2 px-3 sm:text-sm cursor-not-allowed" />
                </div>
              </div>
            </div>

            {/* Block 3: Trạng thái & Ghi chú */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-4">
                <Settings className="w-4 h-4 mr-2"/> Cấu hình khác
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Trạng thái lớp</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as ClassSection['status']})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 bg-white focus:ring-indigo-500 sm:text-sm">
                    <option value="OPEN">Mở cho sinh viên đăng ký</option>
                    <option value="CLOSED">Đóng đăng ký</option>
                    <option value="IN_PROGRESS">Đang giảng dạy</option>
                    <option value="CANCELLED">Đã hủy lớp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ghi chú (Notes)</label>
                  <textarea rows={3} value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 sm:text-sm" placeholder="Phòng học dự kiến, yêu cầu đặc biệt..." />
                </div>
              </div>
            </div>

          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3 flex-shrink-0">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Hủy bỏ</button>
          <button type="submit" form="sectionForm" className="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 shadow-sm">
            {initialData ? 'Lưu cập nhật' : 'Mở lớp mới'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ClassSectionModal;