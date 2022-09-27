import { useParams } from "react-router-dom"
import { Fragment, useState} from "react"
import { useContext } from "react"
import { CategoriesContext } from "../../../context/categories.context"
import ProductCard from "../../product-card/product-card.component"

import "./category.style.scss"
import { useEffect } from "react"

const Category = () => {

  const { category } = useParams()
  const { categoriesMap } = useContext(CategoriesContext)

  const [products, setProdects] = useState(categoriesMap[category])

  useEffect(()=>{
    setProdects(categoriesMap[category])
  },[category,categoriesMap])
  
  return(
    <Fragment>
      <h2 className="title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {
          products && products.map((product)=> <ProductCard key={product.id} product={product}/>)
        }
      </div>
    </Fragment>
    
  )

}

export default Category