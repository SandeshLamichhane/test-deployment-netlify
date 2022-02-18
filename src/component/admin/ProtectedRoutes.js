import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Signup from '../signup'
import AdminPanel from './AdminPanel'
import { useAuth } from '../../contexts/AuthContext'
//create the use auth
import Login from '../Login'


export const ProtectedRoutes = ({ value }) => {

    return value ? <Outlet /> : <Navigate to='/' />
}

export const ProtectedLoginRoutes = ({ value }) => {

    console.log(value)
    return value ? <Navigate to='/' /> : <Outlet />
}



