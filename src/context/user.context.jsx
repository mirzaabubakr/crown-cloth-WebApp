import { createContext,useState , useEffect } from "react";


import { onAuthStateChangedListner, getUserDocFromAuth } from "../utils/firebase/firebase.utils";

// as actual value you want to access
export const UserContext = createContext({
    currentUser : null,
    setCurrentUser : () => null
})

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser,setCurrentUser}


    useEffect(()=>{
        const unSubscribe = onAuthStateChangedListner((user)=>{
        if(user){
            getUserDocFromAuth(user)
        }
        setCurrentUser(user)
        })

        return unSubscribe
    },[])

    return<UserContext.Provider value={value}>{children}</UserContext.Provider>
}