import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import JSEncrypt from "jsencrypt";
import CreateReactScript from "./Utils/CreateReactScript";
import AuthRest from "./actions/AuthRest";
import Swal from "sweetalert2";
import { GET } from "sode-extend-react";
import Global from "./Utils/Global";

const Login = ({ }) => {
    document.title = `Login | ${Global.APP_NAME}`;

    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(Global.PUBLIC_RSA_KEY);

    // Estados
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (GET.message)
            Swal.fire({
                icon: "info",
                title: "Mensaje",
                text: GET.message,
                showConfirmButton: false,
                timer: 3000,
            });
        if (GET.service)
            history.pushState(null, null, `/login?service=${GET.service}`);
        else history.pushState(null, null, "/login");
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const email = formData.email;
        const password = formData.password;
        const request = {
            email: jsEncrypt.encrypt(email),
            password: jsEncrypt.encrypt(password),
        };
        const result = await AuthRest.login(request);

        if (!result) return setLoading(false);

        location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {/* Contenedor principal - Tarjeta centrada */}
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="flex min-h-[600px]">
                    {/* Panel izquierdo - Formulario */}
                    <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                        <div className="w-full max-w-sm mx-auto">
                            {/* Logo */}
                            <div className="mb-8">
                                <div className="flex items-center">
                                <a href="/">
                                <img
                                   
                                  
                                  
                                    src="/assets/img/logo.svg"
                                    alt={Global.APP_NAME}
                                    className="object-cover object-top h-12 max-h-12 w-auto sm:h-12 sm:max-h-12 transition-all duration-300"
                                />
                            </a>
                                </div>
                            </div>

                            {/* Título */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Bienvenido nuevamente
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Aliquam quis lectus aliquam, bibendum urna vel
                                </p>
                            </div>

                            {/* Formulario */}
                            <form className="space-y-4" onSubmit={onLoginSubmit}>
                                {/* Campo Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="ejemplo@email.com"
                                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                                    />
                                </div>

                                {/* Campo Contraseña */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contraseña
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="appearance-none block w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                {showPassword ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Recordarme y Olvidé contraseña */}
                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                            Recuerdame
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                            Olvidé mi contraseña
                                        </a>
                                    </div>
                                </div>

                                {/* Botón de login */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {loading ? "Ingresando..." : "Ingresar"}
                                    </button>
                                </div>

                                {/* Crear cuenta */}
                                <div className="text-center pt-4">
                                    <span className="text-sm text-gray-600">
                                        ¿No tienes una cuenta? Crea una{" "}
                                        <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                            aquí
                                        </a>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Panel derecho - Imagen y testimonial */}
                    <div className="hidden lg:block flex-1 relative">
                        <div className="absolute inset-0 rounded-r-3xl overflow-hidden">
                            <img
                                className="absolute inset-0 h-full w-full object-cover"
                                src="https://i.ibb.co/Fq4gM5GS/image-33.png"
                                alt="Mujer profesional trabajando"
                            />
                            <div className="absolute inset-0 bg-black opacity-30"></div>

                            {/* Testimonial */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <blockquote className="text-lg font-medium mb-4 leading-relaxed">
                                    "Fusce tristique dolor nec diam facilisis, quis hendrerit magna posuere. Nam lectus libero, commodo ut neque vel."
                                </blockquote>
                                <div>
                                    <div className="font-semibold text-lg">Carla Paretto</div>
                                    <div className="text-sm opacity-80">Lima</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(<Login {...properties} />);
});
