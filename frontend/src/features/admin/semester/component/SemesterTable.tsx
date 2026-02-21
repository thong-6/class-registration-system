import React from 'react';
import { Edit2, Trash2, Calendar as CalendarIcon, CheckCircle, XCircle, Unlock, Lock } from 'lucide-react';
import { Semester } from '../../../../type/semester';


interface SemesterTableProps {
  data: Semester[];
  onEdit: (semester: Semester) => void;
  onDelete: (id: number) => void; 
}

const SemesterTable: React.FC<SemesterTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Học kỳ</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Thời gian học</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Thời gian Đăng ký</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((semester) => (
                <tr key={semester.id} className="hover:bg-gray-50 transition-colors">
                  {/* Tên & Năm */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <CalendarIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">{semester.name}</div>
                        <div className="text-xs text-gray-500">Năm: {semester.year} - Kỳ: {semester.term}</div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Thời gian học */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{semester.startDate}</div>
                    <div className="text-xs text-gray-500">đến {semester.endDate}</div>
                  </td>
                  
                  {/* Thời gian đăng ký */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-indigo-600">{semester.registrationStart}</div>
                    <div className="text-xs text-gray-500">đến {semester.registrationEnd}</div>
                  </td>
                  
                  {/* Trạng thái (2 badges) */}
                  <td className="px-6 py-4 whitespace-nowrap space-y-1">
                    <div>
                      {semester.isCurrent ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1"/> Đang diễn ra</span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"><XCircle className="w-3 h-3 mr-1"/> Không kích hoạt</span>
                      )}
                    </div>
                    <div>
                      {semester.isRegistrationOpen ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"><Unlock className="w-3 h-3 mr-1"/> Đang mở đăng ký</span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"><Lock className="w-3 h-3 mr-1"/> Đóng đăng ký</span>
                      )}
                    </div>
                  </td>
                  
                  {/* Thao tác */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button onClick={() => onEdit(semester)} className="text-blue-600 hover:text-blue-900 bg-blue-50 p-1.5 rounded-md hover:bg-blue-100 transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => onDelete(semester.id)} className="text-red-600 hover:text-red-900 bg-red-50 p-1.5 rounded-md hover:bg-red-100 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SemesterTable;