import React from 'react';

const CardProducto = ({ producto, onClick }) => (
  <div className="card-producto" onClick={onClick} style={{cursor:'pointer'}}>
    <img src={producto.image} alt={producto.title} style={{width:'100px',height:'100px',objectFit:'contain'}}/>
    <h3>{producto.title}</h3>
    <p>${producto.price}</p>
  </div>
);

export default CardProducto;
