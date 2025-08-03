import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import Table from "../components/Adminto/Table";
import Modal from "../components/Adminto/Modal";
import InputFormGroup from "../components/Adminto/form/InputFormGroup";
import ImageFormGroup from "../components/Adminto/form/ImageFormGroup";
import DragDropImage from "../components/Adminto/form/DragDropImage";
import SelectFormGroup from "../components/Adminto/form/SelectFormGroup";
import CreateReactScript from "../Utils/CreateReactScript";
import ReactAppend from "../Utils/ReactAppend";
import PropertiesRest from "../actions/Admin/PropertiesRest";
import Swal from "sweetalert2";
import { renderToString } from "react-dom/server";

const propertiesRest = new PropertiesRest();

// Componente para tarjetas de amenidades/servicios/características
const FeatureCard = ({
    feature,
    index,
    onUpdate,
    onRemove,
    type,
    canRemove,
    amenities,
    services,
    characteristics,
    houseRules,
    addAmenity,
    addService,
    addCharacteristic,
    addHouseRule,
    propertyIcons,
}) => {
    const handleFieldChange = (field, value) => {
        onUpdate(index, field, value);
    };

    const getCardIcon = () => {
        switch (type) {
            case "amenity": return "fas fa-wifi";
            case "service": return "fas fa-concierge-bell";
            case "characteristic": return "fas fa-home";
            case "houseRule": return "fas fa-gavel";
            default: return "fas fa-star";
        }
    };

    const getCardTitle = () => {
        switch (type) {
            case "amenity": return "Amenidad";
            case "service": return "Servicio";
            case "characteristic": return "Característica";
            case "houseRule": return "Regla";
            default: return "Elemento";
        }
    };

    const getCurrentArray = () => {
        switch (type) {
            case "amenity": return amenities;
            case "service": return services;
            case "characteristic": return characteristics;
            case "houseRule": return houseRules;
            default: return [];
        }
    };

    const getAddFunction = () => {
        switch (type) {
            case "amenity": return addAmenity;
            case "service": return addService;
            case "characteristic": return addCharacteristic;
            case "houseRule": return addHouseRule;
            default: return () => { };
        }
    };

    const getFilteredIcons = () => {
        return propertyIcons.filter(icon => icon.category === type);
    };

    const iconTemplate = (e) => {
        if (!e.id) return;
        return $(renderToString(<span>
            <i className={`${e.id} me-2`}></i>
            {e.text}
        </span>));
    };

    return (
        <div className="card border shadow-sm h-100">
            <div className="card-header bg-transparent border-bottom-0 pb-0">
                <div className="d-flex align-items-center justify-content-between">
                    <h6 className="card-title mb-0">
                        <i className={getCardIcon() + " me-2"}></i>
                        {getCardTitle()} {index + 1}
                    </h6>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                        onClick={() => onRemove(index)}
                        disabled={!canRemove}
                        title="Eliminar"
                        style={{ width: '30px', height: '30px' }}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div className="card-body pt-2">
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <InputFormGroup
                            label={type === "characteristic" ? "Nombre" : "Nombre"}
                            value={feature.name || ""}
                            onChange={(e) => handleFieldChange("name", e.target.value)}
                            placeholder="Ingresa el nombre..."
                        />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <SelectFormGroup
                            label="Icono"
                            value={feature.icon || ""}
                            onChange={(e) => handleFieldChange("icon", e.target.value)}
                            templateResult={iconTemplate}
                            templateSelection={iconTemplate}
                            dropdownParent="#principal-container"
                        >
                            <option value="">Seleccionar icono...</option>
                            {getFilteredIcons().map((icon, iconIndex) => (
                                <option key={iconIndex} value={icon.id}>
                                    {icon.name}
                                </option>
                            ))}
                        </SelectFormGroup>
                    </div>
                </div>

                {(type === "service" || type === "characteristic") && (
                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            {type === "characteristic" ? "Valor" : "Descripción"}
                        </label>
                        <textarea
                            className="form-control"
                            rows={2}
                            value={type === "characteristic" ? (feature.value || "") : (feature.description || "")}
                            onChange={(e) => handleFieldChange(type === "characteristic" ? "value" : "description", e.target.value)}
                            placeholder={type === "characteristic" ? "Valor de la característica..." : "Describe el servicio..."}
                        />
                    </div>
                )}

                {type === "houseRule" && (
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Texto de la regla</label>
                        <textarea
                            className="form-control"
                            rows={2}
                            value={feature.text || ""}
                            onChange={(e) => handleFieldChange("text", e.target.value)}
                            placeholder="Texto de la regla..."
                        />
                    </div>
                )}

                {type === "amenity" && (
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={feature.available || false}
                            onChange={(e) => handleFieldChange("available", e.target.checked)}
                            id={`amenity-${index}`}
                        />
                        <label className="form-check-label" htmlFor={`amenity-${index}`}>
                            Disponible
                        </label>
                    </div>
                )}
            </div>
            <div className="card-footer bg-transparent border-top-0 pt-0" id={`feature-${type}-${index}`}>
                {index === getCurrentArray().length - 1 && (
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary w-100"
                        onClick={getAddFunction()}
                    >
                        <i className="fas fa-plus me-2"></i>
                        Agregar {getCardTitle()}
                    </button>
                )}
            </div>
        </div>
    );
};

