import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, Award, Settings, LogOut, Menu, Bell, User as UserIcon, LayoutDashboard, ChevronDown
} from 'lucide-react';

const StudentLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tổng quan', href: '/student/dashboard' },
    { icon: BookOpen, label: 'Khóa học của tôi', href: '/student/courses' },
    { icon: Calendar, label: 'Thời khóa biểu', href: '/student/schedule' },
    { icon: Award, label: 'Kết quả học tập', href: '/student/grades' },
  ];

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* 1. OVERLAY (Đóng Sidebar trên Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* OVERLAY TÀNG HÌNH (Đóng Dropdown Profile/Notif khi click ra ngoài) */}
      {(isProfileOpen || isNotifOpen) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => { setIsProfileOpen(false); setIsNotifOpen(false); }} 
        />
      )}

      {/* 2. SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center h-16 border-b border-gray-100 px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Edu<span className="text-indigo-600">Portal</span></span>
          </div>
        </div>

        <nav className="p-4 space-y-1.5 overflow-y-auto h-[calc(100vh-4rem)] flex flex-col">
          <div className="mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Học tập
          </div>
          
          {menuItems.map((item, index) => (
            <NavLink key={index} to={item.href} onClick={() => setIsSidebarOpen(false)}>
              {({ isActive }) => (
                <div className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  isActive ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                }`}>
                  <item.icon className={`h-5 w-5 mr-3 transition-colors ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-500"}`} />
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}

          <div className="mt-auto pt-8 border-t border-gray-100">
             <div className="mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Hệ thống
             </div>
             <NavLink to="/student/settings">
              {({ isActive }) => (
                <div className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group mb-1 ${
                  isActive ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                }`}>
                  <Settings className={`h-5 w-5 mr-3 transition-colors ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-500"}`} />
                  Cài đặt
                </div>
              )}
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors group"
            >
              <LogOut className="h-5 w-5 mr-3 text-red-400 group-hover:text-red-500 transition-colors" />
              Đăng xuất
            </button>
          </div>
        </nav>
      </aside>

      {/* 3. MAIN WRAPPER */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* TOP HEADER */}
        <header className="flex justify-between items-center h-16 px-4 bg-white border-b border-gray-200 lg:px-8 z-20">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 mr-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 hidden sm:block">Không gian học tập</h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* THÔNG BÁO (BELL) & DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                className="relative p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors focus:outline-none"
              >
                <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>

              {/* Bảng Dropdown Thông báo */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 transform opacity-100 scale-100 transition-all origin-top-right">
                  <div className="px-4 py-2 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-800">Thông báo mới</h3>
                    <span className="text-xs text-indigo-600 cursor-pointer hover:underline">Đánh dấu đã đọc</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {/* Fake Notification Items */}
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                      <p className="text-sm text-gray-800"><span className="font-semibold">Lịch học thay đổi:</span> Lớp ReactJS dời sang 19:00 tối nay.</p>
                      <span className="text-xs text-gray-400 mt-1 block">10 phút trước</span>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-800"><span className="font-semibold">Điểm thi:</span> Đã có kết quả bài kiểm tra giữa kỳ.</p>
                      <span className="text-xs text-gray-400 mt-1 block">2 giờ trước</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-50 text-center">
                    <Link to="/student/notifications" className="text-xs text-indigo-600 font-medium hover:text-indigo-800">Xem tất cả</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Dấu gạch dọc phân cách */}
            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

            {/* PROFILE TÀI KHOẢN & DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                className="flex items-center gap-2 sm:gap-3 p-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none pr-2"
              >
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                  <span className="text-sm font-bold">ST</span> {/* Chữ cái đầu của tên */}
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-semibold text-gray-700 leading-none">Học viên</span>
                  <span className="text-xs text-gray-500 mt-1">student@edu.com</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 hidden sm:block transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Bảng Dropdown Profile */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 transform opacity-100 scale-100 transition-all origin-top-right">
                  <div className="px-4 py-3 border-b border-gray-50 md:hidden">
                    <p className="text-sm font-semibold text-gray-800">Học viên</p>
                    <p className="text-xs text-gray-500">student@edu.com</p>
                  </div>
                  
                  <div className="py-1">
                    <Link to="/student/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                      <UserIcon className="h-4 w-4 mr-3" />
                      Hồ sơ của tôi
                    </Link>
                    <Link to="/student/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                      <Settings className="h-4 w-4 mr-3" />
                      Cài đặt tài khoản
                    </Link>
                  </div>
                  
                  <div className="border-t border-gray-50 py-1">
                    <button 
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Đăng xuất an toàn
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* 4. MAIN CONTENT AREA */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8fafc]">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;