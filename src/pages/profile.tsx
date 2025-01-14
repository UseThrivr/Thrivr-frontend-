import { Seo } from "@/components/global";
import { profiles } from "@/constants";
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
import Camera from "/src/assets/profile/add_a_photo.png";
import { useState } from "react";
import { StoreSettings } from "@/components/dashboard";
import { useAuth } from "@/context/AuthContext";

const cta = [
  {
    title: "Store configuration",
    info: "Display image, Theme, Opening & closing hours,  and store currency",
    cta: "Store settings",
    icon: <Settings />,
    link: "store-settings",
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
  const { user } = useAuth();
  const profile = user;

  const contact = [
    {
      title: "Name",
      info: profile?.full_name,
    },
    {
      title: "Email",
      info: profile?.email,
    },
    {
      title: "Phone",
      info: profile?.phone_number,
    },
    {
      title: "Address",
      info: profile?.location,
    },
  ];

  const handleDisplay = ({ active }: { active: string }) => {
    if (active === "store-settings") {
      setIsStoreSettingOpen(true);
    }
  };

  return (
    <>
      <Seo title={`${profile?.business_name} | Profile`} />
      <section className="w-full md:px-4 flex flex-col items-center gap-4 justify-center max-w-[1700px] mx-auto">
        <div className="w-full relative">
          <img
            className="w-full object-cover rounded-md h-40 2xl:h-72"
            src={profiles.backgroundImg}
            alt="rectangle"
            width={1329}
            height={286}
          />
          <img
            onClick={() => setIsStoreSettingOpen(true)}
            className="absolute top-6 right-4 md:top-8 size-6 md:size-8 cursor-pointer hidden md:block"
            src={Camera}
            alt="add a photo"
            width={40}
            height={40}
          />
          <a href="/profile/store-settings" className="flex md:hidden">
            <img
              className="absolute top-6 right-4 md:top-8 size-6 md:size-8 cursor-pointer"
              src={Camera}
              alt="add a photo"
              width={40}
              height={40}
            />
          </a>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full gap-2 md:gap-4 2xl:gap-7 pl-4 md:pl-8 2xl:pl-16 flex">
            <div className="relative -top-16 md:-top-28 2xl:-top-40 rounded-full size-28 md:size-52 2xl:size-72 flex items-center justify-center bg-neutral-alt border 2xl:border-2 border-neutral-border">
              {profile?.image_path ? (
                <img
                  className="object-cover rounded-full size-28 md:size-52 2xl:size-72"
                  src={profile?.image_path}
                  alt={profile?.business_name}
                />
              ) : (
                <img
                  className=" w-1/2"
                  src={profiles.logo}
                  alt={profile?.business_name}
                />
              )}
              <a href={`/profile/${profile?.id}/edit`}>
                <SquarePen className="absolute bottom-2 right-2 md:bottom-5 md:right-5 2xl:bottom-7 2xl:right-7 size-4 md:size-6 2xl:w-8 2xl:h-8 cursor-pointer text-secondary-foreground text-text-secondary" />
              </a>
            </div>
            <div className="flex items-start justify-between flex-1">
              <div className="flex flex-col items-start gap-4 2xl:gap-6">
                <div className="flex flex-col gap-1 2xl:gap-2">
                  <h1 className="font-semibold text-2xl md:text-4xl 2xl:text-5xl text-text-primary">
                    {profile?.business_name}
                  </h1>
                  <p className="font-normal text-sm 2xl:text-base text-text-secondary">
                    {profile?.tagline}
                  </p>
                </div>
                <div className="hidden md:flex flex-col gap-1 2xl:gap-2">
                  <p className="font-medium text-sm 2xl:text-base text-text-secondary">
                    Store Link
                  </p>
                  <div className="flex items-center text-action-default hover:text-action-hover cursor-pointer gap-2 2xl:gap-4">
                    <span className=" font-medium text-lg 2xl:text-xl max-w-64 truncate">
                      {profiles.link}
                    </span>
                    <Copy className="w-6 h-6 2xl:w-8 2xl:h-8" />
                  </div>
                </div>
              </div>
              <div className="hidden box-border cursor-pointer lg:flex justify-center items-center py-[8px] px-[16px] h-[46px] gap-[16px] bg-white border border-solid border-action-default rounded-[24px] font-medium text-[20px] leading-[30px] text-action-default">
                <Trash size={24} className="text-action-default" />
                Delete account
              </div>
            </div>
          </div>
          <div className="md:hidden flex flex-col gap-4 items-start -mt-8 mb-8">
            <div className="flex flex-col gap-1 2xl:gap-2">
              <p className="font-medium text-sm 2xl:text-base text-text-secondary">
                Store Link
              </p>
              <div className="flex items-center text-action-default hover:text-action-hover cursor-pointer gap-1">
                <span className=" font-medium text-base md:text-lg 2xl:text-xl max-w-60 truncate">
                  {profiles.link}
                </span>
                <Copy className="w-6 h-6 2xl:w-8 2xl:h-8" />
              </div>
            </div>
            <div className="flex box-border cursor-pointer w-max justify-center items-center py-[4px] md:py-[8px] px-[16px] gap-[16px] bg-white border border-solid border-action-default rounded-[24px] font-medium text-[16px] md:text-[20px] leading-[30px] text-action-default">
              <Trash size={24} className="text-action-default" />
              Delete account
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-16 2xl:gap-24">
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
                href={`/profile/${profile?.id}/edit`}
                className="flex items-center text-action-default hover:text-action-hover transition-all cursor-pointer gap-2 2xl:gap-4"
              >
                <span className=" font-medium text-lg 2xl:text-xl">
                  Update Contact Details
                </span>
                <MoveRight className="w-6 h-6 2xl:w-8 2xl:h-8" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
              {cta.map((item, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div>{item.icon}</div>
                    <h3 className="font-semibold text-xl 2xl:text-2xl flex flex-col items-start justify-between text-text-primary">
                      {item.title}
                      {item.link === "api-key" ||
                      item.link === "subscription-plan" ? (
                        <span className="font-medium text-sm">Coming soon</span>
                      ) : (
                        ""
                      )}
                    </h3>
                  </div>
                  <p className="font-normal text-base">{item.info}</p>
                  {item.link === "store-settings" ||
                  item.link === "api-key" ||
                  item.link === "subscription-plan" ? (
                    <>
                      {item.link === "api-key" ||
                      item.link === "subscription-plan" ? (
                        <button className="flex items-center text-action-default hover:text-action-hover transition-all cursor-pointer gap-2 2xl:gap-4">
                          <span className=" font-medium text-lg 2xl:text-xl">
                            {item.cta}
                          </span>
                          <MoveRight className="w-6 h-6 2xl:w-8 2xl:h-8" />
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleDisplay({ active: item.link })}
                            className="hidden lg:flex items-center text-action-default hover:text-action-hover transition-all cursor-pointer gap-2 2xl:gap-4"
                          >
                            <span className=" font-medium text-lg 2xl:text-xl">
                              {item.cta}
                            </span>
                            <MoveRight className="w-6 h-6 2xl:w-8 2xl:h-8" />
                          </button>
                          <a
                            href={`/profile/${item.link}`}
                            className="flex lg:hidden items-center text-action-default hover:text-action-hover transition-all cursor-pointer gap-2 2xl:gap-4"
                          >
                            <span className=" font-medium text-lg 2xl:text-xl">
                              {item.cta}
                            </span>
                            <MoveRight className="w-6 h-6 2xl:w-8 2xl:h-8" />
                          </a>
                        </>
                      )}
                    </>
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
                </div>
              ))}
            </div>
          </div>
        </div>
        <StoreSettings
          isOpen={isStoreSettingOpen}
          onClose={() => setIsStoreSettingOpen(false)}
        />
      </section>
    </>
  );
};

export default Profile;
