import React, { useState, useEffect } from 'react';
import { X, Layers, FileText, Link as LinkIcon } from 'lucide-react';
import { Course } from '../../../../type/course';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Course>, id?: number) => void;
  initialData: Course | null;
  // Truyền danh sách Khoa và Chương trình từ Cha vào để làm Dropdown (Select)
  departments: { id: number; name: string }[];
  curriculums: { id: number; name: string }[];
}

const CourseModal: React.FC<CourseModalProps> = ({ 
  isOpen, onClose, onSave, initialData, departments, curriculums 
}) => {
  const [formData, setFormData] = useState<Partial<Course>>({
    courseCode: '', name: '', credits: 3, description: '', 
    learningOutcomes: '', departmentId: 0, curriculumId: 0, 
    prerequisites: '', corequisites: '', isActive: true
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ 
      courseCode: '', name: '', credits: 3, description: '', 
      learningOutcomes: '', departmentId: departments[0]?.id || 0, 
      curriculumId: curriculums[0]?.id || 0, prerequisites: '', 
      corequisites: '', isActive: true 
    });
  }, [initialData, isOpen, departments, curriculums]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSave(formData, initialData?.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      {/* Container modal có giới hạn chiều cao và scroll */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col transform transition-all">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 flex-shrink-0">
          <h3 className="text-lg font-bold text-gray-900">{initialData ? 'Cập nhật Môn học' : 'Thêm Môn học mới'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500"><X className="h-6 w-6" /></button>
        </div>
        
        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form id="courseForm" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Block 1: Thông tin cơ bản */}
            <div>
              <h4 className="text-sm font-semibold text-indigo-600 flex items-center mb-4 uppercase tracking-wider">
                <FileText className="w-4 h-4 mr-2"/> Thông tin chung
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Mã môn *</label>
                  <input type="text" required value={formData.courseCode} onChange={(e) => setFormData({...formData, courseCode: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono" placeholder="VD: IT3011" />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Tên môn học *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="VD: Cấu trúc dữ liệu và Giải thuật" />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Số TC *</label>
                  <input type="number" min="1" max="10" required value={formData.credits} onChange={(e) => setFormData({...formData, credits: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>
            </div>

            {/* Block 2: Phân bổ Tổ chức */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-4">
                <Layers className="w-4 h-4 mr-2"/> Đơn vị quản lý
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Khoa / Viện quản lý</label>
                  <select required value={formData.departmentId} onChange={(e) => setFormData({...formData, departmentId: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 bg-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value={0} disabled>-- Chọn Khoa --</option>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Chương trình đào tạo</label>
                  <select required value={formData.curriculumId} onChange={(e) => setFormData({...formData, curriculumId: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 bg-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value={0} disabled>-- Chọn CTĐT --</option>
                    {curriculums.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Block 3: Ràng buộc môn học */}
            <div>
               <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-4">
                <LinkIcon className="w-4 h-4 mr-2"/> Ràng buộc học thuật
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Môn tiên quyết (Prerequisites)</label>
                  <input type="text" value={formData.prerequisites} onChange={(e) => setFormData({...formData, prerequisites: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="VD: IT1010, IT2020" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Môn song hành (Corequisites)</label>
                  <input type="text" value={formData.corequisites} onChange={(e) => setFormData({...formData, corequisites: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="VD: MI1010" />
                </div>
              </div>
            </div>

            {/* Block 4: Chi tiết (Textarea) & Trạng thái */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả tóm tắt (Description)</label>
                <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Nhập mô tả môn học..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Chuẩn đầu ra (Learning Outcomes)</label>
                <textarea rows={3} value={formData.learningOutcomes} onChange={(e) => setFormData({...formData, learningOutcomes: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Nhập chuẩn đầu ra..." />
              </div>

              <div className="pt-2">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer" />
                  <span className="ml-2 text-sm text-gray-900 font-medium">Trạng thái: Đang hoạt động (Cho phép giảng dạy)</span>
                </label>
              </div>
            </div>

          </form>
        </div>

        {/* Modal Footer (Fixed ở dưới) */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3 flex-shrink-0">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Hủy bỏ</button>
          <button type="submit" form="courseForm" className="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 shadow-sm">
            {initialData ? 'Lưu cập nhật' : 'Tạo môn học'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CourseModal;