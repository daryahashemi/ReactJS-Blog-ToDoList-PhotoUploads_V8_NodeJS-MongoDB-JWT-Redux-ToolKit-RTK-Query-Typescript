import { useState, FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { usePostNewTaskMutation } from '../../slices/todosApiSlice'
import { newTask } from '../../slices/todoSlice'
import { Todos } from '../../slices/todoSlice'

const ToDoForm = () => {
  const [task, setTask] = useState('')
  const [timeinterval, setTimeinterval] = useState('')
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const [postNewTaskApiCall] = usePostNewTaskMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement> ):Promise<void> => {
    e.preventDefault()

    try {
      const json = await postNewTaskApiCall({ task, timeinterval } as Todos).unwrap()
      console.log(json, 'newtask')

      dispatch(newTask(json))
      setError(null)
      setTask('')
      setTimeinterval('')
    } catch(err: any) {
      console.log(err)
      setError(err.data)
    }
  }

  return (
    <div>
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit} className="todo-form"> 
        <label>Task</label>
        <input 
          type="text" 
          onChange={(e) => setTask(e.target.value)} 
          value={task}
        />
        <label>Timeinterval</label>
        <input 
          type="text" 
          onChange={(e) => setTimeinterval(e.target.value)} 
          value={timeinterval}
        />
        <button>Add Task</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default ToDoForm