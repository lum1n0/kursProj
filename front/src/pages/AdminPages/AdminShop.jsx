import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiClient, getCategories, postData, putData, deleteData } from '../../api/ApiClient.js';
import { useDataStore } from '../../store/dataStore.js';
import AdminHeader from '../../components/AdminComponents/AdminHeader.jsx';
import Swal from 'sweetalert2';
import '../../assets/styles/AdminShop.scss';

const API_BASE_URL = 'http://localhost:8080';

function AdminShop() {
  const { products, categories, setProducts, setCategories } = useDataStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoryData = await getCategories();
        setCategories(categoryData.filter(cat => cat.id && cat.title));
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
  }, [setProducts, setCategories]);

  const getImageUrl = (relativePath) => {
    if (!relativePath) return '/img/placeholder.png'; // Placeholder if no image
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

  const onSubmitNewProduct = async (data) => {
    try {
      const newProductData = {
        name: data.name,
        price: data.price,
        status: data.status || 'в наличии',
        categoryId: data.categoryId,
        imageUrl: data.imageUrl,
        description: data.description, // Assuming description is part of the form
      };
      const response = await postData('/api/shop', newProductData);
      setProducts([...products, { ...response, key: response.id || `temp-${products.length}` }]);
      reset(); // Reset form fields
      Swal.fire('Успех', 'Товар добавлен', 'success');
    } catch (err) {
      Swal.fire('Ошибка', 'Не удалось добавить товар', 'error');
    }
  };

  const onSubmitEditProduct = async (data) => {
    try {
      const updatedProductData = {
        name: data.editName,
        price: data.editPrice,
        status: data.editStatus, // Ensure status is included
        categoryId: data.editCategoryId,
        imageUrl: data.editImageUrl,
        description: data.editDescription, // Assuming description is part of the edit form
      };
      const response = await putData(`/api/shop/${editingProduct.id}`, updatedProductData);
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
    setValue('editStatus', product.status); // Set status for editing
    setValue('editCategoryId', product.categoryId);
    setValue('editImageUrl', product.imageUrl);
    setValue('editDescription', product.description); // Set description for editing
  };

  if (loading) return <div className="loading-state">Загрузка...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
      <div className="admin-shop">
        <AdminHeader />
        <h1>Управление товарами и услугами</h1>

        <div className="form-section">
          <h2>{editingProduct ? 'Редактировать товар' : 'Добавить новый товар'}</h2>
          <form onSubmit={editingProduct ? handleSubmit(onSubmitEditProduct) : handleSubmit(onSubmitNewProduct)}>
            <input
                type="text"
                placeholder="Название"
                {...register(editingProduct ? 'editName' : 'name', { required: 'Название обязательно' })}
                defaultValue={editingProduct ? editingProduct.name : ''}
            />
            {errors[editingProduct ? 'editName' : 'name'] && <p>{errors[editingProduct ? 'editName' : 'name'].message}</p>}

            <input
                type="number"
                step="0.01"
                placeholder="Цена"
                {...register(editingProduct ? 'editPrice' : 'price', { required: 'Цена обязательна', valueAsNumber: true, min: { value: 0.01, message: "Цена должна быть больше 0"} })}
                defaultValue={editingProduct ? editingProduct.price : ''}
            />
            {errors[editingProduct ? 'editPrice' : 'price'] && <p>{errors[editingProduct ? 'editPrice' : 'price'].message}</p>}

            <select {...register(editingProduct ? 'editStatus' : 'status', { required: 'Статус обязателен' })} defaultValue={editingProduct ? editingProduct.status : 'в наличии'}>
              <option value="в наличии">В наличии</option>
              <option value="закончился">Закончился</option>
            </select>
            {errors[editingProduct ? 'editStatus' : 'status'] && <p>{errors[editingProduct ? 'editStatus' : 'status'].message}</p>}

            <textarea
                placeholder="Описание"
                {...register(editingProduct ? 'editDescription' : 'description')}
                defaultValue={editingProduct ? editingProduct.description : ''}
            />

            <select {...register(editingProduct ? 'editCategoryId' : 'categoryId', { required: 'Категория обязательна' })} defaultValue={editingProduct ? editingProduct.categoryId : ''}>
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
            {errors[editingProduct ? 'editCategoryId' : 'categoryId'] && <p>{errors[editingProduct ? 'editCategoryId' : 'categoryId'].message}</p>}

            <input type="text" placeholder="URL изображения" {...register(editingProduct ? 'editImageUrl' : 'imageUrl')} defaultValue={editingProduct ? editingProduct.imageUrl : ''}/>
            <label htmlFor={editingProduct ? 'editImageUpload' : 'imageUpload'} className="file-upload-label">Загрузить изображение:</label>
            <input id={editingProduct ? 'editImageUpload' : 'imageUpload'} type="file" accept="image/*" onChange={(e) => handleFileUpload(e, editingProduct ? 'editImageUrl' : 'imageUrl')} />

            <button type="submit">{editingProduct ? 'Сохранить изменения' : 'Добавить товар'}</button>
            {editingProduct && (
                <button type="button" onClick={() => { setEditingProduct(null); reset(); }} className="cancel-button">Отмена</button>
            )}
          </form>
        </div>

        <h2>Список товаров</h2>
        {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                  <div key={product.key} className="admin-product-card">
                    <img src={getImageUrl(product.imageUrl)} alt={product.name} className="admin-product-card-image" />
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

export default AdminShop;
