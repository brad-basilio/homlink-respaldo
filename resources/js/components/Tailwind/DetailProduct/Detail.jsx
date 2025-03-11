import React, { useState } from "react";

const Detail = () => {
    const [selectedColor, setSelectedColor] = useState("purple");
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    return (
        <section className="relative py-10 bg-[#EFE5FF]">
            <div className="px-[5%] mx-auto md:max-w-6xl 2xl:max-w-6xl">
                <p className="md:text-[18.31px] 2xl:text-[23.31px] leading-[29.44px]">
                    Home / Tienda we Fem / <strong>wePack</strong>
                </p>

                <div className="flex items-start flex-col md:flex-row mt-4 gap-2">
                    {/* Left Column - Images */}
                    <div className="flex md:flex-col gap-4">
                        <img
                            src="https://i.ibb.co/d4b37qjh/f7dbf1c4b1c1c7a425856f6ebcbcbce8.png"
                            alt="Thumbnail"
                            className="w-16 h-auto md:w-1/12"
                        />
                        <img
                            src="https://i.ibb.co/d4b37qjh/f7dbf1c4b1c1c7a425856f6ebcbcbce8.png"
                            alt="Main Product"
                            className="md:w-[580.81px] md:h-[580.81px] 2xl:w-[638.72px] 2xl:h-[638.72px]"
                        />
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="w-[472px] text-[#333333]">
                        <h3 className="md:text-[45.38px] 2xl:text-[54.38px] font-bold">
                            wePack
                        </h3>
                        <p className="md:text-[20.81px] 2xl:text-[30.81px]">
                            (Disco + Esterilizador)
                        </p>

                        <p className="md:text-xs 2xl:text-[14.05px] mt-2">
                            🌸 Recipiente menstrual con el doble de capacidad
                            que una copa, ideal para recolectar sangre y tener
                            relaciones sin preocupaciones durante tu periodo.
                            ¡Libertad total! 🌙 💖
                        </p>

                        {/* Promo Banner */}
                        <div className="w-[155px] h-[25px] bg-[#212529] text-white rounded-[5.44px] my-4 flex items-center justify-center">
                            <p className="flex items-center gap-2">
                                🔥 <span className="font-bold">AHORRA</span> S/
                                75.00 🔥
                            </p>
                        </div>

                        {/* Pricing */}
                        <p className="md:text-[35.33px] 2xl:text-[49.33px] text-[#FC58BE] font-bold">
                            S/. 169.90
                        </p>
                        <p className="md:text-[20.84px] 2xl:text-[24.84px] text-[#B4B4B4]">
                            <del>Antes S/. 255</del>
                        </p>

                        {/* Rating */}
                        <div className="flex gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-[#FF9900]">
                                    ⭐
                                </span>
                            ))}
                        </div>

                        {/* Color Selector */}
                        <div className="flex items-center gap-2 mt-4">
                            <span className="font-bold">Color:</span>
                            <button
                                className={`rounded-full p-1 border ${
                                    selectedColor === "purple"
                                        ? "border-[#C196E8]"
                                        : "border-[#222222]"
                                }`}
                                onClick={() => handleColorSelect("purple")}
                            >
                                <span className="w-5 h-5 rounded-full bg-[#C196E8] block"></span>
                            </button>
                            <button
                                className={`rounded-full p-1 border ${
                                    selectedColor === "pink"
                                        ? "border-[#EF62BA]"
                                        : "border-[#DDDDDD]"
                                }`}
                                onClick={() => handleColorSelect("pink")}
                            >
                                <span className="w-5 h-5 rounded-full bg-[#EF62BA] block"></span>
                            </button>
                        </div>

                        {/* Size Selector */}
                        <div className="relative mt-4">
                            <select className="w-full h-[48.94px] px-4 bg-[#EFEDF8] rounded-[5.44px] appearance-none">
                                <option>Talla A</option>
                                <option>Talla B</option>
                                <option>Talla C</option>
                            </select>
                            <svg
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M4 6L8 10L12 6"
                                    stroke="#9747FF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center justify-between h-[37.16px] bg-[#EFEDF8] rounded-[5.44px] mt-4 px-4">
                            <button
                                className="text-[17.84px]"
                                onClick={() => handleQuantityChange(-1)}
                            >
                                -
                            </button>
                            <span className="text-xl font-medium">
                                {quantity}
                            </span>
                            <button
                                className="text-[17.84px]"
                                onClick={() => handleQuantityChange(1)}
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            className="w-full h-[39.88px] bg-[#FC58BE] text-white rounded-[2.72px] mt-4 flex items-center justify-center"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span>Añadir al carrito</span>
                            <svg className="h-3 ml-4" viewBox="0 0 576 512">
                                <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000080]"
                    style={{ backdropFilter: "blur(10px)" }}
                >
                    <div className="bg-white rounded-[48.58px] md:w-[619px] md:h-[605.40px] 2xl:w-[819px] 2xl:h-[805.40px] p-8">
                        <button
                            className="absolute top-4 right-4 text-3xl text-[#9577B9]"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ×
                        </button>
                        <div className="text-center mt-8">
                            <div className="bg-[#FF9900] rounded-full px-6 py-2 mb-4">
                                <p className="text-white font-bold">
                                    Solo por 00 : 10 : 58
                                </p>
                            </div>
                            <p className="text-[#404040] text-2xl font-bold">
                                ¿Te gustaría añadir a tu pedido?
                            </p>
                            <div className="flex gap-4 mt-8">
                                <img
                                    src="https://i.ibb.co/MkgMJPzG/63d3b57a154aa23fe06f27206861c787.png"
                                    className="md:w-[238.05px] md:h-[401.16px] 2xl:w-[338.05px] 2xl:h-[501.16px]"
                                />
                                <div>
                                    <h3 className="text-[#000000] text-2xl font-semibold">
                                        Lubricante
                                    </h3>
                                    <p className="text-[#000000] mt-2">
                                        Te ayudará a colocar más fácil tu copa o
                                        disco 💦
                                    </p>
                                    <p className="text-[#FC58BE] text-4xl font-black mt-4">
                                        S/25
                                    </p>
                                    <p className="text-[#000000] mt-2 line-through">
                                        P. regular S/30
                                    </p>
                                    <button className="bg-[#FC58BE] text-white px-6 py-2 rounded mt-4">
                                        ¡Lo quiero!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Detail;
