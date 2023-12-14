import AlbumDetailsBody from './AlbumDetailsBody'
import AlbumDetailsSidebar from './AlbumDetailsSidebar'

const AlbumDetails = () => {
    return ( 
        <div className="todo-container">
            <div>
                <AlbumDetailsSidebar />
            </div>
            <div>
                <AlbumDetailsBody />
            </div>
        </div>
     )
}
 
export default AlbumDetails