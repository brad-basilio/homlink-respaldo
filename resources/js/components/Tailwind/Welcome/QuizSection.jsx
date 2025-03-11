import React from "react";

const QuizSection = () => {
    return (
        <section className="text-white bg-[#bf5f9e] relative md:h-[500px] 2xl:h-[600px] overflow-hidden font-font-general">
            <div className="px-[5%] relative xl:px-0 md:max-w-5xl 2xl:max-w-7xl h-full mx-auto z-50">
                <div className="h-full mx-auto flex items-center">
                    <div className="max-w-xs md:max-w-sm py-4 md:py-0 xl:max-w-lg 2xl:max-w-xl flex items-center justify-center flex-col z-50">
                        <h2 className="text-[40.71px] md:text-[48.71px] xl:text-[58.82px] 2xl:text-[72.82px] md:leading-[70px] 2xl:leading-[80px] tracking-[0.01em] font-bold mb-4 text-center">
                            ¿Aún no sabes cuál elegir?
                        </h2>
                        <p className="md:text-[15.26px] xl:text-[18.82px] 2xl:text-[22.82px] leading-[30.92px] tracking-[0.01em] mb-6 text-center">
                            Haz un test personalizado y te ayudaremos a
                            encontrar el método para ti
                        </p>
                        <a
                            href="/quiz"
                            className="inline-flex h-[58.19px] w-[243.46px] bg-[#FF9900] tracking-[0.01em] items-center justify-center text-white uppercase font-semibold xl:w-[304px] xl:h-[70px] text-[16.82px] xl:text-[20.15px] 2xl:w-[364px] 2xl:h-[87px] rounded-[13.63px] leading-[37.73px] 2xl:text-[25.15px]"
                        >
                            ¡REALIZAR QUIZ!
                        </a>
                    </div>
                </div>
                <div className="absolute md:-bottom-10 lg:bottom-0 md:-right-72 lg:-right-40 2xl:-right-20">
                    <img
                        src="https://i.ibb.co/bMtGd0Wq/0d4ab93b519ef4f76c6cca1ade5f235a.png"
                        alt="Quiz Image"
                        className="w-auto h-[606px] 2xl:h-[636px] object-cover object-center relative z-10"
                        loading="lazy"
                    />
                    <div
                        className="absolute -bottom-40 left-0 w-full h-full z-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0) 60%)",
                            opacity: 0.7,
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default QuizSection;
