import { apiSlice } from './apiSlice'
const USERS_URL = '/api'

interface LoginAuth {
  email: string;
  password: string;
}

interface SignupAuth {
  username:string;
  email: string;
  password: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data:SignupAuth) => ({
        url: `${USERS_URL}/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data:LoginAuth) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<{msg:string}, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'GET',
      }),
    }),
    forgetPassEmail: builder.mutation({
      query: (data:{email:string}) => ({
        url: `${USERS_URL}/forgetpassemail`,
        method: 'POST',
        body: data,
      }),
    }),
    resetPass: builder.mutation({
      query: ({id, ...data}:{id:string, password:string}) => ({
        url: `${USERS_URL}/resetpass/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteAccount: builder.mutation({
      query: (data:LoginAuth) => ({
        url: `${USERS_URL}/deleteaccount`,
        method: 'DELETE',
        body: data,
      }),
    }),
    // onloadAuth: builder.mutation({
    //   query: () => ({
    //     url: `${USERS_URL}/onloadauth`,
    //     method: 'GET',
    //   }),
    // }),
  }),
})

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgetPassEmailMutation,
  useResetPassMutation,
  useDeleteAccountMutation,
  // useOnloadAuthMutation,
} = userApiSlice
