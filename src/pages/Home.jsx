import { useEffect, useState } from 'react';
import CardProducto from '../components/CardProducto';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [productosPorCategoria, setProductosPorCategoria] = useState({});
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(cats => {
        setCategorias(cats);
        cats.forEach(cat => {
          fetch(`https://dummyjson.com/products/category/${cat.slug}?limit=100`)
            .then(res => res.json())
            .then(data => {
              setProductosPorCategoria(prev => ({
                ...prev,
                [cat.slug]: (data.products || []).sort(() => 0.5 - Math.random()).slice(0, 3)
              }));
            });
        });
      });
  }, []);

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', minHeight:'60vh', justifyContent:'center'}}>
      <h1 style={{marginBottom:'0.5rem'}}>Bienvenido a VendemOS</h1>
      <p style={{marginBottom:'2rem'}}>Explorá nuestros productos destacados.</p>
      <div style={{width:'100%', maxWidth:'1100px'}}>
        {categorias.map(cat => (
          <div key={cat.slug} style={{marginBottom:'2.5rem'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'0.5rem'}}>
              <h2 style={{textTransform:'capitalize', margin:0}}>{cat.name}</h2>
              <button
                style={{
                  background:'#0ea5e9',
                  color:'#fff',
                  border:'none',
                  borderRadius:'2rem',
                  fontWeight:'bold',
                  fontSize:'1rem',
                  padding:'0.5rem 1.5rem',
                  cursor:'pointer',
                  display:'flex',
                  alignItems:'center',
                  gap:'0.5rem'
                }}
                onClick={() => navigate(`/productos/categoria/${cat.slug}`)}
              >
                Ver más <span style={{fontSize:'1.5rem', lineHeight:1}}>→</span>
              </button>
            </div>
            <div style={{display:'flex', gap:'1.5rem', flexWrap:'wrap'}}>
              {(productosPorCategoria[cat.slug] || []).map(prod => (
                <CardProducto key={prod.id} producto={prod} onClick={() => navigate(`/productos/${prod.id}`)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;