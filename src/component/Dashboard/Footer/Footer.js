import React from 'react'

import { FaRegEnvelope } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa"
import './Footer.css'
import logo from '../../../../src/images/logo.png'

import { Link, useNavigate } from "react-router-dom"

export default function Footer() {
    return (
        <div className="main-footer-box">
            <div className="footer-box">
                <div className="my-footer">
                    <div className="my-footer-row">


                        <div className='footer-col'>
                            <img src={logo} className="logo" alt="img" />
                            <p>
                                देशको लोकप्रिय युवा क्लव <strong>अधिखोला </strong> सुख-दुखको साथि | सुखमा संयम दिने, दुखमा हात दिने, निराशामा आशा दियो दिने र समाजलाई समृद्धि दिने, तपाई हाम्रो आधिखोला क्लव

                            </p>
                        </div>

                        <div className='footer-col'>
                            <h3>
                                Office
                                <div className="underline">
                                    <span></span>
                                </div>
                            </h3>
                            <p>
                                पुतलीबजार नगरपालिका -४
                            </p>
                            <p>
                                आधिखोला, स्यांजा
                            </p>
                            <p>
                                Gandaki, 33700, Nepal
                            </p>
                            <p className="email-id">
                                aadhikholaclub@gmail.com
                            </p>
                            <h5>
                                +977 9856073512,  +977 9856073513
                            </h5>


                        </div>

                        <div className='footer-col'>
                            <h3>
                                Links
                                <div className="underline">
                                    <span></span>
                                </div>

                            </h3>
                            <div className='url-list'>
                                <Link to="/Signup" className='link-url'>Sign Up</Link>
                                <Link to="/Login" className='link-url'>Log In</Link>
                                <Link to="/Contact" className="link-url">Contact</Link>
                                <Link to="/About" className="link-url">About</Link>
                                <Link to="/AdminPanel" className="link-url">Admin Panel</Link>
                            </div>
                        </div>

                        <div className='footer-col'>
                            <h3>
                                News Letter
                                <div className="underline">
                                    <span></span>
                                </div>
                            </h3>
                            <form className='bottom-form'>
                                <FaRegEnvelope className='form-items' size={50} />

                                <input type="email" className='form-items' placeholder='Enter your email id' required />

                                <button type="submit" className='form-items'>
                                    <FaArrowRight size={50} />
                                </button>
                            </form>
                            <div className='social-icons'>
                                <a href="https://www.facebook.com/profile.php?id=100071508616289" target="_blank"><FaFacebookF size={50} className="facebook" /></a>
                                <a href="mailto:aadhikholaclub@gmail.com" target="_blank"><FaTwitter size={50} className="twitter" /></a>
                                <a href="mailto:aadhikholaclub@gmail.com" target="_blank" >  <FaGoogle size={50} className="google" /> </a>
                            </div>
                        </div>

                    </div>
                    <hr />
                    <span className='copyright'>
                        <span>
                            Developed by : <strong>
                                Sandesh Lamichhane ( +977 :9844734458)
                            </strong>
                        </span>
                        <p> Aadhikhola @ 2078 - All Right Reserved</p>
                    </span>
                </div>
            </div>
        </div>
    )
}
