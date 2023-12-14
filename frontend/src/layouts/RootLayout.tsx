import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { useState } from 'react'
import { logout } from '../slices/authSlice'
import type { RootState } from '../store'

const RootLayout = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [logoutApiCall] = useLogoutMutation()
  const { userco } = useSelector((state: RootState) => state.auth)

  const handleLogout = async () => {

    try {
      const json = await logoutApiCall().unwrap()
      console.log(json)

      dispatch(logout())
      console.log('You are logged out.')
      if(location.pathname === '/create') {
        navigate('/signuplogin') 
      }
      if(location.pathname.includes('album')) {
        navigate('/signuplogin')
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleNavMenu = () => {
    setToggleMenu(current => !current);
  }

  window.addEventListener("resize", () => {setToggleMenu(false)})
  window.addEventListener("click", (e: any): void => {
    if(e.target.className !== 'menuBtn' && e.target.className !== 'material-symbols-outlined') {
      setToggleMenu(false)
    }    
  })

  return ( 
    <div className="root-layout">
      <header>
        <nav>
          <h1>MyNoteBook</h1>
          <NavLink to="/">All Blogs</NavLink>
          {userco && <NavLink to="create">New Blog</NavLink>}
          {!userco && <Link to="signuplogin">New Blog</Link>}
          {userco && <NavLink to="album">Photo Albums</NavLink>}
          {!userco && <Link to="signuplogin">Photo Albums</Link>}
          <NavLink to="todo">To-Do List</NavLink>
          <NavLink to="help">Help</NavLink>

          <div className='dropdown'>
            <button className='menuBtn' onClick={handleNavMenu}>
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className='dropdown-content' 
            style={{display: toggleMenu ? 'block' : 'none'}}
            >
              <NavLink to="/" >All Blogs</NavLink>
              {userco && <NavLink to="create" >New Blog</NavLink>}
              {!userco && <Link to="signuplogin" >New Blog</Link>}
              {userco && <NavLink to="album" >Photo Albums</NavLink>}
              {!userco && <Link to="signuplogin" >Photo Albums</Link>}
              <NavLink to="todo" >To-Do List</NavLink>
              <NavLink to="help" >Help</NavLink>
            </div>
          </div>
          {!userco && <NavLink to="signuplogin" id='navItemSign'>My Account</NavLink>}
          {userco && <button onClick={handleLogout}>Log out</button>}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
 
export default RootLayout