import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { Blog } from '../blogComponents/AllBlogs'

const HandleBlogEdit = ({ blog }: {blog:Blog}) => {
  const [title, setTitle] = useState(blog.title)
  const [body, setBody] = useState(blog.body)
  const navigate = useNavigate()
  const id = blog._id
  const { userco } = useSelector((state:RootState) => state.auth)

  const handleClickEdit = async (e: FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault()

    if(userco) {
      const editedItems = { title, body }
      const patchOptions = {
        method: 'PATCH',
        body: JSON.stringify(editedItems),
        headers: {
          'content-type': 'application/json'
        }
      }
    
      const response = await fetch('/api/blogs/' + id, patchOptions)
      // const json = await response.json()
      
      if (response.ok) {
        console.log('Blog successfully edited.')
        navigate('/'+id) 
      }
    } else {
      throw Error('User is not valid. Request is not authorized')
    }
  }

  return ( 
    <div>
      <h3 style={{marginLeft: "60px"}}>Edit the Blog</h3>
      <form onSubmit={handleClickEdit} className="edit-form">
        <label>Blog title:</label>
        <input 
        type="text" 
        required 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button>Edit Blog</button>
      </form>
    </div>
  )
}
 
export default HandleBlogEdit