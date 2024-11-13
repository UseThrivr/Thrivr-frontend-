import { H1, H4, P, Seo } from "@/components/global";
import Navbar from "@/components/homepage/Navbar";
import { Link } from "react-router-dom";
import HelpComp from "../components/homepage/Help";
import ProductSample from "../components/homepage/ProductSample";
import Footer from "@/components/homepage/Footer";
import FAQ from "@/components/homepage/FAQ";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroDashboardImage from "../assets/HeroDashboardImage.png";
import { YoutubeIcon } from "lucide-react";

import AirPeace from "../assets/air-peace.png";
import PiggyVest from "../assets/piggyvest.png";
import MTN from "../assets/mtn.png";
import Chipper from "../assets/chipper.png";
import Wise from "../assets/wise.png";
import StoreImage from "../assets/StoreImage.png";
import FashionAndApparel from "../assets/clothes.png";
import AppImage from "../assets/appImage.png";
import HealthAndBeauty from "../assets/HealthAndBeauty.png";
import FoodAndBeverages from "../assets/FoodAndBeverages.png";
import HomeEssentials from "../assets/HomeEssentials.png";
import DigitalProducts from "../assets/DigitalProducts.png";
import Electronics from "../assets/Electronics.png";
import Ellipse from "../assets/Ellipse.png";

import customer1 from "../assets/Customer1.png";
import customer2 from "../assets/Customer2.png";
import customer3 from "../assets/Customer3.png";
import customer4 from "../assets/Customer4.png";
import customer5 from "../assets/Customer5.png";
import CustomerCarousel from "@/components/homepage/CustomerCarousel";

// AOS.init();
AOS.init({
  offset: 180,
  delay: 0,
  duration: 800,
  easing: "ease",
  once: false,
  mirror: false,
  anchorPlacement: "top-bottom",
});

