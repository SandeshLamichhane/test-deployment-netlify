import React from 'react';
import { useContext, useState, useEffect } from 'react'

import { doc, query, collection, getDoc, onSnapshot } from 'firebase/firestore'
import { ref, getStorage, uploadBytesResumable, getDownloadURL, } from "@firebase/storage"
import { auth, db, storage } from '../Firebase'
const NewsContext = React.createContext()



export function useNews() {
    return useContext(NewsContext);
}

export default function NewsProvider({ children }) {

    const [listofNews, setListofNews] = useState([{ news: "" }]);
    const [loading, setLoading] = useState(false);
    const [sahayogurl, setSahayogurl] = useState(null);

    let newssubscription;




    async function LoadAllNews() {
        console.log("All news context")
        try {
            const q = query(collection(db, 'News'))
            newssubscription = onSnapshot(q, (querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data()['active'])
                        items.push(doc.data())
                })
                setListofNews(items);

            })
        }
        catch (e) {
            return e.message;
        }
    }


    useEffect(() => {

        LoadAllNews();
        //cancelling the stream

    }, []);

    const value = { LoadAllNews, listofNews }
    return (
        <NewsContext.Provider value={value}>
            {
                // !loading &&
                children
            }
        </NewsContext.Provider>
    );
}