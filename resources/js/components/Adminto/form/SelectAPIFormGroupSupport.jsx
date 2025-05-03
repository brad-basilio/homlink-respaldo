import Tippy from "@tippyjs/react";
import React, { useEffect, useRef } from "react";
import { Cookies, JSON } from "sode-extend-react";

const SelectAPIFormGroupSupport = ({
    id,
    col,
    label,
    specification,
    eRef,
    required = false,
    dropdownParent,
    searchAPI,
    searchBy,
    multiple = false,
    filter = null,
    onChange = () => {},
    templateResult,
    templateSelection,
    tags = false,
    initialValue = null,
    allowCreate = true,
}) => {
    if (!eRef) eRef = useRef();
    if (!id) id = `select-${crypto.randomUUID()}`;

    useEffect(() => {
        const select = $(eRef.current).select2({
            dropdownParent: dropdownParent || document.body,
            minimumInputLength: 0,
            tags: tags,
            ajax: {
                url: searchAPI,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-Xsrf-Token": decodeURIComponent(
                        Cookies.get("XSRF-TOKEN")
                    ),
                },
                type: "POST",
                data: function (params) {
                    return JSON.stringify({
                        sort: [{ selector: searchBy, desc: false }],
                        skip: (params.page - 1) * 10,
                        take: 10,
                        filter: filter
                            ? [
                                  [searchBy, "contains", params.term || ""],
                                  "and",
                                  filter,
                              ]
                            : [searchBy, "contains", params.term || ""],
                    });
                },
                processResults: function (data, params) {
                    const page = params.page || 1;
                    const results = data.data.map((item) => ({
                        id: item[searchBy],
                        text: item[searchBy],
                    }));

                    // Opción para crear nuevo
                    if (data.data.length === 0 && params.term && allowCreate) {
                        results.push({
                            id: params.term,
                            text: `Crear "${params.term}"`,
                        });
                    }

                    return {
                        results: results,
                        pagination: {
                            more: data.totalCount > page * 10,
                        },
                    };
                },
            },
            createTag: allowCreate
                ? (params) => ({
                      id: params.term,
                      text: `Crear "${params.term}"`,
                  })
                : null,
            templateResult: (result) => {
                if (result.id === result.text) {
                    return $(
                        `<div class="bg-transparent">
                            <i class="fa fa-plus-circle me-2"></i>${result.text}
                        </div>`
                    );
                }
                return result.text;
            },
        });

        // Cargar valor inicial
        if (initialValue) {
            const option = new Option(initialValue, initialValue, true, true);
            eRef.current.appendChild(option);
            select.trigger("change");
        }

        // Manejar cambios
        select.on("change", (e) => {
            const value = e.target.value;
            onChange(value);
        });

        return () => select.select2("destroy");
    }, [searchAPI, searchBy, filter, initialValue]);

    return (
        <div className={`form-group ${col} mb-2`}>
            <label htmlFor={id} className="form-label mb-1">
                {label && (
                    <>
                        {label} {required && <b className="text-danger">*</b>}
                        {specification && (
                            <Tippy content={specification}>
                                <small className="ms-1 fa fa-question-circle text-muted"></small>
                            </Tippy>
                        )}
                    </>
                )}
            </label>
            <select
                ref={eRef}
                id={id}
                required={required}
                className="form-control"
                style={{ width: "100%" }}
                multiple={multiple}
            ></select>
        </div>
    );
};

export default SelectAPIFormGroupSupport;
