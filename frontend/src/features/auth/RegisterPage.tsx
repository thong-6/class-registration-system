import React, { useState, ChangeEvent } from 'react';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

// 1. Định nghĩa Interface cho dữ liệu Đăng ký
interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  termsAccepted: boolean; // Thêm checkbox điều khoản cho chuyên nghiệp
}

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  // State quản lý form
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    termsAccepted: false,
  });

  // Xử lý thay đổi input text
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Xử lý submit (Sử dụng SyntheticEvent để tránh lỗi deprecated)
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      alert("Vui lòng chấp nhận điều khoản sử dụng!");
      return;
    }

    console.log('Register data:', formData);
    // TODO: Gọi API đăng ký tại đây
    try {
        await register(formData.username, formData.password, formData.email)
        navigate("/login")
        
    } catch (error) {
        alert("Some thing is wrong!")
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      {/* Cột Trái - Form Đăng ký (Đảo ngược vị trí so với Login để tạo cảm giác mới) */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-12 bg-white order-2 lg:order-1">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tạo tài khoản mới</h1>
            <p className="mt-2 text-gray-500">Bắt đầu hành trình quản trị hệ thống của bạn ngay hôm nay.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            
            {/* 1. Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Tên đăng nhập
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200"
                  placeholder="Chọn tên đăng nhập (VD: dev_master)"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 2. Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Địa chỉ Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 3. Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
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
                  placeholder="Tối thiểu 8 ký tự"
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
              {/* Password strength indicator (Optional visualization) */}
              <div className="mt-2 flex space-x-1">
                 <div className={`h-1 flex-1 rounded-full ${formData.password.length > 0 ? 'bg-red-400' : 'bg-gray-200'}`}></div>
                 <div className={`h-1 flex-1 rounded-full ${formData.password.length > 6 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                 <div className={`h-1 flex-1 rounded-full ${formData.password.length > 9 ? 'bg-green-400' : 'bg-gray-200'}`}></div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  required
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="termsAccepted" className="font-medium text-gray-700 cursor-pointer">
                  Tôi đồng ý với <a href="#" className="text-indigo-600 hover:text-indigo-500">Điều khoản dịch vụ</a> và <a href="#" className="text-indigo-600 hover:text-indigo-500">Chính sách bảo mật</a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            >
              Đăng ký tài khoản
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            {/* Link về trang Login */}
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-500">Đã có tài khoản? </span>
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Đăng nhập ngay
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Cột Phải - Branding Image (Đổi hình ảnh khác với Login để phân biệt) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-600 to-indigo-900 opacity-90 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
          alt="Team collaboration" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-20 flex flex-col justify-center px-12 text-white h-full text-right">
          <h2 className="text-4xl font-bold mb-6">Tham gia cùng chúng tôi</h2>
          <p className="text-lg text-indigo-100 max-w-md ml-auto">
            Kết nối với hàng ngàn chuyên gia, quản lý dữ liệu hiệu quả và đưa doanh nghiệp của bạn lên tầm cao mới.
          </p>
          
          {/* Một vài feature points nhỏ */}
          <div className="mt-8 space-y-4 text-right ml-auto">
             <div className="flex items-center justify-end space-x-2 text-indigo-200">
                <span>Setup nhanh chóng</span>
                <CheckCircle className="h-5 w-5 text-green-400" />
             </div>
             <div className="flex items-center justify-end space-x-2 text-indigo-200">
                <span>Bảo mật dữ liệu tuyệt đối</span>
                <CheckCircle className="h-5 w-5 text-green-400" />
             </div>
             <div className="flex items-center justify-end space-x-2 text-indigo-200">
                <span>Hỗ trợ 24/7</span>
                <CheckCircle className="h-5 w-5 text-green-400" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;