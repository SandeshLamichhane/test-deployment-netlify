import React from 'react';
import { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'

import { doc, getDoc, addDoc, updateDoc, serverTimestamp, getDocs, collection, query, where } from 'firebase/firestore'
import { ref, getStorage, uploadBytesResumable, getDownloadURL, } from "@firebase/storage"
import { Link, useNavigate } from "react-router-dom"
import { useTeam } from '../../../../contexts/TeamContext'

function AddTeam() {
    const descRef = useRef()
    const filedRef = useRef()
    const formRef = useRef();
    const nameRef = useRef();
    const addressRef = useRef();
    const fbRef = useRef();
    const mailRef = useRef();
    const imageRef = useRef();
    const roleRef = useRef();


    var imageobj;



    const history = useNavigate();
    const [progress, setProgress] = useState(0)
    const [fileName, setFileName] = useState();

    const { AddTeam, loading, error, success } = useTeam()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const x = await AddTeam(
            nameRef.current.value,
            addressRef.current.value,
            roleRef.current.value,
            fbRef.current.value ? fbRef.current.value : "",
            mailRef.current.value ? mailRef.current.value : "",
            filedRef.current.files[0]

        )
        if (success === "Successfully uploaded") {
            formRef.current.reset();
        }
    }

    const upload = (e) => {
        try {
            imageobj = e.target.files[0];
            //uploadFiles("wa4vBDnXjh3JBxPv35rg")
        }
        catch (e) {

        }
    }


    return <div>
        <Container className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: '500px' }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>
                            <Alert variant="danger"> Add team  member</Alert>
                        </h2>
                        {/* {currentUser && currentUser.email} */}
                        {error && <Alert variant='danger'>{
                            error
                        }</Alert>}
                        {success && <Alert variant='primary'>{
                            success
                        }</Alert>}
                        <Form ref={formRef} onSubmit={handleSubmit}>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label><strong>Name</strong></Form.Label>
                                <Form.Control type="text" onChange={(event) => { }} ref={nameRef} required />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label><strong>Role ( 15 word )</strong></Form.Label>
                                <Form.Control type="text" onChange={(event) => { }} ref={roleRef} required maxLength="15" />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label><strong>Address (25 word) </strong></Form.Label>
                                <Form.Control type="text" onChange={(event) => { }} ref={addressRef} required maxLength="25" />
                            </Form.Group>



                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label><strong>Facebook link #</strong></Form.Label>
                                <Form.Control type="text" onChange={(event) => { }} ref={fbRef} />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label><strong>Email link #</strong></Form.Label>
                                <Form.Control type="text" onChange={(event) => { }} ref={mailRef} />
                            </Form.Group>


                            <br></br>
                            {fileName}
                            <Form.Group id="File">
                                <Form.Label>   <strong>  Upload Image</strong>  </Form.Label>
                                <Form.Control type="file" ref={filedRef} required
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={(e) => upload(e)}
                                />
                            </Form.Group>

                            <br></br><br></br>
                            {loading ? <Alert>  Please wait.... </Alert> :
                                <Button disabled={loading} className='w-100' type="Submit" >
                                    Add
                                </Button >
                            }

                        </Form>
                        {
                            progress && <Alert>  <h3>
                                Image Uploaded {progress} %
                            </h3>
                            </Alert>
                        }
                    </Card.Body>
                </Card>
            </div>
        </Container>
    </div>;
}

export default AddTeam;