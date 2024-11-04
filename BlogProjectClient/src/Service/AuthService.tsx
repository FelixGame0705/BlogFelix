import axios from "axios"

import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "http://localhost:5000/api/"

export const loginAPI = async (username: string, password: string) => {
    try{
        const data = await axios.post<UserProfileToken>(api + "account/login", {
            username: username,
            password: password
        });
        return data;
    } catch (error){
        handleError(error)
    }
}

export const loginGoogleAPI = async (emai:string, avatarUrl:string) => {
    try{
        const data = await axios.post<any>(api + "account/registerGoogle", {
            email: emai,
            avatarUrl: avatarUrl
        });
        return data;
    } catch (error){
        handleError(error)
    }
}

export const registerAPI = async (email: string, username: string, password: string) => {
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