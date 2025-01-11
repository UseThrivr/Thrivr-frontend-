import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { MapPin, Phone, Building2, Upload, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust import path as needed

const BusinessSetup = () => {
  const navigate = useNavigate();
  const { register, verifyOTP } = useAuth();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userData = location.state?.userData || {};

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userData.email) {
      navigate("/signup");
    }
  }, []);

  const [formData, setFormData] = useState({
    businessName: "",
    businessLocation: "",
    phoneNumber: "",
    description: "",
    logo: null as File | null,
  });

  const countryList = [
    { code: "NG", name: "Nigeria", flag: "🇳🇬", dialCode: "+234" },
    { code: "GH", name: "Ghana", flag: "🇬🇭", dialCode: "+233" },
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setFormData((prev) => ({ ...prev, logo: file }));
    } else {
      alert("File size should be less than 10MB");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Combine initial signup data with business data
      const completeRegistrationData = formData.logo
        ? {
            full_name: userData.fullname,
            email: userData.email,
            password: userData.password,
            business_name: formData.businessName,
            location: formData.businessLocation,
            phone_number:
              formData.businessLocation === "NG"
                ? `+234${formData.phoneNumber.trim()}`
                : `+233${formData.phoneNumber.trim()}`,
            description: formData.description,
            logo: formData.logo || "",
          }
        : {
            full_name: userData.fullname,
            email: userData.email,
            password: userData.password,
            business_name: formData.businessName,
            location: formData.businessLocation,
            phone_number:
              formData.businessLocation === "NG"
                ? `+234${formData.phoneNumber.trim()}`
                : `+233${formData.phoneNumber.trim()}`,
            description: formData.description,
          };

      console.log({ ...completeRegistrationData });
      const response = await register(completeRegistrationData);
      console.log(response);
      setShowOtp(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    setOtpLoading(true);
    try {
      const otpVerification = {
        otp: otp.join(""),
        email: userData.email,
      };
      await verifyOTP(otpVerification);
      navigate("/onboarding");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {showOtp && (
        <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-50">
          <div className="relative w-[550px] bg-white rounded-[13px] p-8 shadow-lg scale-95 animate-scaleIn">
            <button
              onClick={() => setShowOtp(false)}
              className="absolute -top-16 -right-16 w-[64px] h-[64px] bg-white rounded-full p-1 shadow-md flex items-center justify-center"
            >
              <X className="text-gray-700" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-[32px] font-semibold mb-2">
                Email Verification
              </h2>
              <p className="text-[#5C636D]">
                Input the four-digit code sent to your email
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

            <button
              onClick={handleOtpVerification}
              className="w-full bg-[#870E73] text-white rounded-[24px] py-4 hover:opacity-90"
              disabled={otpLoading}
            >
              {otpLoading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-2">Setup your business</h1>
        <p className="text-gray-600">
          Welcome, {userData.fullname}! Let's get your business online!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1">Business Name</label>
          <div className="p-2 border-2 rounded-lg flex gap-2">
            <Building2 className="w-4 h-4 my-auto text-gray-500" />
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              placeholder="Enter Business Name"
              className="w-full focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Where is this business based?</label>
          <div className="relative">
            <div className="p-2 border-2 rounded-lg flex gap-2">
              <MapPin className="w-4 h-4 my-auto text-gray-500" />
              <select
                name="businessLocation"
                value={formData.businessLocation}
                onChange={handleInputChange}
                className="w-full focus:outline-none appearance-none bg-transparent"
                required
              >
                <option value="">Select Country</option>
                {countryList.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name} ({country.dialCode})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-1">Business WhatsApp Number</label>
          <div className="p-2 border-2 rounded-lg flex gap-2">
            <Phone className="w-4 h-4 my-auto text-gray-500" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter Business Phone Number"
              className="w-full focus:outline-none"
              maxLength={10}
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">
            Describe your business - what you sell
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Tell us about your business..."
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#870E73] min-h-[100px]"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Upload business Logo - Optional</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-[#870E73] text-center"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-500" />
            <p className="text-sm text-gray-500">PNG, JPG | 10MB max</p>
            {formData.logo && (
              <p className="mt-2 text-sm text-[#870E73]">
                {formData.logo.name}
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#870E73] text-white rounded-lg py-3 font-semibold hover:opacity-90 transition-opacity"
        >
          {loading ? "Creating Business..." : "Create Business"}
        </button>
      </form>
    </div>
  );
};

export default BusinessSetup;
