import AdComp from "@/components/ads/AdComp";
import NewCampaign from "@/components/ads/NewCampaign";
import { H1, P, Seo } from "@/components/global";
import { Megaphone } from "lucide-react";
import { useState } from "react";
import { campaigns, campaignData } from "@/data/ads/campaignData";

const Ads = () => {
  const buttons = ["All", "Facebook Ads", "Instagram Ads", "Email Ads"];
  const [tabNum, setTabNum] = useState<number>(1);

    const filterFacebookAds = (campaigns: campaignData[]): campaignData[] => {
        return campaigns.filter(campaigns => campaigns.name.includes("Facebook"))
    }
    const instagramFacebookAds = (campaigns: campaignData[]): campaignData[] => {
        return campaigns.filter(campaigns => campaigns.name.includes("Instagram"))
    }
    const emailFacebookAds = (campaigns: campaignData[]): campaignData[] => {
        return campaigns.filter(campaigns => campaigns.name.includes("Email"))
    }

  const facebookAds = filterFacebookAds(campaigns);
  const instagramAds = instagramFacebookAds(campaigns);
  const emailAds = emailFacebookAds(campaigns);

  const [addNewCampaign, setAddNewCampaign] = useState<boolean>(false);

  return (
    <>
      <Seo title="Ads" />
      <section className="px-[5%] pb-20">
        <H1>Campaign & Ads</H1>
        <P className="mt-1">
          Make it easier for potential customers to find your business with Ads
        </P>
        <div className="mt-10">
          <div className="flex justify-between flex-col-reverse lg:flex-row">
            <div className="flex gap-3 mt-3 lg:mt-0">
              {buttons.map((btn, index) => (
                <button
                  onClick={() => setTabNum(index + 1)}
                  className={`${
                    tabNum === index + 1 ? "border-b-4" : "border-none"
                  } p-3 border-black`}
                >
                  {btn}
                </button>
              ))}
            </div>
            <div className="">
              <button
                onClick={() => setAddNewCampaign(!addNewCampaign)}
                className="rounded-full bg-[#870E73] text-white py-2 px-3 flex gap-3"
              >
                <Megaphone />
                Create New Campaign
              </button>
            </div>
          </div>

          <div className="rounded-lg p-3 divide-y-2 border-2 mt-10">
            {tabNum === 1 && (
              <div>
                {campaigns.map((campaign, index) => (
                  <AdComp key={index} data={campaign} />
                ))}
              </div>
            )}
            {tabNum === 2 && (
              <div>
                {facebookAds.map((campaign, index) => (
                  <AdComp key={index} data={campaign} />
                ))}
              </div>
            )}
            {tabNum === 3 && (
              <div>
                {instagramAds.map((campaign, index) => (
                  <AdComp key={index} data={campaign} />
                ))}
              </div>
            )}
            {tabNum === 4 && (
              <div>
                {emailAds.map((campaign, index) => (
                  <AdComp key={index} data={campaign} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      {addNewCampaign && (
        <NewCampaign onBtnClick={() => setAddNewCampaign(!addNewCampaign)} />
      )}
    </>
  );
};

export default Ads;
