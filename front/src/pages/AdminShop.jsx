import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiClient, getCategories, postData, putData, deleteData } from '../api/ApiClient';
import { useDataStore } from '../store/dataStore';
import { useAuthStore } from '../store/authStore';
import AdminHeader from '../components/AdminHeader';

// Базовый URL бэкенда для изображений
const API_BASE_URL = 'http://localhost:8080'; // Измените на порт вашего бэкенда

function AdminShop() {
  const { products, categories, setProducts, setCategories } = useDataStore();
  const { isLoading: authLoading } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Загружаем категории
        const categoryData = await getCategories();
        console.log('Загруженные категории:', categoryData);
        const validCategories = categoryData.filter(cat => cat.id !== null && cat.title !== null);
        if (validCategories.length === 0) {
          const fallbackCategories = [
            { id: '1', title: 'Модемы и роутеры' },
            { id: '2', title: 'Приставки и ТВ' },
            { id: '3', title: 'Сим-карты' },
          ];
          setCategories(fallbackCategories);
          console.warn('API вернул некорректные данные, используются временные категории');
        } else {
          setCategories(validCategories);
        }

        // Загружаем товары
        const productResponse = await ApiClient.get('/api/admin/product-services');
        const productData = productResponse.data;
        console.log('Загруженные товары:', productData);
        if (Array.isArray(productData)) {
          // Добавляем временные ключи для товаров с id: null
          const productsWithKeys = productData.map((p, index) => ({
            ...p,
            key: p.id !== null ? p.id : `temp-${index}-${Date.now()}`,
          }));
          console.log('Установленные товары:', productsWithKeys);
          setProducts(productsWithKeys);
        } else {
          console.error('Данные товаров не являются массивом:', productData);
          setProducts([]);
        }
      } catch (err) {
        setError('Ошибка при загрузке данных');
        console.error('Ошибка:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchData();
    }
  }, [setProducts, setCategories, authLoading]);

  if (authLoading || loading) {
    return <div>Загрузка...</div>;
  }

  if (error) return <div>{error}</div>;

  // Функция для получения полного URL изображения
  const getImageUrl = (relativePath) => {
    if (!relativePath) return '';
    if (relativePath.startsWith('http')) return relativePath; // Уже полный URL
    return `${API_BASE_URL}${relativePath}`;
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) {
      alert('Пожалуйста, выберите файл');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await ApiClient.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      const imagePath = response.data;
      setValue(fieldName, imagePath);
    } catch (error) {
      console.error('Ошибка загрузки изображения:', error);
      alert(`Не удалось загрузить файл: ${error.response?.data?.message || 'Проверьте сервер'}`);
    }
  };

  const onSubmitNewProduct = async (data) => {
    console.log('Отправляемый объект:', data);
    try {
      const response = await postData('/api/admin/product-services', data);
      const newProduct = {
        ...response,
        key: response.id || `temp-${products.length}-${Date.now()}`,
      };
      setProducts([...products, newProduct]);
    } catch (err) {
      console.error('Ошибка при добавлении товара:', err);
      alert('Ошибка при добавлении товара');
    }
  };

  const onSubmitEditProduct = async (data) => {
    try {
      const response = await putData(`/api/admin/product-services/${editingProduct.id}`, {
        name: data.editName,
        price: data.editPrice,
        categoryId: data.editCategoryId,
        imageUrl: data.editImageUrl,
      });
      setProducts(products.map((p) =>
        p.key === editingProduct.key ? { ...response, key: p.key } : p
      ));
      setEditingProduct(null);
    } catch (err) {
      console.error('Ошибка при редактировании товара:', err);
      alert('Ошибка при редактировании товара');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      try {
        await deleteData(`/api/admin/product-services/${id}`);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        console.error('Ошибка при удалении товара:', err);
        alert('Ошибка при удалении товара');
      }
    }
  };

  const startEditing = (product) => {
    setEditingProduct({ ...product });
    setValue('editName', product.name);
    setValue('editPrice', product.price);
    setValue('editCategoryId', product.categoryId);
    setValue('editImageUrl', product.imageUrl);
  };

  return (
    <div>
      <AdminHeader />
      <h1>Управление товарами и услугами</h1>

      {/* Форма добавления нового товара */}
      <div>
        <h2>Добавить новый товар</h2>
        <form onSubmit={handleSubmit(onSubmitNewProduct)}>
          <input type="text" placeholder="Название" {...register('name', { required: true })} />
          {errors.name && <span>Это поле обязательно для заполнения</span>}

          <input
            type="number"
            placeholder="Цена"
            {...register('price', { required: true, valueAsNumber: true })}
          />
          {errors.price && <span>Цена должна быть числом</span>}

          <select {...register('categoryId', { required: true })}>
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
          {errors.categoryId && <span>Выберите категорию</span>}

          <input type="text" placeholder="URL изображения" {...register('imageUrl')} />

          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'imageUrl')} />

          <button type="submit">Добавить</button>
        </form>
      </div>

      {/* Форма редактирования товара */}
      {editingProduct && (
        <div>
          <h2>Редактировать товар</h2>
          <form onSubmit={handleSubmit(onSubmitEditProduct)}>
            <input
              type="text"
              defaultValue={editingProduct.name}
              {...register('editName', { required: true })}
            />
            {errors.editName && <span>Это поле обязательно для заполнения</span>}

            <input
              type="number"
              defaultValue={editingProduct.price}
              {...register('editPrice', { required: true, valueAsNumber: true })}
            />
            {errors.editPrice && <span>Цена должна быть числом</span>}

            <select
              defaultValue={editingProduct.categoryId}
              {...register('editCategoryId', { required: true })}
            >
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
            {errors.editCategoryId && <span>Выберите категорию</span>}

            <input
              type="text"
              defaultValue={editingProduct.imageUrl}
              {...register('editImageUrl')}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'editImageUrl')}
            />

            <button type="submit">Сохранить</button>
            <button onClick={() => setEditingProduct(null)}>Отмена</button>
          </form>
        </div>
      )}

      {/* Список товаров */}
      <h2>Список товаров</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.key}>
              {product.imageUrl && (
                <img 
                  src={getImageUrl(product.imageUrl)} 
                  alt={product.name} 
                  style={{ width: '50px', height: '50px' }} 
                />
              )}
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