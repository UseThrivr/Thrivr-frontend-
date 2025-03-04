import { Seo } from "@/components/global";
import { profiles } from "@/constants";
import {
  Check,
  Copy,
  CreditCard,
  KeySquare,
  Loader2,
  MoveRight,
  Settings,
  SquarePen,
  Trash,
  TriangleAlert,
  Users,
} from "lucide-react";
import Camera from "/src/assets/profile/add_a_photo.png";
import { useState } from "react";
import { StoreSettings } from "@/components/dashboard";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";

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
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { deleteAccount } = useData();
  const navigate = useNavigate();
  const profile = user;

  const DeleteConfirmationModal = ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) => (
    <div className="absolute top-0 left-0 w-full h-full bg-[#000000CC] flex justify-center z-50 overflow-auto">
            <div className="py-24 flex items-center min-h-fit w-full justify-center">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex gap-2"><TriangleAlert className="text-red-600" /> Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete your {profile?.business_name} account forever? This action cannot be undone.</p>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md">{loading ? <Loader2 className="animate-spin" /> : "Delete"}</button>
        </div>
      </div>
      </div>
    </div>
  );

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDelete = () => {
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);

      // Attempt login using AuthContext's login method
      await deleteAccount();

      // Show success toast and navigate to dashboard
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorMessage = err.message || "Delete failed. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("Delete Failed!");
      }
    } finally {
      setLoading(false);
      setShowDeletePopup(false);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(profiles.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                  <button
                    disabled={copied}
                    onClick={handleCopy}
                    className="flex items-center text-action-default hover:text-action-hover cursor-pointer gap-2 2xl:gap-4"
                  >
                    <span className=" font-medium text-lg 2xl:text-xl max-w-64 truncate">
                      {profiles.link}
                    </span>
                    {copied ? (
                      <Check className="w-6 h-6 2xl:w-8 2xl:h-8" />
                    ) : (
                      <Copy className="w-6 h-6 2xl:w-8 2xl:h-8" />
                    )}
                  </button>
                </div>
              </div>
              <button onClick={handleDelete} className="hidden box-border cursor-pointer lg:flex justify-center items-center py-[8px] px-[16px] h-[46px] gap-[16px] bg-white border border-solid border-action-default rounded-[24px] font-medium text-[20px] leading-[30px] text-action-default">
                <Trash size={24} className="text-action-default" />
                Delete account
              </button>
            </div>
          </div>
          <div className="md:hidden flex flex-col gap-4 items-start -mt-8 mb-8">
            <div className="flex flex-col gap-1 2xl:gap-2">
              <p className="font-medium text-sm 2xl:text-base text-text-secondary">
                Store Link
              </p>
              <button
                disabled={copied}
                onClick={handleCopy}
                className="flex items-center text-action-default hover:text-action-hover cursor-pointer gap-2 2xl:gap-4"
              >
                <span className=" font-medium text-lg 2xl:text-xl max-w-64 truncate">
                  {profiles.link}
                </span>
                {copied ? (
                  <Check className="w-6 h-6 2xl:w-8 2xl:h-8" />
                ) : (
                  <Copy className="w-6 h-6 2xl:w-8 2xl:h-8" />
                )}
              </button>
            </div>
            <button onClick={handleDelete} className="flex box-border cursor-pointer w-max justify-center items-center py-[4px] md:py-[8px] px-[16px] gap-[16px] bg-white border border-solid border-action-default rounded-[24px] font-medium text-[16px] md:text-[20px] leading-[30px] text-action-default">
              <Trash size={24} className="text-action-default" />
              Delete account
            </button>
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
        {showDeletePopup && (
          <DeleteConfirmationModal
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </section>
    </>
  );
};

export default Profile;
