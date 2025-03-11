import { useEffect, useState, useRef } from "react";

const Counter = ({ target }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        let start = 0;
                        const stepTime = Math.abs(Math.floor(2000 / target));
                        const timer = setInterval(() => {
                            start += 1;
                            setCount(start);
                            if (start >= target) {
                                clearInterval(timer);
                                setCount(target);
                            }
                        }, stepTime);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return (
        <h3
            ref={ref}
            className="text-[90.94px] md:text-[111.94px] leading-[100.94px] md:leading-[111.94px] md:tracking-[9.99px] xl:text-[136.9px] 2xl:text-[146.9px] tracking-[13.12px] xl:leading-[120.9px] 2xl:leading-[146.9px] font-bebas"
        >
            {count}
        </h3>
    );
};

const BenefitsSection = () => {
    return (
        <div className="relative overflow-hidden pt-8 bg-[#EFE5FF]">
            <div className="bg-[#6745BA]">
                <div className="relative lg:max-w-5xl 2xl:max-w-7xl mx-auto text-white py-10 px-6 lg:px-0 flex flex-col items-center text-center">
                    <div className="md:ml-60 lg:ml-0 max-w-2xl mx-auto md:mx-0 relative z-10">
                        <h2 className="text-[21.07px] md:text-[21.07px] leading-[25.28px] xl:text-[24.65px] 2xl:text-[27.65px] xl:leading-[33.18px] font-bold">
                            Una copa o disco menstrual en 5 años
                        </h2>
                        <div className="flex justify-center gap-10 mt-4">
                            <div className="w-1/2 flex flex-col items-center justify-center">
                                <span className="text-[24.99px] md:text-[24.99px] md:leading-[40.78px] xl:text-[28.79px] 2xl:text-[32.79px] 2xl:leading-[53.52px] font-bold text-[#E7FF57]">
                                    Reemplaza
                                </span>
                                <Counter target={600} />
                                <p className="text-[15.84px] md:text-[18.84px] md:leading-[47.47px] xl:text-[20.14px] 2xl:text-[24.14px] 2xl:leading-[62.3px]">
                                    Toallas higiénicas
                                </p>
                            </div>
                            <div className="w-1/2 flex flex-col items-center justify-center">
                                <span className="text-[24.99px] md:leading-[40.78px] xl:text-[28.79px] 2xl:text-[32.79px] 2xl:leading-[53.52px] font-bold text-[#E7FF57]">
                                    Ahorra
                                </span>
                                <Counter target={900} />
                                <p className="text-[15.84px] md:text-[18.84px] md:leading-[47.47px] xl:text-[20.14px] 2xl:text-[24.14px] 2xl:leading-[62.3px]">
                                    Soles Aprox
                                </p>
                            </div>
                        </div>
                    </div>
                    <img
                        src="/assets/img/infobenefits/left.png"
                        alt="Copa menstrual"
                        className="hidden sm:block absolute -left-4 md:-left-36 2xl:-left-16 bottom-0 top-[-90px] h-[540px] z-0 transform scale-x-[-1]"
                    />
                    <img
                        src="/assets/img/infobenefits/right.png"
                        alt="Disco menstrual"
                        className="hidden  lg:block absolute right-0 md:-right-32 2xl:-right-12 bottom-0 top-[-60px] h-[470px] z-0 transform scale-x-[-1] -rotate-[8deg]"
                    />
                </div>
            </div>
        </div>
    );
};

export default BenefitsSection;
