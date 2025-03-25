import React, { createContext, useState, useEffect } from "react";
import { Local } from "sode-extend-react";
import ItemsRest from "../actions/ItemRest";

export const CarritoContext = createContext();
const itemsRest = new ItemsRest();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        const data = localStorage.getItem("carrito");

        return data ? JSON.parse(data) : [];
    });
    console.log("data", carrito);

    // Función para obtener precios actualizados desde la API
    const actualizarPrecios = async () => {
        try {
            if (carrito.length === 0) return; // Evitar llamadas innecesarias
            itemsRest.verifyStock(carrito.map((x) => x.id)).then((items) => {
                const newCart = carrito.map((x) => {
                    const found = items.find((item) => item.id === x.id);
                    return found
                        ? {
                              ...x,
                              price: found.price,
                              final_price: found.final_price,
                              discount: found.discount,
                              name: found.name,
                          }
                        : x;
                });
                setCarrito(newCart);
            });
        } catch (error) {
            console.error("Error al actualizar precios:", error);
        }
    };

    // Cargar carrito desde localStorage y actualizar precios al iniciar
    useEffect(() => {
        actualizarPrecios();
        console.log("estoy actualizando");
    }, []);

    // Guardar cambios en LocalStorage
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        //localStorage.clear();
        //setCarrito([]);
    }, [carrito]);

    // Función para agregar productos
    const agregarAlCarrito = (producto) => {
        setCarrito((prev) => {
            // Verificar si el producto tiene tallas o colores
            const tieneVariaciones =
                (producto.sizes && producto.sizes.length > 0) ||
                (producto.colors && producto.colors.length > 0);

            if (!tieneVariaciones) {
                // Producto sin variaciones
                const existe = prev.find((p) => p.id === producto.id);

                if (existe) {
                    return prev.map((p) =>
                        p.id === producto.id
                            ? { ...p, quantity: p.quantity + producto.quantity }
                            : p
                    );
                }

                return [
                    ...prev,
                    {
                        ...producto,
                        variations: [], // Mantener la estructura uniforme
                        quantity: producto.quantity,
                    },
                ];
            }

            // Producto con variaciones
            const newVariation = {
                color: producto.selectedColor || null,
                size: producto.selectedSize || null,
                quantity: producto.quantity,
            };

            const productoExistenteIndex = prev.findIndex(
                (p) => p.id === producto.id
            );

            if (productoExistenteIndex >= 0) {
                const newCarrito = [...prev];
                const productoExistente = newCarrito[productoExistenteIndex];

                const variacionExistenteIndex =
                    productoExistente.variations?.findIndex(
                        (v) =>
                            v.color === newVariation.color &&
                            v.size === newVariation.size
                    ) ?? -1;

                if (variacionExistenteIndex >= 0) {
                    newCarrito[productoExistenteIndex] = {
                        ...productoExistente,
                        variations: productoExistente.variations.map(
                            (v, index) =>
                                index === variacionExistenteIndex
                                    ? {
                                          ...v,
                                          quantity:
                                              v.quantity +
                                              newVariation.quantity,
                                      }
                                    : v
                        ),
                    };
                } else {
                    newCarrito[productoExistenteIndex] = {
                        ...productoExistente,
                        variations: [
                            ...productoExistente.variations,
                            newVariation,
                        ],
                    };
                }

                return newCarrito;
            } else {
                return [
                    ...prev,
                    {
                        ...producto,
                        variations: [newVariation],
                        quantity: producto.quantity, // Evitar que se fije en 1
                    },
                ];
            }
        });
    };

    // Función para eliminar un producto
    const eliminarProducto = (id) => {
        setCarrito((prev) => prev.filter((p) => p.id !== id));
    };

    // Función para vaciar carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarProducto,
                vaciarCarrito,
                actualizarPrecios,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};
