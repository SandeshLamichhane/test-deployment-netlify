
import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from "react-router-dom"


import { AiFillAppstore, AiOutlineCloseCircle } from "react-icons/ai";

import { IconContext } from 'react-icons/lib';
import AdminNews from './Pages/News/AdminNews';
import Alluser from '../admin/Pages/User/Alluser';
import Team from './Pages/Team/Team'
import TeamProvider from '../../contexts/TeamContext'
import { useVerify } from '../../contexts/VerifyContext';
import { Alert } from 'react-bootstrap';
import './Admin.css'
import { SideBarData } from './SideBarData'
import { fontSize } from '@mui/system';

export default function AdminPanel() {
    const [sidebar, setSideBar] = useState(false)
    const [activetab, setActivetab] = useState("News")
    const showSidebar = () => setSideBar(!sidebar)
    const [currentPage, setCurrenPage] = useState("AdminNews")

    const { isamAdmin, isUserAdmin } = useVerify()


    useEffect(() => {
        //now let have the check in functionality
        //lets have a 
        console.log("Ima inside use effect")
        isUserAdmin()
    }, [])


    return (
        !isamAdmin ? <>
            <div className='mt-20 m-60'>
                <Alert>
                    <h1> Please Wait unit we verify you</h1>
                </Alert>

            </div>
        </> :
            <>

                <IconContext.Provider value={{
                    color: "#fff",
                    size: 42
                }}>


                    <div className="navbarx">
                        <Link to="#" className="menu-bars">
                            <AiFillAppstore onClick={showSidebar} />
                        </Link>
                        <div class="">
                            <button type="button" className="btn btn-warning ml-8"><strong>{currentPage}</strong></button>
                        </div>

                    </div>

                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={showSidebar}>
                            <li className='navbar-toogle'>

                                <Link to="#" className="menu-bars">
                                    <AiOutlineCloseCircle />
                                </Link>
                            </li>
                            {
                                SideBarData.map((item, index) => {
                                    return (
                                        <li key={index} onClick={() => {
                                            setCurrenPage(item.title)
                                        }} className={item.cName} >

                                            <Link to="#" >

                                                {item.icon}
                                                <span>
                                                    {item.title}
                                                </span>

                                            </Link>
                                        </li>);
                                })
                            }
                        </ul>
                    </nav>
                    <div>
                        {
                            currentPage === "News" ?
                                <AdminNews /> :
                                currentPage === "Users" ?
                                    <Alluser /> :

                                    currentPage === "Team" ?
                                        <TeamProvider>
                                            <Team />
                                        </TeamProvider>
                                        :
                                        <div>
                                            <Alert className="p-2 m-30 text-center">
                                                <h3>
                                                    Welcome to Aadhikhola Admin Page
                                                </h3>

                                            </Alert>
                                        </div>

                        }

                    </div>
                </IconContext.Provider>
            </>
    );
}



