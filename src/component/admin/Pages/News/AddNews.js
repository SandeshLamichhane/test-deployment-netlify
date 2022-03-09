
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import React, { useRef, useState } from "react"
import { useAuth } from '../../../../contexts/AuthContext'
import { auth, db, storage } from '../../../../Firebase'
import { doc, getDoc, addDoc, updateDoc, serverTimestamp, getDocs, collection, query, where } from 'firebase/firestore'
import { ref, getStorage, uploadBytesResumable, getDownloadURL, } from "@firebase/storage"
import { Link, useNavigate } from "react-router-dom"

export default function AddNews() {

    var imageobj;

    const descRef = useRef()
    const passwordRef = useRef()
    const formRef = useRef();

    const { login, currentUser } = useAuth()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [loading, setLoading] = useState(false)
    const history = useNavigate();
    const [progress, setProgress] = useState(0)
    const [fileName, setFileName] = useState();

    const upload = (e) => {
        try {
            imageobj = e.target.files[0];
            //uploadFiles("wa4vBDnXjh3JBxPv35rg")
        }
        catch (e) {
            setError(e)
        }
    }


    const uploadFiles = async (docId, photofile) => {
        if (!docId) {
            setError("Image was provides with null")
            setLoading(false)
            return;
        }
        setProgress('');
        try {
            const storageRef = ref(storage, "/Teams/" + docId);
            const uploadTask = uploadBytesResumable(storageRef, photofile);
            uploadTask.on("state_changed",
                (snapshot) => {
                    const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setProgress(prog)
                },
                (err) => setError(err.message),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).
                        then((url) => {
                            updateDoc(doc(db, "News", docId),
                                {
                                    imageUrl: url,
                                    docId: docId
                                },
                            );

                        })
                    //cleart the for form

                    formRef.current.reset();
                    setSuccess("Successfully uploaded")
                    setLoading(false)


                }
            );
        } catch (e) {
            setError(e)
            setLoading(false)
        }

    }



    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!passwordRef.current.value) {
            setError('Image is empty')
            return;
        };
        if (!descRef.current.value) {
            setError('Description is empty')
            return;
        };
        setError('')
        setProgress('')
        setSuccess('')
        try {
            setLoading(true);
            addDoc(collection(db, "News"), {
                news: descRef.current.value,
                active: false,
                imageUrl: "",
                timestamp: serverTimestamp(),
                uploadby: "",
                docId: ""
            }).then(docum => {
                uploadFiles(docum.id, passwordRef.current.files[0])

            })


            // await login(emailRef.current.value,
            //     passwordRef.current.value);

            // var x = await loaduserStatus(emailRef.current.value)

            //load the current user from firestore
            // history("/");
            // window.location.reload(false);
            //if the login is succeessfull then load the 

        }
        catch (e) {
            setError(e.message)
        }

    }
    return (
        <Container className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: '500px' }}>
                <Card>
                    <Card.Body>

                        <h2 className='text-center mb-4'>

                            <Alert>  Add News of day  </Alert>
                        </h2>
                        {/* {currentUser && currentUser.email} */}

                        {error && <Alert variant='danger'>{
                            error
                        }</Alert>}
                        {success && <Alert variant='primary'>{
                            success
                        }</Alert>}


                        <Form onSubmit={handleSubmit} ref={formRef}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>   <strong>Description of news</strong>    </Form.Label>
                                <Form.Control as="textarea" rows="4" onChange={(event) => { }}
                                    ref={descRef} required />
                            </Form.Group>
                            <br></br>
                            {fileName}
                            <Form.Group id="File">
                                <Form.Label>   <strong>  Upload Image</strong>  </Form.Label>
                                <Form.Control type="file" ref={passwordRef} required
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
    )
}


