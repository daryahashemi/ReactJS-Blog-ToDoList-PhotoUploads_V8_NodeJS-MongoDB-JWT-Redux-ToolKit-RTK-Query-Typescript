import { NavLink, Outlet } from 'react-router-dom'

const HelpLayout = () => {
  return ( 
    <div className="help-layout">
      <h2>Help</h2>
      <p>Got a question? Check our FAQs or Contact us. </p>
      <nav>
        <NavLink to='faq'>FAQ</NavLink>
        <NavLink to='contact'>Contact Us</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}
 
export default HelpLayout