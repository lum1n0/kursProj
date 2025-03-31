import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="col-md-4 product-card">
      <div className="card">
        <img
          src={product.image || '/img/default-product.svg'}
          className="card-img_top"
          alt={product.name}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description || 'Описание отсутствует'}</p>
          <a href="#" className="btn btn-primary">Купить</a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;