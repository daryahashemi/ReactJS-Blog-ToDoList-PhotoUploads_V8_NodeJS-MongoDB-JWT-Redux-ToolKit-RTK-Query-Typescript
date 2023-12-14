import { Link, useLoaderData } from 'react-router-dom'
import { FormEvent } from 'react'

export interface Album {
    _id: string;    
    albumName: string;
    filePath: string[];
    createdAt: string;
    updatedAt: string;
}

export type AllAlbumsState = Album[] | null

const AllAlbumsBody = () => {
    const albums = useLoaderData() as AllAlbumsState

    const handleDeleteAlbum = async (e: FormEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/albums/${id}`, { method: "DELETE" })
            const json = await response.json()
            if(response.ok){
                window.location.href = json.redirect
            } 
            } catch(err: any) {
                console.log(err)
            } 
    }   

    return ( 
        <div>
            <h2>All Albums </h2>
            <div className="col1">
                {albums && albums.length !== 0  &&
                albums.map((album: Album, index) => (
                    <div key={index} className='albumCard'>
                        <Link to={album._id} style={{width: '100%'}}>
                        <div className="post">
                            {album.filePath.length === 0 && 
                                <div className="thumbnail-empty-album" style={{float: 'left'}}>
                                    <span className="image-empty-album">Epmty Album</span>
                                </div>                 
                            }
                            {album.filePath.length !== 0 && 
                            <img 
                                className="thumbnail-image" 
                                src={`/uploads/${album.filePath[0]}`}                                
                            />
                            }
                            <div className="text" style={{marginLeft: '20px', marginTop: '9%'}}>
                                <div style={{fontSize: '18px', marginBottom: '12px'}}><b>{album.albumName}</b></div> 
                                <div id ="participantsNum" className="meta" style={{fontSize: '16px', color: 'cadetblue'}} >{album.filePath.length} photos</div>
                            </div>
                        </div>
                        </Link> 
                        <button 
                        onClick={(e) => handleDeleteAlbum(e, album._id)} 
                        >Delete Album
                        </button>
                    </div>
                ))} 
                {albums && albums.length === 0 &&
                    <div className="post">
                        <p style={{paddingLeft: '20px'}}>There are no album to display...</p>
                    </div>
                } 
            </div>
        </div>
    )
}

export const allalbumsLoader = async ():Promise<AllAlbumsState> => {
    const res = await fetch('/api/albums')
    const data = await res.json()
    console.log(data, 'hhhh')
  
    if (!res.ok) {
      throw Error('Could not fetch the data for that resource.')
    }

    return data
}
 
export default AllAlbumsBody