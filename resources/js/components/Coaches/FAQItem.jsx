import React, { useState } from "react";

function FAQItem({ question, answer, isOpen: opened = false }) {
  const [isOpen, setIsOpen] = useState(opened);

  return (
    <div className="flex flex-col w-full">
      <button
        className="flex flex-row gap-2 items-start justify-between w-full text-xl font-bold leading-tight"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="block   w-full my-auto  text-left">
          {question}
        </span>
        <i className={`block shrink-0  my-auto mdi ${isOpen ? 'mdi-minus' : 'mdi-plus'} text-red-500 border-[3px] w-7 h-7 rounded-full border-red-500`}></i>
      </button>
      {isOpen && answer && (
        <>
          <div className="flex w-6 min-h-[24px]" />
          <p className="text-base leading-6">{answer}</p>
        </>
      )}
      <div className="flex mt-10 w-full bg-zinc-300 min-h-[2px]" />
    </div>
  );
}

export default FAQItem;