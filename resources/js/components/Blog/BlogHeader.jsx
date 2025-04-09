import React, { useRef, useState } from "react";

import bgHeader from "./images/header.png";
import Swal from "sweetalert2";
import SubscriptionsRest from "../../Actions/SubscriptionsRest";
import Global from "../../Utils/Global";

const subscriptionsRest = new SubscriptionsRest();

const BlogHeader = ({ categories }) => {
    const emailRef = useRef();

    const [saving, setSaving] = useState();

    const onEmailSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const request = {
            email: emailRef.current.value,
        };
        const result = await subscriptionsRest.save(request);
        setSaving(false);

        if (!result) return;

        Swal.fire({
            title: "¡Éxito!",
            text: `Te has suscrito correctamente al blog de ${Global.APP_NAME}.`,
            icon: "success",
            confirmButtonText: "Ok",
        });

        emailRef.current.value = null;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
            {/* Header Section */}
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Descubre lo mejor:
                    <br />
                    Publicaciones sobre el{" "}
                    <span className="text-azul">mundo de la fisiotería</span>
                </h1>
            </div>

            {/* Featured Posts Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
                {/* Main Featured Post */}
                <div className="md:col-span-7">
                    <div className="rounded-lg overflow-hidden shadow-md">
                        <div className="relative h-64 md:h-80">
                            <img
                                src="/placeholder.svg?height=600&width=800"
                                alt="Fisioterapeuta tratando la espalda de un paciente"
                                className="w-full h-full object-cover"
                                onError={(e) =>
                                    (e.target.src = "/api/cover/thumbnail/null")
                                }
                            />
                        </div>
                        <div className="p-4 bg-white">
                            <div className="text-sm text-blue-700 font-medium mb-1">
                                Categoría
                            </div>
                            <h2 className="text-xl font-bold mb-2">
                                Phasellus vestibulum, lacus sed dictum
                            </h2>
                            <p className="text-gray-600 mb-3 line-clamp-2">
                                Praesent non euismod arcu, eu dignissim erat.
                                Aliquam erat volutpat...
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                                <span>29 de julio de 2023</span>
                                <span className="mx-2">•</span>
                                <span>Leído hace 5 min</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Featured Posts */}
                <div className="md:col-span-5 space-y-6">
                    {/* Secondary Post 1 */}
                    <div className="rounded-lg overflow-hidden shadow-md">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/5 h-48 md:h-auto">
                                <img
                                    src="/placeholder.svg?height=400&width=400"
                                    alt="Fisioterapeuta con pelota terapéutica"
                                    className="w-full h-full object-cover"
                                    onError={(e) =>
                                        (e.target.src =
                                            "/api/cover/thumbnail/null")
                                    }
                                />
                            </div>
                            <div className="md:w-3/5 p-4 bg-white">
                                <div className="text-sm text-blue-700 font-medium mb-1">
                                    Categoría
                                </div>
                                <h2 className="text-lg font-bold mb-2">
                                    Phasellus vestibulum, lacus sed dictum
                                </h2>
                                <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                                    Praesent non euismod arcu, eu dignissim
                                    erat. Aliquam erat volutpat...
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <span>29 de julio de 2023</span>
                                    <span className="mx-2">•</span>
                                    <span>Leído hace 5 min</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Post 2 */}
                    <div className="rounded-lg overflow-hidden shadow-md">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/5 h-48 md:h-auto">
                                <img
                                    src="/placeholder.svg?height=400&width=400"
                                    alt="Fisioterapeuta tratando a un paciente"
                                    className="w-full h-full object-cover"
                                    onError={(e) =>
                                        (e.target.src =
                                            "/api/cover/thumbnail/null")
                                    }
                                />
                            </div>
                            <div className="md:w-3/5 p-4 bg-white">
                                <div className="text-sm text-blue-700 font-medium mb-1">
                                    Categoría
                                </div>
                                <h2 className="text-lg font-bold mb-2">
                                    Phasellus vestibulum, lacus sed dictum
                                </h2>
                                <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                                    Praesent non euismod arcu, eu dignissim
                                    erat. Aliquam erat volutpat...
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <span>29 de julio de 2023</span>
                                    <span className="mx-2">•</span>
                                    <span>Leído hace 5 min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogHeader;
{
    /*
  
    <section className="grid md:grid-cols-2 items-center justify-between mt-16 bg-[#F5F7FA]">
    <img src={bgHeader} alt="" className="w-full h-full aspect-video md:aspect-[16/12] lg:aspect-video object-cover object-center" />
    <form className="p-[5%] w-full" onSubmit={onEmailSubmit}>
      <div className="w-full text-2xl lg:text-4xl font-medium text-pink-600">
        <span className="text-slate-700">Mantente siempre</span>{" "}
        <span className="font-bold text-pink-600">Informado</span>{" "}
        <span className="text-slate-700">con nuestra newsletter</span>
      </div>
      <div className="mt-10 w-full max-md:max-w-full">
        <div className="w-full max-md:max-w-full">
          <div className="w-full relative h-max">
            <input ref={emailRef} className="w-full py-2 px-4 text-slate-900 border-b-2 outline-none bg-transparent" placeholder="Correo electrónico" disabled={saving} />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-pink-500"disabled={saving}>
              <span>Enviar</span>
              <i className="mdi mdi-arrow-top-right ms-1"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 text-base leading-6 text-slate-900 max-md:max-w-full">
        Suscríbete y sé el primero en enterarte de nuestras últimas publicaciones,
        consejos y novedades directamente en tu bandeja de entrada
      </div>
    </form>
  </section>
  
  */
}
