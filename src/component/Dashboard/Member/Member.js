import './Member.css'
import React from 'react';
import { FaFacebookSquare } from "react-icons/fa";
import { FaEnvelopeOpen } from "react-icons/fa";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useTeam } from '../../../contexts/TeamContext'
import { Alert } from 'react-bootstrap'


export default function Member() {
    const { data } = useTeam();
    let mykey = 0;

    const displayUsers = data.
        map(dev => {
            return (
                <Col xs={12} sm={12} md={6} lg={6} className="mt-3 mycol" key={mykey++} >
                    <div className="profile-box">
                        <div className="profile-list">
                            <div className='profile-image'>
                                <img
                                    src={dev.imageurl}
                                    className='img-fluid'
                                    alt=''
                                />
                            </div>
                            <div className='profile-name'>
                                <h4>
                                    {dev.name}
                                </h4>
                                <small>
                                    {dev.role}
                                </small>
                                <h5>
                                    {dev.address}
                                </h5>

                                <div className="profile-icon">
                                    <a href={dev.fburl} target="_blank"> <FaFacebookSquare size={50} className="icon-child" color="white" /> </a>
                                    <a href={"mailto:" + dev.mailurl} target="_blank"> <FaEnvelopeOpen size={50} className="icon-child" color="white" /></a>
                                </div>
                            </div>

                        </div>

                    </div>
                    <br>
                    </br>
                </Col>

            );
        }

        )

    return (
        <div className='main-box'>
            <Row>
                {
                    displayUsers
                }
            </Row>

        </div>
    )


        ;
}

