import React from "react";

const History = ({ }) => {
  return (
    <section className="p-[5%] self-center w-full grid md:grid-cols-2 lg:grid-cols-5 gap-8 bg-white">
      <div className="lg:col-span-2">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/89f02f6e718b85aff09c0427130fbde9e99bc6b687be2248a40929d301dca755?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
          alt="Coaching Image"
          className="flex relative grow max-md:mt-10 max-md:max-w-full"
          style={{ objectFit: "contain", aspectRatio: 1.324 }}
        />
      </div>
      <div className="lg:col-span-3">
        <h3 className="text-4xl not-italic font-bold leading-10 text-pink-600 max-md:max-w-full">
          <span>Duis ut metus egestas</span>{" "}
          <span className="text-pink-600">felis pretium</span>{" "}
          <span>venenatis sit amet</span>
        </h3>
        <div className="flex flex-col mt-8 w-full text-lg leading-7 text-[color:var(--Woodsmoke-800,#2E405E)] max-md:max-w-full">
          <p className="not-italic max-md:max-w-full">
            Donec nec pulvinar felis. Sed eget lectus semper, tempor ex at,
            condimentum justo. Pellentesque ornare mauris nec risus ultricies
            congue. Quisque a lectus a magna lobortis sagittis. Vivamus vel dui
            non lectus hendrerit ultrices. Quisque in tincidunt nisi, at gravida
            odio. Vestibulum lobortis risus aliquam lectus ullamcorper molestie.
          </p>
          <p className="mt-6 not-italic max-md:max-w-full">
            Vivamus quis risus a dolor dapibus consectetur ac at ipsum. Aliquam
            ut eros at dui posuere hendrerit non dictum lacus. Mauris at sapien
            sit amet dui hendrerit ultricies eget et erat. Mauris sagittis leo
            in elit sodales, at euismod nulla lacinia. Mauris tincidunt neque
            consequat, venenatis arcu et, pellentesque nibh. Proin elementum
            lectus et condimentum elementum. Nam eget purus ut erat euismod
            bibendum vel eu quam.
          </p>
        </div>
      </div>
    </section>
  );
}

export default History