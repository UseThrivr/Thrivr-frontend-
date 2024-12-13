import { FC, useState, ChangeEvent, FormEvent } from "react";
import { P } from "@/components/global";
import { Dot, Lock, User, X } from "lucide-react";
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

interface OTPVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
}

const OTPVerification: FC<OTPVerificationProps> = ({
  isOpen,
  onClose,
  formData,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = () => {
    // Navigate to BusinessSetup with user data
    navigate("/business", {
      state: {
        userData: formData,
        // Extract phone from email for demo purposes - in real app, get from proper source
        phoneNumber: formData.email.includes("@")
          ? "+1234567890"
          : formData.email,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-50">
      <div className="relative w-[550px] bg-white rounded-[13px] p-8 shadow-lg scale-95 animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute -top-16 -right-16 w-[64px] h-[64px] bg-white rounded-full p-1 shadow-md flex items-center justify-center"
        >
          <X className="text-gray-700" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-[32px] font-semibold mb-2">Email verification</h2>
          <p className="text-[#5C636D]">
            Input the four digit code sent to your email
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-16 h-16 text-center text-2xl border-2 rounded-lg focus:border-[#870E73] focus:outline-none"
            />
          ))}
        </div>

        <p className="text-center mb-6">
          <button className="text-[#870E73]">
            Didn't receive code? Resend
          </button>
        </p>

        <button
          onClick={handleVerify}
          className="w-full bg-[#870E73] text-white rounded-[24px] py-4 hover:opacity-90"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

const Signup: FC = () => {
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
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
      agreeToTerms: "",
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
    return Object.keys(newErrors).every(
      (key) => !newErrors[key as keyof FormErrors]
    );
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
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const setButtonClick = () =>{
    if (pageIndex == 0) {
      setPageIndex(1)
    } else {
      
    }
  }

  return (
    <div className="pb-10">
      <div className="text-start">
        <h1 className="text-4xl mb-2 font-semibold">
          Let's create your account
        </h1>
        <P>Get all your business tools you need in one place</P>
      </div>

      <form id="form" className="mt-5">
        {pageIndex == 0 ? (
          <div>
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
          </div>
        ) : (
          <div>
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
          </div>
        )}

        <button
          onClick={setButtonClick}
          className="w-full rounded-2xl bg-[#870E73] text-white p-2 mt-10 font-semibold"
        >
          {pageIndex == 0 ? "Continue" : "Sign Up"}
        </button>

        <div className="flex my-5">
          <div className="w-full border border-black h-fit my-auto"></div>
          <p className="mx-5">or</p>
          <div className="w-full border border-black h-fit my-auto"></div>
        </div>

        <div className="flex gap-10">
          <button
            type="button"
            onClick={() => navigate("/setupbusiness")}
            className="text-black bg-white mt-5 w-full rounded-lg py-2 border-2 flex justify-center gap-2"
          >
            <img src={googleImg} alt="" />
            Sign In with Google
          </button>
          <button
            type="button"
            onClick={() => navigate("/setupbusiness")}
            className="text-black bg-white mt-5 w-full rounded-lg py-2 border-2 flex justify-center gap-2"
          >
            <img src={googleImg} alt="" />
            Sign In with Facebook
          </button>
        </div>
        <div className="mt-10">
          <p className="">Already have an account? <Link to="/login" className="text-[#870E73] ms-1">log In</Link></p>
        </div>
      </form>

      <OTPVerification
        isOpen={showOtp}
        onClose={() => setShowOtp(false)}
        formData={formData}
      />
    </div>
  );
};

export default Signup;
