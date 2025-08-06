import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

const ProductoDetalle = () => {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [imgIndex, setImgIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { agregar } = useCarrito();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${idProducto}`)
      .then(res => res.json())
      .then(data => {
        setProducto(data);
        setImgIndex(0);
        setLoading(false);
      });
  }, [idProducto]);

  if (loading) return <div style={{textAlign:'center',padding:'2rem'}}>Cargando...</div>;
  if (!producto) return <div style={{textAlign:'center',padding:'2rem'}}>Producto no encontrado.</div>;

  const images = producto.images && producto.images.length > 0 ? producto.images : [producto.thumbnail];

  return (
    <div style={{maxWidth:'800px',margin:'2rem auto',background:'#fff',padding:'2rem',borderRadius:'12px',boxShadow:'0 2px 16px #0ea5e922'}}>
      {/* Modal para imagen grande */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position:'fixed',top:0,left:0,right:0,bottom:0,
            background:'rgba(0,0,0,0.7)',zIndex:9999,
            display:'flex',alignItems:'center',justifyContent:'center'
          }}
        >
          <img
            src={images[imgIndex]}
            alt=""
            style={{maxWidth:'90vw',maxHeight:'90vh',borderRadius:'16px',boxShadow:'0 4px 32px #0008'}}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
      <div style={{display:'flex',gap:'2rem',flexWrap:'wrap'}}>
        <div style={{flex:'1 1 300px',display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div style={{position:'relative',width:'220px',height:'220px',marginBottom:'1rem'}}>
            <img
              src={images[imgIndex]}
              alt={producto.title}
              style={{width:'220px',height:'220px',objectFit:'contain',borderRadius:'12px',background:'#f0f9ff',cursor:'pointer'}}
              onClick={() => setModalOpen(true)}
            />
            {/* Flechas navegación */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setImgIndex((imgIndex - 1 + images.length) % images.length)}
                  style={{
                    position:'absolute',top:'50%',left:0,transform:'translateY(-50%)',
                    background:'#fff',border:'none',borderRadius:'50%',boxShadow:'0 2px 8px #0002',
                    width:'32px',height:'32px',cursor:'pointer',fontSize:'1.3rem',color:'#0ea5e9'
                  }}
                  aria-label="Anterior"
                >&lt;</button>
                <button
                  onClick={() => setImgIndex((imgIndex + 1) % images.length)}
                  style={{
                    position:'absolute',top:'50%',right:0,transform:'translateY(-50%)',
                    background:'#fff',border:'none',borderRadius:'50%',boxShadow:'0 2px 8px #0002',
                    width:'32px',height:'32px',cursor:'pointer',fontSize:'1.3rem',color:'#0ea5e9'
                  }}
                  aria-label="Siguiente"
                >&gt;</button>
              </>
            )}
          </div>
          <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',justifyContent:'center'}}>
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                style={{
                  width:'48px',height:'48px',objectFit:'contain',borderRadius:'6px',
                  background:'#f0f9ff',border: imgIndex === i ? '2px solid #0ea5e9' : '1px solid #e0f2fe',
                  cursor:'pointer',boxSizing:'border-box'
                }}
                onClick={() => setImgIndex(i)}
              />
            ))}
          </div>
        </div>
        <div style={{flex:'2 1 350px'}}>
          <h2 style={{margin:'0 0 0.5rem 0',color:'#0ea5e9'}}>{producto.title}</h2>
          <p style={{fontSize:'1.1rem',marginBottom:'1rem'}}>{producto.description}</p>
          <div style={{marginBottom:'0.7rem'}}><b>Categoría:</b> {producto.category}</div>
          <div style={{marginBottom:'0.7rem'}}><b>Marca:</b> {producto.brand}</div>
          <div style={{marginBottom:'0.7rem', fontSize:'1.3rem'}}><b>Precio:</b> ${producto.price}</div>
          <div style={{marginBottom:'0.7rem'}}><b>Descuento:</b> {producto.discountPercentage}%</div>
          <div style={{marginBottom:'0.7rem'}}><b>Stock:</b> {producto.stock}</div>
          <div style={{marginBottom:'0.7rem'}}><b>SKU:</b> {producto.sku}</div>
          <div style={{marginBottom:'0.7rem'}}><b>Rating:</b> {producto.rating} ⭐</div>
          {producto.tags && <div style={{marginBottom:'0.7rem'}}><b>Tags:</b> {producto.tags.join(', ')}</div>}
          {producto.weight && <div style={{marginBottom:'0.7rem'}}><b>Peso:</b> {producto.weight}g</div>}
          {producto.dimensions && (
            <div style={{marginBottom:'0.7rem'}}>
              <b>Dimensiones:</b> {producto.dimensions.width} x {producto.dimensions.height} x {producto.dimensions.depth}
            </div>
          )}
          {producto.warrantyInformation && <div style={{marginBottom:'0.7rem'}}><b>Garantía:</b> {producto.warrantyInformation}</div>}
          {producto.shippingInformation && <div style={{marginBottom:'0.7rem'}}><b>Envío:</b> {producto.shippingInformation}</div>}
          {producto.availabilityStatus && <div style={{marginBottom:'0.7rem'}}><b>Disponibilidad:</b> {producto.availabilityStatus}</div>}
          {producto.returnPolicy && <div style={{marginBottom:'0.7rem'}}><b>Devolución:</b> {producto.returnPolicy}</div>}
          {producto.minimumOrderQuantity && <div style={{marginBottom:'0.7rem'}}><b>Mínimo de compra:</b> {producto.minimumOrderQuantity}</div>}
          <div style={{margin:'1.2rem 0'}}>
            <label>
              <b>Cantidad:</b>
              <input
                type="number"
                min={1}
                max={producto.stock}
                value={cantidad}
                onChange={e => setCantidad(Number(e.target.value))}
                style={{marginLeft:'0.7rem',width:'60px',padding:'0.2rem',borderRadius:'6px',border:'1px solid #0ea5e9'}}
              />
            </label>
          </div>
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
      {producto.reviews && producto.reviews.length > 0 && (
        <div style={{marginTop:'2rem'}}>
          <h3 style={{marginBottom:'1rem'}}>Reseñas</h3>
          <ul style={{padding:0,listStyle:'none'}}>
            {producto.reviews.map((rev, i) => (
              <li key={i} style={{marginBottom:'1rem',padding:'1rem',background:'#f8fafc',borderRadius:'8px',border:'1px solid #e0f2fe'}}>
                <div><b>{rev.reviewerName}</b> <span style={{color:'#f59e42'}}>({rev.rating}⭐)</span></div>
                <div style={{fontSize:'0.95rem',margin:'0.3rem 0'}}>{rev.comment}</div>
                <div style={{fontSize:'0.85rem',color:'#888'}}>Fecha: {new Date(rev.date).toLocaleDateString()}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductoDetalle;