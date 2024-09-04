import React from 'react';

function StatisticCard({ stat, description }) {
  return (
    <div className="flex flex-col w-[193px]">
      <div className="self-start text-5xl font-black leading-tight text-cyan-950">
        {stat.value}<span className="text-red-500">{stat.suffix}</span>
      </div>
      <div className="w-full text-base leading-6 text-cyan-950">
        {description}
      </div>
    </div>
  );
}

export default StatisticCard;