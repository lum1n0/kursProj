INSERT INTO role (id, title, description)
VALUES (1, 'USER', 'Regular user role')
ON CONFLICT (id) DO NOTHING;


select * from public.users;


SELECT * FROM users WHERE id = 6;
INSERT INTO Orders (id, final_price, order_date, quantity, product_service_id, user_id)
VALUES (1, 3000.00, '2024-12-05 20:32:30.409', 2, 1, 1);


INSERT INTO users (
    id,
    login,
    password, -- Пароль: Admin123@pass (захешированный с помощью BCrypt)
    email,
    first_name,
    last_name,
    phone,
    address,
    role_id,
    created_when,
    is_deleted
)
VALUES (
           1,
           'admin',
           '$2a$10$OYR/Jj8KDFB42QOO7p9yHuq0oJNn7OdDTqRWKVgx8ij7SxnU9wPxW', -- Admin123@pass
           'admin@example.com',
           'Admin',
           'Administrator',
           '89874236991',
           'г. Москва, ул. Примерная, д.1',
           2, -- id роли ADMIN
           CURRENT_TIMESTAMP,
           false
       );


SELECT * FROM role WHERE title = 'ADMIN';
