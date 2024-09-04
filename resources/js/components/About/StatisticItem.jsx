import React from "react";

function StatisticItem({ value, suffix, description }) {
  return (
    <div className="flex flex-col w-[193px]">
      <p className="self-start text-5xl font-black leading-tight text-cyan-950">
        {value}<span className="text-red-500">{suffix}</span>
      </p>
      <p className="w-full text-base leading-6 text-cyan-950">{description}</p>
    </div>
  );
}

export default StatisticItem;