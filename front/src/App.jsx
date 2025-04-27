import React, { useEffect } from 'react';
import AppRoutes from './routs/AppRoutes';
import { useThemeStore } from './store/themeStore';
import { useAuthStore } from './store/authStore';
import './assets/styles/global.scss';

function App() {
    const { isDarkTheme } = useThemeStore();
    const { checkAuth, isLoading } = useAuthStore();

    useEffect(() => {
        checkAuth(); // Проверка аутентификации сразу при загрузке приложения
    }, [checkAuth]);

    if (isLoading) {
        return <div>Проверка аутентификации...</div>;
    }

    return (
        <div className={`App ${isDarkTheme ? 'dark_time' : ''}`}>
            <AppRoutes />
        </div>
    );
}

export default App;