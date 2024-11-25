import { Outlet } from "react-router-dom";
import loginLogo from "../assets/thrivr-logo.png";

const LoginSignupLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#870E73DB]">
      <div className="container mx-auto px-4 py-10">
        {/* White container for content */}
        <div className="max-w-[600px] mx-auto bg-white rounded-3xl p-6 md:p-12">
          {/* Logo section */}
          <div className="flex gap-1 justify-center mb-8">
            <div className="my-auto w-[80px]">
              <img 
                src={loginLogo} 
                alt="Thrivr Logo" 
                className="object-cover -translate-x-[5px]" 
              />
            </div>
            <p className="text-[#870E73] text-4xl font-bold my-auto -translate-x-[25px]">
              Thrivr
            </p>
          </div>
{/*           
          Navigation tabs
          <div className="flex justify-center mb-6">
            <NavLink
              to="/login"
              className={({ isActive }) => 
                `p-3 border-t-4 ${
                  isActive ? "border-[#870E73]" : "border-[#3333336E]"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => 
                `p-3 border-t-4 ${
                  isActive ? "border-[#870E73]" : "border-[#3333336E]"
                }`
              }
            >
              Signup
            </NavLink>
          </div> */}
          
          {/* Form content */}
          <div className="py-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupLayout;