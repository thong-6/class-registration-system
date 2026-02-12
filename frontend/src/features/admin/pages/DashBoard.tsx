import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600">Chào mừng quay trở lại trang quản trị!</p>
      
      {/* Thử tạo vài cái thẻ cho đỡ trống */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-6 rounded-lg shadow border">Thống kê sinh viên</div>
        <div className="bg-white p-6 rounded-lg shadow border">Thống kê môn học</div>
        <div className="bg-white p-6 rounded-lg shadow border">Thông báo mới</div>
      </div>
    </div>
  );
};

export default Dashboard;