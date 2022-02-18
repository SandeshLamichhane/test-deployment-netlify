import React, { useEffect, useState, useRef } from 'react';


import "./Configure.css"
import { Form, Table, Button, Col, Card, Alert, Modal, ToggleButton, ListGroup } from 'react-bootstrap'
import { doc, getDoc, getDocs, query, updateDoc, collection, onSnapshot } from 'firebase/firestore'
import { ref, getStorage, uploadBytesResumable, getDownloadURL, } from "@firebase/storage"

import { auth, db, storage } from '../../../../Firebase'
import TextTruncate from 'react-text-truncate'; // recommend
import Toggle from 'react-bootstrap-toggle';
import ReactPaginate from 'react-paginate';

export default function ConfigureNews() {
    let i = 1;

    const [pageNumber, setPageNumber] = useState(0)

    const userPerPage = 5;

    const pagesVisited = pageNumber * userPerPage;

    var imageobj;

    const imagefileref = useRef()
    const imageformRef = useRef();
    const newsformRef = useRef()
    const onchangeNewsRef = useRef();


    const [show, setShow] = useState(false);
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false);
    const [shownews, setshowNews] = useState(false)
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }


    const [data, setData] = useState([{ news: "" }]);
    const [loader, setloader] = useState(true);
    const [modalImagrurl, setImageUrl] = useState();
    const [modalnews, setModalNews] = useState();
    const [onchangeDocId, settempDocid] = useState("null");


    const pageCount = Math.ceil(data.length / userPerPage)
    const displayUsers = data.
        slice(pagesVisited, pagesVisited + userPerPage).map(
            (dev, index) => {

                return (<tr key={i++} >
                    <td className='w-25'>
                        {pagesVisited + i}
                    </td>
                    <td className='news-class' >
                        <div onClick={() => handleNews(dev && dev.news, dev && dev.docId)}>  {dev.news.slice(0, 50) + '...'}
                        </div>
                    </td>
                    <td >
                        {dev && new Date(dev?.timestamp?.seconds * 1000).toLocaleDateString('en-US')}

                    </td>
                    <td >
                        <Button onClick={() => handleShow(dev && dev.imageUrl, dev && dev.docId)}> [View Image]</Button>

                    </td>
                    <td >
                        {
                            dev && dev.active ?
                                <Button variant="dark" onClick={() => mkNActive(dev && dev.docId, false)}>Active </Button>
                                :
                                <Button onClick={() => mkNActive(dev && dev.docId, true)} variant="outline-primary">Dead</Button>

                     /* <TextTruncate line={1} element="span" truncateText="…" text={dev.news} textTruncateChild={<a href="#"></a>} /> */}

                    </td>
                </tr>
                );
            }
        )
    // change page
    const changePage = ({ selected }) => {
        setPageNumber(selected);
        i = selected
    }
    //handle news submit
    const handleNewsSubmit = async (e) => {
        e.preventDefault();
        if (!onchangeNewsRef.current.value) {
            setError("Empty")
            return;
        }
        if (onchangeDocId && onchangeDocId === "null") {
            setError(onchangeDocId)
            return;
        }
        try {
            setLoading(true)
            setSuccess(false)

            await updateDoc(doc(db, "News", onchangeDocId),
                {
                    news: onchangeNewsRef.current.value,

                },


            );
            setLoading(false)
            setSuccess(true)
        } catch (e) {
            setError(e.message)
        }

    }

    //handle image submit
    const handleImageSubmit = async (e) => {

        e.preventDefault()
        console.log(imagefileref.current.files[0])
        if (!imagefileref.current.value) {
            setError("Error on selcting image")
            return;
        };


        if (onchangeDocId && onchangeDocId === "null") {
            setError(onchangeDocId)
            return;
        }
        uploadFiles(onchangeDocId, imagefileref.current.files[0])

    }
    //on file change on image
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
        setLoading(true)
        setSuccess(false)
        try {

            const storageRef = ref(storage, "/files/" + docId);

            const uploadTask = uploadBytesResumable(storageRef, photofile);


            uploadTask.on("state_changed",
                (snapshot) => {
                    const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

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

                    imageformRef.current.reset();
                    setSuccess(true)
                    setLoading(false)


                }
            );
        } catch (e) {
            setError(e)
            setLoading(false)
        }

    }


    async function getData() {
        try {

            // const q = query(collection(db, "News"), where("email", "==", uid));

            // const querySnapshot = await getDocs(q);
            // if (querySnapshot) {
            //     querySnapshot.forEach((doc) => {
            //         console.log(doc.data()['role']);
            //         localStorage.setItem('role', doc.data()['role'])
            //     })
            // }

            // const notesSnapshot = await getDocs(collection(db, "News"));
            // //  const notesList = notesSnapshot.docs.map((doc) =>
            // //   doc.data());
            // //  return notesList;
            // const items = [];
            // notesSnapshot.forEach((doc) => {
            //     items.push(doc.data())

            // })
            // setData(items);
            // i = 0;
            // console.log(items)
            // setloader(false)

            ////this will snapsho the datA
            const q = query(collection(db, 'News'))
            onSnapshot(q, (querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data())

                })
                setData(items);
                // setData(querySnapshot.docs.map(doc => ({

                //     // news: doc.news,
                //     // active: doc.active,
                //     // imageUrl: doc.imageUrl,
                //     // timestamp: doc.timestamp,
                //     // uploadby: doc.uploadby,
                //     // docId: doc.docId
                // })))
            })
        }
        catch (e) {
            return e.message;
        }
    }

    useEffect(() => {
        getData()


    }, []);



    ///////////////////show tje image
    function handleShow(uri, docid) {
        setShow(true)
        setImageUrl(uri)
        settempDocid(docid)
    }

    function handleNews(news, docid) {
        console.log("smannma" + news)
        settempDocid(docid)
        setshowNews(true);
        setModalNews(news);
    }
    async function mkNActive(docid, val) {

        try {
            setError("Please wait...")
            await updateDoc(doc(db, "News", docid),
                {
                    active: val,

                },
                setError("")
            );
        }
        catch (e) {
            setError(e.message)
        }
    }
    // async function deleteNews(docid) {
    //     console.log(docid);
    //     return (
    //         <Modal show="true">
    //             saasa
    //         </Modal>
    //     );

    // }



    function suu(str) {
        return str.length > 50 ? str.substring(0, 50) + "..." : str;
    }

    return (
        <div>

            {error && <Alert variant='danger'>{
                error
            }</Alert>}
            <Table striped bordered hover responsive="sm">

                <thead>
                    <tr>
                        <th>#</th>
                        <th  >News </th>
                        <th>Date</th>
                        <th>Image</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody>
                    {displayUsers
                        // data && data.map(dev =>
                        //         <tr key={i++} >

                        //             <td className='w-25'>
                        //                 {i}
                        //             </td>
                        //             <td className='' >
                        //                 {dev.news.slice(0, 50) + '...'}

                        //             </td>
                        //             <td >
                        //                 {dev && new Date(dev?.timestamp?.seconds * 1000).toLocaleDateString('en-US')}

                        //             </td>
                        //             <td >
                        //                 <Button onClick={() => handleShow(dev && dev.imageUrl)}> [View Image]</Button>

                        //             </td>
                        //             <td >
                        //                 {
                        //                     dev && dev.active ?
                        //                         <Button variant="dark" onClick={() => mkNActive(dev && dev.docId, false)}>Active </Button>
                        //                         :
                        //                         <Button onClick={() => mkNActive(dev && dev.docId, true)} variant="outline-primary">Dead</Button>

                        //                  /* <TextTruncate line={1} element="span" truncateText="…" text={dev.news} textTruncateChild={<a href="#"></a>} /> */}

                        //             </td>


                        //         </tr>

                        //     )
                    }

                </tbody>

            </Table >
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousbttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />

            <a href='#' className="floating-btn">
                Load
            </a>
            {//its model for viewing image
            }
            <Modal
                show={show}
                onHide={() => {
                    setError("")
                    setSuccess(false)
                    setShow(false)
                }}
                dialogClassName=""
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Image of the  News
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant='danger'>{
                        error
                    }</Alert>}
                    <img src={modalImagrurl} lat="Image" />
                    <hr>
                    </hr>
                    <strong>
                        <Alert>
                            <Form onSubmit={handleImageSubmit} ref={imageformRef}>
                                <Form.Group id="File">
                                    <Form.Label>   <strong>  Change Image</strong>  </Form.Label>
                                    <Form.Control type="file" required ref={imagefileref}
                                        accept="image/png, image/gif, image/jpeg"
                                        onChange={(e) => upload(e)}
                                    />
                                    <br>
                                    </br>
                                    {
                                        success ? <Alert>   Success !!!</Alert> : <></>
                                    }
                                    {

                                        loading ? <Alert>  Please wait.... </Alert>
                                            :
                                            <Button type="Submit" variant="outline-primary">Save</Button>
                                    }

                                </Form.Group>
                            </Form>
                        </Alert>


                    </strong>
                </Modal.Body>
            </Modal>
            {/* its model for editing news */}
            <Modal
                show={shownews}
                onHide={() => {
                    setError("")
                    setSuccess(false)
                    setShow(false)
                    setshowNews(false)
                }}
                dialogClassName=""
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Edit News of day
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant='danger'>{
                        error
                    }</Alert>}

                    <Form onSubmit={handleNewsSubmit} ref={newsformRef}>
                        <Form.Group controlId="exampleForm.ControlTextarea1" >
                            <Form.Label>   <strong>Description of news</strong>    </Form.Label>
                            <Form.Control as="textarea" rows="4" onChange={(event) => { }}
                                ref={onchangeNewsRef}
                                defaultValue={modalnews} required />
                        </Form.Group>
                        <br>
                        </br>
                        {
                            success ? <Alert>   Success !!!</Alert> : <></>
                        }
                        {
                            loading ? <Alert>  Please wait.... </Alert>
                                :
                                <Button type="Submit" variant="outline-primary">Save</Button>
                        }
                    </Form>


                </Modal.Body>
            </Modal>
        </div >
    );
}
