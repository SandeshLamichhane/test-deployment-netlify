import React from 'react';
import { useContext, useState, useEffect } from 'react'

import { doc, query, collection, onSnapshot } from 'firebase/firestore'
import { ref, getStorage, uploadBytesResumable, getDownloadURL, } from "@firebase/storage"

import { auth, db, storage } from '../Firebase'


const NewsContext = React.createContext()
export function useNews() {
    return useContext(NewsContext);
}

export default function NewsProvider({ children }) {

    const [listofNews, setListofNews] = useState([{ news: "sajsahb" }]);
    const [loading, setLoading] = useState(false);

    async function LoadAllNews() {
        console.log("All news context")
        try {
            const q = query(collection(db, 'News'))
            onSnapshot(q, (querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {

                    //  if (doc.data()['active'])
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

        LoadAllNews()
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