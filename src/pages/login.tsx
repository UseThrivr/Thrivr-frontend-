import React, { useState } from "react";
import { H1, P } from "@/components/global";
import { PersonIcon } from "@radix-ui/react-icons";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import googleImg from '../assets/devicon_google.png'

interface FormErrors {
  email: string;
  password: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({ ...prev, [name]: value }));

    
    if (name === "email") {
      // setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === "password") {
      // setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };
  return (
    <div>
      <div className="text-center mt-3">
        <H1>Welcome</H1>
        <P>Let's Get Back To Managing your Business</P>
      </div>
      <div className="mt-10">
        <div className="mt-5">
          <label htmlFor="Email" className="text-small">
            Email Address
          </label>
          <div className="flex border-2 rounded-md px-4 mt-2">
            <PersonIcon className="w-4 h-4 my-auto" />
            <input
              type="email"
              name="Email"
              value={loginData.email}
              onChange={handleChange}
              id=""
              placeholder=""
              className="focus:outline-none p-2 w-full"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mt-5">
          <label htmlFor="Email" className="text-small">
            Password
          </label>
          <div className="flex border-2 rounded-md px-4 mt-2">
            <Lock className="w-4 h-4 my-auto" />
            <input
              type="password"
              name="Email"
              value={loginData.password}
              onChange={handleChange}
              id=""
              placeholder=""
              className="focus:outline-none p-2 w-full"
            />
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex gap-1">
              <input type="checkbox" />
              <p className="">remember me</p>
            </div>
            <Link to="" className="text-sm underline text-[#870E73]">
              Forgot Password
            </Link>
          </div>
          <button className="text-white bg-[#870E73CC] mt-5 w-full rounded-lg py-2">
            Login
          </button>
          <div className="flex my-5">
            <div className="w-full border border-black h-fit my-auto"></div>
            <p className="mx-5">or</p>
            <div className="w-full border border-black h-fit my-auto"></div>
          </div>
          <button className="text-black bg-white mt-5 w-full rounded-lg py-2 border-2 flex justify-center gap-2">
            {" "}
            <img src={googleImg} alt="" />
            Login with Google
          </button>

          <div className="mt-5 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#870E73]">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
