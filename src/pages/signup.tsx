import { FC, useState, ChangeEvent, FormEvent } from "react";
import { P } from "@/components/global";
import { Dot, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import googleImg from "../assets/devicon_google.png";
// import { useAuth } from "../context/AuthContext"; // Adjust import path as needed

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: string;
}



const Signup: FC = () => {
  const navigate = useNavigate();
  // const { register } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: "",
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: ""
    };
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).every(key => !newErrors[key as keyof FormErrors]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Navigate to business setup with initial registration data
        navigate("/business", {
          state: {
            userData: {
              fullname: formData.fullName,
              email: formData.email,
              password: formData.password
            }
          }
        });
      } catch (error) {
        console.error("Registration navigation error:", error);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="pb-10">
      <div className="text-center">
        <h1 className="text-4xl mb-2 font-semibold">Grow Your Business</h1>
        <P>Get started today!</P>
      </div>

      <form onSubmit={handleSubmit} className="mt-5">
        <div>
          <p className="">Full name</p>
          <div
            className={`p-2 border-2 rounded-lg flex gap-2 mt-1 ${
              errors.fullName ? "border-red-500" : ""
            }`}
          >
            <User className="w-4 h-4 my-auto" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter First and Last Name"
              className="w-full focus:outline-none"
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 flex text-xs mt-1 items-center">
              <Dot /> {errors.fullName}
            </p>
          )}
        </div>

        <div className="mt-5">
          <p className="">Email</p>
          <div
            className={`p-2 border-2 rounded-lg flex gap-2 mt-1 ${
              errors.email ? "border-red-500" : ""
            }`}
          >
            <User className="w-4 h-4 my-auto" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Your Email Address"
              className="w-full focus:outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 flex text-xs mt-1 items-center">
              <Dot /> {errors.email}
            </p>
          )}
        </div>

        <div className="mt-5">
          <p className="">Password</p>
          <div
            className={`p-2 border-2 rounded-lg flex gap-2 mt-1 ${
              errors.password ? "border-red-500" : ""
            }`}
          >
            <Lock className="w-4 h-4 my-auto" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full focus:outline-none"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 flex text-xs mt-1 items-center">
              <Dot /> {errors.password}
            </p>
          )}
        </div>

        <div className="mt-5">
          <p className="">Confirm Password</p>
          <div
            className={`p-2 border-2 rounded-lg flex gap-2 mt-1 ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          >
            <Lock className="w-4 h-4 my-auto" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full focus:outline-none"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 flex text-xs mt-1 items-center">
              <Dot /> {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="mt-5">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="w-4 h-4 rounded-lg accent-action-default border"
            />
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
          {errors.agreeToTerms && (
            <p className="text-red-500 flex text-xs mt-1 items-center">
              <Dot /> {errors.agreeToTerms}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#870E73] text-white p-2 mt-5 font-semibold"
        >
          Sign Up
        </button>

        <div className="flex my-5">
          <div className="w-full border border-black h-fit my-auto"></div>
          <p className="mx-5">or</p>
          <div className="w-full border border-black h-fit my-auto"></div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/setupbusiness")}
          className="text-black bg-white mt-5 w-full rounded-lg py-2 border-2 flex justify-center gap-2"
        >
          <img src={googleImg} alt="" />
          Sign In with Google
        </button>
      </form>

      {/* <OTPVerification
        isOpen={showOtp}
        onClose={() => setShowOtp(false)}
        formData={formData}
      /> */}
    </div>
  );
};

export default Signup;
