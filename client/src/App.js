import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomePage from './pages/user/HomePage';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import Profile from './pages/user/Profile';
import ViewUsers from './pages/admin/ViewUsers';
import UsersEdit from './pages/admin/UsersEdit';
import Adduser from './pages/admin/Adduser';

function App() {
  const {loading} = useSelector(state=>state.alerts)
  console.log(loading);
  return (
    <>
    <Router>
      {loading?
      <Spinner/>:
       <Routes>
       <Route path='/' 
       element={
        <ProtectedRoutes>
            <HomePage/>
        </ProtectedRoutes>
       
       } />
       <Route path='/profile' 
       element={
        <ProtectedRoutes>
            <Profile/>
        </ProtectedRoutes>
       
       } />
       <Route path='/viewusers' 
       element={
        <ProtectedRoutes>
            <ViewUsers/>
        </ProtectedRoutes>
       
       } />
        <Route path='/edituser/:id' 
       element={
        <ProtectedRoutes>
            <UsersEdit/>
        </ProtectedRoutes>
       
       } />
       <Route path='/admin/adduser' 
       element={
        <ProtectedRoutes>
           <Adduser/>
        </ProtectedRoutes>
       
       } />
       <Route path='/login' 
       element={
        <PublicRoute>
             <Login/>
        </PublicRoute>
      
       } />
       <Route path='/register'
        element={
          <PublicRoute>
              <Register/>
          </PublicRoute>
        
        } />
     </Routes>}
     
    </Router>
    </>
  );
}

export default App;