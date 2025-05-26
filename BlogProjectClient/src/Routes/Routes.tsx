import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import HomePage from"../Pages/HomePage/HomePage"
import BlogPage from '../Pages/BlogPage/BlogPage'
import BlogContentPage from '../Pages/BlogContentPage/BlogContentPage'
import CreateBlogPage from '../Pages/BlogPage/CreateBlogPage/CreateBlogPage'
import LoginPage from '../Pages/LoginPage/LoginPage'
import ProtectedRoute from './ProtectedRoute'
import Images from '../Pages/ImagesList/ImagesArtistPage'
import ImagesArtistPage from '../Pages/ImagesList/ImagesArtistPage'
import CreateImagesArtistPage from '../Pages/ImagesList/CreateImages/CreateImagesPage'


export const router = createBrowserRouter
    ([
        {
            path: "/",
            element: <App />,
            children: [
                {path: "", element: <HomePage />},
                {path: "blogs", element: <BlogPage/>},
                {
                    path: "blogs/:id",
                    element: <BlogContentPage></BlogContentPage>
                },
                // {
                //     path: "blogs/create-blog",
                //     element: <CreateBlogPage></CreateBlogPage>
                // },
                {
                    path: "login",
                    element: <LoginPage></LoginPage>
                },
                {
                    path: "artist",
                    element:<ImagesArtistPage></ImagesArtistPage>,
                    children: [{
                        path: "artist/upload",
                        element: <ProtectedRoute><CreateImagesArtistPage></CreateImagesArtistPage></ProtectedRoute>
                    },
                    ]
                },
                {
                    path: "/", 
                    element: <ProtectedRoute><CreateBlogPage /></ProtectedRoute>,
                    children: [{
                        path: "blogs/create-blog",
                        element: <CreateBlogPage/>
                    },
                    ]
                }
            ]
        }
    ])
