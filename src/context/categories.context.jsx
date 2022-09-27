import { createContext, useState, useEffect } from "react";


import { getCollectionsAndDocuments } from '../utils/firebase/firebase.utils'


export const CategoriesContext = createContext({
    categoriesMap : {}
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap,setCategoriesMap] = useState({})

    // useEffect(()=>{
    //     addCollectionsAndDocuments('categories', SHOP_DATA)
    // },[])

    useEffect(()=>{
        const getCetegoriesMap = async () => {
            const cetegoryMap = await getCollectionsAndDocuments()
            setCategoriesMap(cetegoryMap)
        }

        getCetegoriesMap()
    },[])

    const value = {categoriesMap}
    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}