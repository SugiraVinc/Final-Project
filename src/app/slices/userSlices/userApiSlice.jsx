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
        getSingleContent: builder.query({
            query: (id) => ({
                url:`/contributor/content/${id}`,
                method: 'GET'
            })
        }),
        createComment: builder.mutation({
            query: (data) => ({
                url:`/contributor/comments/${data.id}`,
                method: 'POST',
                body: data
            })
        }),
        getComment: builder.query({
            query: (id) => ({
                url:`/contributor/comments/${id}`,
                method: 'GET'
            })
        }),
        createLike: builder.mutation({
            query: (data) => ({
                url:`/contributor/likes/${data.id}`,
                method: 'POST',
                body: data
            })
        }),
        getLike: builder.query({
            query: (id) => ({
                url:`/contributor/likes/${id}`,
                method: 'GET'
            })
        }),
        createTestimony: builder.mutation({
            query: (data) => ({
                url:`/contributor/testimony`,
                method: 'POST',
                body: data
            })
        }),
        getUserTestimony: builder.query({
            query: () => ({
                url:`/contributor/testimony-user`,
                method: 'GET',
            })
        }),
        getAllTestimony: builder.query({
            query: () => ({
                url:`/contributor/testimony`,
                method: 'GET',
            })
        }),
        getSingleTestimony: builder.query({
            query: (id) => ({
                url:`/contributor/testimony/${id}`,
                method: 'GET',
            })
        }),
        deleteTestimony: builder.mutation({
            query: (id) => ({
                url:`/contributor/testimony/${id}`,
                method: 'DELETE',
            })
        }),
        deleteContent: builder.mutation({
            query: (id) => ({
                url:`/contributor/contributor/${id}`,
                method: 'DELETE',
            })
        }),
        setContributor: builder.mutation({
            query: () => ({
                url:`/contributor/set-contributor`,
                method: 'PUT',
            })
        }),
        createPoem: builder.mutation({
            query: (data) => ({
                url:`/contributor/poem`,
                method: 'POST',
                body: data
            })
        }),
        getAllPoem: builder.query({
            query: () => ({
                url:`/contributor/poem`,
                method: 'GET',
            })
        }),
        getSinglePoem: builder.query({
            query: (id) => ({
                url:`/contributor/poem/${id}`,
                method: 'GET',
            })
        }),
        deletePoem: builder.mutation({
            query: (id) => ({
                url:`/contributor/poem/${id}`,
                method: 'DELETE',
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
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/delete/${id}`,
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
    useDeleteNoteMutation,
    useDeleteUserMutation,
    useGetSingleContentQuery,
    useCreateCommentMutation,
    useGetCommentQuery,
    useCreateLikeMutation,
    useGetLikeQuery,
    useCreateTestimonyMutation,
    useGetUserTestimonyQuery,
    useGetAllTestimonyQuery,
    useGetSingleTestimonyQuery,
    useDeleteTestimonyMutation,
    useDeleteContentMutation,
    useSetContributorMutation, 
    useCreatePoemMutation,
    useGetAllPoemQuery,
    useGetSinglePoemQuery,
    useDeletePoemMutation
} = userApiSlice