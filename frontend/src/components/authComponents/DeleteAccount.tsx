import { useState, FormEvent } from 'react'
import { useDeleteAccountMutation } from '../../slices/usersApiSlice'

const DeleteAccount = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorEmail, setErrorEmail] = useState<string | null>(null)
    const [errorPassword, setErrorPassword] = useState<string | null>(null)

    const [isPending, setIsPending] = useState(false) 
    const [msg, setMsg] = useState('')

    const [deleteAccountApiCall] = useDeleteAccountMutation()

    const handleDeleteAccount = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsPending(true)

        try {
          const json = await deleteAccountApiCall({ email, password }).unwrap()
          console.log(json)
    
          setEmail('')
          setPassword('')
          setErrorEmail('')
          setErrorPassword('')
          setIsPending(false)
          setMsg(json.msg)
        } catch(err: any) {
          console.log(err.data)
    
          setErrorEmail(err.data.email)
          setErrorPassword(err.data.password)
          setIsPending(false)
          setMsg('')
        }
      }

      return ( 
        <div className="delete-account-form">
            <form onSubmit={handleDeleteAccount}>
            <h3><span className="material-symbols-outlined">Delete</span>&nbsp;Delete account </h3>
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
            {!isPending && <button>Delete Account</button>}
            {isPending && <button>Deleting Account...</button>}
            {msg && <div className='msg'><span className="material-symbols-outlined">Done</span>&nbsp;
            {msg}</div>}
        </form>
        </div>
     )
}
 
export default DeleteAccount