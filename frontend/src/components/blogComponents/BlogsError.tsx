import { useRouteError } from 'react-router-dom'

const BlogsError = () => {
  const error:any = useRouteError()

  if(error.message.includes('Unexpected token')) {
    error.message = 'Something went wrong! Failed to fetch.'
  }

  return (
    <div className="blogs-error">
      <h2>Error</h2>
      <p>{error.message}</p>
    </div>
  )
}
 
export default BlogsError