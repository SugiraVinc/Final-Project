'use client'
import { apiSlice } from "../apiSlice";
const BASE_URL = "/users"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        logOut: builder.mutation({
            query: () => ({
                url: `${BASE_URL}/logout`,
                method: 'POST'
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        editUser: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/edit`,
                method: 'PUT',
                body: data
            })
        }),
        googleLogin: builder.mutation({
            query: (data) => ({
                url:`${BASE_URL}/login-google`,
                method: 'POST',
                body: data
            })
        }),
        googleRegister: builder.mutation({
            query: (data) => ({
                url:`${BASE_URL}/register-google`,
                method: 'POST',
                body: data
            })
        }),
        createTest: builder.mutation({
            query: (data) => ({
                url:`/test/test`,
                method: 'POST',
                body: data
            })
        }),
        getTest: builder.query({
            query: () => ({
                url:`/test/test`,
                method: 'GET'
            })
        }),
        postContent: builder.mutation({
            query: (data) => ({
                url:`/contributor/contributor`,
                method: 'POST',
                body: data
            })
        }),
        getContent: builder.query({
            query: () => ({
                url:`/contributor/contributor`,
                method: 'GET'
            })
        }),
        getAllContent: builder.query({
            query: () => ({
                url:`/contributor/content`,
                method: 'GET'
            })
        }),
        getNotes: builder.query({
            query: () => ({
                url: '/notes/notes',
                method: 'GET'
            })
        }),
        getNoteById: builder.query({
            query: (id) => ({
                url: `/notes/notes/${id}`,
                method: 'GET'
            })
        }),
        createNote: builder.mutation({
            query: (data) => ({
                url: `/notes/notes`,
                method: 'POST',
                body: data
            })
        }),
        updateNote: builder.mutation({
            query: (data) => ({
                url: `/notes/notes/${data.id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: `/notes/notes/${id}`,
                method: 'DELETE'
            })
        }),
    })
})

export const {
    useRegisterMutation, 
    useLogOutMutation, 
    useLoginMutation, 
    useGoogleLoginMutation, 
    useEditUserMutation, 
    useGoogleRegisterMutation,
    useCreateTestMutation,
    useGetTestQuery, 
    usePostContentMutation,
    useGetAllContentQuery,
    useGetContentQuery,
    useGetNotesQuery,
    useGetNoteByIdQuery,
    useCreateNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation
} = userApiSlice