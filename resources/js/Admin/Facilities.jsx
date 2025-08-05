import React, { useEffect, useRef, useState } from "react";
import BaseAdminto from "@Adminto/Base";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import Swal from "sweetalert2";

import Modal from "../components/Adminto/Modal";
import Table from "../components/Adminto/Table";
import ImageFormGroup from "../components/Adminto/form/ImageFormGroup";
import InputFormGroup from "../components/Adminto/form/InputFormGroup";
import DxButton from "../components/dx/DxButton";
import CreateReactScript from "../Utils/CreateReactScript";
import ReactAppend from "../Utils/ReactAppend";
import FacilitiesRest from "../actions/Admin/FacilitiesRest";

const facilitiesRest = new FacilitiesRest();

const Facilities = () => {
    const [itemData, setItemData] = useState([]);
    const gridRef = useRef();
    const modalRef = useRef();

    // Refs para campos del formulario
    const idRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const linkRef = useRef();

    // Estados para galería y características
    const [gallery, setGallery] = useState([]);
    const galleryRef = useRef();
    const [ubications, setUbications] = useState([{ value: "" }]);
    const [phones, setPhones] = useState([{ value: "" }]);
    const [emails, setEmails] = useState([{ value: "" }]);
    const [business_hours, setBusiness_hours] = useState([{ value: "" }]);
    const [isEditing, setIsEditing] = useState(false);

    // Manejo de la galería
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
            isNew: true,
        }));
        setGallery((prev) => [...prev, ...newImages]);
    };

    const removeGalleryImage = (index) => {
        setGallery((prev) => prev.filter((_, i) => i !== index));
    };

    const addUbication = () => {
        setUbications([...ubications, { value: "" }]);
    };

    const updateUbication = (index, value) => {
        const newUbications = [...ubications];
        newUbications[index].value = value;
        setUbications(newUbications);
    };

    const removeUbications = (index) => {
        if (ubications.length <= 1) return;
        const newUbications = ubications.filter((_, i) => i !== index);
        setCharacteristics(newUbications);
    };

    const addPhone = () => {
        setPhones([...phones, { value: "" }]);
    };
    const updatePhone = (index, value) => {
        const newPhones = [...phones];
        newPhones[index].value = value;
        setPhones(newPhones);
    };
    const removePhones = (index) => {
        if (phones.length <= 1) return;
        const newPhones = phones.filter((_, i) => i !== index);
        setPhones(newPhones);
    };
    const addEmail = () => {
        setEmails([...emails, { value: "" }]);
    };
    const updateEmail = (index, value) => {
        const newEmails = [...emails];
        newEmails[index].value = value;
        setEmails(newEmails);
    };
    const removeEmails = (index) => {
        if (emails.length <= 1) return;
        const newEmails = emails.filter((_, i) => i !== index);
        setEmails(newEmails);
    };
    const addBusiness_hours = () => {
        setBusiness_hours([...business_hours, { value: "" }]);
    };
    const updateBusiness_hours = (index, value) => {
        const newBusiness_hours = [...business_hours];
        newBusiness_hours[index].value = value;
        setBusiness_hours(newBusiness_hours);
    };
    const removeBusiness_hours = (index) => {
        if (business_hours.length <= 1) return;
        const newBusiness_hours = business_hours.filter((_, i) => i !== index);
        setPhones(newBusiness_hours);
    };

    // Cargar datos al editar
    const onModalOpen = (data) => {
        setItemData(data || null);
        setIsEditing(!!data?.id);

        // Resetear formulario
        idRef.current.value = data?.id || "";
        titleRef.current.value = data?.title || "";
        descriptionRef.current.value = data?.description || "";

        // Cargar galería existente
        if (data?.gallery) {
            console.log(data?.gallery);
            const existingImages = data.gallery.map((url) => ({
                url: `/api/facility/media/${url}`,
                isNew: false,
            }));

            setGallery(existingImages);
        } else {
            setGallery([]);
        }

        // Cargar características existentes
        /* if (data?.characteristics && data.characteristics.length > 0) {
            setCharacteristics(
                data.characteristics.map((item) => ({ value: item }))
            );
        } else {
            setCharacteristics([{ value: "" }]);
        }*/
        if (data?.ubications && data.ubications.length > 0) {
            setUbications(data.ubications.map((item) => ({ value: item })));
        } else {
            setUbications([{ value: "" }]);
        }
        // Cargar teléfonos existentes
        if (data?.phones && data.phones.length > 0) {
            setPhones(data.phones.map((item) => ({ value: item })));
        } else {
            setPhones([{ value: "" }]);
        }
        // Cargar correos existentes
        if (data?.emails && data.emails.length > 0) {
            setEmails(data.emails.map((item) => ({ value: item })));
        } else {
            setEmails([{ value: "" }]);
        }
        // Cargar horas de negocio existentes
        if (data?.business_hours && data.business_hours.length > 0) {
            setBusiness_hours(
                data.business_hours.map((item) => ({ value: item }))
            );
        } else {
            setBusiness_hours([{ value: "" }]);
        }

        linkRef.current.value = data?.link ?? "";
        $(modalRef.current).modal("show");
    };

    // Enviar formulario
    const onModalSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", titleRef.current.value);
        formData.append("description", descriptionRef.current.value);
        formData.append("link", linkRef.current.value);

        // Si estamos editando, agregar el ID
        if (isEditing) {
            formData.append("id", idRef.current.value);
        }

        // Agregar imágenes de galería nuevas
        gallery
            .filter((img) => img.isNew)
            .forEach((img, index) => {
                formData.append(`gallery[${index}]`, img.file);
            });

        // Agregar IDs de imágenes existentes
        const existingGallery = gallery
            .filter((img) => !img.isNew)
            .map((img) => {
                return img.url.split("/").pop();
            });
        formData.append("existing_gallery", JSON.stringify(existingGallery));

        // Agregar características (filtrar vacías)
        /*   const nonEmptyCharacteristics = characteristics
            .map((c) => c.value.trim())
            .filter((c) => c.length > 0);
        formData.append(
            "characteristics",
            JSON.stringify(nonEmptyCharacteristics)
        );*/
        // Agregar ubicaciones (filtrar vacías)
        const nonEmptyUbications = ubications
            .map((u) => u.value.trim())
            .filter((u) => u.length > 0);
        formData.append("ubications", JSON.stringify(nonEmptyUbications));
        // Agregar teléfonos (filtrar vacías)
        const nonEmptyPhones = phones
            .map((p) => p.value.trim())
            .filter((p) => p.length > 0);
        formData.append("phones", JSON.stringify(nonEmptyPhones));
        // Agregar correos (filtrar vacías)
        const nonEmptyEmails = emails
            .map((e) => e.value.trim())
            .filter((e) => e.length > 0);
        formData.append("emails", JSON.stringify(nonEmptyEmails));
        // Agregar horas de negocio (filtrar vacías)
        const nonEmptyBusiness_hours = business_hours
            .map((bh) => bh.value.trim())
            .filter((bh) => bh.length > 0);
        formData.append(
            "business_hours",
            JSON.stringify(nonEmptyBusiness_hours)
        );

        // Enviar al backend
        const result = await facilitiesRest.save(formData);
        if (!result) return;

        // Limpiar y cerrar
        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
        setGallery([]);
        //  setCharacteristics([{ value: "" }]);
        setUbications([{ value: "" }]);
        setPhones([{ value: "" }]);
        setEmails([{ value: "" }]);
        setBusiness_hours([{ value: "" }]);
    };

    // Resto de métodos (delete, boolean change, etc.)
    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar Sede",
            text: "¿Estás seguro de eliminar esta sede?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await facilitiesRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Instalaciones"
                rest={facilitiesRest}
                toolBar={(container) => {
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "refresh",
                            hint: "Refrescar tabla",
                            onClick: () =>
                                $(gridRef.current)
                                    .dxDataGrid("instance")
                                    .refresh(),
                        },
                    });
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "plus",
                            text: "Agregar",
                            hint: "Agregar nueva sede",
                            onClick: () => onModalOpen(),
                        },
                    });
                }}
                columns={[
                    {
                        dataField: "id",
                        caption: "ID",
                        visible: false,
                    },
                    {
                        dataField: "title",
                        caption: "Título",
                        width: "200px",
                    },
                    {
                        dataField: "description",
                        caption: "Descripción",
                        cellTemplate: (container, { data }) => {
                            container.html(
                                renderToString(
                                    <div
                                        className="text-truncate"
                                        style={{ maxWidth: "300px" }}
                                    >
                                        {data.description}
                                    </div>
                                )
                            );
                        },
                    },
                    {
                        dataField: "ubications",
                        caption: "Ubicaciones",
                        cellTemplate: (container, { data }) => {
                            if (!data.ubications) return;
                            container.html(
                                renderToString(
                                    <ul
                                        className="m-0 ps-3"
                                        style={{ listStyle: "none" }}
                                    >
                                        {data.ubications
                                            .slice(0, 2)
                                            .map((char, i) => (
                                                <li
                                                    key={i}
                                                    className="text-truncate"
                                                    style={{
                                                        maxWidth: "250px",
                                                    }}
                                                >
                                                    <small>• {char}</small>
                                                </li>
                                            ))}
                                        {data.ubications.length > 2 && (
                                            <li>
                                                <small className="text-muted">
                                                    +
                                                    {data.ubications.length - 2}{" "}
                                                    más...
                                                </small>
                                            </li>
                                        )}
                                    </ul>
                                )
                            );
                        },
                    },
                    {
                        dataField: "phones",
                        caption: "Telefonos",
                        cellTemplate: (container, { data }) => {
                            if (!data.phones) return;
                            container.html(
                                renderToString(
                                    <ul
                                        className="m-0 ps-3"
                                        style={{ listStyle: "none" }}
                                    >
                                        {data.phones
                                            .slice(0, 2)
                                            .map((char, i) => (
                                                <li
                                                    key={i}
                                                    className="text-truncate"
                                                    style={{
                                                        maxWidth: "250px",
                                                    }}
                                                >
                                                    <small>• {char}</small>
                                                </li>
                                            ))}
                                        {data.phones.length > 2 && (
                                            <li>
                                                <small className="text-muted">
                                                    +{data.phones.length - 2}{" "}
                                                    más...
                                                </small>
                                            </li>
                                        )}
                                    </ul>
                                )
                            );
                        },
                    },

                    {
                        caption: "Acciones",
                        width: "100px",
                        cellTemplate: (container, { data }) => {
                            container.append(
                                DxButton({
                                    className:
                                        "btn btn-xs btn-soft-primary me-1",
                                    title: "Editar",
                                    icon: "fa fa-pen",
                                    onClick: () => onModalOpen(data),
                                })
                            );
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-danger",
                                    title: "Eliminar",
                                    icon: "fa fa-trash",
                                    onClick: () => onDeleteClicked(data.id),
                                })
                            );
                        },
                    },
                ]}
            />

            <Modal
                modalRef={modalRef}
                title={isEditing ? "Editar Sede" : "Nuevo Sede"}
                onSubmit={onModalSubmit}
                size="xl"
            >
                <input ref={idRef} type="hidden" />

                <div className="row">
                    <div className="col-md-6">
                        <InputFormGroup eRef={titleRef} label="Sede" required />

                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <textarea
                                ref={descriptionRef}
                                className="form-control"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Ubicaciones</label>
                            {ubications.map((ubication, index) => (
                                <div key={index} className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej: Calle Chiclayo 723"
                                        value={ubication.value}
                                        onChange={(e) =>
                                            updateUbication(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => removeUbications(index)}
                                        disabled={ubications.length <= 1}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={addUbication}
                            >
                                <i className="fas fa-plus me-1"></i> Agregar
                                Ubicación
                            </button>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Teléfonos</label>
                            {phones.map((phone, index) => (
                                <div key={index} className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej: 976 953 599"
                                        value={phone.value}
                                        onChange={(e) =>
                                            updatePhone(index, e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => removePhones(index)}
                                        disabled={phones.length <= 1}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={addPhone}
                            >
                                <i className="fas fa-plus me-1"></i> Agregar
                                Teléfono
                            </button>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Correos</label>
                            {emails.map((email, index) => (
                                <div key={index} className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej: info-miraflores@nopain.com.pe"
                                        value={email.value}
                                        onChange={(e) =>
                                            updateEmail(index, e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => removeEmails(index)}
                                        disabled={emails.length <= 1}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={addEmail}
                            >
                                <i className="fas fa-plus me-1"></i> Agregar
                                Correo
                            </button>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Horarios de Atención
                            </label>
                            {business_hours.map((business_hour, index) => (
                                <div key={index} className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej: Lunes a viernes: 8:00 am a 8:00 pm"
                                        value={business_hour.value}
                                        onChange={(e) =>
                                            updateBusiness_hours(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() =>
                                            removeBusiness_hours(index)
                                        }
                                        disabled={business_hours.length <= 1}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={addBusiness_hours}
                            >
                                <i className="fas fa-plus me-1"></i> Agregar
                                Horas de negocio
                            </button>
                        </div>

                        <InputFormGroup
                            type="url"
                            eRef={linkRef}
                            label="Link"
                        />
                        <div className="mb-3">
                            <label className="form-label">
                                Galería de imágenes
                            </label>
                            <input
                                type="file"
                                ref={galleryRef}
                                multiple
                                accept="image/*"
                                onChange={handleGalleryChange}
                                className="form-control"
                            />

                            <div className="d-flex flex-wrap gap-2 mt-2">
                                {gallery.map((image, index) => (
                                    <div
                                        key={index}
                                        className="position-relative"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                        }}
                                    >
                                        <img
                                            src={image.url}
                                            alt="Preview"
                                            className="img-thumbnail h-100 w-100 object-fit-cover"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-xs position-absolute top-0 end-0"
                                            onClick={() =>
                                                removeGalleryImage(index)
                                            }
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Sedes">
            <Facilities {...properties} />
        </BaseAdminto>
    );
});
