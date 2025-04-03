import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { H1, P } from "@/components/global";
import { PersonIcon } from "@radix-ui/react-icons";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the import path as needed
import googleImg from "../assets/devicon_google.png";
import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { AxiosError } from "axios";
import { useData } from "@/context/DataContext";
import { setUserDetails } from "@/api/tokenService";
import { auth, googleProvider, signInWithPopup } from "../../firebase";

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { getBusiness } = useData();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Email validation function
  const validateEmail = (email: string): string => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";
    return "";
  };

  // Password validation function
  const validatePassword = (password: string): string => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({ ...prev, [name.toLowerCase()]: value }));

    // Validate fields as user types
    if (name.toLowerCase() === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name.toLowerCase() === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields before submission
    const emailError = validateEmail(loginData.email);
    const passwordError = validatePassword(loginData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    try {
      setIsLoading(true);

      // Attempt login using AuthContext's login method
      const data = (await login({
        email: loginData.email,
        password: loginData.password,
        oauth: false,
      })) as { user: { id: string } };

      const business = await getBusiness(data.user.id);
      setUserDetails(business.data);

      // Show success toast and navigate to dashboard
      toast.success("Login Successful!");
      navigate("/dashboard"); // Adjust the route as needed
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage = err.message || "Login failed. Please try again.";
        toast.error(errorMessage);

        // Optionally set specific error states
        setError(errorMessage);
      } else if (err instanceof Error) {
        const errorMessage = err.message || "An unexpected error occurred.";
        toast.error(errorMessage);

        // Optionally set specific error states
        setError(errorMessage);
      } else {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await sendOAuthData(result.user);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Google Sign-In Error:", error.message);
        toast.error(error.message);
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Facebook Login
  // const handleFacebookLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, facebookProvider);
  //     sendOAuthData(result.user);
  //   } catch (error) {
  //     console.error("Facebook Sign-In Error:", error.message);
  //   }
  // };

  const sendOAuthData = async (user: { email: string | null }) => {
    try {
      const data = (await login({
        email: user.email,
        oauth: false,
      })) as { user: { id: string } };

      const business = await getBusiness(data.user.id);
      setUserDetails(business.data);
      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error sending OAuth data:", error);
      if (error instanceof AxiosError) {
        const errorMessage = error.message || "Login failed. Please try again.";
        toast.error(errorMessage || "An unexpected error occurred.");
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="text-center mt-3">
        <H1>Welcome</H1>
        <P>Let's Get Back To Managing your Business</P>
      </div>
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="mt-5">
          <label htmlFor="email" className="text-small">
            Email Address
          </label>
          <div className="flex border-2 rounded-md mt-2 relative items-center">
            <label
              htmlFor="email"
              className="w-4 h-4 my-auto absolute left-4 cursor-text"
            >
              <PersonIcon />
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email Address"
              className="focus:outline-none py-2 w-full px-10"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mt-5">
          <label htmlFor="password" className="text-small">
            Password
          </label>
          <div className="flex border-2 rounded-md mt-2 relative items-center">
            <label
              htmlFor="password"
              className="w-4 h-4 my-auto absolute left-4 cursor-text"
            >
              <Lock size={15} />
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="focus:outline-none py-2 w-full px-10"
            />
            {showPassword ? (
              <EyeOff
                className="w-4 h-4 my-auto absolute right-4 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                className="w-4 h-4 my-auto absolute right-4 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          <div className="flex justify-between mt-4">
            <div className="flex gap-1">
              <input type="checkbox" id="remember" />
              <label className="" htmlFor="remember">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm underline text-[#870E73]"
            >
              Forgot Password
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`
              text-white flex items-center justify-center
              ${isLoading ? "bg-[#870E7388]" : "bg-[#870E73CC]"} 
              mt-5 w-full rounded-lg py-2
              ${isLoading ? "cursor-not-allowed" : ""}
            `}
          >
            {isLoading ? (
              <>
                {" "}
                <Loader2 className="animate-spin size-4 mr-2" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="flex my-5 items-center">
            <div className="w-full border border-black h-px"></div>
            <p className="mx-5">or</p>
            <div className="w-full border border-black h-px"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="text-black bg-white mt-5 w-full rounded-lg py-2 border-2 flex justify-center gap-2 cursor-pointer hover:bg-gray-100 transition duration-300"
          >
            {isGoogleLoading ? (
              <Loader2 className="animate-spin size-5 mr-2" />
            ) : (
              <>
                <img src={googleImg} alt="Google login" />
                Login with Google
              </>
            )}
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
      </form>
    </div>
  );
};

export default Login;