const Properties = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form refs
    const idRef = useRef();
    const titleRef = useRef();
    const platformRef = useRef();
    const priceRef = useRef();
    const currencyRef = useRef();
    const addressRef = useRef();
    const departmentRef = useRef();
    const provinceRef = useRef();
    const districtRef = useRef();
    const postalCodeRef = useRef();
    const externalLinkRef = useRef();
    const bedroomsRef = useRef();
    const bathroomsRef = useRef();
    const maxGuestsRef = useRef();
    const areaMRef = useRef();
    const latitudeRef = useRef();
    const longitudeRef = useRef();
    const descriptionRef = useRef();
    const shortDescriptionRef = useRef();
    const ratingRef = useRef();
    const reviewsCountRef = useRef();

    // Image refs
    const mainImageRef = useRef();
    const galleryRef = useRef();

    const [isEditing, setIsEditing] = useState(false);
    const [gallery, setGallery] = useState([]);
    const [propertyIcons, setPropertyIcons] = useState([]);
    const [ubigeoData, setUbigeoData] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    // Estados para características dinámicas
    const [amenities, setAmenities] = useState([
        { name: "", icon: "", available: true },
    ]);
    const [services, setServices] = useState([
        { name: "", description: "", icon: "", available: true },
    ]);
    const [characteristics, setCharacteristics] = useState([
        { name: "", value: "", icon: "" },
    ]);
    const [houseRules, setHouseRules] = useState([
        { text: "", icon: "fas fa-info-circle" },
    ]);

    // Amenidades predefinidas como en el formulario del cliente
    const predefinedAmenities = [
        { id: 'wifi', label: 'WiFi', icon: 'fa-wifi' },
        { id: 'tv', label: 'TV', icon: 'fa-tv' },
        { id: 'kitchen', label: 'Cocina', icon: 'fa-utensils' },
        { id: 'washing_machine', label: 'Lavadora', icon: 'fa-tshirt' },
        { id: 'parking', label: 'Estacionamiento', icon: 'fa-car' },
        { id: 'air_conditioning', label: 'Aire acondicionado', icon: 'fa-snowflake' },
        { id: 'heating', label: 'Calefacción', icon: 'fa-fire' },
        { id: 'pool', label: 'Piscina', icon: 'fa-swimming-pool' },
        { id: 'gym', label: 'Gimnasio', icon: 'fa-dumbbell' },
        { id: 'balcony', label: 'Balcón', icon: 'fa-building' },
        { id: 'garden', label: 'Jardín', icon: 'fa-leaf' },
        { id: 'pet_friendly', label: 'Pet Friendly', icon: 'fa-paw' },
        { id: 'elevator', label: 'Ascensor', icon: 'fa-elevator' },
        { id: 'terrace', label: 'Terraza', icon: 'fa-home' },
        { id: 'bbq', label: 'Parrilla/BBQ', icon: 'fa-fire-burner' },
        { id: 'security', label: 'Seguridad 24h', icon: 'fa-shield-alt' }
    ];

    const [selectedAmenities, setSelectedAmenities] = useState([]);

    // Cargar datos iniciales
    useEffect(() => {
        loadPropertyIcons();
        loadUbigeoData();
    }, []);

    // Debugging para ver cambios en provinces
    useEffect(() => {
        console.log('Provinces state cambió:', provinces);
        console.log('Cantidad de provincias:', provinces.length);

        // Forzar actualización del select2 de provincia
        if (provinceRef.current && provinces.length > 0) {
            console.log('Actualizando select2 de provincia...');
            $(provinceRef.current).trigger('change.select2');

            // Debug después de un pequeño delay
            setTimeout(() => {
                debugSelectHTML();
            }, 200);
        }
    }, [provinces]);

    // Debug para districts
    useEffect(() => {
        console.log('Districts state cambió:', districts);
        console.log('Cantidad de distritos:', districts.length);

        // Forzar actualización del select2 de distrito
        if (districtRef.current && districts.length > 0) {
            console.log('Actualizando select2 de distrito...');
            $(districtRef.current).trigger('change.select2');
        }
    }, [districts]);

    // Función para debug del HTML generado
    const debugSelectHTML = () => {
        if (provinceRef.current) {
            console.log('HTML del select de provincia:', provinceRef.current.outerHTML);
            console.log('Opciones del select:', provinceRef.current.options.length);
            for (let i = 0; i < provinceRef.current.options.length; i++) {
                console.log(`Opción ${i}:`, provinceRef.current.options[i].value, '-', provinceRef.current.options[i].text);
            }
        }
    };

    const loadPropertyIcons = async () => {
        try {
            const response = await fetch('/property-icons.json');
            const icons = await response.json();
            setPropertyIcons(icons);
        } catch (error) {
            console.error('Error loading property icons:', error);
        }
    };

    const loadUbigeoData = async () => {
        try {
            console.log('Cargando datos de ubigeo...');
            const response = await fetch('/ubigeo.json?' + new Date().getTime()); // Cache busting
            const data = await response.json();
            console.log('Datos ubigeo cargados:', data.length, 'registros');
            console.log('Primer registro:', data[0]);
            console.log('Estructura del primer registro:', Object.keys(data[0]));
            setUbigeoData(data);

            // Extraer departamentos únicos con trim
            const uniqueDepartments = [...new Set(
                data
                    .map(item => item.departamento ? item.departamento.trim() : '')
                    .filter(dept => dept.length > 0)
            )].sort();

            console.log('Departamentos únicos extraídos:', uniqueDepartments);
            console.log('Total departamentos:', uniqueDepartments.length);
            setDepartments(uniqueDepartments);
        } catch (error) {
            console.error('Error loading ubigeo data:', error);
        }
    };

    const handleDepartmentChange = async (department) => {
        console.log('=== CAMBIO DE DEPARTAMENTO ===');
        console.log('Departamento seleccionado:', department);
        console.log('ubigeoData length:', ubigeoData.length);

        setSelectedDepartment(department);
        setSelectedProvince("");
        setSelectedDistrict("");

        // Limpiar los selects de provincia y distrito
        if (provinceRef.current) {
            $(provinceRef.current).val("").trigger('change.select2');
        }
        if (districtRef.current) {
            $(districtRef.current).val("").trigger('change.select2');
        }

        if (department && department.trim()) {
            // Si ubigeoData está vacío, intentar recargar los datos
            let dataToUse = ubigeoData;
            if (ubigeoData.length === 0) {
                console.log('ubigeoData está vacío, intentando recargar...');
                try {
                    const response = await fetch('/ubigeo.json');
                    const freshData = await response.json();
                    console.log('Datos recargados:', freshData.length, 'registros');
                    dataToUse = freshData;
                    setUbigeoData(freshData); // Actualizar el estado también
                } catch (error) {
                    console.error('Error recargando datos:', error);
                    setProvinces([]);
                    setDistricts([]);
                    return;
                }
            }

            const departmentTrimmed = department.trim();
            console.log('Departamento después de trim:', departmentTrimmed);

            // Mostrar algunos ejemplos de departamentos en los datos
            const sampleDepartments = dataToUse.slice(0, 5).map(item => item.departamento);
            console.log('Primeros 5 departamentos en los datos:', sampleDepartments);

            const filteredData = dataToUse.filter(item =>
                item.departamento && item.departamento.trim() === departmentTrimmed
            );
            console.log('Datos filtrados por departamento:', filteredData.length);
            console.log('Primeros 3 registros filtrados:', filteredData.slice(0, 3));

            if (filteredData.length === 0) {
                console.log('⚠️ NO SE ENCONTRARON DATOS para departamento:', departmentTrimmed);
                console.log('Departamentos únicos disponibles:', [...new Set(dataToUse.map(item => item.departamento))]);
            }

            const provincesSet = new Set(
                filteredData
                    .map(item => item.provincia ? item.provincia.trim() : '')
                    .filter(provincia => provincia.length > 0)
            );
            console.log('Provincias set:', provincesSet);

            const departmentProvinces = [...provincesSet].sort();
            console.log('Provincias finales:', departmentProvinces);

            setProvinces(departmentProvinces);

            // Verificar que el estado se actualice correctamente
            setTimeout(() => {
                console.log('Estado de provinces después de 100ms:', departmentProvinces);
            }, 100);

        } else {
            setProvinces([]);
        }
        setDistricts([]);
        console.log('=== FIN CAMBIO DEPARTAMENTO ===');
    };

    const handleProvinceChange = async (province, departmentValue = null) => {
        console.log('=== CAMBIO DE PROVINCIA ===');
        console.log('Provincia seleccionada:', province);

        // Usar el parámetro departmentValue si se proporciona, sino usar selectedDepartment
        const currentDepartment = departmentValue || selectedDepartment;
        console.log('Departamento a usar:', currentDepartment);
        console.log('selectedDepartment del estado:', selectedDepartment);
        console.log('ubigeoData length:', ubigeoData.length);

        setSelectedProvince(province);
        setSelectedDistrict("");

        // Limpiar el select de distrito
        if (districtRef.current) {
            $(districtRef.current).val("").trigger('change.select2');
        }

        if (province && province.trim() && currentDepartment && currentDepartment.trim()) {
            // Si ubigeoData está vacío, intentar recargar los datos
            let dataToUse = ubigeoData;
            if (ubigeoData.length === 0) {
                console.log('ubigeoData está vacío en handleProvinceChange, intentando recargar...');
                try {
                    const response = await fetch('/ubigeo.json?' + new Date().getTime()); // Cache busting
                    const freshData = await response.json();
                    console.log('Datos recargados para provincia:', freshData.length, 'registros');
                    console.log('Primer registro:', freshData[0]);
                    dataToUse = freshData;
                    setUbigeoData(freshData); // Actualizar el estado también
                } catch (error) {
                    console.error('Error recargando datos en handleProvinceChange:', error);
                    setDistricts([]);
                    return;
                }
            }

            const provinceTrimmed = province.trim();
            const departmentTrimmed = currentDepartment.trim();

            console.log('Buscando distritos para:', { departmentTrimmed, provinceTrimmed });
            console.log('Datos disponibles para filtrar:', dataToUse.length, 'registros');

            const filteredByDeptAndProv = dataToUse.filter(item =>
                item.departamento && item.departamento.trim() === departmentTrimmed &&
                item.provincia && item.provincia.trim() === provinceTrimmed
            );

            console.log('Registros filtrados por depto y provincia:', filteredByDeptAndProv.length);
            console.log('Primeros 3 registros filtrados:', filteredByDeptAndProv.slice(0, 3));

            const provinceDistricts = filteredByDeptAndProv
                .map(item => item.distrito ? item.distrito.trim() : '')
                .filter(distrito => distrito.length > 0)
                .sort();

            console.log('Distritos encontrados:', provinceDistricts);
            console.log('Cantidad de distritos:', provinceDistricts.length);
            setDistricts(provinceDistricts);
        } else {
            console.log('❌ Condición no cumplida:');
            console.log('  - province:', province);
            console.log('  - province.trim():', province ? province.trim() : 'N/A');
            console.log('  - currentDepartment:', currentDepartment);
            console.log('  - currentDepartment.trim():', currentDepartment ? currentDepartment.trim() : 'N/A');
            setDistricts([]);
        }
        console.log('=== FIN CAMBIO PROVINCIA ===');
    };

    const handleDistrictChange = (district) => {
        setSelectedDistrict(district);
        console.log('Distrito seleccionado:', district);
    };

    // Funciones para galería de imágenes
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        setGallery(prev => [...prev, ...files]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setGallery(prev => [...prev, ...files]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const removeGalleryImage = (index) => {
        setGallery(prev => prev.filter((_, i) => i !== index));
    };

    // Funciones para amenidades predefinidas
    const togglePredefinedAmenity = (amenityId) => {
        setSelectedAmenities(prev => 
            prev.includes(amenityId)
                ? prev.filter(id => id !== amenityId)
                : [...prev, amenityId]
        );
    };

    // Funciones para amenidades
    const addAmenity = () => {
        setAmenities([...amenities, { name: "", icon: "", available: true }]);
    };

    const updateAmenity = useCallback((index, field, value) => {
        setAmenities(prev => prev.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        ));
    }, []);

    const removeAmenity = (index) => {
        if (amenities.length > 1) {
            setAmenities(amenities.filter((_, i) => i !== index));
        }
    };

    // Funciones para servicios
    const addService = () => {
        setServices([...services, { name: "", description: "", icon: "", available: true }]);
    };

    const updateService = useCallback((index, field, value) => {
        setServices(prev => prev.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        ));
    }, []);

    const removeService = (index) => {
        if (services.length > 1) {
            setServices(services.filter((_, i) => i !== index));
        }
    };

    // Funciones para características
    const addCharacteristic = () => {
        setCharacteristics([...characteristics, { name: "", value: "", icon: "" }]);
    };

    const updateCharacteristic = useCallback((index, field, value) => {
        setCharacteristics(prev => prev.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        ));
    }, []);

    const removeCharacteristic = (index) => {
        if (characteristics.length > 1) {
            setCharacteristics(characteristics.filter((_, i) => i !== index));
        }
    };

    // Funciones para reglas de la casa
    const addHouseRule = () => {
        setHouseRules([...houseRules, { text: "", icon: "fas fa-info-circle" }]);
    };

    const updateHouseRule = useCallback((index, field, value) => {
        setHouseRules(prev => prev.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        ));
    }, []);

    const removeHouseRule = (index) => {
        if (houseRules.length > 1) {
            setHouseRules(houseRules.filter((_, i) => i !== index));
        }
    };

    // Cargar datos al editar
    const onModalOpen = async (data) => {
        setIsEditing(!!data);

        if (data) {
            idRef.current.value = data.id || "";
            titleRef.current.value = data.title || "";
            platformRef.current.value = "Airbnb"; // Siempre Airbnb
            priceRef.current.value = data.price_per_night || "";
            currencyRef.current.value = data.currency || "PEN";
            addressRef.current.value = data.address || "";
            postalCodeRef.current.value = data.postal_code || "";
            externalLinkRef.current.value = data.external_link || "";

            // Cargar amenidades predefinidas
            if (data.amenities && Array.isArray(data.amenities)) {
                setSelectedAmenities(data.amenities);
            } else {
                setSelectedAmenities([]);
            }

            // Cargar ubicación en secuencia asíncrona
            if (data.department) {
                setSelectedDepartment(data.department);
                await handleDepartmentChange(data.department);
                $(departmentRef.current).val(data.department).trigger('change');
                
                // Ahora que las provincias están cargadas, establecer la provincia
                if (data.province) {
                    setSelectedProvince(data.province);
                    await handleProvinceChange(data.province, data.department);
                    setTimeout(() => {
                        $(provinceRef.current).val(data.province).trigger('change');
                    }, 100);
                    
                    // Ahora que los distritos están cargados, establecer el distrito
                    if (data.district) {
                        setSelectedDistrict(data.district);
                        setTimeout(() => {
                            $(districtRef.current).val(data.district).trigger('change');
                        }, 200);
                    }
                }
            }

            bedroomsRef.current.value = data.bedrooms || 1;
            bathroomsRef.current.value = data.bathrooms || 1;
            maxGuestsRef.current.value = data.max_guests || 2;
            areaMRef.current.value = data.area_m2 || "";
            latitudeRef.current.value = data.latitude || "";
            longitudeRef.current.value = data.longitude || "";
            descriptionRef.current.value = data.description || "";
            shortDescriptionRef.current.value = data.short_description || "";
            ratingRef.current.value = data.rating || 5.0;
            reviewsCountRef.current.value = data.reviews_count || 0;

            // Configurar imagen principal si existe
            if (data.main_image) {
                mainImageRef.image.src = `/api/property/media/${data.main_image}`;
              
            }

            // Cargar arrays dinámicos - separar amenidades predefinidas de personalizadas
            const customAmenities = data.amenities_custom?.length ? data.amenities_custom : [{ name: "", icon: "", available: true }];
            setAmenities(customAmenities);
            setServices(data.services?.length ? data.services : [{ name: "", description: "", icon: "", available: true }]);
            setCharacteristics(data.characteristics?.length ? data.characteristics : [{ name: "", value: "", icon: "" }]);
            setHouseRules(data.house_rules?.length ? data.house_rules : [{ text: "", icon: "fas fa-info-circle" }]);
            setGallery(data.gallery || []);
        } else {
            // Limpiar formulario
            idRef.current.value = "";
            titleRef.current.value = "";
            platformRef.current.value = "Airbnb"; // Siempre Airbnb por defecto
            priceRef.current.value = "";
            currencyRef.current.value = "PEN";
            addressRef.current.value = "";
            postalCodeRef.current.value = "";
            externalLinkRef.current.value = "";

            // Limpiar amenidades predefinidas
            setSelectedAmenities([]);

            // Limpiar ubicación
            setSelectedDepartment("");
            setSelectedProvince("");
            $(departmentRef.current).val("").trigger('change');
            $(provinceRef.current).val("").trigger('change');
            $(districtRef.current).val("").trigger('change');

            bedroomsRef.current.value = 1;
            bathroomsRef.current.value = 1;
            maxGuestsRef.current.value = 2;
            areaMRef.current.value = "";
            latitudeRef.current.value = "";
            longitudeRef.current.value = "";
            descriptionRef.current.value = "";
            shortDescriptionRef.current.value = "";
            ratingRef.current.value = 5.0;
            reviewsCountRef.current.value = 0;

            mainImageRef.current.value = "";
            mainImageRef.image.src = `/api/property/media/undefined`;

            setAmenities([{ name: "", icon: "", available: true }]);
            setServices([{ name: "", description: "", icon: "", available: true }]);
            setCharacteristics([{ name: "", value: "", icon: "" }]);
            setHouseRules([{ text: "", icon: "fas fa-info-circle" }]);
            setGallery([]);
        }

        $(modalRef.current).modal('show');
    };

    // Enviar formulario
    const onModalSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Campos básicos
        if (idRef.current.value) formData.append("id", idRef.current.value);
        formData.append("title", titleRef.current.value);
        formData.append("platform", "Airbnb"); // Siempre Airbnb
        formData.append("price_per_night", priceRef.current.value);
        formData.append("currency", currencyRef.current.value);
        formData.append("address", addressRef.current.value);
        formData.append("postal_code", postalCodeRef.current.value);
        formData.append("external_link", externalLinkRef.current.value);
        formData.append("department", $(departmentRef.current).val());
        formData.append("province", $(provinceRef.current).val());
        formData.append("district", $(districtRef.current).val());
        formData.append("bedrooms", bedroomsRef.current.value);
        formData.append("bathrooms", bathroomsRef.current.value);
        formData.append("max_guests", maxGuestsRef.current.value);
        formData.append("area_m2", areaMRef.current.value);
        formData.append("latitude", latitudeRef.current.value);
        formData.append("longitude", longitudeRef.current.value);
        formData.append("description", descriptionRef.current.value);
        formData.append("short_description", shortDescriptionRef.current.value);
        formData.append("rating", ratingRef.current.value);
        formData.append("reviews_count", reviewsCountRef.current.value);

        // ✅ AGREGADO: Las propiedades creadas desde admin se aprueban automáticamente
        if (!isEditing) {
            formData.append("admin_approved", true);
        }

        // Amenidades predefinidas (como array simple)
        selectedAmenities.forEach((amenityId, index) => {
            formData.append(`amenities[${index}]`, amenityId);
        });

        // ✅ CORREGIDO: Amenidades personalizadas (en el campo amenities_custom)
        amenities.forEach((amenity, index) => {
            formData.append(`amenities_custom[${index}][name]`, amenity.name);
            formData.append(`amenities_custom[${index}][icon]`, amenity.icon);
            formData.append(`amenities_custom[${index}][available]`, amenity.available);
        });

        // Imagen principal
        if (mainImageRef.current?.files?.[0]) {
            formData.append("main_image", mainImageRef.current.files[0]);
        }

        // Galería de imágenes
        gallery.forEach((image, index) => {
            if (image instanceof File) {
                formData.append(`gallery[]`, image);
            }
        });

        // Galería existente (para edición)
        if (isEditing) {
            const existingGallery = gallery.filter(image => typeof image === 'string');
            formData.append("existing_gallery", JSON.stringify(existingGallery));
        }

        // Arrays dinámicos - amenidades personalizadas
        amenities.forEach((amenity, index) => {
            formData.append(`amenities_custom[${index}][name]`, amenity.name);
            formData.append(`amenities_custom[${index}][icon]`, amenity.icon);
            formData.append(`amenities_custom[${index}][available]`, amenity.available);
        });

        services.forEach((service, index) => {
            formData.append(`services[${index}][name]`, service.name);
            formData.append(`services[${index}][description]`, service.description || "");
            formData.append(`services[${index}][icon]`, service.icon);
            formData.append(`services[${index}][available]`, service.available);
        });

        characteristics.forEach((characteristic, index) => {
            formData.append(`characteristics[${index}][name]`, characteristic.name);
            formData.append(`characteristics[${index}][value]`, characteristic.value || "");
            formData.append(`characteristics[${index}][icon]`, characteristic.icon);
        });

        houseRules.forEach((rule, index) => {
            formData.append(`house_rules[${index}][text]`, rule.text);
            formData.append(`house_rules[${index}][icon]`, rule.icon);
        });

        try {
            await propertiesRest.save(formData);
            $(modalRef.current).modal('hide');
            $(gridRef.current).dxDataGrid("instance").refresh();
            Swal.fire({
                title: 'Éxito',
                text: 'Propiedad guardada correctamente',
                icon: 'success'
            });
        } catch (error) {
            console.error("Error saving property:", error);
            Swal.fire({
                title: 'Error',
                text: 'Error al guardar la propiedad',
                icon: 'error'
            });
        }
    };

    const onBooleanChange = async ({ id, field, value }) => {
        try {
            await propertiesRest.save({ id, [field]: value });
            $(gridRef.current).dxDataGrid("instance").refresh();
        } catch (error) {
            console.error("Error updating property:", error);
        }
    };

    // ✅ AGREGADO: Función para aprobar propiedades
    const onApproveProperty = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Aprobar propiedad?',
                text: 'Esta propiedad será visible públicamente',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#198754',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sí, aprobar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                const response = await fetch('/api/admin/properties/approve', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                    },
                    body: JSON.stringify({ id })
                });

                const data = await response.json();

                if (data.status === 200) {
                    $(gridRef.current).dxDataGrid("instance").refresh();
                    Swal.fire({
                        title: 'Aprobada',
                        text: 'La propiedad ha sido aprobada exitosamente',
                        icon: 'success'
                    });
                } else {
                    throw new Error(data.message);
                }
            }
        } catch (error) {
            console.error("Error approving property:", error);
            Swal.fire({
                title: 'Error',
                text: 'Error al aprobar la propiedad',
                icon: 'error'
            });
        }
    };

    // ✅ AGREGADO: Función para rechazar propiedades
    const onRejectProperty = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Rechazar propiedad?',
                text: 'Esta propiedad no será visible públicamente',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sí, rechazar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                const response = await fetch('/api/admin/properties/reject', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                    },
                    body: JSON.stringify({ id })
                });

                const data = await response.json();

                if (data.status === 200) {
                    $(gridRef.current).dxDataGrid("instance").refresh();
                    Swal.fire({
                        title: 'Rechazada',
                        text: 'La propiedad ha sido rechazada',
                        icon: 'success'
                    });
                } else {
                    throw new Error(data.message);
                }
            }
        } catch (error) {
            console.error("Error rejecting property:", error);
            Swal.fire({
                title: 'Error',
                text: 'Error al rechazar la propiedad',
                icon: 'error'
            });
        }
    };

    const onDeleteClicked = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Estás seguro de eliminar esta propiedad?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
        if (result.isConfirmed) {
            try {
                await propertiesRest.delete(id);
                $(gridRef.current).dxDataGrid("instance").refresh();
                Swal.fire({
                    title: 'Éxito',
                    text: 'Propiedad eliminada correctamente',
                    icon: 'success'
                });
            } catch (error) {
                console.error("Error deleting property:", error);
                Swal.fire({
                    title: 'Error',
                    text: 'Error al eliminar la propiedad',
                    icon: 'error'
                });
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        
                        <div className="card-body">
                            <Table
                                gridRef={gridRef}
                                title="Propiedades"
                                rest={propertiesRest}
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
                                            text: "Nueva Propiedad",
                                            hint: "Crear nueva propiedad",
                                            onClick: async () => await onModalOpen(),
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
                                        dataField: "main_image",
                                        caption: "Imagen",
                                        width: "80px",
                                        allowFiltering: false,
                                        cellTemplate: (container, { data }) => {
                                            ReactAppend(
                                                container,
                                                data.main_image ? (
                                                    <img
                                                        src={`/api/property/media/${data.main_image}`}
                                                        alt="Propiedad"
                                                        className="rounded"
                                                        style={{ width: "60px", height: "40px", objectFit: "cover" }}
                                                    />
                                                ) : (
                                                    <div className="bg-secondary rounded d-flex align-items-center justify-content-center" style={{ width: "60px", height: "40px" }}>
                                                        <i className="fas fa-image text-white"></i>
                                                    </div>
                                                )
                                            );
                                        }
                                    },
                                    {
                                        dataField: "title",
                                        caption: "Título",
                                        width: "250px",
                                    },
                                    {
                                        dataField: "platform",
                                        caption: "Plataforma",
                                        width: "100px",
                                    },
                                    {
                                        dataField: "price_per_night",
                                        caption: "Precio/Noche",
                                        width: "120px",
                                        cellTemplate: (container, { data }) => {
                                            ReactAppend(
                                                container,
                                                <span>{data.currency} {parseFloat(data.price_per_night || 0).toFixed(2)}</span>
                                            );
                                        }
                                    },
                                    {
                                        dataField: "district",
                                        caption: "Ubicación",
                                        width: "150px",
                                        cellTemplate: (container, { data }) => {
                                            ReactAppend(
                                                container,
                                                <div>
                                                    <div className="fw-bold">{data.district}</div>
                                                    <small className="text-muted">{data.department}</small>
                                                </div>
                                            );
                                        }
                                    },
                                    {
                                        dataField: "bedrooms",
                                        caption: "Dormitorios",
                                        width: "100px",
                                    },
                                    {
                                        dataField: "max_guests",
                                        caption: "Huéspedes",
                                        width: "100px",
                                    },
                                    {
                                        dataField: "rating",
                                        caption: "Rating",
                                        width: "80px",
                                        cellTemplate: (container, { data }) => {
                                            ReactAppend(
                                                container,
                                                <span className="badge bg-warning">
                                                    <i className="fas fa-star me-1"></i>
                                                    {data.rating || 0}
                                                </span>
                                            );
                                        }
                                    },
                                    {
                                        dataField: "active",
                                        caption: "Activo",
                                        dataType: "boolean",
                                        width: "100px",
                                        cellTemplate: (container, { data }) => {
                                            ReactAppend(
                                                container,
                                                <div className="form-check form-switch">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={data.active}
                                                        onChange={(e) => onBooleanChange({
                                                            id: data.id,
                                                            field: "active",
                                                            value: e.target.checked
                                                        })}
                                                    />
                                                </div>
                                            );
                                        }
                                    },
                                    {
                                        dataField: "featured",
                                        caption: "Destacado",
                                        dataType: "boolean",
                                        width: "100px",
                                        cellTemplate: (container, { data }) => {
                                            ReactAppend(
                                                container,
                                                <div className="form-check form-switch">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={data.featured}
                                                        onChange={(e) => onBooleanChange({
                                                            id: data.id,
                                                            field: "featured",
                                                            value: e.target.checked
                                                        })}
                                                    />
                                                </div>
                                            );
                                        }
                                    },
                                    // ✅ AGREGADO: Columna de aprobación
                                    {
                                        dataField: "admin_approved",
                                        caption: "Aprobación",
                                        width: "140px",
                                        cellTemplate: (container, { data }) => {
                                            ReactAppend(
                                                container,
                                                <div className="d-flex gap-1">
                                                    {data.admin_approved ? (
                                                        <>
                                                            <span className="badge bg-success">
                                                                <i className="fas fa-check me-1"></i>
                                                                Aprobada
                                                            </span>
                                                            <button
                                                                className="btn btn-xs btn-outline-danger"
                                                                onClick={() => onRejectProperty(data.id)}
                                                                title="Rechazar"
                                                            >
                                                                <i className="fas fa-times"></i>
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="badge bg-warning">
                                                                <i className="fas fa-clock me-1"></i>
                                                                Pendiente
                                                            </span>
                                                            <button
                                                                className="btn btn-xs btn-outline-success"
                                                                onClick={() => onApproveProperty(data.id)}
                                                                title="Aprobar"
                                                            >
                                                                <i className="fas fa-check"></i>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            );
                                        },
                                        allowFiltering: true,
                                        filterOperations: ["="],
                                        lookup: {
                                            dataSource: [
                                                { value: true, text: "Aprobada" },
                                                { value: false, text: "Pendiente" }
                                            ],
                                            valueExpr: "value",
                                            displayExpr: "text"
                                        }
                                    },
                                    {
                                        caption: "Acciones",
                                        width: "100px",
                                        cellTemplate: (container, { data }) => {
                                            ReactAppend(
                                                container,
                                                <div className="d-flex gap-1">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={async () => await onModalOpen(data)}
                                                        title="Editar"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => onDeleteClicked(data.id)}
                                                        title="Eliminar"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            );
                                        },
                                        allowFiltering: false,
                                        allowExporting: false,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                modalRef={modalRef}
                title={isEditing ? "Editar Propiedad" : "Nueva Propiedad"}
                onSubmit={onModalSubmit}
                size="xl"
            >
                <div className="row" id="principal-container">
                    <input type="hidden" ref={idRef} />

                    {/* Información básica */}
                    <div className="col-12 mb-4">
                        <h5 className="border-bottom pb-2">
                            <i className="fas fa-info-circle me-2"></i>
                            Información Básica
                        </h5>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-8 mb-3">
                                        <InputFormGroup
                                            label="Título de la propiedad"
                                            eRef={titleRef}
                                            placeholder="Ej: Apartamento moderno en Miraflores"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <label className="form-label fw-semibold">Plataforma</label>
                                        <select className="form-select" ref={platformRef} required disabled
                                        >
                                            <option value="Airbnb">Airbnb</option>
                                            <option value="Booking">Booking.com</option>
                                            <option value="Vrbo">Vrbo</option>
                                            <option value="HomeAway">HomeAway</option>
                                            <option value="Otras">Otras</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 mb-3">
                                        <InputFormGroup
                                            label="Precio por noche"
                                            eRef={priceRef}
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder="120.00"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-2 mb-3">
                                        <label className="form-label fw-semibold">Moneda</label>
                                        <select className="form-select" ref={currencyRef} disabled>
                                            <option value="PEN">PEN</option>
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-2 mb-3">
                                        <InputFormGroup
                                            label="Dormitorios"
                                            eRef={bedroomsRef}
                                            type="number"
                                            min="1"
                                            placeholder="1"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-2 mb-3">
                                        <InputFormGroup
                                            label="Baños"
                                            eRef={bathroomsRef}
                                            type="number"
                                            min="1"
                                            placeholder="1"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-2 mb-3">
                                        <InputFormGroup
                                            label="Huéspedes máx."
                                            eRef={maxGuestsRef}
                                            type="number"
                                            min="1"
                                            placeholder="2"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <ImageFormGroup
                                    label="Imagen principal"
                                    eRef={mainImageRef}
                                    aspect={16 / 9}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Galería de imágenes */}
                    <div className="col-12 mb-4">
                        <h5 className="border-bottom pb-2">
                            <i className="fas fa-images me-2"></i>
                            Galería de Imágenes
                        </h5>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label className="form-label fw-semibold">Agregar imágenes a la galería</label>
                                <div
                                    className="border border-dashed border-primary rounded p-4 text-center"
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    style={{ minHeight: '120px' }}
                                >
                                    <i className="fas fa-cloud-upload-alt fa-3x text-primary mb-3"></i>
                                    <p className="mb-2">Arrastra las imágenes aquí o</p>
                                    <input
                                        type="file"
                                        ref={galleryRef}
                                        multiple
                                        accept="image/*"
                                        onChange={handleGalleryChange}
                                        className="d-none"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => galleryRef.current?.click()}
                                    >
                                        Seleccionar Archivos
                                    </button>
                                </div>
                            </div>
                            {gallery.length > 0 && (
                                <div className="col-12">
                                    <div className="row">
                                        {gallery.map((image, index) => (
                                            <div key={index} className="col-lg-2 col-md-3 col-sm-4 mb-3">
                                                <div className="position-relative">
                                                    <img
                                                        src={image instanceof File ? URL.createObjectURL(image) : `/api/property/media/${image}`}
                                                        alt={`Galería ${index + 1}`}
                                                        className="img-fluid rounded"
                                                        style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
                                                        style={{ width: '25px', height: '25px', fontSize: '12px' }}
                                                        onClick={() => removeGalleryImage(index)}
                                                    >
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ubicación */}
                    <div className="col-12 mb-4">
                        <h5 className="border-bottom pb-2">
                            <i className="fas fa-map-marker-alt me-2"></i>
                            Ubicación
                        </h5>
                        <div className="row">
                            <div className="col-lg-4 mb-3">
                                <InputFormGroup
                                    label="Dirección completa"
                                    eRef={addressRef}
                                    placeholder="Av. Ricardo Palma 251"
                                    required
                                />
                            </div>
                            <div className="col-lg-2 mb-3">
                                <InputFormGroup
                                    label="Código Postal"
                                    eRef={postalCodeRef}
                                    placeholder="15074"
                                />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <InputFormGroup
                                    label="Link de Airbnb (Para sincronizar fechas)"
                                    eRef={externalLinkRef}
                                    type="url"
                                    placeholder="https://www.airbnb.com/rooms/12345"
                                />
                                <small className="text-muted">
                                    <i className="fas fa-info-circle me-1"></i>
                                    Este enlace permite sincronizar automáticamente las fechas disponibles
                                </small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 mb-3">
                                <SelectFormGroup
                                    label="Departamento"
                                    eRef={departmentRef}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedDepartment(value);
                                        handleDepartmentChange(value);
                                    }}
                                    dropdownParent="#principal-container"
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    {departments.map((dept, index) => (
                                        <option key={index} value={dept}>{dept}</option>
                                    ))}
                                </SelectFormGroup>
                            </div>
                            <div className="col-lg-4 mb-3">
                                <SelectFormGroup
                                    label="Provincia"
                                    eRef={provinceRef}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedProvince(value);

                                        // Obtener el departamento actual del select
                                        const currentDept = departmentRef.current ? $(departmentRef.current).val() : selectedDepartment;
                                        console.log('🔍 Provincia onChange - Departamento actual:', currentDept);
                                        console.log('🔍 Provincia onChange - selectedDepartment estado:', selectedDepartment);

                                        handleProvinceChange(value, currentDept);
                                    }}
                                    disabled={!selectedDepartment}
                                    dropdownParent="#principal-container"
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    {provinces.map((prov, index) => (
                                        <option key={index} value={prov}>{prov}</option>
                                    ))}
                                </SelectFormGroup>
                            </div>
                            <div className="col-lg-4 mb-3">
                                <SelectFormGroup
                                    label="Distrito"
                                    eRef={districtRef}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedDistrict(value);
                                        handleDistrictChange(value);
                                    }}
                                    disabled={!selectedProvince}
                                    dropdownParent="#principal-container"
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    {districts.map((dist, index) => (
                                        <option key={index} value={dist}>{dist}</option>
                                    ))}
                                </SelectFormGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 mb-3">
                                <InputFormGroup
                                    label="Área (m²)"
                                    eRef={areaMRef}
                                    type="number"
                                    min="1"
                                    placeholder="60"
                                />
                            </div>
                            <div className="col-lg-4 mb-3">
                                <InputFormGroup
                                    label="Latitud"
                                    eRef={latitudeRef}
                                    type="number"
                                    step="0.000001"
                                    placeholder="-12.1211"
                                />
                            </div>
                            <div className="col-lg-4 mb-3">
                                <InputFormGroup
                                    label="Longitud"
                                    eRef={longitudeRef}
                                    type="number"
                                    step="0.000001"
                                    placeholder="-77.0269"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="col-12 mb-4">
                        <h5 className="border-bottom pb-2">
                            <i className="fas fa-align-left me-2"></i>
                            Descripción
                        </h5>
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label className="form-label fw-semibold">Descripción completa</label>
                                <textarea
                                    className="form-control"
                                    ref={descriptionRef}
                                    rows={4}
                                    placeholder="Describe detalladamente la propiedad..."
                                    required
                                />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label className="form-label fw-semibold">Descripción corta</label>
                                <textarea
                                    className="form-control"
                                    ref={shortDescriptionRef}
                                    rows={4}
                                    placeholder="Resumen breve para listados..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Amenidades Predefinidas */}
                    <div className="col-12 mb-4">
                        <h5 className="border-bottom pb-2">
                            <i className="fas fa-star me-2"></i>
                            Amenidades Principales
                        </h5>
                        <div className="row">
                            {predefinedAmenities.map((amenity, index) => (
                                <div key={amenity.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                                    <div 
                                        className={`card h-100 border-2 cursor-pointer transition-all ${
                                            selectedAmenities.includes(amenity.id)
                                                ? 'border-primary bg-light'
                                                : 'border-light hover:border-secondary'
                                        }`}
                                        onClick={() => togglePredefinedAmenity(amenity.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="card-body p-3 text-center">
                                            <i className={`fas ${amenity.icon} fa-2x mb-2 ${
                                                selectedAmenities.includes(amenity.id) ? 'text-primary' : 'text-muted'
                                            }`}></i>
                                            <h6 className={`mb-0 ${
                                                selectedAmenities.includes(amenity.id) ? 'text-primary fw-bold' : 'text-dark'
                                            }`}>
                                                {amenity.label}
                                            </h6>
                                            {selectedAmenities.includes(amenity.id) && (
                                                <div className="position-absolute top-0 end-0 p-2">
                                                    <i className="fas fa-check-circle text-success"></i>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="alert alert-info">
                            <i className="fas fa-info-circle me-2"></i>
                            Selecciona las amenidades que tiene tu propiedad. Estas amenidades son las más comunes y aparecerán destacadas en los listados.
                        </div>
                    </div>

                    {/* Amenidades Personalizadas */}
                    <div className="col-12 mb-4">
                        <h5 className="border-bottom pb-2">
                            <i className="fas fa-wifi me-2"></i>
                            Amenidades Personalizadas
                        </h5>
                        <div className="alert alert-warning">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            Agrega amenidades adicionales que no estén en la lista principal.
                        </div>
                        <div className="row">
                            {amenities.map((amenity, index) => (
                                <div key={index} className="col-lg-4 mb-3">
                                    <FeatureCard
                                        feature={amenity}
                                        index={index}
                                        onUpdate={updateAmenity}
                                        onRemove={removeAmenity}
                                        type="amenity"
                                        canRemove={amenities.length > 1}
                                        amenities={amenities}
                                        addAmenity={addAmenity}
                                        propertyIcons={propertyIcons}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Servicios */}
                    <div className="col-12 mb-4">
                        <h5 className="border-bottom pb-2">
                            <i className="fas fa-concierge-bell me-2"></i>
                            Servicios
                        </h5>
                        <div className="row">
                            {services.map((service, index) => (
                                <div key={index} className="col-lg-4 mb-3">
                                    <FeatureCard
                                        feature={service}
                                        index={index}
                                        onUpdate={updateService}
                                        onRemove={removeService}
                                        type="service"
                                        canRemove={services.length > 1}
                                        services={services}
                                        addService={addService}
                                        propertyIcons={propertyIcons}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Características */}
                    <div className="col-12 mb-4">
                        <h5 className="border-bottom pb-2">
                            <i className="fas fa-home me-2"></i>
                            Características
                        </h5>
                        <div className="row">
                            {characteristics.map((characteristic, index) => (
                                <div key={index} className="col-lg-4 mb-3">
                                    <FeatureCard
                                        feature={characteristic}
                                        index={index}
                                        onUpdate={updateCharacteristic}
                                        onRemove={removeCharacteristic}
                                        type="characteristic"
                                        canRemove={characteristics.length > 1}
                                        characteristics={characteristics}
                                        addCharacteristic={addCharacteristic}
                                        propertyIcons={propertyIcons}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reglas de la casa */}
                    <div className="col-12 mb-4">
                        <h5 className="border-bottom pb-2">
                            <i className="fas fa-gavel me-2"></i>
                            Reglas de la Casa
                        </h5>
                        <div className="row">
                            {houseRules.map((rule, index) => (
                                <div key={index} className="col-lg-6 mb-3">
                                    <FeatureCard
                                        feature={rule}
                                        index={index}
                                        onUpdate={updateHouseRule}
                                        onRemove={removeHouseRule}
                                        type="houseRule"
                                        canRemove={houseRules.length > 1}
                                        houseRules={houseRules}
                                        addHouseRule={addHouseRule}
                                        propertyIcons={propertyIcons}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Información adicional */}
                    <div className="col-12 mb-4">
                        <h5 className="border-bottom pb-2">
                            <i className="fas fa-star me-2"></i>
                            Información Adicional
                        </h5>
                        <div className="row">
                            <div className="col-lg-3 mb-3">
                                <InputFormGroup
                                    label="Rating"
                                    eRef={ratingRef}
                                    type="number"
                                    step="0.1"
                                    min="1"
                                    max="5"
                                    placeholder="5.0"
                                />
                            </div>
                            <div className="col-lg-3 mb-3">
                                <InputFormGroup
                                    label="Número de reseñas"
                                    eRef={reviewsCountRef}
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Propiedades">
            <Properties {...properties} />
        </BaseAdminto>
    );
});
