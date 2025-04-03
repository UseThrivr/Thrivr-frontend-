import { FC, useState, ChangeEvent, FormEvent } from "react";
import { P } from "@/components/global";
import { Dot, Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import googleImg from "../assets/devicon_google.png";
import { auth, googleProvider, signInWithPopup } from "../../firebase";
import toast from "react-hot-toast";
// import facebookImg from "../assets/logos_facebook.png";

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
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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

  const sendOAuthData = async (user: {
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }) => {
    try {
      navigate("/business", {
        state: {
          userData: {
            fullname: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            oauth: true,
          },
        },
      });
    } catch (error) {
      console.error("Registration navigation error:", error);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: "",
    };
    if (pageIndex === 0) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    } else {
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).every(
      (key) => !newErrors[key as keyof FormErrors]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pageIndex === 0 && validateForm()) {
      setPageIndex(1);
      return;
    }
    if (validateForm()) {
      try {
        // Navigate to business setup with initial registration data
        navigate("/business", {
          state: {
            userData: {
              fullname: formData.fullName,
              email: formData.email,
              password: formData.password,
              oauth: false,
            },
          },
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
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="pb-10">
      <div className="text-start">
        <h1 className="text-4xl mb-2 font-semibold">
          Let's create your account
        </h1>
        <P>Get all your business tools you need in one place</P>
      </div>

      <form id="form" onSubmit={handleSubmit} className="mt-5">
        {pageIndex == 0 ? (
          <div>
            <div>
              <p className="">Full name</p>
              <div className="flex border-2 rounded-md mt-2 relative items-center">
                <label
                  htmlFor="fullName"
                  className="w-4 h-4 my-auto absolute left-4 cursor-text"
                >
                  <User size={15} />
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your email Address"
                  className="focus:outline-none py-2 w-full px-10"
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
              <div className="flex border-2 rounded-md mt-2 relative items-center">
                <label
                  htmlFor="email"
                  className="w-4 h-4 my-auto absolute left-4 cursor-text"
                >
                  <Mail size={15} />
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email Address"
                  className="focus:outline-none py-2 w-full px-10"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 flex text-xs mt-1 items-center">
                  <Dot /> {errors.email}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="mt-5">
              <p className="">Password</p>
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
                  value={formData.password}
                  onChange={handleInputChange}
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
                <p className="text-red-500 flex text-xs mt-1 items-center">
                  <Dot /> {errors.password}
                </p>
              )}
            </div>

            <div className="mt-5">
              <p className="">Confirm Password</p>
              <div className="flex border-2 rounded-md mt-2 relative items-center">
                <label
                  htmlFor="confirmPassword"
                  className="w-4 h-4 my-auto absolute left-4 cursor-text"
                >
                  <Lock size={15} />
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="focus:outline-none py-2 w-full px-10"
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
          </div>
        )}

        <button className="w-full rounded-2xl bg-[#870E73] text-white p-2 mt-10 font-semibold">
          {pageIndex == 0 ? "Continue" : "Sign Up"}
        </button>
      </form>

      <div className="flex my-5">
        <div className="w-full border border-black h-fit my-auto"></div>
        <p className="mx-5">or</p>
        <div className="w-full border border-black h-fit my-auto"></div>
      </div>

      <div className="flex gap-x-10 flex-col lg:flex-row">
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
        {/* <button
          type="button"
          onClick={() => navigate("/setupbusiness")}
          className="text-black bg-white mt-5 w-full rounded-lg py-2 border-2 flex justify-center gap-2"
        >
          <img src={facebookImg} alt="" />
          Sign In with Facebook
        </button> */}
      </div>
      <div className="mt-10">
        <p className="">
          Already have an account?{" "}
          <Link to="/login" className="text-[#870E73] ms-1">
            log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
