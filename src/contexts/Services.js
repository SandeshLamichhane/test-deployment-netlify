
import { auth, db } from '../Firebase'

const isLoggedIn = () => {
    // auth.onAuthStateChanged(user =>{
    //     if (user) {
    //       // User is signed in.
    //     } else {
    //       // No user is signed in.
    //     }
    //   });
    if (auth.currentUser === null) {
        return true
    } else {
        alert("Login required.")
        return false
    }
}