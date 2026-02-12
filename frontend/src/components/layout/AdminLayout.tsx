import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu, 
  Bell 
} from 'lucide-react'; // Giả sử dùng thư viện icon này

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Danh sách menu cho Admin
  const menuItems = [
    { path: '/admin/dashboard', label: 'Tổng quan', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/students', label: 'Quản lý Sinh viên', icon: <Users size={20} /> },
    { path: '/admin/instructors', label: 'Quản lý Giảng viên', icon: <Users size={20} /> },
    { path: '/admin/courses', label: 'Quản lý Học phần', icon: <BookOpen size={20} /> },
    { path: '/admin/schedule', label: 'Lên Thời khóa biểu', icon: <Calendar size={20} /> },
    { path: '/admin/settings', label: 'Cấu hình hệ thống', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* --- 1. SIDEBAR (Thanh bên trái) --- */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-slate-700">
          <span className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>
            UniManager
          </span>
          {/* Icon thu nhỏ khi sidebar đóng */}
          {!isSidebarOpen && <span className="font-bold text-xl">UM</span>}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4">
          <ul className="space-y-2 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className={`${!isSidebarOpen && 'hidden'} whitespace-nowrap`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Sidebar (Logout) */}
        <div className="p-4 border-t border-slate-700">
          <button className="flex items-center gap-3 text-slate-300 hover:text-red-400 w-full">
            <LogOut size={20} />
            <span className={`${!isSidebarOpen && 'hidden'}`}>Đăng xuất</span>
          </button>
        </div>
      </aside>


      {/* --- 2. MAIN CONTENT AREA (Khu vực bên phải) --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header (Thanh trên cùng) */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-blue-600 relative">
              <Bell size={24} />
              <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-800">Nguyễn Văn A</p>
                <p className="text-xs text-gray-500">Quản trị viên</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Wrapper (Nơi chứa nội dung thay đổi) */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* <Outlet /> là nơi các Page con (như AdminDashboard, CourseManager...) sẽ được hiển thị */}
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default AdminLayout;