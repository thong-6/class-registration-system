import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Semester } from '../../../../type/semester';


interface SemesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Semester>, id?: number) => void;
  initialData: Semester | null;
}

const SemesterModal: React.FC<SemesterModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Partial<Semester>>({
    name: '', year: new Date().getFullYear(), term: 1, 
    startDate: '', endDate: '', registrationStart: '', registrationEnd: '', 
    isCurrent: false, isRegistrationOpen: false
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ 
      name: '', year: new Date().getFullYear(), term: 1, 
      startDate: '', endDate: '', registrationStart: '', registrationEnd: '', 
      isCurrent: false, isRegistrationOpen: false 
    });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSave(formData, initialData?.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl transform transition-all my-8">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">{initialData ? 'Cập nhật Học kỳ' : 'Thêm Học kỳ mới'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500"><X className="h-6 w-6" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            
            {/* Thông tin cơ bản */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Tên học kỳ *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="VD: Học kỳ 1 2023-2024" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Năm học *</label>
                <input type="number" required value={formData.year} onChange={(e) => setFormData({...formData, year: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Học kỳ (Term) *</label>
                <input type="number" min="1" max="3" required value={formData.term} onChange={(e) => setFormData({...formData, term: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            {/* Trạng thái (Checkboxes) */}
            <div className="flex space-x-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={formData.isCurrent} onChange={(e) => setFormData({...formData, isCurrent: e.target.checked})} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer" />
                <span className="ml-2 text-sm text-gray-700 font-medium">Là học kỳ hiện tại</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={formData.isRegistrationOpen} onChange={(e) => setFormData({...formData, isRegistrationOpen: e.target.checked})} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer" />
                <span className="ml-2 text-sm text-gray-700 font-medium">Mở cổng đăng ký</span>
              </label>
            </div>

            {/* Thời gian */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Cột Học */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center"><CalendarIcon className="w-4 h-4 mr-2"/> Thời gian học</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Bắt đầu</label>
                  <input type="date" required value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 sm:text-sm"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Kết thúc (enDate)</label>
                  <input type="date" required value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 sm:text-sm"/>
                </div>
              </div>
              
              {/* Cột Đăng ký */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-indigo-900 flex items-center"><Clock className="w-4 h-4 mr-2"/> Thời gian Đăng ký</h4>
                <div>
                  <label className="block text-xs font-medium text-indigo-700">Mở cổng lúc</label>
                  <input type="date" required value={formData.registrationStart} onChange={(e) => setFormData({...formData, registrationStart: e.target.value})} className="mt-1 block w-full border border-indigo-200 rounded-md py-2 px-3 focus:ring-indigo-500 sm:text-sm"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-indigo-700">Đóng cổng lúc</label>
                  <input type="date" required value={formData.registrationEnd} onChange={(e) => setFormData({...formData, registrationEnd: e.target.value})} className="mt-1 block w-full border border-indigo-200 rounded-md py-2 px-3 focus:ring-indigo-500 sm:text-sm"/>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Hủy bỏ</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 shadow-sm">
              {initialData ? 'Lưu thay đổi' : 'Tạo học kỳ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SemesterModal;