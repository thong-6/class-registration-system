import React, { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, Calendar as CalendarIcon, 
  Clock, CheckCircle, AlertCircle, X 
} from 'lucide-react';

// 1. Định nghĩa Type cho Học kỳ
interface Semester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  regStartDate: string;
  regEndDate: string;
  status: 'active' | 'upcoming' | 'completed';
}

// Dữ liệu mẫu (Mock Data)
const initialSemesters: Semester[] = [
  {
    id: 'SEM2025_1',
    name: 'Học kỳ 1 - 2025',
    startDate: '2025-09-05',
    endDate: '2026-01-15',
    regStartDate: '2025-08-15T08:00',
    regEndDate: '2025-08-30T17:00',
    status: 'active',
  },
  {
    id: 'SEM2025_2',
    name: 'Học kỳ 2 - 2025',
    startDate: '2026-02-15',
    endDate: '2026-06-30',
    regStartDate: '2026-01-10T08:00',
    regEndDate: '2026-01-25T17:00',
    status: 'upcoming',
  }
];

const AdminSemestersPage: React.FC = () => {
  const [semesters, setSemesters] = useState<Semester[]>(initialSemesters);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State quản lý Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSemester, setEditingSemester] = useState<Semester | null>(null);

  // State quản lý Form
  const [formData, setFormData] = useState<Partial<Semester>>({
    name: '', 
    startDate: '', 
    endDate: '', 
    regStartDate: '', 
    regEndDate: '', 
    status: 'upcoming'
  });

  // Validation errors
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  // Type guard cho status
  const isValidStatus = (status: any): status is Semester['status'] => {
    return ['active', 'upcoming', 'completed'].includes(status);
  };

  // Format datetime cho input
  const formatDateTimeForInput = (datetime: string) => {
    return datetime; // Giữ nguyên nếu đã đúng format
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    if (!formData.name?.trim()) {
      errors.name = 'Tên học kỳ không được để trống';
    }

    if (!formData.startDate) {
      errors.startDate = 'Ngày bắt đầu học kỳ không được để trống';
    }

    if (!formData.endDate) {
      errors.endDate = 'Ngày kết thúc học kỳ không được để trống';
    }

    if (!formData.regStartDate) {
      errors.regStartDate = 'Thời gian mở đăng ký không được để trống';
    }

    if (!formData.regEndDate) {
      errors.regEndDate = 'Thời gian đóng đăng ký không được để trống';
    }

    // Kiểm tra logic ngày tháng
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      errors.dateRange = 'Ngày kết thúc học kỳ phải sau ngày bắt đầu';
    }

    if (formData.regStartDate && formData.regEndDate && formData.regStartDate > formData.regEndDate) {
      errors.regDateRange = 'Thời gian đóng đăng ký phải sau thời gian mở đăng ký';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Mở modal thêm mới
  const handleAddNew = () => {
    setEditingSemester(null);
    setFormData({ 
      name: '', 
      startDate: '', 
      endDate: '', 
      regStartDate: '', 
      regEndDate: '', 
      status: 'upcoming' 
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Mở modal sửa
  const handleEdit = (semester: Semester) => {
    setEditingSemester(semester);
    setFormData({ ...semester });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Xóa học kỳ
  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa học kỳ này không? Dữ liệu liên quan có thể bị ảnh hưởng.')) {
      setSemesters(semesters.filter(s => s.id !== id));
    }
  };

  // Xử lý Submit Form (Thêm/Sửa)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (editingSemester) {
      // Logic Cập nhật
      setSemesters(semesters.map(s => 
        s.id === editingSemester.id 
          ? { 
              ...formData, 
              id: s.id,
              status: isValidStatus(formData.status) ? formData.status : 'upcoming'
            } as Semester 
          : s
      ));
    } else {
      // Logic Thêm mới
      const newSemester: Semester = {
        id: `SEM_${Date.now()}`,
        name: formData.name || '',
        startDate: formData.startDate || '',
        endDate: formData.endDate || '',
        regStartDate: formData.regStartDate || '',
        regEndDate: formData.regEndDate || '',
        status: isValidStatus(formData.status) ? formData.status : 'upcoming',
      };
      setSemesters([...semesters, newSemester]);
    }
    setIsModalOpen(false);
  };

  // Helper render Badge trạng thái
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1"/> Đang diễn ra
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1"/> Sắp tới
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1"/> Đã kết thúc
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  // Lọc dữ liệu theo tìm kiếm
  const filteredSemesters = semesters.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Học kỳ</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý thời gian học và cấu hình mở/đóng cổng đăng ký tín chỉ.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm học kỳ mới
        </button>
      </div>

      {/* Toolbar (Search & Filter) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
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

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tên học kỳ</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Thời gian học</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Thời gian đăng ký</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSemesters.length > 0 ? (
                filteredSemesters.map((semester) => (
                  <tr key={semester.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                          <CalendarIcon className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{semester.name}</div>
                          <div className="text-xs text-gray-500">Mã: {semester.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(semester.startDate).toLocaleDateString('vi-VN')}
                      </div>
                      <div className="text-xs text-gray-500">
                        đến {new Date(semester.endDate).toLocaleDateString('vi-VN')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600">
                        {new Date(semester.regStartDate).toLocaleString('vi-VN')}
                      </div>
                      <div className="text-xs text-gray-500">
                        đến {new Date(semester.regEndDate).toLocaleString('vi-VN')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatusBadge(semester.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <button 
                          onClick={() => handleEdit(semester)} 
                          className="text-blue-600 hover:text-blue-900 bg-blue-50 p-1.5 rounded-md hover:bg-blue-100 transition-colors"
                          title="Sửa học kỳ"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(semester.id)} 
                          className="text-red-600 hover:text-red-900 bg-red-50 p-1.5 rounded-md hover:bg-red-100 transition-colors"
                          title="Xóa học kỳ"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy dữ liệu học kỳ phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL THÊM / SỬA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden transform transition-all">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {editingSemester ? 'Cập nhật Học kỳ' : 'Thêm Học kỳ mới'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                
                {/* Hiển thị lỗi tổng quát */}
                {formErrors.dateRange && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {formErrors.dateRange}
                  </div>
                )}
                {formErrors.regDateRange && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {formErrors.regDateRange}
                  </div>
                )}
                
                {/* Tên & Trạng thái */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tên học kỳ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        formErrors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="VD: Học kỳ 1 - 2025"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as Semester['status']})}
                      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                    >
                      <option value="upcoming">Sắp tới</option>
                      <option value="active">Đang diễn ra</option>
                      <option value="completed">Đã kết thúc</option>
                    </select>
                  </div>
                </div>

                {/* Thời gian học */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2"/> Thời gian học chính thức
                  </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Ngày bắt đầu <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                          formErrors.startDate ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.startDate && (
                        <p className="mt-1 text-xs text-red-600">{formErrors.startDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Ngày kết thúc <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.endDate}
                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                          formErrors.endDate ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.endDate && (
                        <p className="mt-1 text-xs text-red-600">{formErrors.endDate}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Thời gian Đăng ký */}
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <h4 className="text-sm font-semibold text-indigo-900 mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2"/> Cài đặt thời gian Đăng ký tín chỉ
                  </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-indigo-700">
                        Mở cổng đăng ký lúc <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        required
                        value={formData.regStartDate}
                        onChange={(e) => setFormData({...formData, regStartDate: e.target.value})}
                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                          formErrors.regStartDate ? 'border-red-300' : 'border-indigo-200'
                        }`}
                      />
                      {formErrors.regStartDate && (
                        <p className="mt-1 text-xs text-red-600">{formErrors.regStartDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-indigo-700">
                        Đóng cổng đăng ký lúc <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        required
                        value={formData.regEndDate}
                        onChange={(e) => setFormData({...formData, regEndDate: e.target.value})}
                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                          formErrors.regEndDate ? 'border-red-300' : 'border-indigo-200'
                        }`}
                      />
                      {formErrors.regEndDate && (
                        <p className="mt-1 text-xs text-red-600">{formErrors.regEndDate}</p>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {editingSemester ? 'Lưu thay đổi' : 'Tạo học kỳ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminSemestersPage;