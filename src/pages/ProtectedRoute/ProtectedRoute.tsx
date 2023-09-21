import React from 'react';
import { Navigate } from 'react-router-dom';

// Определяем интерфейс для пропсов компонента
interface ProtectedRouteProps {
  isAuthenticated: boolean;
  component: React.ComponentType<any>;
  [key: string]: any; // Дополнительные пропсы
}

function ProtectedRoute({ isAuthenticated, component: Component}: ProtectedRouteProps) {
  if (isAuthenticated) {
    // Если пользователь авторизован, отображаем компонент
    return <Component />;
  } else {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;