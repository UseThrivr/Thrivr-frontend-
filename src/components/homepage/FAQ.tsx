import React, { useState } from "react";
import Faq from "./data/Faq";

interface FAQItemProps {
  data: {
    question: string;
    answer: string;
  };
  id: number;
  openId: number | null;
  toggleOpen: (id: number) => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ data, id, openId, toggleOpen }) => {
  const isOpen = openId === id;

  return (
    <div
      className={`${
        isOpen ? "" : ""
      } mb-2 rounded py-2 pe-2 lg:pe-6 transition-all duration-500`}
    >
      <button
        className="flex justify-between w-full items-center"
        onClick={() => toggleOpen(id)}
      >
        <span className="text-sm w-2/3 lg:w-full lg:text-base text-start font-semibold">
          {data.question}
        </span>
        <span className="text-3xl">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="w-full mt-2 text-text-secondary">{data.answer}</div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleOpen = (id: number) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="col-span-2 lg:col-span-1 mt-20 lg:mt-0">
      {Faq.map((faq, index) => (
        <FAQItem
          key={index}
          data={faq}
          id={index + 1}
          openId={openId}
          toggleOpen={toggleOpen}
        />
      ))}
    </div>
  );
};

export default FAQ;
