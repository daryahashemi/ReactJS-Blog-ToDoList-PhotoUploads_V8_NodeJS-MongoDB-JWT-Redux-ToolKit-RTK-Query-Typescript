import { useDispatch } from 'react-redux'
import { useDeleteTaskMutation } from '../../slices/todosApiSlice'
import {ReactElement} from 'react'
import { deleteTask } from '../../slices/todoSlice'
import { Todos } from '../../slices/todoSlice'

const ToDoItem = ({todo}: {todo:Todos}): ReactElement => {
  const [deleteTaskApiCall] = useDeleteTaskMutation()
  const dispatch = useDispatch()
  const id = todo._id;

  const handleClick = async () => {
    try {
      const json = await deleteTaskApiCall( id ).unwrap()
      console.log(id, json, 'deleteeee')

      dispatch(deleteTask(id))
    } catch(err: unknown) {
      console.log(err,'hiii')
    }
  }

  return (
    <tbody>
    <tr className="todo-details">
      <td>{todo.task}</td>
      <td>{todo.timeinterval}</td>
      <td>
        <span onClick={handleClick}>delete</span>
      </td>
    </tr>
    </tbody>
  )
}
  
export default ToDoItem