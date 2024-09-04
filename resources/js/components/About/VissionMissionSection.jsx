import React from 'react';

function VissionMissionSection({ vission, mission }) {
  return (
    <>
      {
        (vission && mission && (vission?.visible || mission?.visible)) ?

          <section className="flex flex-wrap gap-6 items-start mt-10 max-md:max-w-full">
            {
              vission?.visible
                ? <div className="flex gap-4 items-start p-4 rounded-lg min-w-[240px] w-[302px]">
                  <div className="flex items-center justify-center shrink-0 w-12 h-12 bg-red-500 rounded-full" >
                    <i className={`fas fa-eye text-xl text-white`}></i>
                  </div>
                  <div className="flex flex-col flex-1 shrink basis-0">
                    <h3 className="text-xl font-bold leading-tight">{vission.name}</h3>
                    <p className="mt-1.5 text-base leading-6">{vission.description}</p>
                  </div>
                </div>
                : ''
            }
            {
              mission?.visible
                ? <div className="flex gap-4 items-start p-4 rounded-lg min-w-[240px] w-[302px]">
                  <div className="flex items-center justify-center shrink-0 w-12 h-12 bg-red-500 rounded-full" >
                    <i className={`fas fa-crosshairs text-xl text-white`}></i>
                  </div>
                  <div className="flex flex-col flex-1 shrink basis-0">
                    <h3 className="text-xl font-bold leading-tight">{mission.name}</h3>
                    <p className="mt-1.5 text-base leading-6">{mission.description}</p>
                  </div>
                </div>
                : ''
            }
          </section>
          : ''
      }
    </>
  );
}

export default VissionMissionSection;