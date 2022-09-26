import { Fragment, useContext } from "react"
import { CategoriesContext } from "../../../context/categories.context"
import CategoryPreview from "../../category-preview/category-preview.component"


const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext)
    return(
        <Fragment>
        {Object.keys(categoriesMap).map((title)=>{
            const product = categoriesMap[title] 
            return(
                <CategoryPreview key={title} title={title} products={product}/>
            )
        }
        )}    
        </Fragment>
    )
}

export default CategoriesPreview