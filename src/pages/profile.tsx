import { Seo } from "@/components/global";
import { profile } from "@/constants";
import clsx from "clsx";
import {
  Copy,
  CreditCard,
  KeySquare,
  MoveRight,
  Settings,
  SquarePen,
  Trash,
  Users,
} from "lucide-react";
import Rectangle from "/src/assets/profile/Rectangle.png";
import Camera from "/src/assets/profile/add_a_photo.png";
import ProfileImg from "/src/assets/profile/Logo.svg";
import { useState } from "react";
import { ApiKey, StoreSettings } from "@/components/dashboard";

const contact = [
  {
    title: "Name",
    info: profile.contact.name,
  },
  {
    title: "Email",
    info: profile.contact.email,
  },
  {
    title: "Phone",
    info: profile.contact.phone,
  },
  {
    title: "Address",
    info: profile.contact.address,
  },
];

const cta = [
  {
    title: "Store configuration",
    info: "Display image, Theme, Opening & closing hours,  and store currency",
    cta: "Store settings",
    icon: <Settings />,
    link: "store-settengs",
  },
  {
    title: "API key",
    info: "Generate and manage API keys to integrate external services and enhance features",
    cta: "Generate API key",
    icon: <KeySquare />,
    link: "api-key",
  },
  {
    title: "Store managers",
    info: "Grant access to manage your store by setting roles, permissions, and access levels ",
    cta: "Manage store managers",
    icon: <Users />,
    link: "store-managers",
  },
  {
    title: "Subscription plan",
    info: "Choose a plan that fits your needs and enjoy uninterrupted access to these tools",
    cta: "Manage subscription",
    icon: <CreditCard />,
    link: "subscription-plan",
  },
];

const Profile = () => {
  const [isStoreSettingOpen, setIsStoreSettingOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);

  const handleDisplay = ({ active }: { active: string }) => {
    if (active === "Store configuration") {
      setIsStoreSettingOpen(true);
    } else {
      setIsApiKeyOpen(true);
    }
  };

  return (
    <>
      <Seo title={`${profile.storename} | Profile`} />
      <section className="px-6 2xl:px-8 py-6 w-full h-full flex flex-col items-center gap-4 justify-center max-w-[500px] md:max-w-[1700px] mx-auto">
        <div className="w-full relative top-0 2xl:-top-4">
          <img
            className="w-full object-cover rounded-md h-52 2xl:h-72"
            src={Rectangle}
            alt="rectangle"
            width={1329}
            height={286}
          />
          <img
            className="absolute top-8 right-4 2xl:top-12 2xl:right-8 w-8 h-8 2xl:w-10 2xl:h-10 cursor-pointer"
            src={Camera}
            alt="add a photo"
            width={40}
            height={40}
          />
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full gap-4 2xl:gap-7 pl-8 2xl:pl-16 flex">
            <div className="relative -top-28 2xl:-top-40 rounded-full w-52 2xl:w-72 flex items-center justify-center h-52 2xl:h-72 bg-neutral-alt border 2xl:border-2 border-neutral-border">
              <img
                className="w-2/4"
                src={profile.logo || ProfileImg}
                alt={profile.storename}
              />
              <SquarePen className="absolute bottom-5 right-5 2xl:bottom-7 2xl:right-7 w-6 h-6 2xl:w-8 2xl:h-8 cursor-pointer text-secondary-foreground text-text-secondary" />
            </div>
            <div className="flex items-start justify-between flex-1">
              <div className="flex flex-col items-start gap-4 2xl:gap-6">
                <div className="flex flex-col gap-1 2xl:gap-2">
                  <h1 className="font-semibold text-2xl md:text-4xl 2xl:text-5xl text-text-primary">
                    {profile.storename}
                  </h1>
                  <p className="font-normal text-sm 2xl:text-base text-text-secondary">
                    {profile.tagline}
                  </p>
                </div>
                <div className="flex flex-col gap-1 2xl:gap-2">
                  <p className="font-medium text-sm 2xl:text-base text-text-secondary">
                    Store Link
                  </p>
                  <div className="flex items-center text-action-default hover:text-action-hover cursor-pointer gap-2 2xl:gap-4">
                    <span className=" font-medium text-lg 2xl:text-xl">
                      {profile.link}
                    </span>
                    <Copy className="w-6 h-6 2xl:w-8 2xl:h-8" />
                  </div>
                </div>
              </div>
              <div
                className={clsx(
                  "box-border cursor-pointer flex justify-center items-center py-[8px] px-[16px] h-[46px] gap-[16px] bg-white border border-solid border-action-default rounded-[24px]",
                  "font-medium text-[20px] leading-[30px] text-action-default"
                )}
              >
                <Trash size={24} className="text-action-default" />
                Delete account
              </div>
            </div>
          </div>
          <div className="flex gap-16 2xl:gap-24">
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-xl 2xl:text-2xl text-text-primary">
                Contact
              </h2>
              <div className="flex flex-col gap-4">
                {contact.map((item, i) => (
                  <div key={i} className="flex gap-1 flex-col">
                    <h3 className="font-medium text-xs text-text-secondary">
                      {item.title}
                    </h3>
                    <p className="font-normal text-base">{item.info}</p>
                  </div>
                ))}
              </div>
              <a
                href={`/profile/${profile.userid}/edit`}
                className="flex items-center text-action-default hover:text-action-hover transition-all cursor-pointer gap-2 2xl:gap-4"
              >
                <span className=" font-medium text-lg 2xl:text-xl">
                  Update Contact Details
                </span>
                <MoveRight className="w-6 h-6 2xl:w-8 2xl:h-8" />
              </a>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-20">
              {cta.map((item, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    {item.icon}
                    <h3 className="font-semibold text-xl 2xl:text-2xl flex items-center gap-6 text-text-primary">
                      {item.title}
                      {item.title === "Subscription plan" && (
                        <span className="font-medium text-base">
                          {profile.subscription}
                        </span>
                      )}
                    </h3>
                  </div>
                  <p className="font-normal text-base">{item.info}</p>
                  {item.title === "Store configuration" ||
                  item.title === "API key" ? (
                    <button
                      onClick={() => handleDisplay({ active: item.link })}
                      className="flex items-center text-action-default hover:text-action-hover transition-all cursor-pointer gap-2 2xl:gap-4"
                    >
                      <span className=" font-medium text-lg 2xl:text-xl">
                        {item.cta}
                      </span>
                      <MoveRight className="w-6 h-6 2xl:w-8 2xl:h-8" />
                    </button>
                  ) : (
                    <a
                      href={`/profile/${item.link}`}
                      className="flex items-center text-action-default hover:text-action-hover transition-all cursor-pointer gap-2 2xl:gap-4"
                    >
                      <span className=" font-medium text-lg 2xl:text-xl">
                        {item.cta}
                      </span>
                      <MoveRight className="w-6 h-6 2xl:w-8 2xl:h-8" />
                    </a>
                  )}
                  {/* <div className="flex items-center text-action-default hover:text-action-hover transition-all cursor-pointer gap-2 2xl:gap-4">
                    <span className=" font-medium text-lg 2xl:text-xl">
                      {item.cta}
                    </span>
                    <MoveRight className="w-6 h-6 2xl:w-8 2xl:h-8" />
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <StoreSettings
          isOpen={isStoreSettingOpen}
          onClose={() => setIsStoreSettingOpen(false)}
        />
        <ApiKey
          isOpen={isApiKeyOpen}
          onClose={() => setIsApiKeyOpen(false)}
        />
      </section>
    </>
  );
};

export default Profile;
