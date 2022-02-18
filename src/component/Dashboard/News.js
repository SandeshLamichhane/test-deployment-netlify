import React, { useState } from 'react'
import Aadhiimage from '../../images/Adh.png'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'
import './News.css'
import { Container, Card, Modal, Alert } from 'react-bootstrap'
import { Breadcrumb, BreadcrumbItem, Pagination } from "react-bootstrap"
import { useNews } from '../../contexts/NewsContext';
import ReactPaginate from 'react-paginate';


export default function News() {
    let mykey = 0;

    const [pageNumber, setPageNumber] = useState(0)

    const [showmodal, setShowModal] = useState(false);
    const [modalImagrurl, setImageUrl] = useState();

    const [modalnews, setModalNews] = useState();


    const userPerPage = 6;

    const pagesVisited = pageNumber * userPerPage;


    const { listofNews } = useNews()

    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
        //  i = selected
    }

    function displayModal(url, news) {

        setShowModal(true)
        console.log(url + news)
        setModalNews(news);
        setImageUrl(url);

    }

    const pageCount = Math.ceil(listofNews.length / userPerPage)
    const displayAllNews = listofNews.
        slice(pagesVisited, pagesVisited + userPerPage).map(
            dev => {

                return (


                    <Col xs={12} sm={12} md={4} lg={4} className="mt-3" >
                        <Card className="bg-gray-800" onClick={() => displayModal(dev && dev.imageUrl, dev && dev.news)}>

                            <Card.Img variant="top" className="img-rounded" src={dev && dev.imageUrl} />
                            <Card.Body className="CardFooter">

                                <Card.Text >
                                    {dev && dev.news}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="CardFooter">
                                <small className="text-muted"> Date:  {dev && new Date(dev?.timestamp?.seconds * 1000).toLocaleDateString('en-US')}</small>
                            </Card.Footer>
                        </Card>
                    </Col >
                );
            });



    return (
        <div className='bg-gray-800'
        >
            <Container fluid className="bg-gray-800">
                <Card className="bg-gray-800">

                    <h4 className="mb-3 text-center p-4 bg-gray-800 "> हाम्रा कार्यक्रमहरु</h4>
                    <Card.Body className="bg-gray-800">

                        <Row>
                            {
                                displayAllNews

                            }
                        </Row>





                    </Card.Body>
                    <Card.Footer className="bg-gray-800 CardFooter">
                        <br></br>
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

                    </Card.Footer>
                </Card>

            </Container>



            <Modal
                show={showmodal}
                onHide={() => {
                    setShowModal(false)

                }}
                dialogClassName=""
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        व्रिस्तित जानकारी
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>

                    <img src={modalImagrurl} lat="Image" />

                    <br>
                    </br>
                    <Alert>
                        {modalnews}
                    </Alert>
                </Modal.Body>
            </Modal>
        </ div >


    )

}
