import Login from './Login'
import Signup from './Signup'
import ForgetPass from './ForgetPass'
import DeleteAccount from './DeleteAccount'

const SignupLogin = () => {

  return ( 
    <>
    <div className="signup-login-forget-container">
      <div className="login-forget">
        <Login />
        <ForgetPass />
      </div>   
      <div className="vl">
          <span className="vl-innertext">OR</span>
      </div>
      <div className="signup-delete">
        <Signup />  
        <DeleteAccount />
      </div>   
    </div>

    </>
  )
}
     
export default SignupLogin