import { useCarrito } from '../context/CarritoContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
  const { carrito, quitar, cambiarCantidad, vaciar } = useCarrito();
  const [comprado, setComprado] = useState(false);
  const navigate = useNavigate();

  const total = carrito.reduce((acc, p) => acc + p.price * p.cantidad, 0);

  const handleComprar = () => {
    setComprado(true);
    setTimeout(() => {
      vaciar();
      navigate('/');
    }, 5000);
  };

  if (comprado) {
    return (
      <div style={{textAlign:'center',padding:'3rem'}}>
        <h2>¡Gracias por su compra!</h2>
        <p>Redireccionando a la home...</p>
      </div>
    );
  }

  if (carrito.length === 0) {
    return <div style={{textAlign:'center',padding:'3rem'}}>El carrito está vacío.</div>;
  }

  return (
    <div style={{maxWidth:'600px',margin:'2rem auto',background:'#fff',padding:'2rem',borderRadius:'12px',boxShadow:'0 2px 16px #0ea5e922'}}>
      <h1 style={{marginBottom:'1.5rem'}}>Carrito</h1>
      <ul style={{listStyle:'none',padding:0}}>
        {carrito.map(item => (
          <li key={item.id} style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1rem',borderBottom:'1px solid #e0f2fe',paddingBottom:'1rem'}}>
            <img
  src={
    item.thumbnail ||
    item.image ||
    (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : '/src/assets/Vendemos.png')
  }
  alt={item.title}
  style={{width:'60px',height:'60px',objectFit:'contain',borderRadius:'8px',background:'#f0f9ff'}}
/>
            <div style={{flex:1}}>
              <div style={{fontWeight:'bold'}}>{item.title}</div>
              <div>${item.price} x 
                <input
                  type="number"
                  min={1}
                  value={item.cantidad}
                  onChange={e => cambiarCantidad(item.id, Number(e.target.value))}
                  style={{width:'50px',marginLeft:'0.5rem',padding:'0.2rem',borderRadius:'6px',border:'1px solid #0ea5e9'}}
                />
                = <b>${(item.price * item.cantidad).toFixed(2)}</b>
              </div>
            </div>
            <button onClick={() => quitar(item.id)} style={{
              background:'#ef4444',
              color:'#fff',
              border:'none',
              borderRadius:'8px',
              padding:'0.5rem 1rem',
              cursor:'pointer'
            }}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div style={{textAlign:'right',fontWeight:'bold',fontSize:'1.2rem',margin:'1rem 0'}}>Total: ${total.toFixed(2)}</div>
      <div style={{display:'flex',justifyContent:'flex-end',gap:'1rem'}}>
        <button onClick={handleComprar} style={{
          background:'#0ea5e9',
          color:'#fff',
          border:'none',
          borderRadius:'8px',
          padding:'0.7rem 1.5rem',
          fontWeight:'bold',
          fontSize:'1.1rem',
          cursor:'pointer'
        }}>Comprar</button>
        <button onClick={vaciar} style={{
          background:'#e0e7ef',
          color:'#0ea5e9',
          border:'none',
          borderRadius:'8px',
          padding:'0.7rem 1.5rem',
          fontWeight:'bold',
          fontSize:'1.1rem',
          cursor:'pointer'
        }}>Vaciar carrito</button>
      </div>
    </div>
  );
};

export default Carrito;