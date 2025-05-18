-- Заполнение таблицы product_services
INSERT INTO product_services (id, name, price, status, description, category_id, image_path, created_when, created_by, is_deleted)
VALUES
    (nextval('public.product_services_seq'), 'Супер Интернет 100Мбит/с', 550.00, 'в наличии', 'Высокоскоростной доступ в интернет', 3, 'https://www.shutterstock.com/image-illustration/ultra-pack-green-letters-100mb-260nw-1353253256.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Беспроводной роутер Wi-Fi 6', 3500.00, 'в наличии', 'Высокоскоростной роутер для дома и офиса', 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwA1UOXz5pKXBZmgccZgIl50NszLoTLblDyg&s', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Модем ADSL2+', 1500.00, 'в наличии', 'Модем для подключения к интернету по телефонной линии', 1, 'https://m.media-amazon.com/images/I/51EcqKwt6nL._AC_UF894,1000_QL80_.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Роутер с поддержкой 4G', 4500.00, 'в наличии', 'Роутер для подключения к мобильному интернету', 1, 'https://3logic.ru/pimg/pim/regular/1407726.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'ТВ-приставка 4K', 2500.00, 'в наличии', 'Приставка для просмотра ТВ в высоком разрешении', 2, 'https://carcam.ru/upload/iblock/e69/TV-Box-MX-Q-Pro-4K_2.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'ТВ-приставка с функцией записи', 3000.00, 'в наличии', 'Приставка с возможностью записи телепередач', 2, 'https://ae04.alicdn.com/kf/S5fd7b480ddd24264a6d613cf24cef02aK.jpg_480x480.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'ТВ-приставка с поддержкой IPTV', 2000.00, 'в наличии', 'Приставка для просмотра IPTV', 2, 'https://s.alicdn.com/@sc04/kf/H9d9f9410f7654f418ebf2dc2a51fa2f9h.jpg_720x720q50.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Ежедневный тариф 50Мбит/с', 400.00, 'в наличии', 'Доступ в интернет со скоростью 50Мбит/с', 3, 'https://img.freepik.com/premium-vector/speed-test-laptop-speedometer-internet-speed-50-mb-website-speed-loading-time_100456-333.jpg?w=360', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Премиум Интернет 200Мбит/с', 700.00, 'в наличии', 'Высокоскоростной интернет для требовательных пользователей', 3, 'https://www.shutterstock.com/image-illustration/ultra-pack-green-letters-200mb-260nw-1353253265.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Тариф для бизнеса', 1000.00, 'в наличии', 'Интернет для малого и среднего бизнеса', 3, 'https://cdn.gpb.ru/upload/files/iblock/1e3/x1_CHestnyy-ekvayring_1200x960.png', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Тариф для геймеров', 600.00, 'в наличии', 'Интернет с низкой задержкой для онлайн-игр', 3, 'https://internet-tv-dom.ru/files/block/s-pic-187.webp', NOW(), 'script_filler', false);


-- Заполнение таблицы users
INSERT INTO users (id, login, password, email, first_name, last_name, phone, role_id, tariff_id, balance, last_tariff_charge_date, created_when, created_by, is_deleted)
VALUES
    (nextval('public.users_seq'),'Timur004!', '$2a$10$KtUiO/jKIMCnlujd3JNIG.h0fnqYopNn/K1UbwEhWCjQHWt3Me5wq', 'qwpomnzx5555@gmail.com', 'Тимур', 'Гумаров', '89874236991', 1, 1, 100000.00, NOW(), NOW(), 'script_filler', false),
    (nextval('public.users_seq'), 'Ivan123', '$2a$10$pN0DyA2HxIUbH5Fp6QoamukSFWqOw3i17RMbShk6z/JIuDzs2bv9G', 'ivan@example.com', 'Иван', 'Иванов', '89123456789', 1, 1, 1000.00, NOW(), NOW(), 'script_filler', false),
    (nextval('public.users_seq'), 'Maria456', '$2a$10$M/jB7xJ7qJ3.qsPJdP3DE.4ItA1C4Ny7VMvNfwBWZD80kTk2bjuya', 'maria@example.com', 'Мария', 'Петрова', '89234567890', 2, 2, 2000.00, NOW(), NOW(), 'script_filler', false),
    (nextval('public.users_seq'), 'Alex789', '$2a$10$52wSYIQd42xr2fINAuJ2j.hfdv0pn4.rVWmhr/tjCbcDLwsp6rRIm', 'alex@example.com', 'Алексей', 'Сидоров', '89345678901', 1, 3, 1500.00, NOW(), NOW(), 'script_filler', false),
    (nextval('public.users_seq'), 'Elena012', '$2a$10$.8WeXZaIRJFD0u2p2OcH8.vluAEhnQOR1tzPt0AF9TjDdNQ2aKbX6', 'elena@example.com', 'Елена', 'Кузнецова', '89456789012', 2, 4, 2500.00, NOW(), NOW(), 'script_filler', false),
    (nextval('public.users_seq'), 'Dmitry345', '$2a$10$o89kx5uDfLb1BVGAXBUGueH50iGnKUrX8SNRDm5bY1MJtfa8tq1HK', 'dmitry@example.com', 'Дмитрий', 'Васильев', '89567890123', 1, 1, 3000.00, NOW(), NOW(), 'script_filler', false),
    (nextval('public.users_seq'), 'Olga678', '$2a$10$iZxJchZijipkwr3Xpb5sXOA7wTvnmNFWLEYVlFHVI1ejiNWVk3ePC', 'olga@example.com', 'Ольга', 'Михайлова', '89678901234', 2, 2, 1800.00, NOW(), NOW(), 'script_filler', false),
    (nextval('public.users_seq'), 'Sergey901', '$2a$10$1NejExADlXxDiF5I4LNh..9KePZ9wvahj47li1SopuIFnWSRbzQpe', 'sergey@example.com', 'Сергей', 'Федоров', '89789012345', 1, 3, 2200.00, NOW(), NOW(), 'script_filler', false),
    (nextval('public.users_seq'), 'Anna234', '$2a$10$Tc6HmwCsjPBME1R7eKKqGup3ICggO.buIl9Az3eXCk.BEhIYa3nOy', 'anna@example.com', 'Анна', 'Смирнова', '89890123456', 2, 4, 2700.00, NOW(), NOW(), 'script_filler', false),
    (nextval('public.users_seq'), 'Pavel567', '$2a$10$5UOfdbMwC0UB5Jecuwnz9eYVNbQCKJgr1i1XRsNF./GXVM7nylXp6', 'pavel@example.com', 'Павел', 'Попов', '89901234567', 1, 1, 1900.00, NOW(), NOW(), 'script_filler', false),
    (nextval('public.users_seq'), 'Natalia890', '$2a$10$Gigg3GjIrJrjMb3l23OA9OawXodg9jj0EpXQImVkqpNOvu7tdJU0K', 'natalia@example.com', 'Наталья', 'Зайцева', '89012345678', 2, 2, 2300.00, NOW(), NOW(), 'script_filler', false);


INSERT INTO user_history (id, user_id, field_name, old_value, new_value, changed_by, changed_when, created_when, created_by, is_deleted)
VALUES
    (nextval('public.user_history_id_seq'), (SELECT id FROM users WHERE login = 'Timur004!'), 'email', 'old.email@example.com', 'qwpomnzx5555@gmail.com', 'admin_script', NOW(), NOW(), 'script_filler', false),
    (nextval('public.user_history_id_seq'), (SELECT id FROM users WHERE login = 'Ivan123'), 'email', 'old.ivan@example.com', 'ivan@example.com', 'admin_script', NOW(), NOW(), 'script_filler', false),
    (nextval('public.user_history_id_seq'), (SELECT id FROM users WHERE login = 'Maria456'), 'phone', '89234567890', '89234567891', 'admin_script', NOW(), NOW(), 'script_filler', false),
    (nextval('public.user_history_id_seq'), (SELECT id FROM users WHERE login = 'Alex789'), 'first_name', 'Алекс', 'Алексей', 'admin_script', NOW(), NOW(), 'script_filler', false),
    (nextval('public.user_history_id_seq'), (SELECT id FROM users WHERE login = 'Elena012'), 'last_name', 'Кузнецова', 'Кузнецова-Сидорова', 'admin_script', NOW(), NOW(), 'script_filler', false),
    (nextval('public.user_history_id_seq'), (SELECT id FROM users WHERE login = 'Dmitry345'), 'first_name', 'Дма', 'Дмитрий', 'admin_script', NOW(), NOW(), 'script_filler', false),
    (nextval('public.user_history_id_seq'), (SELECT id FROM users WHERE login = 'Olga678'), 'first_name', 'Оллга', 'Ольга', 'admin_script', NOW(), NOW(), 'script_filler', false),
    (nextval('public.user_history_id_seq'), (SELECT id FROM users WHERE login = 'Sergey901'), 'first_name', 'Серый', 'Сергей', 'admin_script', NOW(), NOW(), 'script_filler', false),
    (nextval('public.user_history_id_seq'), (SELECT id FROM users WHERE login = 'Anna234'), 'first_name', 'Ванна', 'Анна', 'admin_script', NOW(), NOW(), 'script_filler', false),
    (nextval('public.user_history_id_seq'), (SELECT id FROM users WHERE login = 'Pavel567'), 'first_name', 'Пашок', 'Павел', 'admin_script', NOW(), NOW(), 'script_filler', false),
    (nextval('public.user_history_id_seq'), (SELECT id FROM users WHERE login = 'Natalia890'), 'email', 'natalia_old@example.com', 'natalia@example.com', 'admin_script', NOW(), NOW(), 'script_filler', false);

INSERT INTO orders (id, user_id, product_service_id, quantity, final_price, order_date, status, delivery_address, created_when, created_by, is_deleted)
VALUES
    (nextval('public.orders_seq'), (SELECT id FROM users WHERE login = 'Timur004!'), (SELECT id FROM product_services WHERE name = 'Супер Интернет 100Мбит/с'), 1, 550.00, '2025-04-13', 'в обработке', 'ул. Тестовая, д.1, кв. 5', NOW(), 'script_filler', false),
    (nextval('public.orders_seq'), (SELECT id FROM users WHERE login = 'Ivan123'), (SELECT id FROM product_services WHERE name = 'Беспроводной роутер Wi-Fi 6'), 1, 3500.00, NOW(), 'в обработке', 'ул. Ленина, д.1, кв.1', NOW(), 'script_filler', false),
    (nextval('public.orders_seq'), (SELECT id FROM users WHERE login = 'Maria456'), (SELECT id FROM product_services WHERE name = 'Модем ADSL2+'), 2, 3000.00, NOW(), 'отправлен', 'ул. Пушкина, д.2, кв.2', NOW(), 'script_filler', false),
    (nextval('public.orders_seq'), (SELECT id FROM users WHERE login = 'Alex789'), (SELECT id FROM product_services WHERE name = 'Роутер с поддержкой 4G'), 1, 4500.00, NOW(), 'доставлен', 'ул. Гагарина, д.3, кв.3', NOW(), 'script_filler', false),
    (nextval('public.orders_seq'), (SELECT id FROM users WHERE login = 'Elena012'), (SELECT id FROM product_services WHERE name = 'ТВ-приставка 4K'), 3, 7500.00, NOW(), 'в обработке', 'ул. Мира, д.4, кв.4', NOW(), 'script_filler', false),
    (nextval('public.orders_seq'), (SELECT id FROM users WHERE login = 'Dmitry345'), (SELECT id FROM product_services WHERE name = 'ТВ-приставка с функцией записи'), 1, 3000.00, NOW(), 'отправлен', 'ул. Советская, д.5, кв.5', NOW(), 'script_filler', false),
    (nextval('public.orders_seq'), (SELECT id FROM users WHERE login = 'Olga678'), (SELECT id FROM product_services WHERE name = 'ТВ-приставка с поддержкой IPTV'), 2, 4000.00, NOW(), 'доставлен', 'ул. Октябрьская, д.6, кв.6', NOW(), 'script_filler', false),
    (nextval('public.orders_seq'), (SELECT id FROM users WHERE login = 'Sergey901'), (SELECT id FROM product_services WHERE name = 'Ежедневный тариф 50Мбит/с'), 1, 400.00, NOW(), 'в обработке', 'ул. Ленинградская, д.7, кв.7', NOW(), 'script_filler', false),
    (nextval('public.orders_seq'), (SELECT id FROM users WHERE login = 'Anna234'), (SELECT id FROM product_services WHERE name = 'Премиум Интернет 200Мбит/с'), 1, 700.00, NOW(), 'отправлен', 'ул. Кирова, д.8, кв.8', NOW(), 'script_filler', false),
    (nextval('public.orders_seq'), (SELECT id FROM users WHERE login = 'Pavel567'), (SELECT id FROM product_services WHERE name = 'Тариф для бизнеса'), 1, 1000.00, NOW(), 'доставлен', 'ул. Строителей, д.9, кв.9', NOW(), 'script_filler', false),
    (nextval('public.orders_seq'), (SELECT id FROM users WHERE login = 'Natalia890'), (SELECT id FROM product_services WHERE name = 'Тариф для геймеров'), 1, 600.00, NOW(), 'в обработке', 'ул. Комсомольская, д.10, кв.10', NOW(), 'script_filler', false);


INSERT INTO master_requests (id,user_id, description, address, preferred_time, status, request_type, created_when, created_by, is_deleted)
VALUES
    (nextval('public.master_requests_seq'), (SELECT id FROM users WHERE login = 'Timur004!'), 'Проблема с подключением к интернету, роутер не мигает.', 'ул. Тестовая, д.1, кв. 5', NOW() + INTERVAL '1 day', 'на рассмотрении', 'MASTER', NOW(), 'script_filler', false),
    (nextval('public.master_requests_seq'), (SELECT id FROM users WHERE login = 'Ivan123'), 'Проблема с подключением к интернету', 'ул. Ленина, д.1, кв.1', NOW() + INTERVAL '1 day', 'на рассмотрении', 'MASTER', NOW(), 'script_filler', false),
    (nextval('public.master_requests_seq'), (SELECT id FROM users WHERE login = 'Maria456'), 'Не работает ТВ-приставка', 'ул. Пушкина, д.2, кв.2', NOW() + INTERVAL '2 days', 'назначен мастер', 'MASTER', NOW(), 'script_filler', false),
    (nextval('public.master_requests_seq'), (SELECT id FROM users WHERE login = 'Alex789'), 'Нужна настройка роутера', 'ул. Гагарина, д.3, кв.3', NOW() + INTERVAL '3 days', 'выполнено', 'MASTER', NOW(), 'script_filler', false),
    (nextval('public.master_requests_seq'), (SELECT id FROM users WHERE login = 'Elena012'), 'Проблема с кабелем', 'ул. Мира, д.4, кв.4', NOW() + INTERVAL '1 day', 'на рассмотрении', 'MASTER', NOW(), 'script_filler', false),
    (nextval('public.master_requests_seq'), (SELECT id FROM users WHERE login = 'Dmitry345'), 'Не могу подключиться к Wi-Fi', 'ул. Советская, д.5, кв.5', NOW() + INTERVAL '2 days', 'назначен мастер', 'MASTER', NOW(), 'script_filler', false),
    (nextval('public.master_requests_seq'), (SELECT id FROM users WHERE login = 'Olga678'), 'ТВ-приставка не включается', 'ул. Октябрьская, д.6, кв.6', NOW() + INTERVAL '3 days', 'выполнено', 'MASTER', NOW(), 'script_filler', false),
    (nextval('public.master_requests_seq'), (SELECT id FROM users WHERE login = 'Sergey901'), 'Нужна помощь с настройкой тарифа', 'ул. Ленинградская, д.7, кв.7', NOW() + INTERVAL '1 day', 'на рассмотрении', 'MASTER', NOW(), 'script_filler', false),
    (nextval('public.master_requests_seq'), (SELECT id FROM users WHERE login = 'Anna234'), 'Проблема с скоростью интернета', 'ул. Кирова, д.8, кв.8', NOW() + INTERVAL '2 days', 'назначен мастер', 'MASTER', NOW(), 'script_filler', false),
    (nextval('public.master_requests_seq'), (SELECT id FROM users WHERE login = 'Pavel567'), 'Не работает модем', 'ул. Строителей, д.9, кв.9', NOW() + INTERVAL '3 days', 'выполнено', 'MASTER', NOW(), 'script_filler', false),
    (nextval('public.master_requests_seq'), (SELECT id FROM users WHERE login = 'Natalia890'), 'Нужна консультация по тарифам', 'ул. Комсомольская, д.10, кв.10', NOW() + INTERVAL '1 day', 'на рассмотрении', 'MASTER', NOW(), 'script_filler', false);

INSERT INTO support_messages (id, user_id, message, admin_response, is_answered, created_at, answered_at, created_when, created_by, is_deleted)
VALUES
    (nextval('public.support_messages_seq'), (SELECT id FROM users WHERE login = 'Timur004!'), 'Здравствуйте, у меня не работает интернет после грозы.', NULL, false, NOW(), NULL, NOW(), 'script_filler', false),
    (nextval('public.support_messages_seq'), (SELECT id FROM users WHERE login = 'Ivan123'), 'Здравствуйте, у меня не работает интернет', NULL, false, NOW(), NULL, NOW(), 'script_filler', false),
    (nextval('public.support_messages_seq'), (SELECT id FROM users WHERE login = 'Maria456'), 'Как подключить ТВ-приставку?', 'Инструкция по подключению отправлена на ваш email', true, NOW() - INTERVAL '1 day', NOW(), NOW(), 'script_filler', false),
    (nextval('public.support_messages_seq'), (SELECT id FROM users WHERE login = 'Alex789'), 'Не могу зайти в личный кабинет', NULL, false, NOW(), NULL, NOW(), 'script_filler', false),
    (nextval('public.support_messages_seq'), (SELECT id FROM users WHERE login = 'Elena012'), 'Как изменить тариф?', 'Для изменения тарифа зайдите в личный кабинет', true, NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day', NOW(), 'script_filler', false),
    (nextval('public.support_messages_seq'), (SELECT id FROM users WHERE login = 'Dmitry345'), 'Проблема с оплатой', NULL, false, NOW(), NULL, NOW(), 'script_filler', false),
    (nextval('public.support_messages_seq'), (SELECT id FROM users WHERE login = 'Olga678'), 'Не работает Wi-Fi', 'Попробуйте перезагрузить роутер', true, NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days', NOW(), 'script_filler', false),
    (nextval('public.support_messages_seq'), (SELECT id FROM users WHERE login = 'Sergey901'), 'Как подключить дополнительное устройство?', NULL, false, NOW(), NULL, NOW(), 'script_filler', false),
    (nextval('public.support_messages_seq'), (SELECT id FROM users WHERE login = 'Anna234'), 'Не могу скачать файл', 'Проверьте скорость интернета', true, NOW() - INTERVAL '4 days', NOW() - INTERVAL '3 days', NOW(), 'script_filler', false),
    (nextval('public.support_messages_seq'), (SELECT id FROM users WHERE login = 'Pavel567'), 'Проблема с электронной почтой', NULL, false, NOW(), NULL, NOW(), 'script_filler', false),
    (nextval('public.support_messages_seq'), (SELECT id FROM users WHERE login = 'Natalia890'), 'Как настроить родительский контроль?', 'Инструкция по настройке родительского контроля отправлена на ваш email', true, NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days', NOW(), 'script_filler', false);


-- Заполнение таблицы product_services (второй блок, с добавлением id и nextval)
INSERT INTO product_services (id, name, price, status, description, category_id, image_path, created_when, created_by, is_deleted)
VALUES
    (nextval('public.product_services_seq'), 'Супер Интернет 100Мбит/с', 550.00, 'в наличии', 'Высокоскоростной доступ в интернет', 3, 'https://www.shutterstock.com/image-illustration/ultra-pack-green-letters-100mb-260nw-1353253256.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Беспроводной роутер Wi-Fi 6', 3500.00, 'в наличии', 'Высокоскоростной роутер для дома и офиса', 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwA1UOXz5pKXBZmgccZgIl50NszLoTLblDyg&s', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Модем ADSL2+', 1500.00, 'в наличии', 'Модем для подключения к интернету по телефонной линии', 1, 'https://m.media-amazon.com/images/I/51EcqKwt6nL._AC_UF894,1000_QL80_.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Роутер с поддержкой 4G', 4500.00, 'в наличии', 'Роутер для подключения к мобильному интернету', 1, 'https://3logic.ru/pimg/pim/regular/1407726.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'ТВ-приставка 4K', 2500.00, 'в наличии', 'Приставка для просмотра ТВ в высоком разрешении', 2, 'https://carcam.ru/upload/iblock/e69/TV-Box-MX-Q-Pro-4K_2.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'ТВ-приставка с функцией записи', 3000.00, 'в наличии', 'Приставка с возможностью записи телепередач', 2, 'https://ae04.alicdn.com/kf/S5fd7b480ddd24264a6d613cf24cef02aK.jpg_480x480.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'ТВ-приставка с поддержкой IPTV', 2000.00, 'в наличии', 'Приставка для просмотра IPTV', 2, 'https://s.alicdn.com/@sc04/kf/H9d9f9410f7654f418ebf2dc2a51fa2f9h.jpg_720x720q50.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Ежедневный тариф 50Мбит/с', 400.00, 'в наличии', 'Доступ в интернет со скоростью 50Мбит/с', 3, 'https://img.freepik.com/premium-vector/speed-test-laptop-speedometer-internet-speed-50-mb-website-speed-loading-time_100456-333.jpg?w=360', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Премиум Интернет 200Мбит/с', 700.00, 'в наличии', 'Высокоскоростной интернет для требовательных пользователей', 3, 'https://www.shutterstock.com/image-illustration/ultra-pack-green-letters-200mb-260nw-1353253265.jpg', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Тариф для бизнеса', 1000.00, 'в наличии', 'Интернет для малого и среднего бизнеса', 3, 'https://cdn.gpb.ru/upload/files/iblock/1e3/x1_CHestnyy-ekvayring_1200x960.png', NOW(), 'script_filler', false),
    (nextval('public.product_services_seq'), 'Тариф для геймеров', 600.00, 'в наличии', 'Интернет с низкой задержкой для онлайн-игр', 3, 'https://internet-tv-dom.ru/files/block/s-pic-187.webp', NOW(), 'script_filler', false);

