import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "../Utils/CreateReactScript";
import Modal from "../Components/Modal";
import InputFormGroup from "../Components/Adminto/form/InputFormGroup";
import ReactAppend from "../Utils/ReactAppend";
import DxButton from "../Components/dx/DxButton";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";
import Swal from "sweetalert2";
import { renderToString } from "react-dom/server";
import TextareaFormGroup from "../Components/Adminto/form/TextareaFormGroup";
import VideoFormGroup from "../components/Adminto/form/VideoFormGroup";
import LandingHomeRest from "../actions/Admin/LandingHomeRest";

const landingHomeRest = new LandingHomeRest();

const LandingHome = ({ items }) => {
    const modalRef = useRef();
    const [activeTab, setActiveTab] = useState("home");
    const [isEditing, setIsEditing] = useState(false);

    // Form elements ref
    const idRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const videoRef = useRef();
    const linkRef = useRef();
    const is_videoRef = useRef();
    const [isVideo, setIsVideo] = useState(false);

    // Agrupar items por página
    const groupedItems = items.reduce((acc, item) => {
        const page = item.correlative.split("_")[1]; // Extrae 'home', 'services', etc.
        if (!acc[page]) acc[page] = [];
        acc[page].push(item);
        return acc;
    }, {});

    // Nombres de las páginas para los tabs
    const pageNames = {
        home: "Inicio",
        services: "Servicios",
        aboutus: "Nosotros",
        facility: "Sedes",
        contact: "Contacto",
        blog: "Blog",
    };

    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id ?? "";
        titleRef.current.value = data?.title ?? "";
        descriptionRef.current.value = data?.description ?? "";
        linkRef.current.value = data?.link ?? "";

        if (data?.is_video) {
            $(is_videoRef.current).prop("checked", false).trigger("click");
            setTimeout(() => {
                if (videoRef.current && data?.video) {
                    videoRef.current.setVideoSrc(
                        `/api/landing_home/video/${data.video}`
                    );
                }
            }, 100);
            setIsVideo(true);
        } else {
            $(is_videoRef.current).prop("checked", true).trigger("click");
            if (imageRef.current && data?.image) {
                imageRef.image.src = `/api/landing_home/media/${data?.image}`;
            }
            imageRef.current.value = null;
            setIsVideo(false);
        }
        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();
        try {
            const request = {
                id: idRef.current.value || undefined,
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                link: linkRef.current.value,
                is_video: is_videoRef.current.checked ? 1 : 0,
            };

            const formData = new FormData();
            for (const key in request) {
                formData.append(key, request[key]);
            }

            if (isVideo) {
                if (videoRef.current) {
                    const videoFile = videoRef.current.getFile();
                    if (videoFile) {
                        formData.append("video", videoFile);
                    }
                }
            } else {
                const file = imageRef.current.files[0];
                if (file) {
                    formData.append("image", file);
                }
                formData.append("video", null);
            }

            const result = await landingHomeRest.save(formData);
            if (!result) return;

            // Recargar la página para ver los cambios
            window.location.reload();
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.",
            });
        }
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await landingHomeRest.boolean({
            id,
            field: "visible",
            value,
        });
        if (!result) return;
        window.location.reload();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar sección",
            text: "¿Estás seguro de eliminar este sección?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await landingHomeRest.delete(id);
        if (!result) return;
        window.location.reload();
    };

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        {Object.keys(pageNames).map((page) => (
                            <li key={page} className="nav-item">
                                <button
                                    className={`nav-link ${
                                        activeTab === page ? "active" : ""
                                    }`}
                                    onClick={() => setActiveTab(page)}
                                >
                                    {pageNames[page]}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card-body">
                    {Object.keys(pageNames).map((page) => (
                        <div
                            key={page}
                            style={{
                                display: activeTab === page ? "block" : "none",
                            }}
                        >
                            <div className="d-flex justify-content-between mb-3">
                                <h4>Secciones de {pageNames[page]}</h4>
                                {/*   <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() =>
                                        onModalOpen({
                                            correlative: `page_${page}_new`,
                                        })
                                    }
                                >
                                    <i className="fa fa-plus me-1"></i> Nueva
                                    Sección
                                </button>*/}
                            </div>

                            <div className="row">
                                {(groupedItems[page] || []).map((item) => (
                                    <div
                                        key={item.id}
                                        className="col-md-6 mb-4"
                                    >
                                        <div className="card h-100">
                                            <div className="card-header d-flex justify-content-between align-items-center">
                                                <h5 className="mb-0">
                                                    {
                                                        item.correlative.split(
                                                            "_"
                                                        )[2]
                                                    }
                                                </h5>
                                                {/*  <SwitchFormGroup
                                                    checked={item.visible}
                                                    onChange={(e) =>
                                                        onVisibleChange({
                                                            id: item.id,
                                                            value: e.target
                                                                .checked,
                                                        })
                                                    }
                                                />*/}
                                            </div>
                                            <div className="card-body">
                                                {item.is_video === "1" ? (
                                                    <video
                                                        src={`/api/landing_home/video/${item.video}`}
                                                        autoPlay
                                                        muted
                                                        loop
                                                        className="img-fluid mb-3"
                                                        style={{
                                                            maxHeight: "200px",
                                                            width: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                        onError={(e) =>
                                                            (e.target.src =
                                                                "/api/cover/thumbnail/null")
                                                        }
                                                    />
                                                ) : item.image ? (
                                                    <img
                                                        src={`/api/landing_home/media/${item.image}`}
                                                        className="img-fluid mb-3"
                                                        style={{
                                                            maxHeight: "200px",
                                                            width: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                        onError={(e) =>
                                                            (e.target.src =
                                                                "/api/cover/thumbnail/null")
                                                        }
                                                    />
                                                ) : null}

                                                {item.title && (
                                                    <div className="mb-2">
                                                        <strong>Título:</strong>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.title.replace(
                                                                    /\*(.*?)\*/g,
                                                                    "<strong>$1</strong>"
                                                                ),
                                                            }}
                                                        />
                                                    </div>
                                                )}

                                                {item.description && (
                                                    <div className="mb-2">
                                                        <strong>
                                                            Descripción:
                                                        </strong>
                                                        <p>
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                )}

                                                {item.link && (
                                                    <div className="mb-2">
                                                        <strong>Enlace:</strong>
                                                        <a
                                                            href={item.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {item.link}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="card-footer d-flex justify-content-end">
                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() =>
                                                        onModalOpen(item)
                                                    }
                                                >
                                                    <i className="fa fa-edit"></i>{" "}
                                                    Editar
                                                </button>
                                                {/* <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        onDeleteClicked(item.id)
                                                    }
                                                >
                                                    <i className="fa fa-trash"></i>{" "}
                                                    Eliminar
                                                </button>*/}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                modalRef={modalRef}
                title={isEditing ? "Editar sección" : "Agregar sección"}
                onSubmit={onModalSubmit}
                size="lg"
            >
                <div className="row" id="principal-container">
                    <input ref={idRef} type="hidden" />

                    <div className="col-md-6">
                        <TextareaFormGroup
                            eRef={titleRef}
                            label="Título"
                            rows={1}
                            placeholder="Puedes usar *asteriscos* para resaltar texto"
                        />
                        <TextareaFormGroup
                            eRef={descriptionRef}
                            label="Descripción"
                            rows={3}
                        />
                        <InputFormGroup
                            eRef={linkRef}
                            label="Link"
                            placeholder="https://ejemplo.com"
                        />
                        <SwitchFormGroup
                            eRef={is_videoRef}
                            onChange={(e) => setIsVideo(e.target.checked)}
                            label="Usar video en lugar de imagen"
                            specification="Solo se mostrará el video en la sección"
                        />
                    </div>
                    <div className="col-md-6">
                        {!isVideo ? (
                            <ImageFormGroup
                                eRef={imageRef}
                                label="Imagen"
                                col="col-12"
                                aspect={16 / 9}
                                fit="contain"
                            />
                        ) : (
                            <VideoFormGroup
                                eRef={videoRef}
                                label="Selecciona un video"
                                col="col-12"
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Landing Inicio">
            <LandingHome {...properties} />
        </BaseAdminto>
    );
});
