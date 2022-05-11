import { async } from "@firebase/util"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth"

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDTptgxC8XqJpPg6LFVH2gnT3xBFpuzSnM",
  authDomain: "crown-cloth-db-8c9c1.firebaseapp.com",
  projectId: "crown-cloth-db-8c9c1",
  storageBucket: "crown-cloth-db-8c9c1.appspot.com",
  messagingSenderId: "731543787859",
  appId: "1:731543787859:web:cd852601852a1e2ebde9a6",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const getUserDocFromAuth = async (userAuth) => {
  const userRef = doc(db, "user", userAuth.uid)
  console.log(userRef)

  const userSnapshot = await getDoc(userRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const creatAt = new Date()

    try {
      await setDoc(userRef, { displayName, email, creatAt })
    } catch (error) {
      console.log("Error Created", error.message)
    }
  }

  return userRef
}
