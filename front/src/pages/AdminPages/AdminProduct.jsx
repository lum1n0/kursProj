import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiClient, putData, deleteData } from '../../api/ApiClient.js'; // Removed getCategories as it's not used for AdminProduct page
import { useDataStore } from '../../store/dataStore.js';
import AdminHeader from '../../components/AdminComponents/AdminHeader.jsx';
import Swal from 'sweetalert2';
import '../../assets/styles/AdminShop.scss'; // Используем те же стили

const API_BASE_URL = 'http://localhost:8080';

function AdminProduct() {
    const { products, setProducts, categories, setCategories } = useDataStore(); // Added categories for display
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch categories if not already in store, or if they might change
                if (categories.length === 0) {
                    const categoryData = await ApiClient.get('/product-categories'); // Assuming getCategories fetches from here
                    setCategories(categoryData.data.filter(cat => cat.id && cat.title));
                }
                const productResponse = await ApiClient.get('/api/shop'); // Endpoint for all products
                setProducts(productResponse.data.map((p, i) => ({ ...p, key: p.id || `temp-${i}` })));
            } catch (err) {
                setError('Ошибка при загрузке данных');
                Swal.fire('Ошибка', 'Не удалось загрузить данные', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [setProducts, setCategories, categories.length]); // Added categories.length to dependencies

    const getImageUrl = (relativePath) => {
        if (!relativePath) return '/img/placeholder.png';
        return relativePath.startsWith('http') ? relativePath : `${API_BASE_URL}${relativePath}`;
    };

    const handleFileUpload = async (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await ApiClient.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setValue(fieldName, response.data);
            Swal.fire('Успех', 'Изображение загружено', 'success');
        } catch (error) {
            Swal.fire('Ошибка', 'Не удалось загрузить изображение', 'error');
        }
    };

    const onSubmitEditProduct = async (data) => {
        try {
            const response = await putData(`/api/shop/${editingProduct.id}`, {
                name: data.editName,
                price: data.editPrice,
                status: data.editStatus,
                description: data.editDescription,
                imageUrl: data.editImageUrl,
                categoryId: parseInt(data.editCategoryId, 10), // Ensure categoryId is an integer
            });
            setProducts(products.map((p) => (p.key === editingProduct.key ? { ...response, key: p.key } : p)));
            setEditingProduct(null);
            reset();
            Swal.fire('Успех', 'Товар обновлён', 'success');
        } catch (err) {
            Swal.fire('Ошибка', 'Не удалось обновить товар', 'error');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            try {
                await deleteData(`/api/shop/${id}`);
                setProducts(products.filter((p) => p.id !== id));
                Swal.fire('Успех', 'Товар удалён', 'success');
            } catch (err) {
                Swal.fire('Ошибка', 'Не удалось удалить товар', 'error');
            }
        }
    };

    const startEditing = (product) => {
        setEditingProduct(product);
        setValue('editName', product.name);
        setValue('editPrice', product.price);
        setValue('editStatus', product.status);
        setValue('editDescription', product.description || '');
        setValue('editCategoryId', product.categoryId);
        setValue('editImageUrl', product.imageUrl || '');
    };

    if (loading) return <div className="loading-state">Загрузка...</div>;
    if (error) return <div className="error-state">{error}</div>;

    return (
        <div className="admin-shop"> {/* Using admin-shop class for consistent styling */}
            <AdminHeader />
            <h1>Управление товарами</h1>

            {editingProduct && (
                <div className="form-section">
                    <h2>Редактировать товар</h2>
                    <form onSubmit={handleSubmit(onSubmitEditProduct)}>
                        <input type="text" {...register('editName', { required: 'Название обязательно' })} />
                        {errors.editName && <p>{errors.editName.message}</p>}

                        <input type="number" step="0.01" {...register('editPrice', { required: 'Цена обязательна', valueAsNumber: true, min: { value: 0.01, message: "Цена должна быть больше 0"} })} />
                        {errors.editPrice && <p>{errors.editPrice.message}</p>}

                        <select {...register('editStatus', { required: 'Статус обязателен' })}>
                            <option value="в наличии">В наличии</option>
                            <option value="закончился">Закончился</option>
                        </select>
                        {errors.editStatus && <p>{errors.editStatus.message}</p>}

                        <textarea {...register('editDescription')} placeholder="Описание" />

                        <select {...register('editCategoryId', { required: 'Категория обязательна' })}>
                            <option value="">Выберите категорию</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.title}</option>
                            ))}
                        </select>
                        {errors.editCategoryId && <p>{errors.editCategoryId.message}</p>}

                        <input type="text" placeholder="URL изображения" {...register('editImageUrl')} />
                        <label htmlFor="editImageUploadProduct" className="file-upload-label">Загрузить изображение:</label>
                        <input id="editImageUploadProduct" type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'editImageUrl')} />

                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={() => { setEditingProduct(null); reset(); }} className="cancel-button">Отмена</button>
                    </form>
                </div>
            )}

            <h2>Список товаров</h2>
            {products.length > 0 ? (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.key} className="admin-product-card">
                            <img src={getImageUrl(product.imageUrl)} alt={product.name} className="admin-product-card-image"/>
                            <div className="admin-product-card-details">
                                <h4>{product.name}</h4>
                                <p>Цена: {product.price} руб.</p>
                                <p>Статус: {product.status}</p>
                                <p>Категория: {categories.find(c => c.id === product.categoryId)?.title || 'Не указана'}</p>
                                <p className="admin-product-card-description">Описание: {product.description || 'Отсутствует'}</p>
                            </div>
                            <div className="admin-product-card-actions">
                                <button onClick={() => startEditing(product)} className="edit-button">Редактировать</button>
                                <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">Удалить</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Нет товаров для отображения</p>
            )}
        </div>
    );
}

export default AdminProduct;
