import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const { userco } = useSelector((state: RootState) => state.auth)

  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>):Promise<void> => {
    if(userco) {
      e.preventDefault()
      const blog = { author: userco.username, title, body }
      setIsPending(true)
      
      const response = await fetch('/api/blogs/create', {
        method: 'POST',
        body: JSON.stringify(blog),
        headers: { 
          'Content-Type': 'application/json'
        }
      })
      // const json = await response.json()
      
      if (response.ok) {
        console.log('Blog successfully added')
        setIsPending(false)
        navigate('/') 
      }    
    } else {
      throw Error('User is not valid. Request is not authorized')
    }
    setIsPending(false)
  } 

  return ( 
    <div className="create-form">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
      <label>Blog author</label>
        <input 
        type='text' 
        required 
        value={userco ? userco.username : ''}
        className='author-input'
        readOnly
        />
        <label>Blog title</label>
        <input 
        type='text' 
        required 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body</label>
        <textarea
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
        ></textarea>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button>Adding Blog...</button>}
      </form>
    </div>
  )
}
 
export default NewBlog