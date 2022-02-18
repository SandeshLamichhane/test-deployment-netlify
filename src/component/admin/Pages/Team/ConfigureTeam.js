import React from 'react';
import { Form, Button, Card, Alert, Table, Modal, Container } from 'react-bootstrap'
import { useTeam } from '../../../../contexts/TeamContext'
import ReactPaginate from 'react-paginate';
import { auth, db, storage } from '../../../../Firebase'
import { useEffect, useState, useRef } from 'react';
import { doc, getDoc, getDocs, query, updateDoc, collection, onSnapshot } from 'firebase/firestore'




export default function ConfigureTeam() {

    const { AddTeam, loading, error, success, data, deleteTeam, initState } = useTeam();
    let i = 1

    const [pageNumber, setPageNumber] = useState(0);
    const [showdeleteModal, setDeleteModal] = useState(false);
    const [showdeleteModalName, setDeleteModalName] = useState();
    const [showdeleteModaldociD, setDeleteModalId] = useState();
    const userPerPage = 20;
    const pagesVisited = pageNumber * userPerPage;
    function handleShow(name, docid) {
        //show modal and ask user todelete
        initState()
        setDeleteModal(true);
        setDeleteModalName(name);
        setDeleteModalId(docid);
    }
    const pageCount = Math.ceil(data.length / userPerPage)
    const displayUsers = data.
        slice(pagesVisited, pagesVisited + userPerPage).map(
            dev => {
                return (<tr key={i++} >

                    <td className='news-class' >
                        <div >  {dev.name}
                        </div>
                    </td>

                    <td >
                        {dev.address}
                    </td>

                    <td >
                        {dev.role}
                    </td>
                    <td >
                        <a href={dev.imageurl} target="_blank" >View Image </a>
                    </td>
                    <td >
                        <a href={dev.fburl}>Facebook link</a>

                    </td>
                    <td >
                        {dev.mailurl}
                    </td>


                    <td >
                        <Button
                            className="danger"
                            onClick={() => handleShow(dev && dev.name, dev && dev.docId)}
                        >
                            [Delete]</Button>

                    </td>
                    <td >
                        {


                     /* <TextTruncate line={1} element="span" truncateText="…" text={dev.news} textTruncateChild={<a href="#"></a>} /> */}

                    </td>
                </tr>
                );
            }
        )

    return <div>
        {error && <Alert variant='danger'>{
            error
        }</Alert>}
        <Table striped bordered hover responsive="sm">
            <thead>
                <tr>
                    <th>Name </th>
                    <th>Address</th>
                    <th>Role</th>
                    <th>Image</th>
                    <th>Facebook </th>
                    <th>Mail </th>
                    <th>Delete </th>

                </tr>
            </thead>
            <tbody>
                {displayUsers}
            </tbody>
        </Table >
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            // pageCount={pageCount}
            // onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousbttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
        />


        {//its model for viewing image
        }

        <Modal show={showdeleteModal}
            onHide={() => {
                setDeleteModal(false)
                initState()
            }}
            dialogClassName=""
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Delete
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant='danger'>{
                    error
                }</Alert>}

                <Alert>
                    {
                        showdeleteModalName
                    }
                </Alert>
                <br>
                </br>
                {
                    success ? <Alert variant='danger'>   Success !!!</Alert> : <></>
                }
                {
                    loading ? <Alert>  Please wait.... </Alert>
                        :
                        <Button type="Submit" onClick={() => deleteTeam(showdeleteModaldociD)} variant="outline-primary">Delete</Button>
                }



            </Modal.Body>
        </Modal>

    </div >
}
