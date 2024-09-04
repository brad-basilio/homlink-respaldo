import React, { useState } from "react";

function FAQItem({ question, answer, isOpen: opened = false }) {
  const [isOpen, setIsOpen] = useState(opened);

  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <button
        className="flex flex-wrap items-center w-full text-xl font-bold leading-tight max-md:max-w-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full text-left">
          {question}
        </span>
        <i className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"></i>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7df4adae981c7031f45b31d732cd0716c9883331c6568e7c13625fcbcbe0475?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        />
      </button>
      {isOpen && answer && (
        <>
          <div className="flex w-6 min-h-[24px]" />
          <p className="text-base leading-6 max-md:max-w-full">{answer}</p>
        </>
      )}
      <div className="flex mt-10 w-full bg-zinc-300 min-h-[2px] max-md:max-w-full" />
    </div>
  );
}

export default FAQItem;