import React from 'react';
import AppRoutes from './routs/AppRoutes';
import { useThemeStore } from './store/themeStore';
import './assets/styles/global.scss';

function App() {
  const { isDarkTheme } = useThemeStore();

  return (
      <div className={`App ${isDarkTheme ? 'dark_time' : ''}`}>
        <AppRoutes />
      </div>
  );
}

export default App;