import { string } from "yup";
import { UserInfo } from "./Models/User";

export interface BlogContentData {
    postID:number;
    title: string;
    content: string;
    category: string;
    publicationDate: string;
    tags:string;
    postAuthors: UserInfo[];
}

export interface BlogListContentData{
    postID: number;
    title: string;
    content: string;
    imageURL: string;
}

export interface BlogsResultAPI{
  data: BlogListContentData[];
  totalBlogs: number;
}

export interface CommentData{
  postID: number,
  appUserID: string|null,
  content: string,
  timeStamp: string,
  fullName: string|undefined,
  avatarURL:string | undefined
}

export interface CommentShowData{
  commentID: number,
  postID:number,
  userName: string,
  content: string,
  timeStamp: string,
  fullName: string|undefined,
  avatarURL: string|undefined
}

export interface IOptionItems{
  value: string,
  label: string
}

export interface CommentFilter {
  // Example sorting field
  postID: number,
  isDescending: boolean, // Ascending order
  pageNumber: number, // Page number
  pageSize: number, // Page size
};

