// import React from 'react';
// import { Form, Input, Button, Card, Typography, notification } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import axios from 'axios'; // Import axios
// import './LoginPage.css';

// const { Title } = Typography;

// const LoginPage = () => {
//   // Hàm xử lý khi gửi form thành công
//   const onFinish = async (values: any) => {
//     try {
//       const response = await axios.post('http://localhost:5290/api/account/login', values);
//       // Giả sử API trả về token và thông tin người dùng
//       const { token, user } = response.data;

//       // Lưu token và thông tin người dùng vào localStorage hoặc state
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));

//       notification.success({
//         message: 'Login Successful',
//         description: 'You have successfully logged in.',
//       });

//       // Điều hướng người dùng đến trang chính hoặc trang khác
//       window.location.href = '/'; // Thay đổi đường dẫn điều hướng nếu cần
//     } catch (error) {
//       notification.error({
//         message: 'Login Failed',
//         description: 'Please check your username and password.',
//       });
//     }
//   };

//   const onFinishFailed = (errorInfo: any) => {
//     console.error('Failed:', errorInfo);
//     notification.error({
//       message: 'Login Failed',
//       description: 'Please check your username and password.',
//     });
//   };

//   return (
//     <div className="login-page">
//       <Card
//         title={<Title level={2}>Login</Title>}
//         style={{ maxWidth: 400, margin: 'auto', padding: '20px' }}
//       >
//         <Form
//           name="login"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//         >
//           <Form.Item
//             name="username"
//             rules={[{ required: true, message: 'Please input your username!' }]}
//           >
//             <Input
//               prefix={<UserOutlined />}
//               placeholder="Username"
//             />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: 'Please input your password!' }]}
//           >
//             <Input.Password
//               prefix={<LockOutlined />}
//               placeholder="Password"
//             />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Log in
//             </Button>
//           </Form.Item>

//           <Form.Item>
//             <Button type="link" block>
//               Register
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;

import React from "react";
import * as Yup from "yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, Layout, Typography } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GoogleUser } from "../../Models/User";

const { Content } = Layout;
const { Title, Text } = Typography;

type LoginFormsInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const { login_user, logout, loginGoogle_user } = useAuth(); // Ensure useAuth is correctly imported and loginUser is present
  const {
    register,
    handleSubmit: handleS_submit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormsInputs>({
    resolver: yupResolver(validation),
  });

  const handle_login = (form: LoginFormsInputs) => {
    login_user(form.userName, form.password); // Ensure loginUser is a function
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: 400,
            width: "100%",
            padding: "20px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const credentialResponseDecoded = jwtDecode<GoogleUser>(
                credentialResponse.credential || ""
              );
              console.log(credentialResponse.credential)
              loginGoogle_user(credentialResponseDecoded.email, credentialResponseDecoded.picture, credentialResponseDecoded.given_name);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          ;
          <Title level={2} style={{ textAlign: "center" }}>
            Sign in to your account
          </Title>
          <Form layout="vertical" onFinish={handleS_submit(handle_login)}>
            <Form.Item
              label="Username"
              validateStatus={errors.userName ? "error" : ""}
              help={errors.userName ? errors.userName.message : null}
            >
              <Input
                {...register("userName")}
                onChange={(e) => setValue("userName", e.target.value)}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              validateStatus={errors.password ? "error" : ""}
              help={errors.password ? errors.password.message : null}
            >
              <Input.Password
                {...register("password")}
                onChange={(e) => setValue("password", e.target.value)}
                placeholder="••••••••"
              />
            </Form.Item>

            <Form.Item>
              <a href="#" style={{ float: "right", marginBottom: "16px" }}>
                Forgot password?
              </a>
              <Button type="primary" htmlType="submit" block>
                Sign in
              </Button>
            </Form.Item>
          </Form>
          <Button onClick={logout}>Logout</Button>
          <Text
            style={{ display: "block", textAlign: "center", marginTop: "16px" }}
          >
            Don’t have an account yet? <a href="#">Sign up</a>
          </Text>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginPage;
