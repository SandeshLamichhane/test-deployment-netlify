import React from 'react'

import { FaRegEnvelope } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa"
import './Contact.css';
import { Link, useNavigate } from "react-router-dom"

export default function Contact() {
    return (
        <div className='contact-main-box'>
            <Link to="/">
                <span className='go-back'>
                    Home
                </span>
            </Link>
            <div className='contact-box'>

                <div className='footer-col'>
                    <h3>
                        Aadhikhola Office
                        <div className="underline">
                            <span></span>
                        </div>
                    </h3>
                    <p className='contact-box-p'>
                        NewRoad
                    </p>
                    <p className='contact-box-p'>
                        Nagarpaalika Pachhadi, Pokhara
                    </p>
                    <p className='contact-box-p'>
                        Gandaki, 33700, Nepal
                    </p>




                </div>
                <div className='social-media-contact-list'>
                    <div className="social-media-contact-list-icons" >
                        <div className='fixed-icon'>    <FaPhoneAlt className='media-icons' /></div>  <div className='media-text'>   +977 9856073513 </div>
                    </div>

                    <div className="social-media-contact-list-icons">
                        <div className='fixed-icon'>  <FaFacebookF className='media-icons' /></div>
                        <div >
                            <a href="https://www.facebook.com/profile.php?id=100071508616289" style={{ color: "orange" }} target="_blank">
                                Facebook
                            </a>
                        </div>

                    </div>

                    <div className="social-media-contact-list-icons">
                        <div className='fixed-icon'>  <FaTwitter className='media-icons' /></div>
                        <span>
                            Twitter
                        </span>
                    </div>


                    <div className="social-media-contact-list-icons">
                        <div className='fixed-icon'>  <FaGoogle className='media-icons' /> </div>
                        <div className='media-text'>
                            Aadhikhola@gmail.com
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
