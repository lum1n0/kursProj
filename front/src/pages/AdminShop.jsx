import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function AdminShop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = Cookies.get('jwtToken');
            if (!token) {
                setError('Нет доступа');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/admin/product-services', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error('Ошибка сервера');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError('Ошибка при загрузке услуг');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Список услуг</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name} - {product.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default AdminShop;