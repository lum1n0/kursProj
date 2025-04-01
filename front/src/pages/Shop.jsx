import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProducts } from '../api/ApiClient';
import ProductCard from '../components/ProductCard';

function Shop() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('all');

    useEffect(() => {
        async function fetchData() {
            try {
                const categoryData = await getCategories();
                const productData = await getProducts();
                setCategories(categoryData);
                setProducts(productData);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        }

        fetchData();
    }, []);

    const handleCategoryClick = (catId) => {
        setCategory(catId);
    };

    const filteredProducts = category === 'all'
        ? products
        : products.filter(product => product.categoryId === category);

    return (
        <section className="conteiner" id="shop_z1">
            <h1 className="title_hero shop_title">Магазин СТМ</h1>
            <div className="container-fluid">
                <div className="row">
                    {/* Боковое меню */}
                    <div className="col-md-3">
                        <div className="list-group left_menu">
                            <button
                                className={`list-group-item list-group-item-action left_menu ${category === 'all' ? 'active' : ''}`}
                                onClick={() => handleCategoryClick('all')}
                            >
                                Все товары
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`list-group-item list-group-item-action left_menu ${category === cat.id ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick(cat.id)}
                                >
                                    <img src={`/img/${cat.title.toLowerCase().replace(/\s+/g, '')}.svg`} alt="" /> {cat.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Карточки товаров */}
                    <div className="col-md-9">
                        <div className="row_card" id="products">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Shop;