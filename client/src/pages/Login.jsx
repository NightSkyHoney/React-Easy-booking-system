import React from "react";
import { Form, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/easy-booking");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <Form onFinish={onFinish}>
      <div className="bg-white min-h-screen flex flex-col ">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-gray-50 px-6 py-8 rounded-xl shadow-xl text-black w-full border-2">
            <h1 className="mb-8 text-3xl text-center font-bold hover:animate-bounce">
              LOGIN
            </h1>
            <Form.Item
              name="email"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <input
                type="email"
                className="block border border-black w-full p-3 rounded mb-4"
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  min: 6,
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <input
                type="password"
                className="block border border-black w-full p-3 rounded mb-4"
                placeholder="Password"
                autoComplete="off"
              />
            </Form.Item>
            <div className="flex justify-center">
              <button
                type="submit"
                className=" bg-black rounded-2xl font-bold w-56 text-center py-3 text-white hover:text-black hover:bg-white hover:bg-white-500 hover:border-black hover:border duration-500 focus:outline-none my-1"
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default Login;