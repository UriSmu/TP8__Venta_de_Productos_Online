
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const ProductoDetalle = () => {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${idProducto}`)
      .then(res => res.json())
      .then(data => {
        setProducto(data);
        setLoading(false);
      });
  }, [idProducto]);

  if (loading) return <Loader />;
  if (!producto) return <div>No se encontró el producto.</div>;

  return (
    <div style={{display:'flex',gap:'2rem',alignItems:'flex-start'}}>
      <img src={producto.image} alt={producto.title} style={{width:'200px',objectFit:'contain'}} />
      <div>
        <h1>{producto.title}</h1>
        <h2>${producto.price}</h2>
        <p><b>Categoría:</b> {producto.category}</p>
        <p>{producto.description}</p>
      </div>
    </div>
  );
};

export default ProductoDetalle;
