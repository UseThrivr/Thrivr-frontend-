import { Outlet } from "react-router-dom";
import loginLogo from "../assets/thrivr-logo.png";
import bgImage from "../assets/Rectangle 167.png";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Circle } from "lucide-react";

const LoginSignupLayout: React.FC = () => {
  const Reviews = [
    {
      user: "Beloved Okojie, Founder Creative NG",
      feedback:
        "The tools made available by Thrivr has made it easy to manage my business from anywhere in the world.",
    },
    {
      user: "Hanson Jojo, Founder Lysk Gym Wears",
      feedback:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores provident optio numquam quis reiciendis veniam facere delectus velit voluptate eum.",
    },
    {
      user: "Victor James, Founder Unique Mouse",
      feedback:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores provident optio numquam quis reiciendis veniam facere delectus velit voluptate eum.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + Reviews.length) % Reviews.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Reviews.length);
  };

  return (
    <div className=" w-full bg-[#870E73DB]">
      <div className="">
        <div
          className="w-[45%] h-screen fixed flex flex-col"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="bg-[#870E73] bg-opacity-75 h-2/5 mt-auto px-20 flex flex-col justify-center text-white">
            <div className="flex mb-5 gap-2">
              {Reviews.map((review, index) => (
                <div className="">
                  <div className="w-4 h-4 border-2 border-white rounded-full flex justify-center items-center">
                    {currentIndex == index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden mx-auto">
              <div
                className="flex w-full mx-auto transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Reviews.map((review, index) => (
                  <div key={index} className="flex-shrink-0 w-full">
                    <p className="font-semibold">"{review.feedback}"</p>
                    <p className="mt-5 text-sm">{review.user}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={prevSlide} className="bg-white rounded p-2">
                <ArrowLeft color="#870E73DB" />
              </button>
              <button onClick={nextSlide} className="bg-white rounded p-2">
                <ArrowRight color="#870E73DB" />
              </button>
            </div>
          </div>
        </div>
        {/* White container for content */}
        <div className="max-w-[55%] ms-auto bg-white p-5 lg:p-10 lg:px-36">
          This will go large and get high amount of view Amen
          {/* Logo section */}
          <div className="flex gap-1 mb-5">
            <div className="my-auto w-[80px]">
              <img
                src={loginLogo}
                alt="Thrivr Logo"
                className="object-cover -translate-x-[25px]"
              />
            </div>
            <p className="text-[#870E73] text-4xl font-bold my-auto -translate-x-[50px]">
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
