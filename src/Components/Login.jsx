import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../Store/authSlice";
import { Button, Input,  Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`max-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center ">
          <span className="inline-block w-full max-w-[100%]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className=" font-medium  text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center">{error} </p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email "
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                      value
                    ) || "Email Address must be a valid address",
                },
              })}
            />

            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(
                      value
                    ) ||
                    "Password must be at least 8 characters long and contain at least one letter and one number",
                },
              })}
            />

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
