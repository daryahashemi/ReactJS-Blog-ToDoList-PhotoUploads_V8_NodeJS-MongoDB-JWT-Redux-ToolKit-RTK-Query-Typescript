import { Link, useLoaderData } from 'react-router-dom'

export interface Blog {
  _id: string;
  author: string;
  title: string;
  body: string;  
  createdAt: string;
  updatedAt: string;
}

export type AllBlogsState = Blog[] | null

const AllBlogs = () => {
  const allblogs= useLoaderData() as AllBlogsState

  return (
    <div>
      <h2>Blogs</h2>
      <div className="allblogs">
        {allblogs && (allblogs.length) && allblogs.map(blog => (
          <Link to={blog._id} key={blog._id}>
            <p>{blog.title}</p>
            <p>By {blog.author}, At {blog.createdAt}</p>
            <p>{ (blog.body).length <= 25
                 ? blog.body
                 : (blog.body).slice(0, 50)}...</p>
          </Link>
        ))}
        {allblogs && (allblogs.length === 0) && <div className='empty-blog'> <h3>No Posts Available!</h3></div>}
      </div>  
    </div>
  )
}

export const allblogsLoader = async ():Promise<AllBlogsState> => {
  const res = await fetch('/api/blogs')
  const data = await res.json()

  if (!res.ok) {
    throw Error('Could not fetch the data for that resource.')
  }
  return data
}
 
export default AllBlogs