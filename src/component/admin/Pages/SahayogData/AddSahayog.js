import Sahayog from '../SahayogData/Sahayog.css'
import { Container, Card, Alert } from 'react-bootstrap'
import { useState, useRef } from 'react';
import { auth, db, storage } from '../../../../Firebase'

import { doc, query, setDoc, addDoc, deleteDoc, collection, updateDoc, onSnapshot } from 'firebase/firestore'
import { ref, getStorage, uploadBytesResumable, getDownloadURL, deleteObject } from "@firebase/storage"



import React from 'react'
export default function AddSahayog() {
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfFileError, setPdfFileError] = useState('');
    const [viewPdf, setViewPdf] = useState(null);
    const [loading, setLoading] = useState(false)

    const pdffileRef = useRef()
    //on chnage file event
    const fileType = ['application/pdf'];
    const handlePdfFileChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfFile(e.target.result);
                    setPdfFileError('');

                }
            } else {
                setPdfFile(null);
                setPdfFileError("Please select pdf file")
            }

        } else {

        }


    }
    const handlePdfFilesubmit = async (e) => {
        e.preventDefault();

        if (pdfFile !== null) {
            setViewPdf(pdfFile)
            //now add the data firebase storage 9 
            try {
                setLoading(true)
                await setDoc(doc(db, "sahayog", "pdffile"), {
                    pdfurl: "url"
                })
                const storageRef = ref(storage, "/Sahayog/" + "excel");
                const uploadTask = uploadBytesResumable(storageRef, pdffileRef.current.files[0]);
                uploadTask.on("state_changed",
                    (snapshot) => {
                        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        // setProgress(prog)
                    },
                    (err) => console.log(err),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).
                            then(async (url) => {
                                try {
                                    await setDoc(doc(db, "sahayog", "pdffile"), {
                                        pdfurl: url
                                    })
                                    alert("Successfully Saved")
                                } catch (e) {

                                    alert(e)
                                }

                            })
                        //cleart the for form
                        // formRef.current.reset();

                        setLoading(false)

                    }
                );
            } catch (e) {
                setPdfFileError(e.message)
                setLoading(false)
            }
        } else {
            setViewPdf(null)
        }
    }
    return (
        <div className='container' >
            <br>
            </br>
            <form className="form-group" onSubmit={handlePdfFilesubmit}>
                <input type="file" className='form-control'
                    ref={pdffileRef}
                    required onChange={handlePdfFileChange}
                />
                {
                    pdfFileError && <div className='error-msg'>
                        {pdfFileError}
                    </div>
                }
                <br>
                </br>
                {
                    loading ? <Alert>
                        Please Wait...
                    </Alert> :
                        <button type="submit" className='btn btn-success'>
                            Upload
                        </button>
                }


            </form>
            <br>
            </br>
            <h4>
                View PDF
            </h4>
            <div className='control-section'>

                {/* <PdfViewerComponent id="container"
                    documentPath={{
                        url:"https://s3.amazonaws.com/files2.syncfusion.com/dtsupport/directtrac/general/pd/HTTP_Succinctly-1719682472.pdf" }}
                    serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer" style={{ 'height': '640px' }}>
                    <Inject services={[Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, FormFields, FormDesigner]} />
                </PdfViewerComponent> */}
            </div>
            <div className='pdf-container'>
            </div>
        </div>
    )
}
