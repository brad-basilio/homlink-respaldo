import React from 'react';
import { Link } from '@inertiajs/react';

const BannerSectionSecundario = ({ banner }) => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-primary         to-primary ">
           

            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8  relative z-10">

                    {/* Right column - Image */}
                    <div className="relative min-h-[500px]">
                        <img
                            src={`/api/banners/media/${banner?.image}`}
                            alt={banner?.name}
                            className="min-h-[500px] object-cover"
                        />
                    </div>

                    {/* Left column - Text content */}
                   <div className='flex items-center'>
                     <div className="text-white max-w-xl  mx-auto ">
                        <h2 className="text-4xl sm:text-5xl font-bold  !leading-[60px] mb-6">
                            {banner?.name}
                        </h2>
                        <p className="text-lg mb-8">
                            {banner?.description}
                        </p>
                        <Link
                            href={banner?.button_link}
                            className="inline-block px-8 py-4 bg-secondary text-lg text-white font-semibold rounded-full hover:bg-accent transition-colors duration-300"
                        >
                            {banner?.button_text}
                        </Link>
                    </div>
                   </div>


                </div>
            </div>
             {/* Background wave shape */}
            <div className="absolute top-0 -right-96 w-full h-full">
                <svg className='h-full w-full' width="681" height="461" viewBox="0 0 681 461" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g style={{ mixBlendMode: 'overlay' }} opacity="0.2">
                        <path fillRule="evenodd" clipRule="evenodd" d="M647.11 91.8583C611.6 26.4009 562.113 -24.8678 498.648 -61.9477C435.561 -98.6492 363.408 -117 282.189 -117C201.347 -117 129.194 -98.6492 65.7296 -61.9477C2.64288 -24.8678 -46.6555 26.4009 -82.1654 91.8583C-110.876 145.208 -127.875 203.855 -133.164 267.799C-133.164 268.934 -133.164 269.88 -133.164 270.636C-135.997 293.338 -154.696 310.932 -177.929 311.5C-178.307 311.5 -178.684 311.5 -179.062 311.5C-179.44 311.5 -179.818 311.5 -180.195 311.5C-262.926 311.5 -320.724 393.227 -292.958 471.549C-285.403 491.981 -276.525 511.845 -266.326 531.142C-230.816 596.599 -181.518 647.868 -118.431 684.948C-54.9663 721.649 17.1868 740 98.0285 740C179.248 740 251.401 721.649 314.488 684.948C377.952 647.868 427.251 596.599 462.383 531.142C491.848 477.035 509.037 417.632 513.948 352.931C516.214 330.797 533.78 313.203 556.446 311.5C557.579 311.5 558.713 311.5 559.846 311.5C560.979 311.5 562.113 311.5 563.246 311.5C644.843 311.5 700.941 230.908 674.309 153.721C666.753 132.533 657.687 111.912 647.11 91.8583ZM465.783 311.5C395.518 311.5 335.454 357.472 313.354 423.875C309.955 434.091 305.988 443.928 301.455 453.387C282.189 495.386 254.99 528.115 219.858 551.573C184.348 575.411 143.738 587.329 98.0285 587.329C51.5634 587.329 10.7647 575.411 -24.3674 551.573C-59.8773 528.115 -87.0763 495.386 -105.965 453.387C-118.431 427.28 -126.742 398.903 -130.897 368.255C-131.653 365.228 -132.03 362.39 -132.03 359.742C-132.03 359.363 -132.03 359.174 -132.03 359.174C-132.03 358.796 -132.03 358.228 -132.03 357.472C-132.03 331.932 -111.631 311.5 -86.1319 311.5C-16.4343 311.5 44.197 265.528 66.2962 199.125C69.6961 188.909 73.6627 179.072 78.1958 169.613C97.4618 127.614 124.661 94.8852 159.793 71.4265C194.925 47.5894 235.724 35.6709 282.189 35.6709C327.898 35.6709 368.508 47.5894 404.018 71.4265C439.15 94.8852 466.349 127.614 485.615 169.613C498.082 196.477 506.392 225.611 510.548 257.015C510.925 258.529 511.303 260.042 511.681 261.556C511.681 262.691 511.681 264.015 511.681 265.528C511.681 290.501 491.282 311.5 465.783 311.5Z" fill="white" />
                    </g>
                </svg>
            </div>
        </section>
    );
};

export default BannerSectionSecundario;
