import { useData } from "@/context/DataContext";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const token = queryParams.get("token");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { resetPassword, forgetPassword } = useData();

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(event.target as HTMLFormElement);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await resetPassword({
        signature: token as string,
        password: password as string,
      });
      setSuccess(true);
      navigate("/login");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            setError(error.response?.data?.error || "Failed to send reset link");
          } else {
            setError((error as Error).message || "Failed to send reset link");
          }
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowPassword(e.target.checked);
  };

  const handleForgotPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email");

    try {
      await forgetPassword({
        email: email as string,
        url: "https://thrivr-app-mu.vercel.app",
      });
      setSuccess(true);
    } catch (error) {
        console.log(error)
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Failed to send reset link");
      } else {
        setError((error as Error).message || "Failed to send reset link");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      {token ? (
        <form onSubmit={handleResetPassword}>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Reset Password
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">
              Password reset successfully
            </p>
          )}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870E73]"
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870E73]"
              placeholder="Confirm new password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="showPassword" className="inline-flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                className="form-checkbox"
                onChange={(e) => {
                  handleShowPassword(e);
                }}
              />
              <span className="ml-2 text-sm text-gray-700">Show Password</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#870E73] text-white rounded-lg hover:opacity-80 transition duration-300"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleForgotPassword}>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Forgot Password
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">
              Reset link sent successfully, check your email
            </p>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870E73]"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#870E73] text-white rounded-lg hover:opacity-80 transition duration-300"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      )}
      <div className="text-center mt-4">
        <a
          href="/login"
          className="text-[#870E73] hover:underline"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
