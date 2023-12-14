import { apiSlice } from './apiSlice'
const TODOS_URL = '/api/todo'

interface Todos {
  _id: string;
  task: string;
  timeinterval: string;
}

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.mutation<Todos[], void>({
      query: () => ({
        url: `${TODOS_URL}`,
        method: 'GET',
      }),
    }),
    postNewTask: builder.mutation({
      query: (data:Todos) => ({
        url: `${TODOS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id:string) => ({
        url: `${TODOS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetAllTasksMutation,
  usePostNewTaskMutation,
  useDeleteTaskMutation,
} = todoApiSlice
