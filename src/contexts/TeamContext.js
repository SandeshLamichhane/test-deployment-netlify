import React from 'react';
import { useContext, useState, useEffect } from 'react'

import { doc, query, addDoc, deleteDoc, collection, updateDoc, onSnapshot } from 'firebase/firestore'
import { ref, getStorage, uploadBytesResumable, getDownloadURL, deleteObject } from "@firebase/storage"

import { auth, db, storage } from '../Firebase'


const TeamContext = React.createContext()
export function useTeam() {
    return useContext(TeamContext);
}

export default function TeamProvider({ children }) {
    const [listofNews, setListofNews] = useState([{ news: "sajsahb" }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [data, setData] = useState([{ name: "" }]);


    async function initState() {
        setLoading(false)
        setSuccess('')
        setError('')

    }

    async function AddTeam(name, address, role, fburl, mailurl, imageurl) {
        setLoading(true)
        setSuccess('')
        setError('')
        try {
            console.log("controlis here");
            await addDoc(collection(db, "Teams"), {
                docId: "",
                name: name,
                address: address,
                role: role,
                imageurl: "",
                mailurl: mailurl,
                fburl: fburl
            }).then(docum => {
                console.log(docum.id)
                uploadFiles(docum.id, imageurl)

                //insert image here
            })
        }
        catch (e) {

            setError(e.message)
            setLoading(false)
        }
    }

    ///lets have a function to upload image file
    const uploadFiles = async (docId, photofile) => {
        if (!docId) {
            setError("Doc id is null");
        }
        setLoading(true)
        setSuccess('')
        setError('')
        try {
            const storageRef = ref(storage, "/Teams/" + docId);
            const uploadTask = uploadBytesResumable(storageRef, photofile);
            uploadTask.on("state_changed",
                (snapshot) => {
                    const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    // setProgress(prog)
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).
                        then((url) => {
                            updateDoc(doc(db, "Teams", docId),
                                {
                                    imageurl: url,
                                    docId: docId
                                },
                            );

                        })
                    //cleart the for form
                    // formRef.current.reset();
                    setSuccess("Successfully uploaded")
                    setLoading(false)


                }
            );
        } catch (e) {
            setError(e.message)
        }

    }
    async function deleteTeam(docId) {

        try {
            setLoading(true);

            const desertRef = ref(storage, 'Teams/' + docId);

            // Delete the file
            deleteObject(desertRef).then(() => {
                deleteDoc(doc(db, "Teams", docId),).then(() => {
                    setLoading(false)
                    setSuccess("Deleted")
                })
            }).catch((error) => {
                setError(error.message)
            });



        }
        catch (e) {
            setLoading(false)
            setError(e.message)

        }
    }

    useEffect(() => {

        getData()
    }, []);


    async function getData() {
        try {
            const q = query(collection(db, 'Teams'))
            onSnapshot(q, (querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data())
                })
                setData(items);
            })
        }
        catch (e) {
            return e.message;
        }
    }

    const value = { AddTeam, loading, error, success, data, deleteTeam, initState }
    return (
        <TeamContext.Provider value={value}>
            {
                // !loading &&
                children
            }
        </TeamContext.Provider>
    );
}