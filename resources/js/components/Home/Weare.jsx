import React from "react"
import HtmlContent from "../../Utils/HtmlContent"

const Weare = ({weare}) => {
  return <section className="p-[5%] grid md:grid-cols-2 lg:grid-cols-5 gap-16 w-full">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/85070e4bdc7297cac781b0607aa17ab60188728566f330601a28d96372077ae7?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
      backgroundSize="contain"
      className="lg:col-span-2 flex relative self-stretch my-auto rounded-none"
      aspectRatio={1.064}
      noWebp={false}
    />
    <div className="lg:col-span-3 flex flex-col justify-center self-stretch my-auto">
      <div
        className="text-xl md:text-2xl lg:text-3xl not-italic tracking-tighter text-[#2B384F] max-md:max-w-full"
      >
        <HtmlContent html={weare.replace(/\*(.*?)\*/g, '<span class="font-bold text-pink-500">$1</span>')}/>
      </div>
      <a href="/about" className="flex gap-2 justify-center items-center self-start px-6 py-4 mt-10 text-base font-medium tracking-normal leading-none text-white uppercase rounded-3xl bg-[color:var(--Woodsmoke-800,#2E405E)] max-md:px-5">
        <div className="self-stretch my-auto">
          sobre nosotros
        </div>
        <i className="mdi mdi-arrow-top-right shrink-0 self-stretch my-auto w-6"></i>
      </a>
    </div>
  </section>
}

export default Weare