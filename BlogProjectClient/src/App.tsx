import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Input,
  Space,
  theme,
  version,
} from "antd";
import AppHeader from "./Components/AppHeader/AppHeader";
import HomePage from "./Pages/HomePage/HomePage";
import BlogPage from "./Pages/BlogPage/BlogPage";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./Context/useAuth";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      {/* <HomePage/> */}
      {/* <BlogPage></BlogPage> */}
      
      <UserProvider>
        <AppHeader/>
        <Outlet />
        <Footer/>
      </UserProvider>
    </>
  );
}

export default App;
