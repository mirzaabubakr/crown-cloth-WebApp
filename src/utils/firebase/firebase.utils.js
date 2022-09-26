import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  // signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDTptgxC8XqJpPg6LFVH2gnT3xBFpuzSnM",
  authDomain: "crown-cloth-db-8c9c1.firebaseapp.com",
  projectId: "crown-cloth-db-8c9c1",
  storageBucket: "crown-cloth-db-8c9c1.appspot.com",
  messagingSenderId: "731543787859",
  appId: "1:731543787859:web:cd852601852a1e2ebde9a6",
}

// Initialize Firebase
initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const addCollectionsAndDocuments = async (
  collectionKey,
  objectToAdd
) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log("Done")
}

export const getCollectionsAndDocuments = async () => {
  const collectionRef = collection(db, "cetegories")
  const q = query(collectionRef)

  const querySnapShot = await getDocs(q)
  const cetegoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return cetegoryMap
}

export const getUserDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return

  const userRef = doc(db, "user", userAuth.uid)
  console.log(userRef)

  const userSnapshot = await getDoc(userRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const creatAt = new Date()

    try {
      await setDoc(userRef, {
        displayName,
        email,
        creatAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log("Error Created", error.message)
    }
  }

  return userRef
}

export const createAuthUserWithEmailandPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const SignInAuthUserWithEmailandPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListner = (callback) =>
  onAuthStateChanged(auth, callback)
