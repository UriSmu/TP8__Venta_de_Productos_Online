import { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  function agregar(producto, cantidad = 1) {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p => p.id === producto.id ? {...p, cantidad: p.cantidad + cantidad} : p);
      }
      return [...prev, {...producto, cantidad}];
    });
  }

  function quitar(id) {
    setCarrito(prev => prev.filter(p => p.id !== id));
  }

  function cambiarCantidad(id, cantidad) {
    setCarrito(prev => prev.map(p => p.id === id ? {...p, cantidad} : p));
  }

  function vaciar() {
    setCarrito([]);
  }

  return (
    <CarritoContext.Provider value={{carrito, agregar, quitar, cambiarCantidad, vaciar}}>
      {children}
    </CarritoContext.Provider>
  );
}