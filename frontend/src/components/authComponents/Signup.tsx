import { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSignupMutation } from '../../slices/usersApiSlice'
import { login, Auths } from '../../slices/authSlice'
import type { RootState } from '../../store'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isPending, setIsPending] = useState(false) 
  const [errorUsername, setErrorUsername] = useState<string | null>(null)
  const [errorEmail, setErrorEmail] = useState<string | null>(null)
  const [errorPassword, setErrorPassword] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [signupApiCall] = useSignupMutation()
  const { userco } = useSelector((state:RootState) => state.auth)

  useEffect(() => {
    if (userco) {
      navigate('/')
    }
  }, [navigate, userco])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    try {
      const json = await signupApiCall({ username, email, password } as Auths).unwrap()
      console.log(json)

      dispatch(login({ ...json }))
      setUsername('')
      setEmail('')
      setPassword('')
      setErrorUsername('')
      setErrorEmail('')
      setErrorPassword('')
      setIsPending(false)
      navigate('/', {replace: true})
    } catch(err: any) {
      console.log(err.data.email, err.data.password, err.data.username)
      setErrorUsername(err.data.username)
      setErrorEmail(err.data.email)
      setErrorPassword(err.data.password)
      setIsPending(false)
    }
  }

  return ( 
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <h3>Signup</h3>
        <label>Username</label>
        <input 
        type='text' 
        required 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={errorUsername ? 'errorinput' : ''}
        />
        <div className="error">{errorUsername}</div>
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
        {!isPending && <button>Sign up</button>}
        {isPending && <button>Signing up...</button>}
      </form>
    </div>
  )
}
    
export default Signup