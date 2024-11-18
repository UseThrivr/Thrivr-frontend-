import { H1, P } from "@/components/global";
import { Dot, Lock, User } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleImg from '../assets/devicon_google.png'

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const [passwordError, setPasswordError] = useState<boolean>(false);

  return (
    <div className="pb-10">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Let's Create Your Account</h1>
        <P>All The Tools You Need At One Go</P>
      </div>
      <form action="" className="mt-5">
        <div>
          <p className="">Full name</p>
          <div className="p-2 border-2 rounded-lg flex gap-2 mt-1">
            <User className="w-4 h-4 my-auto" />
            <input
              type="password"
              placeholder="Enter First and Last Name"
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-5">
          <p className="">Email</p>
          <div className="p-2 border-2 rounded-lg flex gap-2 mt-1">
            <User className="w-4 h-4 my-auto" />
            <input
              type="password"
              placeholder="Enter Your Email Address"
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-5">
          <p className="">Password</p>
          <div className="p-2 border-2 rounded-lg flex gap-2 mt-1">
            <Lock className="w-4 h-4 my-auto" />
            <input
              type="password"
              placeholder="Password"
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-5">
          <p className="">Confirm Password</p>
          <div
            className={`${
              passwordError ? "border-red-500" : ""
            } p-2 border-2 rounded-lg flex gap-2 mt-1`}
          >
            <Lock className="w-4 h-4 my-auto" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full focus:outline-none"
            />
          </div>
          {passwordError && (
            <p className="text-red-500 flex text-xs mt-1 items-center">
              <Dot /> Password Does Not Match
            </p>
          )}
        </div>
        <div className="mt-5">
          <div className="flex gap-2 items-center">
            <input type="checkbox" />
            <p className="text-sm">
              Agreed to all{" "}
              <Link to="" className="text-[#870E73]">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="" className="text-[#870E73]">
                Conditions
              </Link>
            </p>
          </div>
        </div>
        <button className="w-full rounded-lg bg-[#870E73] text-white p-2 mt-5 font-semibold">
          Sign In
        </button>
        <div className="flex my-5">
          <div className="w-full border border-black h-fit my-auto"></div>
          <p className="mx-5">or</p>
          <div className="w-full border border-black h-fit my-auto"></div>
        </div>
        <button onClick={()=> navigate('/setupbusiness')} className="text-black bg-white mt-5 w-full rounded-lg py-2 border-2 flex justify-center gap-2">
          {" "}
          <img src={googleImg} alt="" />
          Sign In with Google
        </button>
      </form>
    </div>
  );
};

export default Signup;
