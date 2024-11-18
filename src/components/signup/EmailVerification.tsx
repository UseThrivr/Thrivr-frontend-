import React, { useRef, useState } from "react";
import { P } from "../global";
import { Link } from "react-router-dom";

const EmailVerification = () => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; 

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (!code[index] && index > 0) {
       
        inputsRef.current[index - 1]?.focus();
      } else {
        
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4); 
    if (/^\d{4}$/.test(pastedData)) {
      setCode(pastedData.split(""));
      inputsRef.current[3]?.focus(); 
    }
  };

  return (
    <div className="absolute bg-slate-600 bg-opacity-50 w-screen h-screen grid place-content-center z-10">
      <div className="bg-white rounded-lg py-8 px-14 opacity-100 z-20">
        <P className="text-center text-3xl">Email Verification</P>
        <p className="text-center font-semibold">
          Input The Four Digits Code Sent to Your Email
        </p>
        <div className="flex justify-around my-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el!)} // Assign input to refs array
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button className="bg-[#870E73CC] rounded text-white my-5 w-full p-2">
          Verify
        </button>
        <Link to="" className="text-[#870E73CC] text-sm font-[500]">
          Didn't receive any code?
        </Link>
      </div>
    </div>
  );
};

export default EmailVerification;
