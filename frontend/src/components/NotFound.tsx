import { Link } from 'react-router-dom'

const NotFound = () => {
  return ( 
    <div>
      <h2>Page Not Found!</h2>
      <p>Go to <Link to="/">All Blogs</Link>.</p>
    </div>
  )
}
 
export default NotFound