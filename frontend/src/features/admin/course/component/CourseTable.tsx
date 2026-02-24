import React from 'react';
import { Edit2, Trash2, Book, CheckCircle, XCircle } from 'lucide-react';
import { Course } from '../../../../type/course';


interface CourseTableProps {
  data: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Môn học</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Tín chỉ</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Khoa/Viện</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                  {/* Mã & Tên Môn */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <Book className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">{course.name}</div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">{course.courseCode}</div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Số Tín chỉ */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                      {course.credits} TC
                    </span>
                  </td>
                  
                  {/* Khoa/Viện */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{course.departmentName || 'Chưa cập nhật'}</div>
                  </td>
                  
                  {/* Trạng thái */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.isActive ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1"/> Đang hoạt động
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="w-3 h-3 mr-1"/> Ngừng giảng dạy
                      </span>
                    )}
                  </td>
                  
                  {/* Thao tác */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button onClick={() => onEdit(course)} className="text-blue-600 hover:text-blue-900 bg-blue-50 p-1.5 rounded-md hover:bg-blue-100 transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => onDelete(course.id)} className="text-red-600 hover:text-red-900 bg-red-50 p-1.5 rounded-md hover:bg-red-100 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Không có dữ liệu môn học</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseTable;