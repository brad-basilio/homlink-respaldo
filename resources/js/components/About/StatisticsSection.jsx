import React from "react";
import StatisticItem from "./StatisticItem";

const statisticsData = [
  { value: "10", suffix: "k", description: "Ejemplo: \"10K de usuarios activos\"" },
  { value: "20", suffix: "+", description: "Neque porro quisquam est voluptatem" },
  { value: "10", suffix: "+", description: "Neque porro quisquam est voluptatem" }
];

function StatisticsSection({ indicators }) {
  return (
    <section className="flex flex-col md:flex-row gap-6 justify-between items-center mt-24 max-md:mt-10">
      <div className="flex flex-col self-stretch my-auto w-6/12 max-md:w-full">
        <header className="flex flex-col max-w-full text-cyan-950 w-[737px]">
          <h2 className="w-full text-4xl font-bold leading-10 max-md:max-w-full">
            Hablar sobre el trabajo de Net Coaching durante todo el tiempo y estadísticas
          </h2>
          <p className="mt-6 w-full text-base leading-6 max-md:max-w-full">
            Net Coaching: Impactando Vidas y Marcando la Diferencia - Una Mirada a Nuestro Trabajo
            <br />y Estadísticas en Curso
          </p>
        </header>
        <div className="flex flex-wrap gap-6 items-start self-start mt-10 max-md:max-w-full">
          {indicators.map((stat, index) => (
            <StatisticItem
              key={index}
              value={stat.name}
              suffix={stat.symbol}
              description={stat.description}
            />
          ))}
        </div>
      </div>
      <figure className="flex flex-col self-stretch my-auto w-6/12 max-md:w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9bb5f0825d9e96d00c7fdfcab415c8f740caf9c0dce96b73bab48835521733b4?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
          alt="Net Coaching statistics visualization"
          className="object-contain w-full aspect-[0.98] max-md:max-w-full"
        />
      </figure>
    </section>
  );
}

export default StatisticsSection;