import React, { useRef, useState, useEffect } from 'react';
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from '../../../contexts/AuthContext';

export default function AddProfileInfo() {

    //lets have a use ref for the 
    const nameRef = useRef();
    const phoneRef = useRef();
    const gaaunRef = useRef();
    const naagRef = useRef();




    const { error, currentUser, getCurrentUserInfo, initState, loading, pfloading, success, updateUserProfile,
        mydata } = useAuth();

    useEffect(() => {
        getCurrentUserInfo()
    }, []);


    async function handleSubmit(e) {
        e.preventDefault()
        await updateUserProfile(nameRef.current.value,
            phoneRef.current.value,
            gaaunRef.current.value,
            naagRef.current.files[0],
            currentUser.uid
        )

    }


    return <div>

        <Card className="p-8">
            <Form className="profile-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label> <strong>तपाइको नाम </strong></Form.Label>
                    <Form.Control type="text" defaultValue={mydata['username']} placeholder="User Name" size="lg" ref={nameRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label> <strong>फोन न : </strong></Form.Label>
                    <Form.Control type="phone" defaultValue={mydata['phone']} placeholder="name@example.com" size="lg" ref={phoneRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label> <strong>जिल्ला, गाउँपालिका (30 word) </strong></Form.Label>
                    <Form.Control type="text" maxLength="30" defaultValue={mydata['address']} placeholder="स्याङ्जा-पुतलीबजार" size="lg" ref={gaaunRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label> <strong>नागरिकता</strong></Form.Label>
                    <Form.Control type="file" accept="image/png, image/gif, image/jpeg" placeholder="स्याङ्जा-पुतलीबजार" size="lg" ref={naagRef} />
                    {mydata['naagurl'] ?
                        <img src={mydata['naagurl']} className='mt-7 h-20 text-center' />

                        : <></>
                    }
                </Form.Group>
                {
                    success ? <Alert> Saved
                    </Alert> :
                        pfloading ? <Alert>Please wait ...</Alert> :

                            <Button variant="outline-primary" type="submit" className="w-100 mt-10" size="lg">
                                Save

                            </Button>
                }

            </Form>
        </Card>
    </div>;
}
