import React from 'react';
import { Layers, Users, CreditCard, TrendingUp, MessageCircle, Gift } from 'lucide-react';
import TextWithHighlight from '../../../Utils/TextWithHighlight';
import EmpresasSection from './EmpresasSection';

function HeroServiceSection({service,banner_slider}) {
 
console.log(banner_slider)
  return (
    <>
    <div className="min-h-screen bg-primary relative overflow-hidden font-title">
      {/* Purple decorative circles */}
      <div className="absolute top-0 right-0 ">

        <svg width="684" height="586" viewBox="0 0 684 586" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.8119 -29.7908C25.702 -13.8578 46.1592 8.31367 75.6004 29.1596C127.368 65.8159 176.512 76.8416 210.555 84.12C251.273 92.8267 283.372 99.6891 323.244 89.4095C326.368 88.6046 390.305 82.7069 401.55 36.4047C412.797 -9.90486 360.542 -33.4285 312.089 -10.5834C263.636 12.2617 250.769 45.2127 247.567 77.1767C243.023 122.515 269.767 160.019 292.93 187.315C394.007 306.405 505.649 323.842 637.012 415.673C682.143 447.219 743.576 497.317 806.096 575.44" stroke="#7E5AFB" stroke-width="32" stroke-miterlimit="10" />
        </svg>

      </div>


      {/* Main content */}
      <div className="relative z-10 px-[5%] py-12 ">
        <div className=" mx-auto">
          {/* Header section */}
          <div className="mb-12 md:mb-16">
            <div className="mb-4">
              <span className="text-constrast  text-sm font-medium tracking-[8%] uppercase">
               {service?.name}
              </span>
            </div>
            <h2 className="text-4xl max-w-lg md:text-6xl font-medium text-neutral-dark mb-4">
              <TextWithHighlight text={service?.title} color="bg-neutral-dark font-semibold" />
           
            </h2>
            <p className="text-neutral-light text-base max-w-2xl">
            {service?.description}
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service?.benefits.map((service, index) => (
              <div
                key={index}
                className="bg-secondary rounded-3xl p-8 hover:bg-secondary/90 transition-colors duration-300 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-constrast rounded-full flex items-center justify-center text-white mb-6 group-hover:bg-constrast/90 transition-colors duration-300">
                    <img
                                                    src={`/api/service/media/${service?.image}`}
                                                    alt={service?.name}
                                                    className="w-6 h-6 object-cover rounded-xl"
                                                />
                 
                
                </div>

                {/* Title */}
                <h3 className="text-neutral-dark font-medium text-xl mb-4 leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-light text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>


     
        </div>
      </div>

       
    </div>
    <EmpresasSection banner_slider={banner_slider} /></>
  );
}

export default HeroServiceSection;