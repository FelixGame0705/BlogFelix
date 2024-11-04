import axios from "axios"

import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import { CommentData } from "../data";

const api = process.env.API_URL ?? "http://localhost:5000/api/"

export const createCommentAPI = async (comment:CommentData) => {
    try{
        const data = await axios.post<CommentData>(
            `${api}comment/`,{
                postID: comment.postID,
                appUserID: comment.appUserID,
                content: comment.content,
                timeStamp: comment.timeStamp
            }
        );
        console.log(data.data)
        return data;
    }catch(error: any){
        console.log("error message from API: ", error.message)
    }
}
export const editCommentAPI = async (email: string, username: string, password: string) => {
    try{
        const data = await axios.post<UserProfileToken>(api + "account/register", {
            email: email,
            username: username,
            password: password
        });
        return data;
    } catch (error){
        handleError(error)
    }
}