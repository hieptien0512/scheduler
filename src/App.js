import './Style.css';
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";
import { Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Home from './Component/Home';
import UserList from './Component/UserList';
import AddUser from './Component/AddUser';
import Footer from './Component/Footer';
import EditUser from './Component/EditUser';
import Login from './Component/Auth/Login';
import Calendar from './Component/Calendar';
import { useState } from 'react';
// Registering Syncfusion license key
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVJzWmFZfVpgfV9EZ1ZVQWYuP1ZhSXxXdk1iX39XcnNRQGhbUkM=');

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  return (
    <div className="App">
      <Header userRole={userRole} setToken={setToken} setUserRole={setUserRole} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setToken={setToken} setUserRole={setUserRole} />} />
        <Route path='/userList' element={token && userRole === '1' ? <UserList token={token} /> : <Login setToken={setToken} setUserRole={setUserRole} />} />
        <Route path='/addUser' element={token && userRole === '1' ? <AddUser token={token} /> : <Login setToken={setToken} setUserRole={setUserRole} />} />
        <Route path='/editUser/:id' element={token && userRole === '1' ? <EditUser token={token} /> : <Login setToken={setToken} setUserRole={setUserRole} />} />
        <Route path='/calendar' element={token ? <Calendar token={token} /> : <Login setToken={setToken} setUserRole={setUserRole} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
