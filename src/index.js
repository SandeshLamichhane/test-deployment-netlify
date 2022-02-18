import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './component/signup';
import { Container } from 'react-bootstrap'
import AuthProvider from './contexts/AuthContext';
import NewsProvider from './contexts/NewsContext';
import TeamProvider from './contexts/TeamContext';
import VerifyProvider from './contexts/VerifyContext';
import About from '../src/component/Dashboard/About/About'
import Contact from './component/Dashboard/Contact/Contact'


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import ForgotPassword from './component/ForgotPassword';
import UpdateProfile from '../src/component/Dashboard/Profile/UpdateProfile';

import AdminPanel from './component/admin/AdminPanel';
import { ProtectedRoutes, ProtectedLoginRoutes } from './component/admin/ProtectedRoutes';

import { auth, db } from './Firebase'

import AdminNews from './component/admin/Pages/News/AdminNews';
import Alluser from './component/admin/Pages/User/Alluser';
import { useAuth } from '../src/contexts/AuthContext';
import { useVerify } from '../src/contexts/VerifyContext'

const isLoggedIn = () => {
  // auth.onAuthStateChanged(user =>{
  //     if (user) {
  //       // User is signed in.
  //     } else {
  //       // No user is signed in.
  //     }
  //   });
  if (auth.currentUser === null) {
    return true
  } else {
    alert("Login required.")
    return false
  }
}

function App() {


  const [isAdmin, setIsAdmin] = useState(false);



  //it will be the state for the has logged in
  //ToDo: Check if user is logged in or not with the help of Auth Provider
  //Todo: If user is logged in, grab uuid?, and localStorage.setItem('loggedIn',true), localStorage.setItem('uuid','xyz')
  return (
    <AuthProvider>
      <TeamProvider>
        <VerifyProvider>

          {


          }
          <Routes>

            <Route exact path='/' element={
              <NewsProvider>
                <Dashboard />
              </NewsProvider>

            } />

            <Route element={<ProtectedRoutes value={localStorage.getItem['role'] === "admin" ? true : true} />} >
              <Route path="/AdminPanel" element={<AdminPanel />} />
              <Route path="/AdminNews" element={<AdminNews />} />
              <Route path="/Alluser" element={<AdminPanel >
                <Alluser /></AdminPanel>} />
            </Route>


            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />

            <Route element={<ProtectedLoginRoutes value={!isLoggedIn} />} >
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />

            </Route>
            {
              isLoggedIn &&
              <Route path="/UpdateProfile" element={<UpdateProfile />} />
            }

            //if the user role is admin only move to admin Panel
            //else prevent it 
            //here we get userrole from local storage
            {/* {true &&
              <Route path="/AdminPanel" element={<AdminPanel />} />

            } */}
          </Routes>
        </VerifyProvider>
      </TeamProvider>
    </AuthProvider >

  );
}

ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>



      <App />

    </BrowserRouter>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
