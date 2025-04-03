import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ApiClient, getCategories } from '../api/ApiClient';
import axios from 'axios'; // Для отправки файлов на сервер

function AdminShop() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', categoryId: '', imageUrl: '' });

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('jwtToken');
            if (!token) {
                setError('Нет доступа');
                setLoading(false);
                return;
            }

            try {
                const categoryData = await getCategories();
                setCategories(categoryData);

                const response = await ApiClient.get('/api/admin/product-services', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(response.data);
            } catch (err) {
                setError('Ошибка при загрузке данных');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Обработка загрузки файла
    const handleFileUpload = async (e, isEditing = false) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const imagePath = response.data;
            if (isEditing) {
                setEditingProduct({ ...editingProduct, imageUrl: imagePath });
            } else {
                setNewProduct({ ...newProduct, imageUrl: imagePath });
            }
        } catch (error) {
            console.error('Ошибка загрузки изображения:', error);
        }
    };

    // Добавление нового товара
    const handleAddProduct = async () => {
        console.log("Отправляемый объект:", newProduct); // Логирование объекта
        const token = Cookies.get('jwtToken');
        try {
            const response = await ApiClient.post('/api/admin/product-services', newProduct, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts([...products, response.data]);
            setNewProduct({ name: '', price: '', categoryId: '', imageUrl: '' });
        } catch (err) {
            console.error('Ошибка при добавлении товара:', err);
        }
    };

    // Сохранение отредактированного товара
    const handleEditProduct = async () => {
        const token = Cookies.get('jwtToken');
        try {
            const response = await ApiClient.put(`/api/admin/product-services/${editingProduct.id}`, editingProduct, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(products.map(p => (p.id === editingProduct.id ? response.data : p)));
            setEditingProduct(null);
        } catch (err) {
            console.error('Ошибка при редактировании товара:', err);
        }
    };

    // Удаление товара
    const handleDeleteProduct = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            const token = Cookies.get('jwtToken');
            try {
                await ApiClient.delete(`/api/admin/product-services/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                console.error('Ошибка при удалении товара:', err);
            }
        }
    };

    // Начало редактирования товара
    const startEditing = (product) => {
        setEditingProduct({ ...product });
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Управление товарами и услугами</h1>

            {/* Форма добавления нового товара */}
            <div>
                <h2>Добавить новый товар</h2>
                <input
                    type="text"
                    placeholder="Название"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Цена"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <select
                    value={newProduct.categoryId}
                    onChange={(e) => setNewProduct({ ...newProduct, categoryId: Number(e.target.value) })}
                >
                    <option value="">Выберите категорию</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.title}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="URL изображения"
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, false)}
                />
                <button onClick={handleAddProduct}>Добавить</button>
            </div>

            {/* Форма редактирования товара */}
            {editingProduct && (
                <div>
                    <h2>Редактировать товар</h2>
                    <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    />
                    <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    />
                    <select
                        value={editingProduct.categoryId}
                        onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: Number(e.target.value) })}
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="URL изображения"
                        value={editingProduct.imageUrl}
                        onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, true)}
                    />
                    <button onClick={handleEditProduct}>Сохранить</button>
                    <button onClick={() => setEditingProduct(null)}>Отмена</button>
                </div>
            )}

            {/* Список товаров */}
            <h2>Список товаров</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.imageUrl && (
                            <img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px' }} />
                        )}
                        {product.name} - {product.price} руб.
                        <button onClick={() => startEditing(product)}>Редактировать</button>
                        <button onClick={() => handleDeleteProduct(product.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminShop;