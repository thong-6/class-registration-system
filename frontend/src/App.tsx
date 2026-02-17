import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout'; 
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleRoute from './components/auth/RoleRoute';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import PublicRoute from './components/auth/PublicRoute';


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
            </RoleRoute>
          </ProtectedRoute>
        }
      >

      </Route>
      {/*instructor*/}
      {/*admin*/}


      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<div>Admin Home</div>} />
      </Route>
      
      <Route path="/" element={<div>Trang chủ (Login)</div>} />
    </Routes>
  );
};

export default App;