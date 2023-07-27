import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";


const Login = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

   //prevent for login user
   useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="register-page ">
      {loading && <Spinner />}
        <Form
          className="register-form"
          layout="vertical"
          onFinish={submitHandler}
        >
          <h2>Login Form</h2>
          
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/register">New User? Register here!</Link>
            <button className="btn ">Login</button>
          </div>
        </Form>
      </div>
    
    </>
  )
}

export default Login