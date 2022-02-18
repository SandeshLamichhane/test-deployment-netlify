import React, { useContext, useState, useEffect } from 'react'
import { auth, db, storage } from '../Firebase'
import { ref, getStorage, uploadBytesResumable, getDownloadURL, deleteObject } from "@firebase/storage"

import {
    getAuth, createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword, sendPasswordResetEmail,
    updateEmail, updatePassword
} from 'firebase/auth'

import "firebase/auth"
import { collection, addDoc, getDoc, setDoc, doc, Timestamp, updateDoc, onSnapshot, query } from 'firebase/firestore'



const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([{ name: "" }]);
    const [mydata, setMytData] = useState([{ username: "" }]);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [pfloading, setpfLoading] = useState(false)

    async function initState() {
        setSuccess(false);
        setError();
        setLoading(false)
    }

    //sign up ...
    async function signup(email, password) {
        try {
            const ref = await createUserWithEmailAndPassword(auth, email, password);
            const user = ref.user;
            return addUsertodb(user.uid, email)
        }
        catch (e) {
            return e.message;
        }
    }

    //update email
    function updateEmail(email) {
        return updateEmail(auth, email)
    }

    //update password
    function updatePassword(password) {
        return updatePassword(auth, password)

    }
    // login //
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function logout() {
        return signOut(auth)
    }
    function resetPassword(myemail) {

        return sendPasswordResetEmail(auth, myemail)
    }
    // this is the function mainly used to add user to the database
    //get all user 
    async function getData() {

        try {
            const q = query(collection(db, 'UserInfo'))
            onSnapshot(q, (querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data())
                })
                setData(items);

            })
        }
        catch (e) {
            console.log(e.message)
        }
    }

    //get the cureen use info
    async function getCurrentUserInfo() {
        setSuccess(false)
        setpfLoading(false)
        setError('')

        try {
            const docRef = doc(db, "UserInfo", currentUser.uid);
            const docSnap = await getDoc(docRef)
            if (docSnap) {
                setMytData(docSnap.data());
            }
            console.log("Dcoument data", mydata)
            //not wait get the data
        } catch (e) {
            console.log(e.message);
        }
    }


    ////////////////////////////////////////
    async function addUsertodb(uid, email) {
        //insert try catch
        try {
            await setDoc(doc(db, 'UserInfo', uid), {
                uid: uid,
                username: "",
                email: email,
                role: "user",
                status: "active",
                created: Timestamp.now()
            })
            return "Successfull";
        } catch (err) {
            return err.message;
        }

    }

    //on the auth state change event

    async function updateRole(docid, role) {
        // 
        try {
            setSuccess(false)
            setError("");
            await updateDoc(doc(db, "UserInfo", docid),
                {
                    role: role
                })
            setSuccess(true)
        }
        catch (e) {
            setError(e.message)
            setLoading(false)
        }
    }

    async function updateUserProfile(name, phone, address, naag, docid) {
        try {
            setSuccess(false)
            setpfLoading(true)
            setError("");
            if (!name) {
                setError("Name required")
                return;
            }

            const storageRef = ref(storage, "/Naag/" + docid);
            const uploadTask = uploadBytesResumable(storageRef, naag);
            uploadTask.on("state_changed",
                (snapshot) => {
                    const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    // setProgress(prog)
                },
                (err) => console.log(err),
                async () => {
                    getDownloadURL(uploadTask.snapshot.ref).
                        then(async (url) => {
                            await updateDoc(doc(db, "UserInfo", docid),
                                {
                                    username: name,
                                    phone: phone,
                                    address: address,
                                    naagurl: url
                                })
                            setSuccess(true)
                            setpfLoading(false)
                        })
                }
            );
        }
        catch (e) {
            setError(e.message)
            setpfLoading(false)
        }
    }


    ///here is the function to  upload the naagarikata...

    useEffect(() => {
        //if  only adminn get data will run if not donot run
        if (localStorage.getItem("role") === "admin")
            getData();
        //second if there is a uid then load the 

        if (currentUser) {
            getCurrentUserInfo()
        }
        const unsubscirbe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        });
        return unsubscirbe();
    }, []);


    const value = {
        currentUser,
        pfloading,
        getData,
        data, signup, login,
        updateRole, error, initState, updateUserProfile, mydata,
        getCurrentUserInfo,
        loading, success, logout,
        resetPassword, updateEmail,
        updatePassword, addUsertodb
    }

    return (
        <AuthContext.Provider value={value}>
            {
                !loading &&
                children
            }
        </AuthContext.Provider>
    );
}
