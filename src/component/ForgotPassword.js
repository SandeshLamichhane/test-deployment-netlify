import React, { useRef, useState } from "react"

import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"


export default function ForgotPassword() {
    const emailRef = useRef()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState("null");
    const { resetPassword, currentUser } = useAuth()

    //this function will mainly handle the submit
    async function handleSubmit(e) {
        e.preventDefault()

        setError("")
        setLoading(true)
        try {

            await resetPassword(emailRef.current.value);
            setSuccess("Please!! Check out your email addres." + emailRef.current.value)
        }
        catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }

    return (
        <div style={{}}>
            <Card className="">


                {
                    success !== "null" ?
                        <Card.Body>
                            <Alert>
                                {success}


                            </Alert>
                            <br></br>
                            <Link to="/Login"> Click here Log in</Link>
                        </Card.Body>
                        : <Card.Body>
                            <h2 className="text-center mb-4">
                                Forgot Password ?
                            </h2>

                            {
                                error &&
                                <Alert variant='danger'>{
                                    error
                                }

                                </Alert>
                            }
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label> Enter your Email  </Form.Label>
                                    <Form.Control type="email"
                                        onChange={(event) => { }}
                                        ref={emailRef}
                                        required />
                                </Form.Group>

                                <div className="Container" style={{ height: "20px" }}></div>
                                <Button disabled={loading} className='w-100' type="Submit">
                                    Reset Password
                                </Button>


                            </Form>
                            <div className="w-100 text-center mt-3">
                                <Link to="/Login">login ?</Link>

                            </div>

                            <div className='w-100 text-center mt-2'>
                                Need an Account ?
                                <Link to="/Signup">Sign Up</Link>

                            </div>
                        </Card.Body>
                }



            </Card>

        </div>
    )
}
