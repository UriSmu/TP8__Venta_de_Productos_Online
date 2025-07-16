
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo" style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
          <img src={logo} alt="Logo" style={{height:'40px'}} />
          <span>Tienda Online</span>
        </Link>
        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/quienes-somos">Quienes somos</NavLink></li>
          <li className="dropdown">
            <span>Productos</span>
            <ul className="dropdown-content">
              <li><NavLink to="/productos">Ver todos</NavLink></li>
              {categories.map(cat => (
                <li key={cat}>
                  <NavLink to={`/productos/categoria/${cat}`}>{cat}</NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li><NavLink to="/contacto">Contacto</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
