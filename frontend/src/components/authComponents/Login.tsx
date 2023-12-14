import { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../slices/usersApiSlice'
import { login } from '../../slices/authSlice'
import type { RootState } from '../../store'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isPending, setIsPending] = useState(false) 
  const [errorEmail, setErrorEmail] = useState<string | null>(null)
  const [errorPassword, setErrorPassword] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loginApiCall] = useLoginMutation()
  const { userco } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (userco) {
      navigate('/')
    }
  }, [navigate, userco])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    try {
      const json = await loginApiCall({ email, password }).unwrap()
      console.log(json)

      dispatch(login({ ...json }))
      setEmail('')
      setPassword('')
      setErrorEmail('')
      setErrorPassword('')
      setIsPending(false)
      navigate('/', {replace: true})
    } catch(err: any) {
      console.log(err.data)

      setErrorEmail(err.data.email)
      setErrorPassword(err.data.password)
      setIsPending(false)
    }

  }

  return ( 
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Email</label>
        <input 
        type='text' 
        required 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={errorEmail ? 'errorinput' : ''}
        />
        <div className="error">{errorEmail}</div>
        <label>Password</label>
        <input 
        type='password' 
        required 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={errorPassword ? 'errorinput' : ''}
        />            
        <div className="error">{errorPassword}</div>
        {!isPending && <button>Log in</button>}
        {isPending && <button>Logging in...</button>}
      </form>
    </div>
  )
}
    
export default Login