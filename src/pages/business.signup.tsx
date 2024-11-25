import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { MapPin, Phone, Building2, Upload } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const BusinessSetup = () => {
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userData = location.state?.userData || {};
  const initialPhoneNumber = location.state?.phoneNumber || '';

  const [formData, setFormData] = useState({
    businessName: '',
    businessLocation: '',
    phoneNumber: initialPhoneNumber,
    usageType: '',
    description: '',
    logo: null as File | null,
    sameAsPhone: true // Default to true since we're coming from signup
  });

  const countryList = [
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dialCode: '+234' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭', dialCode: '+233' },
  ];

  const usageOptions = [
    { id: 'regular', label: 'Regular - Storefronts & Business Management' },
    { id: 'chowbot', label: 'Chowbot + Everything in Regular (Restaurant)' }
  ];
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    // Check if the input is a checkbox
    if (type === 'checkbox' && name === 'sameAsPhone') {
      const checked = (e.target as HTMLInputElement).checked; // Narrowing the type to HTMLInputElement to access 'checked'
      setFormData(prev => ({
        ...prev,
        phoneNumber: checked ? initialPhoneNumber : '',
        sameAsPhone: checked
      }));
    } else {
      // Handle other input types (text input, select, textarea, etc.)
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setFormData(prev => ({ ...prev, logo: file }));
    } else {
      alert('File size should be less than 10MB');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Combined data:', {
      ...formData,
      userData
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-2">Setup your business</h1>
        <p className="text-gray-600">Welcome, {userData.fullName}! Let's get your business online!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rest of the form fields remain the same */}
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
              >
                <option value="">Select Country</option>
                {countryList.map(country => (
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
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="sameAsPhone"
                checked={formData.sameAsPhone}
                onChange={handleInputChange}
                className="w-4 h-4 rounded-lg accent-[#870E73]"
              />
              <span className="text-sm">Same as my phone</span>
            </div>
            <div className="p-2 border-2 rounded-lg flex gap-2">
              <Phone className="w-4 h-4 my-auto text-gray-500" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter Business Phone Number"
                className="w-full focus:outline-none"
                disabled={formData.sameAsPhone}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-1">How would you like to use Thrivr?</label>
          <div className="space-y-2">
            {usageOptions.map(option => (
              <label key={option.id} className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:border-[#870E73]">
                <input
                  type="radio"
                  name="usageType"
                  value={option.id}
                  checked={formData.usageType === option.id}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-[#870E73]"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1">Describe your business - what you sell</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Tell us about your business..."
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#870E73] min-h-[100px]"
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
              <p className="mt-2 text-sm text-[#870E73]">{formData.logo.name}</p>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#870E73] text-white rounded-lg py-3 font-semibold hover:opacity-90 transition-opacity"
        >
          Create Business
        </button>
      </form>
    </div>
  );
};

export default BusinessSetup;
