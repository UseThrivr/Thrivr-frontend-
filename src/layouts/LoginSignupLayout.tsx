import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import loginLogo from "../assets/thrivr-logo.png";
import EmailVerification from "@/components/signup/EmailVerification";

const LoginSignupLayout = () => {
  return (
    <div>
      <div className="flex">
      {/* <EmailVerification /> */}
        <div className="w-[55%] top-0 rounded-r-3xl h-[100%] bg-[#870E73DB] fixed"></div>
        <div className="w-[45%] px-24 h-screen ms-[55%]">
          <div className="flex gap-1 justify-center mt-5">
            <div className="my-auto w-[80px]">
              <img src={loginLogo} alt="" className="objext-cover -translate-x-[5px]" />
            </div>

            <p className="text-[#870E73] text-4xl font-bold my-auto -translate-x-[25px]">Thrivr</p>
          </div>
          <div className="flex justify-center">
            <NavLink
              to="/login"
              className={({ isActive }) => {
                return (
                  "p-3 border-t-4 " +
                  (isActive ? " border-[#870E73]" : "border-[#3333336E]")
                );
              }}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => {
                return (
                  "p-3 border-t-4 " +
                  (isActive ? " border-[#870E73]" : "border-[#3333336E]")
                );
              }}
            >
              Signup
            </NavLink>
          </div>
          <div className="py-5">
            <Outlet />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default LoginSignupLayout;
