
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import React, { useRef, useState } from "react"
import { useAuth } from '../contexts/AuthContext'
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore'
import { auth, db, } from '../Firebase'


import { Link, useNavigate } from "react-router-dom"


export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()

    const { login, currentUser } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const history = useNavigate();

    async function loaduserStatus(uid) {
        try {
            // const docRef = doc(db, "UserInfo", uid);
            // const docSnap = await getDoc(docRef);
            // if (docSnap.exists()) {
            //     //     console.log("Document data:", docSnap.data()['role']);
            //     // sessionStorage.setItem('userRole', docSnap.data()['role'])
            //     localStorage.setItem('userRole', docSnap.data()['role'])
            // } else {
            //     // doc.data() will be undefined in this case

            //     localStorage.setItem('userRole', 'user')
            // }
            const q = query(collection(db, "UserInfo"), where("email", "==", uid));
            localStorage.setItem('role', 'user')
            const querySnapshot = await getDocs(q);
            if (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data()['role']);
                    localStorage.setItem('role', doc.data()['role'])
                })
            }
        }
        catch (e) {
            return e.message;
        }
    }
    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value,
                passwordRef.current.value);

            var x = await loaduserStatus(emailRef.current.value)
            setError(x);
            //load the current user from firestore
            history("/");
            window.location.reload(false);
            //if the login is succeessfull then load the 

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
                                Aadhikhola  Login
                            </h2>


                            {error && <Alert variant='danger'>{
                                error
                            }
                            </Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>     Email  </Form.Label>
                                    <Form.Control type="email"
                                        onChange={(event) => { }}
                                        ref={emailRef} required

                                    />
                                </Form.Group>
                                <br></br>
                                <Form.Group id="password">
                                    <Form.Label>     Password  </Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>

                                <Link to="/ForgotPassword">Forgot Password ?</Link>
                                <br></br>
                                <br></br>
                                <Button disabled={loading} className='w-100' type="Submit" >
                                    Login
                                </Button >
                            </Form>

                            <div className="w-100 text-center mt-3">
                                <Link to="/ForgotPassword">Forgot Password ?</Link>

                            </div>
                        </Card.Body>

                        <div className='w-100 text-center mt-2'>
                            Need an Account ?
                            <h3> <Link to="/Signup">Sign Up</Link></h3>

                        </div>
                    </Card>
                </div>
            </Container>
        </div>
    )
}
