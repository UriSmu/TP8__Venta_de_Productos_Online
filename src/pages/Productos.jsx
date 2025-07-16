
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CardProducto from '../components/CardProducto';
import Loader from '../components/Loader';

const Productos = () => {
  const { idCategoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    let url = 'https://fakestoreapi.com/products';
    if (idCategoria) {
      url = `https://fakestoreapi.com/products/category/${idCategoria}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      });
  }, [idCategoria]);

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Productos {idCategoria ? `- ${idCategoria}` : ''}</h1>
      <div style={{display:'flex',flexWrap:'wrap',gap:'1rem'}}>
        {productos.map(prod => (
          <CardProducto key={prod.id} producto={prod} onClick={() => navigate(`/productos/${prod.id}`)} />
        ))}
      </div>
    </div>
  );
};

export default Productos;
