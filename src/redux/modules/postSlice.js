import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import apis from '../../shared/axios'
import api from "../../axios/api"

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
}

// 게시물 추가 Thunk 함수
export const __addPost = createAsyncThunk('addPosts', async (payload, thunkAPI) => {
  try {
    const response = await api.post(`/post`, payload.posts)
    return thunkAPI.fulfillWithValue(payload)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

// 게시물 조회 Thunk 함수
export const __getPost = createAsyncThunk('getPosts', async (payload, thunkAPI) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}`)
    return thunkAPI.fulfillWithValue(response.data.posts)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

// 게시물 삭제 Thunk 함수
export const __deletePost = createAsyncThunk('deletePosts', async (payload, thunkAPI) => {
  try {
    const response = await api.delete(`/post/${payload}`)
    console.log("payload = ",payload);
    return thunkAPI.fulfillWithValue(response.data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})


const postSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: {
    // 게시물 추가 Reducer -------------------------------
    [__addPost.pending]: (state, action) => {
      state.isLoading = true
      state.error = false
    },
    [__addPost.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = false
      state.posts = action.payload.posts
      action.payload.next()
    },
    [__addPost.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // 게시물 조회 Reducer -------------------------------
    [__getPost.pending]: (state, action) => {
      state.isLoading = true
      state.error = false
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = false
      state.posts = action.payload
    },
    [__getPost.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    //게시물 삭제
    [__deletePost.pending]: (state, action) => {
      state.isLoading = true
      state.error = false
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false
      state.error = false
      state.posts = action.payload
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

  },
})
export const {} = postSlice.actions
export default postSlice.reducer
