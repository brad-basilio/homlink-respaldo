const CuponesSection = () => {
    return (
        <section className="relative bg-[#C6FF6B] overflow-hidden py-16 px-2 md:px-0 w-full">
            {/* Fondo decorativo */}
            <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 1600 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M0 0C600 300 1200 0 1600 400V0H0Z" fill="#7B61FF" fillOpacity="0.25"/>
                </svg>
            </div>
            <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-8">
                {/* Columna izquierda: textos y cupones */}
                <div className="flex-1 flex flex-col justify-center items-start gap-6">
                    <div>
                        <div className="uppercase text-[#181818] text-base font-medium tracking-widest mb-2">Cupones</div>
                        <h2 className="text-5xl md:text-6xl font-bold text-[#181818] leading-tight mb-2">¡Ahorra en tu<br />cambio digital!</h2>
                        <p className="text-lg text-[#181818] mb-4 max-w-lg">No te pierdas nuestros cupones exclusivos para obtener descuentos en tu cambio digital.</p>
                        <div className="text-2xl font-semibold text-[#181818] mb-4">¡Qué bueno que cambiaste!</div>
                    </div>
                    {/* Cupones */}
                    <div className="flex flex-row gap-6 mt-2">
                        {/* Cupón 1 */}
                        <div className="bg-[#7B61FF] rounded-2xl w-[320px] h-[160px] flex flex-col justify-between p-6 relative shadow-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <img src="/assets/cambiafx/cupon-fx.png" alt="FX" className="w-7 h-7" />
                                <span className="uppercase text-white text-xs tracking-widest font-semibold">Cuponera</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="uppercase text-white text-xs tracking-widest mb-1">Cupón</div>
                                <div className="text-2xl md:text-3xl font-bold text-white">ANIVERSARIOFX</div>
                                <div className="text-xs text-white mt-1">Válido hasta el 28/03/2025</div>
                            </div>
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#C6FF6B] rounded-full"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#C6FF6B] rounded-full"></div>
                        </div>
                        {/* Cupón 2 */}
                        <div className="bg-white rounded-2xl w-[320px] h-[160px] flex flex-col justify-between p-6 relative shadow-lg border border-[#E5E5E5]">
                            <div className="flex items-center gap-2 mb-2">
                                <img src="/assets/cambiafx/cupon-fx.png" alt="FX" className="w-7 h-7" />
                                <span className="uppercase text-[#181818] text-xs tracking-widest font-semibold">Cuponera</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="uppercase text-[#181818] text-xs tracking-widest mb-1">Cupón</div>
                                <div className="text-2xl md:text-3xl font-bold text-[#7B61FF]">GANAFX</div>
                                <div className="text-xs text-[#181818] mt-1">Válido hasta el 28/03/2025</div>
                            </div>
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#F5F5F5] rounded-full"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#F5F5F5] rounded-full"></div>
                        </div>
                    </div>
                    <div className="mt-4 text-[#181818] text-lg">
                        Cupones del <span className="text-[#7B61FF] font-semibold">mes</span> <span className="inline-block ml-2 align-middle">↗</span>
                    </div>
                </div>
                {/* Columna derecha: imagen y badges */}
                <div className="flex-1 flex flex-col items-center justify-center relative min-h-[420px]">
                    <img src="/assets/cambiafx/cupons-person.png" alt="Persona" className="w-[340px] h-[420px] object-cover z-10" />
                    {/* Badge 1 */}
                    <div className="absolute top-10 right-0 bg-white rounded-2xl shadow-lg px-8 py-6 flex flex-col items-center w-[220px]">
                        <div className="text-4xl font-bold text-[#7B61FF]">+200k</div>
                        <div className="text-lg text-[#181818]">Transacciones <span className="text-[#7B61FF]">exitosas</span></div>
                    </div>
                    {/* Badge 2 */}
                    <div className="absolute bottom-10 left-0 bg-white rounded-2xl shadow-lg px-8 py-6 flex flex-col items-center w-[200px]">
                        <div className="text-3xl font-bold text-[#7B61FF]">+10k</div>
                        <div className="text-lg text-[#181818]">Empresas que <span className="text-[#7B61FF]">confian</span></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default CuponesSection;