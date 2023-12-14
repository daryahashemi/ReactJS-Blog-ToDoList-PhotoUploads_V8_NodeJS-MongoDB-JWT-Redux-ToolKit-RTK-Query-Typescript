import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

// pages import
import AllBlogs, { allblogsLoader } from './components/blogComponents/AllBlogs'
import BlogDetails, { blogdetailsLoader } from './components/blogComponents/BlogDetails'
import BlogsError from './components/blogComponents/BlogsError'
import ToDoList from './components/todoComponents/ToDoList'
import NewBlog from './components/blogComponents/NewBlog'
import AllAlbums from './components/albumComponents/AllAlbums'
import { allalbumsLoader } from './components/albumComponents/AllAlbumsBody'
import AlbumDetails from './components/albumComponents/AlbumDetails'
import { albumDetailsLoader } from './components/albumComponents/AlbumDetailsBody'
import AlbumsError from './components/albumComponents/AlbumsError'
import Faq from './components/helpComponents/Faq'
import Contact from './components/helpComponents/Contact'
import NotFound from './components/NotFound'
import SignupLogin from './components/authComponents/SignupLogin'

// layouts import
import RootLayout from './layouts/RootLayout'
import HelpLayout from './layouts/HelpLayout'
import AllBlogsLayout from './layouts/AllBlogsLayout'
import AllAlbumsLayout from './layouts/AllAlbumsLayout'

const router = createBrowserRouter(
  createRoutesFromElements(        
    <Route path='/' element={<RootLayout />}>
      <Route path='/' element={<AllBlogsLayout />} errorElement={<BlogsError />}>
        <Route 
        index 
        element={<AllBlogs />} 
        loader={allblogsLoader} 
        />
        <Route 
        path=':id' 
        element={<BlogDetails />}
        loader={blogdetailsLoader}
        />
      </Route>
      <Route path='create' element={<NewBlog />}  />
      <Route path='todo' element={<ToDoList />} />
      <Route path='/' element={<AllAlbumsLayout />} errorElement={<AlbumsError />} >
        <Route 
        path='album'
        element={<AllAlbums />} 
        loader={allalbumsLoader} 
        />
        <Route 
        path='album/:id' 
        element={<AlbumDetails />} 
        loader={albumDetailsLoader} 
        />
      </Route>
      <Route path='help' element={<HelpLayout />} >
        <Route path='faq' element={<Faq />} />
        <Route path='contact' element={<Contact />} />
      </Route>
      <Route path='signuplogin' element={<SignupLogin />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App