import React from 'react';
import { useContext, useState, useEffect } from 'react'

import { doc, query, addDoc, deleteDoc, getDoc, collection, updateDoc, onSnapshot } from 'firebase/firestore'
import { ref, getStorage, uploadBytesResumable, getDownloadURL, deleteObject } from "@firebase/storage"

import { auth, db, storage } from '../Firebase'

import { useAuth } from './AuthContext';
const VerifyContext = React.createContext()
export function useVerify() {
    return useContext(VerifyContext);
}

export default function VerifyProvider({ children }) {
    const [isamAdmin, setIsamAdmin] = useState(false);
    const { currentUser } = useAuth();


    async function isUserAdmin() {
        console.log("  iam also here...")

        console.log("  iam also here...in curent user")

        try {
            const docRef = doc(db, "UserInfo", currentUser.uid);
            const docSnap = await getDoc(docRef)
            if (docSnap) {
                setIsamAdmin(docSnap.data()['role'] == "admin" ? true : false);
                console.log("iam inside the verify context" + currentUser.uid + isamAdmin + docSnap.data()['role'])
            }

            //not wait get the data
        } catch (e) {
            console.log(e.message);
        }

    }


    const value = { isamAdmin, isUserAdmin }

    useEffect(() => {
        //if  only adminn get data will run if not donot run
        // isUserAdmin()
    }, []);

    return (
        <VerifyContext.Provider value={value}>
            {
                // !loading &&
                children
            }
        </VerifyContext.Provider>
    );
}