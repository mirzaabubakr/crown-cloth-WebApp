
import './directory-item.styles.scss'

import { useNavigate } from 'react-router-dom'

const DirectoryItem = ({category}) =>{

    const {imageUrl,title, route} = category

    const nevegate = useNavigate()

    const onNavigateHandler = () => nevegate(route)

    return(
        <div className="directory-item-container" onClick={onNavigateHandler}>
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
          <div className="body">
            <h2>{title}</h2>
            <p>SHOP NOW</p>
          </div>
        </div>
    )
}

export default DirectoryItem