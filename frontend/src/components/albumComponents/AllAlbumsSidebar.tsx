import { useState, FormEvent } from 'react'

const AllAlbumsSidebar = () => {
    const [albumName, setAlbumName] = useState('')

    const handleCreate = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
    
        let doc = {
            albumName: albumName
        }
        
        try {
        const response = await fetch('/api/albums/create', {
                                    method: "POST",
                                    body: JSON.stringify(doc),
                                    headers: {"Content-Type": "application/json"}
                                })
        const json = await response.json()
        if(response.ok){
            setAlbumName('')
            window.location.href = json.redirect
        } 
        } catch(err:any) {
            console.log(err)
        } 
    }
    
    return ( 
        <div>
            <h2>Create a New Album </h2>
            <form className="album-form" style={{paddingTop: '20px'}}>
                <label>New album name</label>
                <input 
                type="text" 
                required
                placeholder="Enter Album Name..." 
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                />
                <button onClick={handleCreate}>Create</button>
            </form>
        </div>
     )
}
 
export default AllAlbumsSidebar