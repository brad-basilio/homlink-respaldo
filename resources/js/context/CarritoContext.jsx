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
    }, [carrito]);

    // Función para agregar productos
    const agregarAlCarrito = (producto) => {
        setCarrito((prev) => {
            const existe = prev.find((p) => p.id === producto.id);
            if (existe) {
                return prev.map((p) =>
                    p.id === producto.id
                        ? {
                              ...p,
                              quantity: p.quantity + 1,
                              color: null,
                              size: null,
                          }
                        : p
                );
            } else {
                return [
                    ...prev,
                    { ...producto, quantity: 1, color: null, size: null },
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
