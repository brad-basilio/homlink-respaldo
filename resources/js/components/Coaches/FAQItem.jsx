import React, { useState } from "react";

function FAQItem({ question, answer, isOpen: opened = false }) {
  const [isOpen, setIsOpen] = useState(opened);

  return (
    <div className="flex flex-col w-full">
      <button
        className="flex flex-wrap items-start justify-between text-xl font-bold leading-tight"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="block shrink self-stretch my-auto basis-0 text-left">
          {question}
        </span>
        <i className={`block shrink-0 self-stretch my-auto mdi ${isOpen ? 'mdi-minus' : 'mdi-plus'} text-red-500 border-[3px] w-7 h-7 rounded-full border-red-500`}></i>
        {/* <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7df4adae981c7031f45b31d732cd0716c9883331c6568e7c13625fcbcbe0475?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        /> */}
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