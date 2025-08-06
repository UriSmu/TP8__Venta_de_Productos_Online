import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contacto = () => {
  const [enviado, setEnviado] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => navigate('/'), 5000);
  };

  if (enviado) {
    return (
      <div style={{textAlign:'center',padding:'3rem'}}>
        <h2>¡Gracias por contactarnos!</h2>
        <p>Te redireccionaremos a la página principal en unos segundos...</p>
      </div>
    );
  }

  return (
    <div style={{maxWidth:'400px',margin:'2rem auto',background:'#fff',padding:'2rem',borderRadius:'12px',boxShadow:'0 2px 16px #0ea5e922'}}>
      <h1 style={{textAlign:'center',marginBottom:'1.5rem'}}>Contacto</h1>
      <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
        <input type="text" required placeholder="Nombre" style={{padding:'0.7rem',borderRadius:'8px',border:'1px solid #0ea5e9'}} />
        <input type="email" required placeholder="Email" style={{padding:'0.7rem',borderRadius:'8px',border:'1px solid #0ea5e9'}} />
        <textarea required placeholder="Mensaje" rows={4} style={{padding:'0.7rem',borderRadius:'8px',border:'1px solid #0ea5e9'}} />
        <button type="submit" style={{
          background:'#0ea5e9',
          color:'#fff',
          border:'none',
          borderRadius:'8px',
          padding:'0.7rem',
          fontWeight:'bold',
          fontSize:'1.1rem',
          cursor:'pointer'
        }}>Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;