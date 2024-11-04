import axios from "axios";
import {
  BlogContentData,
  BlogListContentData,
  BlogsResultAPI,
  CommentData,
  CommentShowData,
} from "./data";
import { title } from "process";
import { timeStamp } from "console";
import { PostAuthorResponse } from "./Models/User";
const api = process.env.API_URL ?? "http://localhost:5000/api/"
export const getBlogContentData = async (query: string) => {
  try {
    const data = await axios.get<BlogContentData>(`${api}post/${query}`);
    console.log("Hello"+data.data.postAuthors.map((item)=>item.userName));
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const updateBlogContentData = async (
  title: string,
  content: string,
  category: string,
  postID: number
) => {
  try {
    console.log(category);
    const data = await axios.put(`${api}post/${postID}`, {
      title: title,
      content: content,
      category: category
    });
    
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
    console.log("error message from API: ", error);
  }
};

export const createPostAuthorData = async (
  postID:string|undefined,
  appUserID:string | undefined
) => {
  try {
    const data = await axios.post<PostAuthorResponse>(`${api}post-author/${postID}`, {
      postID,
      appUserID
    });
    console.log(data.data);
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const createBlogContentData = async (
  title: string,
  content: string,
  category: string
) => {
  try {
    const data = await axios.post<BlogContentData>(`${api}post`, {
      title: title,
      content: content,
      category: category,
    });
    console.log(data.data);
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const deleteBlogContentData = async (query: string) => {
  try {
    const data = await axios.delete<BlogContentData>(`${api}post/${query}`);
    console.log(data.data);
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getListContentData = async ({
  updateTime,
  postName,
  sortBy,
  isDescending,
  pageNumber,
  pageSize,
  categories,
}: any) => {
  try {
    // Chuẩn bị đối tượng params cho axios
    // Sử dụng URLSearchParams để xây dựng chuỗi truy vấn
    const params = new URLSearchParams();

    // Thêm các tham số vào URLSearchParams nếu chúng tồn tại
    if (updateTime) params.append("updateTime", updateTime);
    if (postName) params.append("postName", postName);
    if (sortBy) params.append("sortBy", sortBy);
    if (isDescending !== undefined)
      params.append("isDescending", isDescending.toString());
    if (pageNumber !== undefined)
      params.append("pageNumber", pageNumber.toString());
    if (pageSize !== undefined) params.append("pageSize", pageSize.toString());
    if (Array.isArray(categories) && categories.length > 0) {
        categories.forEach(category => {
          params.append("categories", category);
        });
      }
    // Gọi API với chuỗi truy vấn đã được xây dựng
    const response = await axios.get<BlogsResultAPI>(
      `${api}post?${params.toString()}`
    );

    return response; // Trả về dữ liệu nhận được từ API
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Đảm bảo lỗi được ném ra để xử lý ở nơi gọi hàm
  }
};

export const createCommentData = async (comment: CommentData) => {
  try {
    console.log("Create"+comment.appUserID)
    const data = await axios.post<CommentData>(`${api}comment/`, {
      postID: comment.postID,
      appUserID: comment.appUserID,
      content: comment.content,
      timeStamp: comment.timeStamp,
      fullName: comment.fullName,
      avatarURL: comment.avatarURL
    });
    console.log(data.data);
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getCommentData = async ({
  postID,
  pageNumber,
  pageSize,
  isDescending,
}: any) => {
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
    console.log("Comments:"+`${api}comment/post?${params.toString()}`);
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const deleteComment = async (query: string) => {
  try {
    const data = await axios.delete<CommentData>(`${api}comment/${query}`);
    console.log(data.data);
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getCategories = async () => {
  try {
    // Thêm các tham số vào URLSearchParams nếu chúng tồn tại
    const data = await axios.get<string[]>(`${api}post/categories`);
    console.log(data.data);
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};
