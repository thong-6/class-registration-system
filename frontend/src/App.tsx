import { Routes, Route } from 'react-router-dom';
// 1. Xóa đuôi .tsx trong đường dẫn import
import AdminLayout from './components/layout/AdminLayout'; 
import Dashboard from './features/admin/pages/DashBoard';


const App = () => {
  return (
    <Routes>
      {/* Khi vào đường dẫn /admin:
        1. Nó sẽ load AdminLayout trước (hiện Sidebar/Header).
        2. Nó thấy "index", nó sẽ lấy Dashboard nhét vào <Outlet /> của Layout.
      */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<div>Admin Home</div>} />
      </Route>
      
      {/* Các route khác (ví dụ trang login) */}
      <Route path="/" element={<div>Trang chủ (Login)</div>} />
    </Routes>
  );
};

export default App;