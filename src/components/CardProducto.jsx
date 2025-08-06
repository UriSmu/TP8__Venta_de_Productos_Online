import React from 'react';

const CardProducto = ({ producto, onClick }) => {
  if (!producto) return null;

  // Manejo seguro de imágenes para evitar errores si no existen las propiedades
  const imgSrc =
    producto.thumbnail ||
    (Array.isArray(producto.images) && producto.images.length > 0 ? producto.images[0] : '/src/assets/Vendemos.png');

  return (
    <div className="card-producto" onClick={onClick} style={{
      cursor:'pointer',
      minHeight: '270px',
      minWidth: '180px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{
        height:'120px',
        width:'120px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:'0.7rem'
      }}>
        <img
          src={imgSrc}
          alt={producto.title || 'Producto'}
          style={{
            maxWidth:'100%',
            maxHeight:'100%',
            objectFit:'contain',
            borderRadius:'8px',
            background:'#f0f9ff',
            padding:'0.5rem',
            display: 'block'
          }}
          onError={e => { e.target.src = '/src/assets/Vendemos.png'; }}
        />
      </div>
      <h3 style={{margin:'0.5rem 0 0.2rem 0', fontSize:'1.1rem', color:'#0ea5e9'}}>{producto.title}</h3>
      <p style={{fontWeight:'bold', fontSize:'1.1rem', margin:0}}>${producto.price}</p>
    </div>
  );
};

export default CardProducto;