const Home = () => {
  const Images = [AirPeace, PiggyVest, MTN, Chipper, Wise];
  const littleImages = [customer1, customer2, customer3, customer4, customer5];

  const helps = [
    {
      heading: "Setup your online store with easy steps",
      description:
        "Get your products to a personal online store—no coding skills required.",
      link: "",
    },
    {
      heading: "Manage your inventory effortlessly",
      description:
        "Keep track of stock levels and automate updates without the hassle of spreadsheets.",
      link: "",
    },
    {
      heading: "Simplify payment processing",
      description:
        "Accept payments for your product easily with integrated payment solutions.",
      link: "",
    },
    {
      heading: "Unify all your sales channels",
      description:
        "Manage all your sales channels in one place, whether online, in-store, or on social media.",
      link: "",
    },
    {
      heading: "Gain insights to boost sales",
      description:
        "Access powerful analytics to track performance and make data-driven decisions.",
      link: "",
    },
    {
      heading: "Promote your products with ease",
      description:
        "Send bulk SMS and email campaigns, and monitor sales performance in real-time.",
      link: "",
    },
  ];

  interface Sample {
    heading: string;
    image: string;
  }

  interface ProductSamples {
    firstRow?: Sample[];
    secondRow?: Sample[];
  }

  const productSamples: ProductSamples[] = [
    {
      firstRow: [
        {
          heading: "Fashion and Apparel",
          image: FashionAndApparel,
        },
        {
          heading: "Health & beauty products",
          image: HealthAndBeauty,
        },
        {
          heading: "Electronics & gadgets",
          image: Electronics,
        },
      ],
    },
    {
      secondRow: [
        {
          heading: "Home essentials",
          image: HomeEssentials,
        },
        {
          heading: "Digital products",
          image: DigitalProducts,
        },
        {
          heading: "Food & beverages",
          image: FoodAndBeverages,
        },
      ],
    },
  ];

  return (
    <>
      <Seo title="Welcome" />
      <Navbar />
      <div className="px-[5%] lg:px-[10%] pt-24">
        <div className="2xl:container mx-auto">
          <div className="text-center">
            <H1 className="lg:text-6xl font-extrabold">
              Manage sales, inventory, and <br />
              payments in <span className="text-[#870E73]">one place</span>
            </H1>
            <p className="mt-8 lg:w-1/2 mx-auto">
              Boost sales by streamlining your business using this all-in-one
              platform trusted by 3,000 small businesses
            </p>
            <div className="mt-10 flex justify-center items-center gap-5">
              <Link to="/" className="bg-[#870E73] rounded-lg text-white p-4">
                Get Started
              </Link>
              <a href="" className="flex gap-1 text-[#870E73]">
                <YoutubeIcon />
                Watch Video
              </a>
            </div>
          </div>
          <div className="w-[100%] h-[13rem] lg:h-[38rem] overflow-y-hidden px-[5%] mt-14">
            <img src={HeroDashboardImage} alt="" className="object-cover" />
          </div>
        </div>
      </div>

      <div className="bg-[#1C0719] px-[3%] py-10">
        <div className="2xl:container mx-auto">
          <div className="flex justify-around">
            {Images.map((img, index) => (
              <div className="w-[150px]">
                <img key={index} src={img} alt="" className="" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-[5%] lg:px-[10%] py-20">
        <div className="2xl:container mx-auto">
          <div
            className="bg-[#FDC5F4] rounded-lg flex flex-col lg:flex-row px-8 lg:px-16 pt-10 lg:pt-20"
            data-aos="fade-up"
          >
            <div className="">
              <div className="w-[90%] flex flex-col gap-2">
                <h3 className="text-3xl font-bold">
                  Manage your store, reach more customers
                </h3>
                <p>
                  Thrivr is an online store solution that helps you manage
                  sales, inventory, and customers from any device
                </p>
                <Link
                  to=""
                  className="underline underline-offset-1 text-[#870E73] mt-8"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="w-full flex justify-end mt-8 lg:mt-0">
              <div className="h-[16rem] overflow-y-hidden">
                <img src={StoreImage} alt="" className="object-cover" />
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 2xl:gap-5">
            {helps.map((help, index) => (
              <HelpComp key={index} data={help} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute bg-[#1C0719] w-[100%] h-full lg:h-[83rem] mt-72 z-10 productDivBg">
          <img src={Ellipse} alt="" className="mt-[40rem] mx-auto" />
        </div>
        <div className="relative px-[5%] lg:px-10%] py-20 z-50">
          <div className="2xl:container mx-auto text-center z-30">
            <H1 className="lg:w-1/2 mx-auto z-30">
              Sell any kind of product or service with Thrivr
            </H1>

            <div className="mt-16">
              <div className="gap-10 grid grid-cols-1 lg:grid-cols-3">
                {productSamples[0]?.firstRow?.map((sample, index) => (
                  <div
                    className={`${
                      (index + 1) % 2 == 0 ? "lg:mt-24" : "lg:mt-0"
                    } `}
                  >
                    <ProductSample key={index} data={sample} />
                  </div>
                ))}
              </div>
              <div className="gap-10 grid grid-cols-1 lg:grid-cols-3 mt-32">
                {productSamples[1]?.secondRow?.map((sample, index) => (
                  <div
                    className={`${
                      (index + 1) % 2 == 0 ? "lg:-mt-24" : "lg:mt-0"
                    } `}
                  >
                    <ProductSample key={index} data={sample} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[5%] lg:[10%] py-16">
        <div className="2xl:container mx-auto">
          <div
            className="relative lg:w-[40rem] overflow-hidden h-[21.5rem] lg:h-[32rem] z-30 mx-auto"
            data-aos="fade-up"
          >
            <img src={AppImage} alt="" className="object-cover" />
          </div>
          <div
            className="mt-5 text-center"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <H4>Download App</H4>
            <div className="flex gap-3 mt-2 justify-center">
              <a href="" className="px-5 py-2 bg-[#870E73] rounded text-white">
                App Store
              </a>
              <a href="" className="px-5 py-2 bg-[#870E73] rounded text-white">
                Play Store
              </a>
            </div>
            <div className="mt-20">
              <H1 className="">
                Sell smarter. Grow faster. <br /> Thrive effortlessly
              </H1>
              <div className="flex justify-center my-5">
                {littleImages.map((img, index) => (
                  <img key={index} src={img} className="w-[40px]" />
                ))}
              </div>
              <div className="">
                <P>
                  Trusted by over{" "}
                  <span className="text-[#870E73]">3000 businesses</span> and{" "}
                  <span className="text-[#870E73]">5000 individuals</span>
                </P>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="text-center px-[5%] lg:px-[10%]">
          <div className="2xl:container mx-auto">
            <H1>
              Read what our customers <br />
              have to say
            </H1>
            <CustomerCarousel />
          </div>
        </div>
      </div>

      <div className="py-20 px-[5%] lg:[10%]">
        <div className="2xl:container mx-auto">
          <H1 className="text-center" data-aos="fade-up">
            Have Questions?
          </H1>
          <div className="mt-24 flex flex-col lg:flex-row justify-between text-center lg:text-start">
            <div className="flex flex-col gap-7 w-full">
              <h3 className="text-4xl font-bold">247 support available</h3>
              <P className="lg:w-1/2">
                Get in touch with the Thrivr team and we’d get back to you as
                soon as we can!
              </P>
              <a
                href=""
                className="bg-[#870E73] mx-auto lg:mx-0 px-5 py-2 w-fit rounded text-white"
              >
                Contact Support
              </a>
            </div>
            <div className="w-full lg:w-[60%]">
              <P>FAQs</P>
              <FAQ />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
