import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CardProducto from '../components/CardProducto';
import Loader from '../components/Loader';

const sortOptions = [
  { value: '', label: 'Sin ordenar' },
  { value: 'title', label: 'Nombre (A-Z)' },
  { value: 'title-desc', label: 'Nombre (Z-A)' },
  { value: 'price', label: 'Precio (menor a mayor)' },
  { value: 'price-desc', label: 'Precio (mayor a menor)' },
  { value: 'rate', label: 'Rating (mayor a menor)' },
  { value: 'rate-asc', label: 'Rating (menor a mayor)' },
];

const Productos = () => {
  const { idCategoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(idCategoria || '');
  const navigate = useNavigate();

  // Traer categorías al montar
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategorias(data));
  }, []);

  // Traer productos según categoría seleccionada
  useEffect(() => {
    setLoading(true);
    let url = 'https://dummyjson.com/products?limit=0';
    if (categoriaSeleccionada) {
      url = `https://dummyjson.com/products/category/${categoriaSeleccionada}?limit=0`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProductos(Array.isArray(data.products) ? data.products : []);
        setLoading(false);
      });
  }, [categoriaSeleccionada]);

  function sortProductos(arr) {
  let sorted = [...arr];
  switch (sort) {
    case 'title':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'price':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rate':
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'rate-asc':
      sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      break;
    default:
      break;
  }
  return sorted;
}

  const filtered = sortProductos(
    productos.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
  );

  if (loading) return <Loader />;

  return (
    <div>
      <h1 style={{marginBottom:'1.5rem'}}>Productos {categoriaSeleccionada ? `- ${categoriaSeleccionada}` : ''}</h1>
      <div style={{
        display:'flex',
        gap:'1rem',
        alignItems:'center',
        marginBottom:'1.5rem',
        flexWrap:'wrap'
      }}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding:'0.5rem 1rem',
            borderRadius:'8px',
            border:'1px solid #0ea5e9',
            outline:'none',
            minWidth:'220px'
          }}
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{
            padding:'0.5rem 1rem',
            borderRadius:'8px',
            border:'1px solid #0ea5e9',
            outline:'none',
            minWidth:'220px'
          }}
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select
  value={categoriaSeleccionada}
  onChange={e => setCategoriaSeleccionada(e.target.value)}
  style={{
    padding:'0.5rem 1rem',
    borderRadius:'8px',
    border:'1px solid #0ea5e9',
    outline:'none',
    minWidth:'220px'
  }}
>
  <option value="">Todas las categorías</option>
  {categorias.map(cat => {
    // Si cat es string, usarlo directamente. Si es objeto, usar cat.slug y cat.name
    if (typeof cat === 'string') {
      return <option key={cat} value={cat}>{cat}</option>;
    }
    return <option key={cat.slug} value={cat.slug}>{cat.name}</option>;
  })}
</select>
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:'1rem'}}>
        {filtered.length === 0 && <div>No se encontraron productos.</div>}
        {filtered.map(prod => (
          <CardProducto key={prod.id} producto={prod} onClick={() => navigate(`/productos/${prod.id}`)} />
        ))}
      </div>
    </div>
  );
};

export default Productos;