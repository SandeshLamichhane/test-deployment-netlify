
import { Form, Button, Card, Alert } from 'react-bootstrap'
import React, { useRef, useState } from "react"
import { useAuth, updateEmail, updatePassword } from '../../../contexts/AuthContext'
import { auth } from '../../../Firebase'
import { Link, useNavigate } from "react-router-dom"


export default function Profile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const history = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password donot match");
        }

        setLoading(true)
        //constant promises
        // const promises=[];
        // promises.push(updateEmail(emailRef.current.value ))
        if (emailRef.current.value != currentUser.email) {
            // promises.push(updateEmail(emailRef.current.value ))
            try {
                await updateEmail(emailRef.current.value);
                setError("Email Updated")
            }
            catch (e) {
                setError(e.message)

            }

        }
        if (passwordRef.current.value) {
            // promises.push(updatePassword(passwordRef.current.value))
            try {
                await updatePassword(passwordRef.current.value)
                setError("Password Updated")
            }
            catch (e) {
                setError(e.message)
            }
        }

        // Promise.all(promises).then(()=>{
        //   //  history("/");
        // }).catch(()=>{
        //     setError("Failed to update Account")
        // }).finally(()=>{
        //     setLoading(false)
        // }

        // );
        setLoading(false)
    }
    return (
        <div className='profile-form'>
            <Card >
                <Card.Body>
                    <h3 className='text-center mb-4 profile-form'>
                        Update Email
                    </h3>

                    {error && <Alert variant='danger'>{
                        error
                    }
                    </Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-3">
                            <Form.Label>    <strong>Email</strong>   </Form.Label>
                            <Form.Control type="email"
                                onChange={(event) => {

                                }}
                                ref={emailRef} required
                                defaultValue={currentUser.email}

                                size="lg"
                            />
                        </Form.Group>


                        <Form.Group id="password" className="mb-3">
                            <Form.Label> <strong>   Password </strong>  </Form.Label>
                            <Form.Control type="password" ref={passwordRef}
                                placeholder='Leave blank to keep the password same' size="lg"
                            />
                        </Form.Group>


                        <Form.Group id="password-confirm" className="mb-3">
                            <Form.Label> <strong>Password Confirmation </strong> </Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef}
                                placeholder='Leave blank to keep the password same'
                                size="lg"
                            />
                        </Form.Group>

                        <Button disabled={loading} size="lg" className='w-100  mt-4' type="Submit" >
                            Update
                        </Button >
                    </Form>
                </Card.Body>
                <div className='w-100 text-center mt-2 mb-4'>


                    <Link to="/"  >  <strong>Cancel all changes</strong>  </Link>

                </div>
            </Card>

        </div>
    )
}
