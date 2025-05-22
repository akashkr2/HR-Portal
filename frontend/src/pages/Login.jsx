import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content px-4">
        <div className="w-full max-w-md bg-base-200 rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Login
          </h2>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />

            <button type="submit" className="btn btn-primary w-full">
              Log In
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
