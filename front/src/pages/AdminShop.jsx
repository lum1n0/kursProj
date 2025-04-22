import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiClient, getCategories, postData, putData, deleteData } from '../api/ApiClient';
import { useDataStore } from '../store/dataStore';
import AdminHeader from '../components/AdminHeader';
import Swal from 'sweetalert2';
import '../assets/styles/AdminShop.scss';

const API_BASE_URL = 'http://localhost:8080';

function AdminShop() {
  const { products, categories, setProducts, setCategories } = useDataStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {

      // Пример fetch-запроса
      fetch('http://localhost:8080/product-categories')
          .then(response => response.json())
          .then(data => {
            console.log('Данные категорий:', data);
            setCategories(data);
          })
          .catch(error => console.error('Ошибка загрузки категорий:', error));


    const fetchData = async () => {
      try {
        setLoading(true);
        const categoryData = await getCategories();
        setCategories(categoryData.filter(cat => cat.id && cat.title));
        const productResponse = await ApiClient.get('/api/shop');
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
    if (!relativePath) return '';
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
      const response = await postData('/api/shop', data);
      setProducts([...products, { ...response, key: response.id || `temp-${products.length}` }]);
      Swal.fire('Успех', 'Товар добавлен', 'success');
    } catch (err) {
      Swal.fire('Ошибка', 'Не удалось добавить товар', 'error');
    }
  };

  const onSubmitEditProduct = async (data) => {
    try {
      const response = await putData(`/api/shop/${editingProduct.id}`, {
        name: data.editName,
        price: data.editPrice,
        categoryId: data.editCategoryId,
        imageUrl: data.editImageUrl,
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
    setValue('editCategoryId', product.categoryId);
    setValue('editImageUrl', product.imageUrl);
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
      <div className="admin-shop">
        <AdminHeader />
        <h1>Управление товарами и услугами</h1>

        <div className="form-section">
          <h2>Добавить новый товар</h2>
          <form onSubmit={handleSubmit(onSubmitNewProduct)}>
            <input type="text" placeholder="Название" {...register('name', { required: 'Название обязательно' })} />
            {errors.name && <p>{errors.name.message}</p>}
            <input type="number" placeholder="Цена" {...register('price', { required: 'Цена обязательна', valueAsNumber: true })} />
            {errors.price && <p>{errors.price.message}</p>}
            <select {...register('categoryId', { required: 'Категория обязательна' })}>
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
            {errors.categoryId && <p>{errors.categoryId.message}</p>}
            <input type="text" placeholder="URL изображения" {...register('imageUrl')} />
            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'imageUrl')} />
            <button type="submit">Добавить</button>
          </form>
        </div>

        {editingProduct && (
            <div className="form-section">
              <h2>Редактировать товар</h2>
              <form onSubmit={handleSubmit(onSubmitEditProduct)}>
                <input type="text" {...register('editName', { required: 'Название обязательно' })} defaultValue={editingProduct.name} />
                {errors.editName && <p>{errors.editName.message}</p>}
                <input type="number" {...register('editPrice', { required: 'Цена обязательна', valueAsNumber: true })} defaultValue={editingProduct.price} />
                {errors.editPrice && <p>{errors.editPrice.message}</p>}
                <select {...register('categoryId', { required: 'Категория обязательна' })}>
                  <option value="">Выберите категорию</option>
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.title}</option>
                    ))
                  ) : (
                    <option disabled>Категории не загружены</option>
                  )}
                </select>
                {errors.editCategoryId && <p>{errors.editCategoryId.message}</p>}
                <input type="text" {...register('editImageUrl')} defaultValue={editingProduct.imageUrl} />
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'editImageUrl')} />
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
                    {product.imageUrl && <img src={getImageUrl(product.imageUrl)} alt={product.name} />}
                    {product.name} - {product.price} руб.
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

export default AdminShop;