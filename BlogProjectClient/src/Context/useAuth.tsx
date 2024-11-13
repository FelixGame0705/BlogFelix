import { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import { loginAPI, loginGoogleAPI, registerAPI } from "../Service/AuthService";
import { UserDeCodeToken, UserGoogleProfile, UserProfile } from "../Models/User";
import { message, notification } from "antd";
import { jwtDecode, JwtPayload } from "jwt-decode";

type UserContextType = {
    user: UserProfile | UserGoogleProfile | null;
    userGoogle: UserGoogleProfile | null;
    token: string | null;
    decodedToken: UserDeCodeToken | null;
    registerUser: (email: string, username: string, password: string) => void;
    login_user: (username: string, password: string)=>void;
    loginGoogle_user: (emai:string, avatarUrl:string, given_name: string)=>void;
    logout: () => void;
    isLoggedIn: ()=> boolean;
};

type Props = {
    children: React.ReactNode
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({children}: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | UserGoogleProfile | null>(null);
    const [userGoogle, setUserGoole] = useState<UserGoogleProfile | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [decodedToken, setDecodedToken] = useState<UserDeCodeToken | null>(null);

    useEffect(()=>{
        const user = localStorage.getItem("user1");
        const token = localStorage.getItem("token1");
        if(user && token){
            setUser(JSON.parse(user!));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);
    useEffect(()=>{
        const user = localStorage.getItem("user1");
        if(user){
            setUserGoole(JSON.parse(user!));
        }
        setIsReady(true);
    }, []);
    useEffect(() => {
        const token = localStorage.getItem("token1");
        
        if (token) {
            const decoded = jwtDecode<UserDeCodeToken>(token);
            setDecodedToken(decoded);
        }
    }, [user]);
    
    const registerUser = async (email: string, username: string, password: string)=>{
        await registerAPI(email, username, password).then((res)=>{
            if(res){
                localStorage.setItem("token1", res?.data.token);
                const userObj = {
                    userName: res?.data.userName,
                    email: res?.data.email,
                    userID: res?.data.userID
                }
                localStorage.setItem("user1", JSON.stringify(userObj));
                setToken(res?.data.token!);
                setUser(userObj);
                toast.success("Login Success");
                navigate("/search");
            }
        }).catch(e => toast.warning("Server error occured"))
    };

    const login_user = async (username: string, password: string)=>{
        await loginAPI(username, password).then((res)=>{
            toast.success(res?.status)
            if(res?.status == 200){
                localStorage.setItem("token1", res?.data.token);
                const userObj = {
                    userName: res?.data.userName,
                    email: res?.data.email,
                    userID: res?.data.userID
                }
                localStorage.setItem("user1", JSON.stringify(userObj));
                setToken(res?.data.token!);
                setUser(userObj);
                setUserGoole(null);
                notification.success({
                    message:'Status',
                    description:'Login successful!',
                })
                navigate("/");
            }
            else {
                notification.error({
                    message:'Status',
                    description:'Wrong username or password!',
                }
                )
            }
        }).catch(e => toast.warning("Server error occured"))
    };

    const loginGoogle_user = async (email:string, avatarUrl:string, given_name: string)=>{

                // localStorage.setItem("token1", res?.data.token);
                const userObj = {
                    fullName: given_name,
                    email: email,
                    avatarUrl: avatarUrl
                }
                localStorage.removeItem("token1");
                localStorage.setItem("user1", JSON.stringify(userObj));
                // setToken(res?.data.token!);
                setUserGoole(userObj);
                setUser(null)
                setToken(null);
                setDecodedToken(null)
                notification.success({
                    message:'Status',
                    description:'Login successful!',
                })
                navigate("/");

        // await loginGoogleAPI(emai, avatarUrl).then((res)=>{
        //     toast.success(res?.status)
        //     if(res?.status == 200){
        //         localStorage.setItem("token1", res?.data.token);
        //         const userObj = {
        //             fullName: given_name,
        //             email: res?.data.email,
        //             avatarUrl: avatarUrl
        //         }
        //         localStorage.setItem("user1", JSON.stringify(userObj));
        //         setToken(res?.data.token!);
        //         setUserGoole(userObj);
        //         notification.success({
        //             message:'Status',
        //             description:'Login successful!',
        //         })
        //         navigate("/");
        //     }
        //     else {
        //         notification.error({
        //             message:'Status',
        //             description:'Wrong username or password!',
        //         }
        //         )
        //     }
        // }).catch(e => toast.warning("Server error occured"))
    };

    const isLoggedIn = () => {
        // console.log("Login " + !!user)
        return !!user||!!userGoogle;
    };

    const logout = () =>{
        localStorage.removeItem("token1");
        localStorage.removeItem("user1");
        setUser(null);
        setToken("");
        navigate("/");
    }
    return (
        <UserContext.Provider value={{login_user: login_user, loginGoogle_user, user, userGoogle, token, logout, isLoggedIn, registerUser, decodedToken}}>
            {isReady ? children : null}
        </UserContext.Provider>
    )
};

export const useAuth = () => React.useContext(UserContext);