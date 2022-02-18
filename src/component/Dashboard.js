import { updateCurrentUser } from 'firebase/auth'
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Navbar, Container, Nav, } from 'react-bootstrap'
import Header from './Dashboard/Header'
import Event from './Dashboard/event'
import News from './Dashboard/News'
import { useNews } from '../contexts/NewsContext'
import Moto from './Dashboard/Moto'
import Member from './Dashboard/Member/Member'
import Footer from './Dashboard/Footer/Footer'

export default function Dashboard() {
    const history = useNavigate();

    const [error, setError] = useState('')
    const { currentUser } = useAuth()
    const { logout } = useAuth()
    async function handlelogout() {
        setError('')
        try {
            await logout()
            // history('/login')
        }
        catch (e) {

            setError('Failed to Logout');
        }
    }

    return (
        <div className=' '>
            <Header />

            <News />
            <Moto />

            <Member />
            <Footer />

        </div>


    )
}

//  {/* <Card>
{/* <Card.Body>
    <h2 className='text-center mb-4'>
        Profile
    </h2>
    {
        error && <Alert variant="danger">
            {error}
        </Alert>
    }
    <strong>
        Email :
    </strong>
    {
        currentUser && currentUser.email
    }
    <Link to="/UpdateProfile" className="btn btn-primary w-100 mt-3">
        Update Profile
    </Link>
</Card.Body>

</Card >

    <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handlelogout}>
            Log out
        </Button>
    </div>  */}