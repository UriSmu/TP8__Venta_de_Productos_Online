import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/Vendemos.png';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header>
      <nav className="navbar" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link to="/" className="logo" style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
          <img src={logo} alt="Logo" style={{height:'48px',borderRadius:'8px',boxShadow:'0 2px 8px #0ea5e955'}} />
        </Link>
        <ul className="nav-links" style={{flex:1,justifyContent:'center',display:'flex',gap:'2.5rem'}}>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/quienes-somos">Quiénes somos</NavLink></li>
          <li><NavLink to="/productos">Productos</NavLink></li>
          <li><NavLink to="/contacto">Contacto</NavLink></li>
        </ul>
        <div style={{marginLeft:'2rem',display:'flex',alignItems:'center'}}>
          <button
            onClick={() => navigate('/carrito')}
            style={{
              background:'#fff',
              border:'2px solid #0ea5e9',
              borderRadius:'50%',
              width:'44px',
              height:'44px',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              cursor:'pointer',
              boxShadow:'0 2px 8px #0ea5e922'
            }}>
            <svg width="26" height="26" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10" cy="20" r="2"/>
              <circle cx="20" cy="20" r="2"/>
              <path d="M5 6h2l2.68 11.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21 8H7"/>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;