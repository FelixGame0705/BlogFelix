// commentsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchComments } from './commentAction';
import { CommentData, CommentFilter, CommentShowData } from '../../data';

interface Comment {
  id: number;
  text: string;
  date: string;
}

interface CommentsState {
  comments: CommentShowData[];
  filter: Partial<CommentFilter|null>
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Khởi tạo state ban đầu
const initialState: CommentsState = {
  comments: [],
  filter: null,
  status: 'idle',
  error: null,
};



const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<CommentFilter>>) => {
      state.filter = {...state.filter, // Keep existing filter values
        ...action.payload}
    },
    addComment:(state, action: PayloadAction<CommentShowData>) => {
      state.comments.unshift(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action:any) => {
        state.status = 'succeeded';
        state.comments = action.payload.data;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load comments';
      });
  },
});

export const { setFilter, addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
