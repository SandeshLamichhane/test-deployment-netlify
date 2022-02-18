import React, { useRef, useState } from "react";
import { Container, Row, Col, } from "react-bootstrap";
import Profile from "./Profile";
import AddProfileInfo from "./AddProfileInfo";
import './UpdateProfile.css';
import { Link } from "react-router-dom";
export default function UpdateProfile() {
    return (
        <div className="update-box">
            <Container  >
                <div className="update-box-header">
                    <span >
                        <Link to="/" >  <h4 className="text-left">Home</h4> </Link>

                    </span>
                    <h3>
                        Configure your profile
                    </h3>


                </div>
                <Row className="justify-content-md-center">
                    <Col sm>
                        <AddProfileInfo />
                    </Col>
                    <Col sm>
                        <Profile />
                    </Col>
                </Row>
            </Container>
        </div>
    );

}
