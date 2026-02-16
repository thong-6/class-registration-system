import React, { useState, ChangeEvent } from 'react';
import { Eye, EyeOff, User, Lock, ArrowRight } from 'lucide-react';
import { login } from '../../services/authService';
import { Navigate, useNavigate } from 'react-router-dom';

// 1. Cập nhật Interface: Dùng username thay vì email
interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
  // 2. Cập nhật State ban đầu
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Sử dụng React.SyntheticEvent để tránh lỗi deprecated
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login data:', formData);

    try {
        await login(formData.username, formData.password);
        navigate('/admin')
    } catch (error) {
        alert("invalid username or password")
        
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      {/* Cột Trái - Branding (Giữ nguyên) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-900 opacity-90 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
          alt="Office background" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-20 flex flex-col justify-center px-12 text-white h-full">
          <h2 className="text-4xl font-bold mb-6">Chào mừng trở lại!</h2>
          <p className="text-lg text-indigo-100 max-w-md">
            Hệ thống quản trị doanh nghiệp hiện đại. Đăng nhập để truy cập bảng điều khiển và quản lý dữ liệu của bạn.
          </p>
        </div>
      </div>

      {/* Cột Phải - Form Login */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Đăng nhập</h1>
            <p className="mt-2 text-gray-500">Nhập tên đăng nhập và mật khẩu để tiếp tục.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-5">
              
              {/* --- THAY ĐỔI: Username Input --- */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Tên đăng nhập
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* Icon User thay vì Mail */}
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text" 
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200"
                    placeholder="Ví dụ: admin_user"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* -------------------------------- */}

              {/* Password Input (Giữ nguyên) */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mật khẩu
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150">
                      Quên mật khẩu?
                    </a>
                  </div>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Remember Me & Submit (Giữ nguyên) */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            >
              Đăng nhập ngay
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
          
          {/* Social login phần dưới giữ nguyên nếu cần thiết, hoặc xóa đi nếu hệ thống nội bộ không cần */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;