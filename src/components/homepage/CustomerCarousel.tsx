import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import React, { useState } from "react";
import CustomerReview from "./CustomerReview";
import Reviews from "./data/Reviews";

interface type {
  data: [];
}

const CustomerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + Reviews.length) % Reviews.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Reviews.length);
  };

  return (
    <div className="relative px-[5%] lg:[10%] mt-20">
      <button onClick={prevSlide} className="absolute left-0 top-[45%]">
        <ArrowLeftCircle className="text-[#870E73] w-[50px] h-[50px]" />
      </button>
      <div className="overflow-hidden lg:w-[80%] mx-auto">
        <div
          className="flex gap-20 p-10 w-full mx-auto transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Reviews.map((review, index) => (
            <div className="flex-shrink-0 w-full">
              <CustomerReview key={index} data={review} />
            </div>
          ))}
        </div>
      </div>

      <button onClick={nextSlide} className=" absolute top-[45%] right-0">
        <ArrowRightCircle className="text-[#870E73] w-[50px] h-[50px]" />
      </button>
    </div>
  );
};

export default CustomerCarousel;
