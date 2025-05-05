import React, { useState } from 'react';
import Header from '../components/Templates/Header.jsx';
import Footer from '../components/Templates/Footer.jsx';
import { useAuthStore } from '../store/authStore';
import ProfileSection from '../components/ProfileComponents/ProfileSection.jsx';
import OrdersSection from '../components/ProfileComponents/OrdersSection.jsx';
import SpendingSection from '../components/ProfileComponents/SpendingSection.jsx';
import MasterRequestsSection from '../components/ProfileComponents/MasterRequestsSection.jsx';
import '../assets/styles/User.scss';

function User() {
    const { user } = useAuthStore();
    const [currentSection, setCurrentSection] = useState('profile');

    return (
        <div className="user">
            <Header />
            <div className="container">
                <div className="sidebar">
                    <button onClick={() => setCurrentSection('profile')}>Мой профиль</button>
                    <button onClick={() => setCurrentSection('orders')}>Мои заказы</button>
                    <button onClick={() => setCurrentSection('requests')}>Заявки мастеру</button>
                    <button onClick={() => setCurrentSection('spending')}>Мои траты</button>
                </div>
                <div className="content">
                    {currentSection === 'profile' && <ProfileSection user={user} />}
                    {currentSection === 'orders' && <OrdersSection userId={user.id} />}
                    {currentSection === 'spending' && <SpendingSection userId={user.id} />}
                    {currentSection === 'requests' && <MasterRequestsSection userId={user.id} />}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default User;