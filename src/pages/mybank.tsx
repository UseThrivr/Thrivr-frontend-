import { Seo } from "@/components/global";
import Nigeria from "@/assets/Nigeria.png";
import PaystackImg from "@/assets/Paystack.png";
import { ChevronDown, Landmark } from "lucide-react";
import PaymentBox from "@/components/dashboard/PaymentBox";
import { useState } from "react";
import PaymentPopup from "@/components/dashboard/PaymentPopup";
import WalletCard from "@/components/dashboard/WalletCard";

const Mybank = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <Seo title="Bank Accounts" />
      <section className="w-full h-screen pt-[1rem]">
        <div className="flex flex-col gap-[4px] mb-5 w-full">
          <h1 className="font-[600] text-[48px] leading-[52.8px] tracking-[-1%] text-primary hidden md:flex">
            Bank accounts
          </h1>
          <p className="text-[1rem] leading-[22.4px] font-[500] text-[#5c636d]">
            Add both Paystack and Bank Transfers to give buyers option to choose
            and prevent payment delays
          </p>
        </div>
        <div className="max-w-[649px] w-full flex gap-4 items-center mb-[32px] overflow-auto invincible-scrollbar">
          <WalletCard image={Nigeria} chevron={ChevronDown} title="₦43.86" content="Nigerian Naira (NGN)" />
          <WalletCard title="Open" content="10 currencies" />
        </div>
        <div className="flex flex-col gap-10">
          <PaymentBox
            icon={<Landmark />}
            title="Bank Transfer"
            texts="Add a Nigerian bank account to receive payments directly from this app"
            list={[
              "Zero transaction fee",
              "1-2% FX fee",
              "1-2 days Pay out time",
            ]}
            buttonText="Add bank account"
            onButtonClick={openPopup}
          />
          <PaymentBox
            image={PaystackImg}
            title="PayStack"
            texts="Connect to receive payments using your Paystack"
            list={[
              "1.5% Transaction fee",
              "1-2% FX fee",
              "1-2 days Pay out time",
            ]}
            buttonText="Connect"
            onButtonClick={openPopup}
          />
        </div>

        <PaymentPopup isOpen={isPopupOpen} onClose={closePopup} />
      </section>
    </>
  );
};

export default Mybank;
