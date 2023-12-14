import { useState, useEffect } from 'react'
import ToDoForm from './ToDoForm'
import ToDoItem from './ToDoItem'
import { useDispatch, useSelector } from 'react-redux'
import { useGetAllTasksMutation } from '../../slices/todosApiSlice'
import { allTasks } from '../../slices/todoSlice'
import type { RootState } from '../../store'

const ToDoList = () => {
  const [errorr, setErrorr] = useState<string | null>(null)

  const dispatch = useDispatch()

  const [getAllTasksApiCall] = useGetAllTasksMutation()
  const { todos } = useSelector((state: RootState) => state.todo)

  useEffect(() => {
    const fetchtodos = async () => {
      try{
        const json = await getAllTasksApiCall().unwrap()
        // console.log(json, 'todos all list')
  
        dispatch(allTasks(json))
        
      } catch(err: any) {
        console.log(err, 'todos errror list')
        if(err.data.message.includes('Unexpected token')) {
          setErrorr('Something went wrong! Failed to fetch.')
        }
      }
    }

  fetchtodos()
  }, [dispatch])

  return (
    <div className="todo-container">
      <ToDoForm />
      <div>
        <h2>To-Dos</h2>
        <table>
          <thead>
            <tr>
            <th>Task</th>
            <th>Timeinterval</th>
            <th></th>
            </tr>
          </thead>
          {!errorr && todos && todos.map(todo => (
            <ToDoItem todo={todo} key={todo._id} />
          ))}
        </table>
        {errorr && <div className="error">
        <span className="material-symbols-outlined">Error</span>&nbsp; 
        {errorr}</div>}
      </div>
    </div>
  )
}
 
export default ToDoList