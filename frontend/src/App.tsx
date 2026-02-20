import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout'; 
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleRoute from './components/auth/RoleRoute';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import PublicRoute from './components/auth/PublicRoute';
import StudentLayout from './components/layout/StudentLayout';
import { Divide } from 'lucide-react';
import AdminSemestersPage from './features/admin/pages/AdminSemesterPage';


const App = () => {
  return (
    <Routes>
      {/*public route*/}
      <Route
      element={
        <PublicRoute>
 
        </PublicRoute>
      }
      >
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>

      </Route>
      
      {/*student*/}
      <Route
        element={
          <ProtectedRoute>
            <RoleRoute role = "Student">
              <StudentLayout/>
            </RoleRoute>
          </ProtectedRoute>
        }
      >
         <Route path="/" element={<div>Trang chủ (Login)</div>} />
      </Route>
      {/*instructor*/}
      {/*admin*/}
      <Route
        element={
          <ProtectedRoute>
            <RoleRoute role = "Admin">
              <AdminLayout/>
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path='/admin' element={<div>Admin Home</div>}></Route>
      <Route path='/admin/semester' element={<AdminSemestersPage/>}></Route>
      </Route>

      {/* <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<div>Admin Home</div>} />
      </Route> */}
      
      {/* <Route path="/" element={<div>Trang chủ (Login)</div>} /> */}
    </Routes>
  );
};

export default App;