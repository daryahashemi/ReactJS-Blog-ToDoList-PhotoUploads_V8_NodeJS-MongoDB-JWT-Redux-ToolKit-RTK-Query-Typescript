import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, useContext, FormEvent, ChangeEvent } from 'react'
import { DataContext, AlbumContext} from '../../context/DataContex'

const AlbumDetailsSidebar = () => {
    const id = useParams().id
    const [getFiles, setGetfiles] = useState<File[]>([])
    // const [getFiles, setGetfiles] = useState<FileList | null >({} as FileList)

    const { openDelete, setOpenDelete, photoSelectedDelete, setPhotoSelectedDelete } = useContext(DataContext) as AlbumContext

    const readFiles = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
    
        const formData = new FormData()    
        for(let i=0; i<getFiles.length;i++) {
            formData.append(getFiles[i].name, getFiles[i])
        }

        const response = await fetch(`/api/albums/uploadfiles/${id}`, {
            method: 'POST',
            body: formData
        })
    
        const json = await response.json()
        window.location.href = json.redirect
    }

    const handleInputFilesUpload = (e: ChangeEvent) => {
        e.preventDefault()
        const uploadedFiles = (e.target as HTMLInputElement).files
        if (uploadedFiles && uploadedFiles.length) {
            // const newFiles: (FileList | null)[] = new Array<FileList | null>()
            // const length = uploadedFiles.length;
            // let i = 0;
            // while (i++ > length) {
            //     newFiles[i] = uploadedFiles.item(i);
            // }
            setGetfiles(() => [...uploadedFiles])
        }
    }

    const handleOpenDelete = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(openDelete) {
            setOpenDelete(false)
        } else {
            setOpenDelete(true)
        }
    }
    const handleDeletePhotos = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        
        try {
            const response = await fetch(`/api/albums/${id}`, {
                method: "PATCH",
                body: JSON.stringify(photoSelectedDelete),
                headers: {"Content-Type": "application/json"}
            })
            const json = await response.json()
            if(response.ok){
                setPhotoSelectedDelete([])
                setOpenDelete(false)
                window.location.href = json.redirect
            } 
        } catch(err:any) {
            console.log(err)
        } 
    }
            
    return ( 
        <div>
            <div className="album-form">
                <form 
                className="form todo-form" 
                id="photouploadform" 
                >
                    <label>New photos upload</label>
                    <input 
                    type='file' 
                    id="photouploadinput" 
                    name="avatar" 
                    multiple 
                    onChange={handleInputFilesUpload}
                    /> 
                    <button  onClick={readFiles}>Submit</button>                        
                </form>   

                <form className="todo-form">
                    <label >Delete photos </label> <br/>                    
                    <button 
                    style={{marginTop:'5px'}}
                    onClick={handleOpenDelete}
                    >                 
                        <img 
                        className="trashcan" 
                        src="/icons8-müll-50.png" 
                        style={{verticalAlign: 'middle', marginRight:'6px'}}
                        width="25" height="25"/> 
                        {!openDelete ? 
                        <span>Delete Photos</span> :
                        <span>Cancel Delete</span>
                        }
                    </button>
                    {openDelete && <button                     
                    onClick={handleDeletePhotos}
                    >Delete Photos</button>}
                </form>

                <div style={{marginTop: '20px'}}>  Go to <Link to="/album" style={{textDecoration: 'underline'}}> All Albums </Link></div>

            </div>
        </div>
     )
}
 
export default AlbumDetailsSidebar