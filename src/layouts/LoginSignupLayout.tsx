import { NavLink, Outlet } from "react-router-dom";
import loginLogo from "../assets/thrivr-logo.png";

const LoginSignupLayout = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row">
        {/* Remove fixed purple container on mobile, use responsive classes */}
        <div className="hidden md:block md:w-[55%] md:bg-[#870E73DB] md:rounded-r-3xl fixed top-0 h-full"></div>
        
        <div className="w-full md:w-[45%] md:ms-[55%] px-6 md:px-24 min-h-screen flex flex-col">
          <div className="flex gap-1 justify-center mt-5">
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
          
          <div className="flex justify-center">
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
          </div>
          
          <div className="py-5 flex-grow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupLayout;