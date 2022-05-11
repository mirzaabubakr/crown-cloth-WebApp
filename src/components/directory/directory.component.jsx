import CategoryItem from "../category-item/category.component"
import '../directory/directory.style.scss'

const Directory = ({categories}) => {
return(
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
)
}

export default Directory