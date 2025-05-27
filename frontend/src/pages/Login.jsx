import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  //
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      const res = await axios.post("http://localhost:4500/api/auth/login", {
        email: data.email,
        password: data.password,
      });
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content px-4">
        <div className="w-full max-w-md bg-base-200 rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
              className="input input-bordered w-full"
            />

            <button type="submit" className="btn btn-primary w-full">
              Log In
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
