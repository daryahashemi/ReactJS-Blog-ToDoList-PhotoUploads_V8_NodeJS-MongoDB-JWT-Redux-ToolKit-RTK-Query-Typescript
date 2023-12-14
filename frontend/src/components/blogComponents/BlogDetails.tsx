import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import HandleBlogEdit from './HandleBlogEdit'
import type { RootState } from '../../store'
import { Blog } from '../blogComponents/AllBlogs'

const BlogDetails = () => {
  const id  = useParams().id
  const blog = useLoaderData() as Blog
  const navigate = useNavigate()
  const [display, setDisplay] = useState(false)
  const [userIsAuthor, setUserIsAuthor] = useState(false)

  const { userco } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    console.log(userco, 'userco')
    if(userco) {
    console.log(blog.author , userco.username) 
     if(blog.author === userco.username) {
      setUserIsAuthor(true)
      }
    } else {
    setUserIsAuthor(false)
    }
  }, [userco, blog.author])

  const handleClickDelete = async () => {
    const response = await fetch('/api/blogs/' + id , {
      method: 'DELETE'
    })
    
    if (response.ok) {
      console.log('Blog successfully deleted.')
      navigate('/') 
    }  
  }

  const openEditForm = (e: MouseEvent<HTMLButtonElement>):void => {
    setDisplay( true )
    const target = e.target as HTMLButtonElement;
    target.className = 'activee'
  }

  return ( 
    <div>
      <h2>Blog Details</h2>
      <div className="blog-details"> 
        <h3>Blog title: {blog.title}</h3>
        <div>Blog author: {blog.author}</div>
        <div>Created at: {blog.createdAt}</div>
        <div className="details">
          <p>Blog body: {blog.body}</p>
        </div>
        {userIsAuthor && <button onClick={handleClickDelete}>Delete</button>}
        {userIsAuthor && <button onClick={openEditForm}>Edit</button>}
      </div>
      {display && userIsAuthor && <HandleBlogEdit blog={ blog } />}
    </div>
  )
}

export const blogdetailsLoader = async (a: unknown):Promise<Blog> => {
  const { id } = (a as {params:{id:string}}).params 
  const res = await fetch('/api/blogs/' + id)
  const data = await res.json()  

  if (!res.ok) {
      throw Error('Could not fetch the data for that resource.')
  }
  return data
}
 
export default BlogDetails