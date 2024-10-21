import React, { useEffect, useState } from "react";

const HairGoals = ({ test, setTest }) => {
  const goals = [
    {
      "value": "deep-hydration",
      "name": "Hidratación profunda"
    },
    {
      "value": "anti-frizz",
      "name": "Antifrizz"
    },
    {
      "value": "volume",
      "name": "Volumen"
    },
    {
      "value": "anti-dandruff",
      "name": "Anticaspa"
    },
    {
      "value": "smoothing",
      "name": "Alisado"
    },
    {
      "value": "split-ends-repair",
      "name": "Reparación puntas abiertas"
    },
    {
      "value": "defined-curls",
      "name": "Rizos definidos"
    },
    {
      "value": "extreme-shine",
      "name": "Brillo extremo"
    },
    {
      "value": "strengthening",
      "name": "Fortalecimiento"
    }
  ]

  const [selectedGoals, setSelectedGoals] = useState([]);

  const handleCheckboxChange = (value) => {
    if (selectedGoals.includes(value)) {
      setSelectedGoals(selectedGoals.filter((goal) => goal !== value));
    } else if (selectedGoals.length < 3) {
      setSelectedGoals([...selectedGoals, value]);
    }
  };

  const onNextClicked = () => {
    setTest(old => ({ ...old, hair_goals: selectedGoals.length >= 3 ? selectedGoals : null }))
  }

  useEffect(() => {
    // setTest(old => ({ ...old, hair_goals: selectedGoals.length >= 3 ? selectedGoals : null }))
  }, [selectedGoals])

  return <>
    <section className="p-[5%] py-[15%] md:py-[10%] lg:py-[5%] bg-white text-center text-[#404040]">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl mb-4">¿Qué <b>quieres lograr</b> con tu cabello</h1>
        <p className="text-sm mb-4">Selecciona 3 objetivos para tu fórmula</p>
        <div className="flex flex-wrap justify-evenly text-sm w-full mb-4 gap-2">
          {goals.map((goal, index) => (
            <div key={index} className="relative">
              <input
                type="checkbox"
                id={`goal-${index}`}
                value={goal.value}
                checked={selectedGoals.includes(goal.value)}
                onChange={() => handleCheckboxChange(goal.value)}
                disabled={!selectedGoals.includes(goal.value) && selectedGoals.length >= 3}
                className="peer sr-only"
              />
              <label
                htmlFor={`goal-${index}`}
                className="flex items-center justify-center rounded border border-[#C5B8D4] h-12 w-36 px-2 font-bold leading-tight text-[#9577B9] cursor-pointer transition-colors duration-200 peer-checked:bg-[#C5B8D4] peer-checked:text-white hover:bg-[#9577B9]/10 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed uppercase"
              >
                {goal.name}
              </label>
            </div>
          ))}
        </div>
        {
          selectedGoals.length >= 3 &&
          <div className="text-end">
            <button
              className='h-10 px-4 bg-[#9577B9] text-white rounded-full transition-all'
              onClick={onNextClicked}
            >
              SIGUIENTE
              <i className='mdi mdi-arrow-right ms-2'></i>
            </button>
          </div>
        }
      </div>
    </section>
  </>
}

export default HairGoals