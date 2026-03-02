import React from 'react';
import { Edit2, Trash2, Users, CheckCircle, XCircle, AlertCircle, BookOpen } from 'lucide-react';
import { ClassSection } from '../../../../type/classSection';

interface ClassSectionTableProps {
  data: ClassSection[];
  onEdit: (section: ClassSection) => void;
  onDelete: (id: number) => void;
}

const ClassSectionTable: React.FC<ClassSectionTableProps> = ({ data, onEdit, onDelete }) => {
  
  // Hàm hiển thị Badge trạng thái
  const renderStatus = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1"/> Mở đăng ký</span>;
      case 'CLOSED':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800"><AlertCircle className="w-3 h-3 mr-1"/> Đóng đăng ký</span>;
      case 'IN_PROGRESS':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"><BookOpen className="w-3 h-3 mr-1"/> Đang dạy</span>;
      case 'CANCELLED':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1"/> Đã hủy</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Lớp học phần</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Giảng viên</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Học kỳ</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Sĩ số</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((section) => {
                // Tính % sĩ số để hiển thị thanh tiến trình
                const percentFull = section.maxStudents > 0 ? Math.min((section.currentStudents / section.maxStudents) * 100, 100) : 0;
                const isFull = percentFull >= 100;

                return (
                  <tr key={section.id} className="hover:bg-gray-50 transition-colors">
                    {/* Mã & Tên Môn */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                          <Users className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{section.sectionCode}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{section.courseName}</div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Giảng viên */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{section.instructorName || 'Chưa phân công'}</div>
                    </td>

                    {/* Học kỳ */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{section.semesterName}</div>
                    </td>
                    
                    {/* Sĩ số + Progress bar */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className={`font-medium ${isFull ? 'text-red-600' : 'text-gray-700'}`}>
                          {section.currentStudents} / {section.maxStudents}
                        </span>
                      </div>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isFull ? 'bg-red-500' : 'bg-indigo-500'}`}
                          style={{ width: `${percentFull}%` }}
                        ></div>
                      </div>
                    </td>
                    
                    {/* Trạng thái */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatus(section.status)}
                    </td>
                    
                    {/* Thao tác */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <button onClick={() => onEdit(section)} className="text-blue-600 hover:text-blue-900 bg-blue-50 p-1.5 rounded-md hover:bg-blue-100 transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => onDelete(section.id)} className="text-red-600 hover:text-red-900 bg-red-50 p-1.5 rounded-md hover:bg-red-100 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Không có dữ liệu lớp học phần</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassSectionTable;