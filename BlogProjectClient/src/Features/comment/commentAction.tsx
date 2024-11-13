import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CommentData, CommentFilter, CommentShowData } from "../../data";
const api = process.env.REACT_APP_API_URL ?? "http://localhost:5000/api/"
// Thunk lấy dữ liệu comments từ API
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async ({
      postID,
      pageNumber ,
      pageSize ,
      isDescending
    }: Partial<CommentFilter>) => {
      try {
        const params = new URLSearchParams();
    
        // Thêm các tham số vào URLSearchParams nếu chúng tồn tại
        if (postID) params.append("PostID", postID.toString());
        if (isDescending !== undefined)
          params.append("IsDescending", isDescending.toString());
        if (pageNumber !== undefined)
          params.append("PageNumber", pageNumber.toString());
        if (pageSize !== undefined) params.append("PageSize", pageSize.toString());
        const data = await axios.get<CommentShowData[]>(
          `${api}comment/post?${params.toString()}`
        );
        return data;
      } catch (error: any) {
        console.log("error message from API: ", error.message);
      }
    }
  );