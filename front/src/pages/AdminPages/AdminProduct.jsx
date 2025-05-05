import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiClient, getCategories, putData, deleteData } from '../../api/ApiClient.js';
import { useDataStore } from '../../store/dataStore.js';
import AdminHeader from '../../components/AdminComponents/AdminHeader.jsx';
import Swal from 'sweetalert2';
import '../../assets/styles/AdminShop.scss';

const API_BASE_URL = 'http://localhost:8080';

function AdminProduct() {
    const { products, setProducts } = useDataStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const productResponse = await ApiClient.get('/api/shop');
                setProducts(productResponse.data.map((p, i) => ({ ...p, key: p.id || `temp-${i}` })));
            } catch (err) {
                setError('Ошибка при загрузке данных');
                Swal.fire('Ошибка', 'Не удалось загрузить данные', 'error');
            } finally {
                setLoading(false); // Исправлено: WsetLoading -> setLoading
            }
        };
        fetchData();
    }, [setProducts]);

    const onSubmitEditProduct = async (data) => {
        try {
            const response = await putData(`/api/shop/${editingProduct.id}`, {
                name: data.editName,
                price: data.editPrice,
                status: data.editStatus,
                description: data.editDescription,
                imageUrl: data.editImageUrl,
                categoryId: data.editCategoryId,
            });
            setProducts(products.map((p) => (p.key === editingProduct.key ? { ...response, key: p.key } : p)));
            setEditingProduct(null);
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
        setValue('editDescription', product.description);
        setValue('editCategoryId', product.categoryId);
        setValue('editImageUrl', product.imageUrl);
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="admin-shop">
            <AdminHeader />
            <h1>Управление товарами</h1>

            {editingProduct && (
                <div className="form-section">
                    <h2>Редактировать товар</h2>
                    <form onSubmit={handleSubmit(onSubmitEditProduct)}>
                        <input type="text" {...register('editName', { required: 'Название обязательно' })} defaultValue={editingProduct.name} />
                        {errors.editName && <p>{errors.editName.message}</p>}
                        <input type="number" {...register('editPrice', { required: 'Цена обязательна', valueAsNumber: true })} defaultValue={editingProduct.price} />
                        {errors.editPrice && <p>{errors.editPrice.message}</p>}
                        <select {...register('editStatus', { required: 'Статус обязателен' })}>
                            <option value="в наличии">В наличии</option>
                            <option value="закончился">Закончился</option>
                        </select>
                        {errors.editStatus && <p>{errors.editStatus.message}</p>}
                        <textarea {...register('editDescription')} defaultValue={editingProduct.description} placeholder="Описание" />
                        <input type="text" {...register('editImageUrl')} defaultValue={editingProduct.imageUrl} />
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={() => setEditingProduct(null)}>Отмена</button>
                    </form>
                </div>
            )}

            <h2>Список товаров</h2>
            {products.length > 0 ? (
                <ul className="product-list">
                    {products.map((product) => (
                        <li key={product.key}>
                            {product.name} - {product.price} руб. - Статус: {product.status}
                            <button onClick={() => startEditing(product)}>Редактировать</button>
                            <button onClick={() => handleDeleteProduct(product.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Нет товаров для отображения</p>
            )}
        </div>
    );
}

export default AdminProduct;