import AllAlbumsBody from './AllAlbumsBody'
import AllAlbumsSidebar from './AllAlbumsSidebar'

const AllAlbums = () => {
    return ( 
        <div>
            <div className="todo-container">
                <div> 
                    <AllAlbumsSidebar />
                </div>
                <div>
                    <AllAlbumsBody />
                </div>
            </div>
        </div>
     )
}
 
export default AllAlbums