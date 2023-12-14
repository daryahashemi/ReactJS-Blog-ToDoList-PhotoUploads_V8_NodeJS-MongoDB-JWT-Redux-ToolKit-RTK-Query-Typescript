import { useState, FormEvent } from 'react'
import { useForgetPassEmailMutation } from '../../slices/usersApiSlice'
import { useResetPassMutation } from '../../slices/usersApiSlice'

const ForgetPass = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  const [msg, setMsg] = useState('')

  const [isPendinge, setIsPendinge] = useState(false)  
  const [isPendingp, setIsPendingp] = useState(false)  
  const [errorEmail, setErrorEmail] = useState<string | null>(null)
  const [errorPassword, setErrorPassword] = useState<string | null>(null)
  const [resetDone, setResetDone] = useState(false)

  const [forgetPassEmailApiCall] = useForgetPassEmailMutation()
  const [resetPassApiCall] = useResetPassMutation()

  const handleSubmitemail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPendinge(true)

    try {
      const json = await forgetPassEmailApiCall({ email }).unwrap()
      console.log(json)

      setId(json.id)
      setEmail('')
      setPassword('')
      setErrorEmail('')
      setErrorPassword('')
      setIsPendinge(false)
    } catch(err: any) {
      console.log(err.data)

      setErrorEmail(err.data.email)
      setIsPendinge(false)
    }
  }

  const handleSubmitpass = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPendingp(true)
    console.log(id, 'kkkkkkkkk')

    try {
      const json = await resetPassApiCall( { id , password}).unwrap()
      console.log(json)

      setMsg(json.msg)
      setEmail('')
      setPassword('')
      setErrorEmail('')
      setErrorPassword('')
      setIsPendingp(false)
      setResetDone(true)
    } catch(err: any) {
      console.log(err.data)

      setErrorPassword(err.data.password)
      setIsPendingp(false)
      setResetDone(false)
    }
  }

  return ( 
    <div className="forget-password-form">
      {!id && !resetDone && <>
        <h3><span className="material-symbols-outlined">Change_Circle</span>&nbsp;Forgot password?</h3> 
        <form className="confirm-email" onSubmit={handleSubmitemail}>
          <label>Enter your registered email</label>
          <input 
          type='text' 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errorEmail ? 'errorinput' : ''}
          />
        <div className="error">{errorEmail}</div>
          {!isPendinge && <button>Confirm email</button>}
          {isPendinge && <button>Confirming email...</button>}
        </form>
      </> }
      {id && !resetDone && <>
        <form className='reset-password' onSubmit={handleSubmitpass}>
        <label>Enter your new password</label>
        <input 
        type='password' 
        required 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={errorPassword ? 'errorinput' : ''}
        />
        <div className="error">{errorPassword}</div>
        {!isPendingp && <button>Password reset</button>}
        {isPendingp && <button>Password resetting...</button>}
        </form>
      </> }
      {resetDone && 
      <div className="password-reset-done">
        <span className="material-symbols-outlined">Done</span>&nbsp; 
        {msg}<br/><span className='continue' style={{marginLeft: '28px'}}>Log in to continue. </span></div>
      }
    </div>
  )
}
    
export default ForgetPass