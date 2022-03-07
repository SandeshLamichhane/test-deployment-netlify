
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import React, { useRef, useState } from "react"
import { useAuth } from '../contexts/AuthContext'
import { auth } from '../Firebase'
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser, addUsertodb } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const history = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password donot match");
        }
        try {
            setError('')
            setLoading(true)
            const x = await signup(emailRef.current.value,
                passwordRef.current.value)
            if (x) {
                setError(x)
            }
            else {
                history("/");
                window.location.reload(false);
            }
        }
        catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }
    return (
        <div className='our-back' >
            <Container className="d-flex align-items-center justify-content-center p-6" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: '400px' }}>

                    <Card>
                        <Card.Body>
                            <h2 className='text-center mb-4'>
                                Aadhikhola  Sign Up
                            </h2>

                            {error && <Alert variant='danger'>{
                                error
                            }
                            </Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>     Email  </Form.Label>
                                    <Form.Control type="email"
                                        onChange={(event) => {

                                        }}
                                        ref={emailRef} required

                                    />
                                </Form.Group>
                                <br></br>


                                <Form.Group id="password">
                                    <Form.Label>     Password  </Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <br></br>
                                <Form.Group id="password-confirm">
                                    <Form.Label> Password Confirmation  </Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required />
                                </Form.Group>
                                <br></br>
                                <Button disabled={loading} className='w-100' type="Submit" >
                                    Sign Up
                                </Button >
                            </Form>
                        </Card.Body>
                        <div className='w-100 text-center mt-2'>
                            Already have an account ?
                            <h4>  <Link to="/Login"> Log in</Link></h4>
                        </div>
                    </Card>
                </div>
            </Container>
        </div >
    )
}
