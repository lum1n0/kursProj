import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiClient, getCategories, postData, putData, deleteData } from '../api/ApiClient';
import axios from 'axios';
import { useDataStore } from '../store/dataStore';
import { useAuthStore } from '../store/authStore';

function AdminShop() {
  const { products, categories, setProducts, setCategories } = useDataStore();
  const { isLoading: authLoading } = useAuthStore(); // Получаем состояние загрузки аутентификации
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
        const categoryData = await getCategories();
        setCategories(categoryData);

        const productData = await ApiClient.get('/api/admin/product-services');
        setProducts(productData.data);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchData(); // Загружаем данные только после завершения проверки аутентификации
    }
  }, [setProducts, setCategories, authLoading]);

  // Показываем загрузку, если данные аутентификации или страницы еще не готовы
  if (authLoading || loading) {
    return <div>Загрузка...</div>;
  }

  if (error) return <div>{error}</div>;

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const imagePath = response.data;
      setValue(fieldName, imagePath);
    } catch (error) {
      console.error('Ошибка загрузки изображения:', error);
    }
  };

  const onSubmitNewProduct = async (data) => {
    console.log('Отправляемый объект:', data);
    try {
      const response = await postData('/api/admin/product-services', data);
      setProducts([...products, response]);
    } catch (err) {
      console.error('Ошибка при добавлении товара:', err);
    }
  };

  const onSubmitEditProduct = async (data) => {
    try {
      const response = await putData(`/api/admin/product-services/${editingProduct.id}`, data);
      setProducts(products.map((p) => (p.id === editingProduct.id ? response : p)));
      setEditingProduct(null);
    } catch (err) {
      console.error('Ошибка при редактировании товара:', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      try {
        await deleteData(`/api/admin/product-services/${id}`);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        console.error('Ошибка при удалении товара:', err);
      }
    }
  };

  const startEditing = (product) => {
    setEditingProduct({ ...product });
    setValue('editName', product.name);
   applications.setValue('editPrice', product.price);
    setValue('editCategoryId', product.categoryId);
    setValue('editImageUrl', product.imageUrl);
  };

  return (
    <div>
      <header className="head_conteiner">
        <nav className="nav_bar">
          <div className="left">
            <a href="/" className="logo">
              Админ-панель
            </a>
          </div>
          <div className="right">
            <div className="links">
              <a href="/admin" className="nav_link">
                Пользователи
              </a>
              <a className="nav_link" href="/admin/shop">
                Товары и Услуги
              </a>
              <a className="nav_link" href="/admin/answer">
                Ответы на вопросы
                {/* {unansweredCount > 0 && <span className="red-circle"></span>} */}

              </a>
              <a href="http://localhost:8080/swagger-ui/index.html" className="nav_link" target="_blank">
                Swagger
              </a>
            </div>
          </div>
        </nav>
      </header>
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
      <ul>
        {products.map((product) => (
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