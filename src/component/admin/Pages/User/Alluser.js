import React from 'react';
import { Form, Button, Card, Alert, Table, Modal, Container } from 'react-bootstrap'
import ReactPaginate from 'react-paginate';

import { useAuth } from '../../../../contexts/AuthContext'
import { useEffect, useState, useRef } from 'react';
import './Alluser.css';


export default function Alluser() {
    const { data, error, updateRole, getData, initState, loading, success, } = useAuth()
    const [pageNumber, setPageNumber] = useState(0);
    const [modalRole, setModalRole] = useState(false);
    const [activeRole, setActiveRole] = useState()
    const [activeDocId, setActiveId] = useState()
    let i = 1;
    const userPerPage = 5;

    const pagesVisited = pageNumber * userPerPage;
    const pageCount = Math.ceil(data.length < 1 ? 1 : data.length / userPerPage)

    useEffect(() => {
        getData();

    }, [getData])

    const changeRole = (role, uid) => {
        initState();
        setModalRole(true)
        setActiveRole(role)
        setActiveId(uid)
        //clear the error and success

    }
    const upRole = () => {
        console.log(activeDocId, activeRole)
        updateRole(activeDocId, activeRole)
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
        i = selected
    }

    const displayUsers = data.
        slice(pagesVisited, pagesVisited + userPerPage).map(
            dev => {
                return (<tr key={i++} >
                    <td>
                        {pagesVisited + i}
                    </td>

                    <td className='news-class' >
                        <div >
                            {dev.email}
                        </div>
                    </td>

                    <td >
                        {dev.username ? dev.username : "###"}
                    </td>

                    <td >
                        {dev.phone ? dev.phone : "###"}
                    </td>


                    <td >
                        <strong>{dev.status}</strong>
                    </td>
                    <td >
                        <Button
                            onClick={() => {
                                changeRole(dev.role, dev.uid)
                            }}
                            variant="outline-primary">
                            {
                                dev.role
                            }
                        </Button>

                    </td>
                    <td >
                        <p>
                            {
                                dev.address ? dev.address : "####"
                            }
                        </p>
                    </td>
                    <td >

                        {dev.naagurl ? <a href={dev.naagurl} target="_blank">
                            [View Image]
                        </a> : "###"
                        }
                    </td>
                    <td >
                    </td>
                    <td >
                        {


                 /* <TextTruncate line={1} element="span" truncateText="…" text={dev.news} textTruncateChild={<a href="#"></a>} /> */}

                    </td>
                </tr>
                );
            }
        )

    return (
        <div>

            <Table striped bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th>SN </th>
                        <th>Email </th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Role </th>
                        <th>Address </th>
                        <th>Photo </th>

                    </tr>
                </thead>
                <tbody>{
                    displayUsers
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



            <Modal
                show={modalRole}
                onHide={() => {
                    setModalRole(false)
                }}
                aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Change Role of user
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant='danger'>{
                        error
                    }</Alert>}




                    <div className="radio">
                        <label>
                            <input type="radio" name="user" value="user"
                                onChange={e => setActiveRole(e.target.value)}
                                checked={activeRole && activeRole == "user" ? true : false} />
                            User
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" name="user" value="moderator"
                                onChange={e => setActiveRole(e.target.value)}
                                checked={activeRole && activeRole == "moderator" ? true : false} />
                            Moderator
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" name="user"
                                onChange={e => setActiveRole(e.target.value)}
                                value="admin" checked={activeRole && activeRole == "admin" ? true : false} />
                            Admin
                        </label>
                    </div>

                    <br>
                    </br>
                    {
                        success ? <Alert variant='danger'> Success</Alert> : <></>
                    }
                    {
                        loading ? <Alert>  Please wait.... </Alert>
                            :
                            <Button onClick={() => updateRole(activeDocId, activeRole)}
                                variant="outline-primary">
                                Save
                            </Button>

                    }
                </Modal.Body>
            </Modal>

        </div >
    )

}
