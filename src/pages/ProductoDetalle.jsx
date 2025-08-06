import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { useCarrito } from '../context/CarritoContext';

const ProductoDetalle = () => {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const { agregar } = useCarrito();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${idProducto}`)
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
      <img src={producto.thumbnail || (producto.images && producto.images[0])} alt={producto.title} style={{width:'200px',objectFit:'contain'}} />
      <div>
        <h1>{producto.title}</h1>
        <h2>${producto.price}</h2>
        <p><b>Categoría:</b> {producto.category}</p>
        <p>{producto.description}</p>
        <div style={{marginTop:'1.5rem',display:'flex',alignItems:'center',gap:'1rem'}}>
          <input
            type="number"
            min={1}
            value={cantidad}
            onChange={e => setCantidad(Number(e.target.value))}
            style={{width:'60px',padding:'0.3rem',borderRadius:'6px',border:'1px solid #0ea5e9'}}
          />
          <button
            onClick={() => agregar(producto, cantidad)}
            style={{
              background:'#0ea5e9',
              color:'#fff',
              border:'none',
              borderRadius:'8px',
              padding:'0.7rem 1.5rem',
              fontWeight:'bold',
              fontSize:'1.1rem',
              cursor:'pointer'
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;