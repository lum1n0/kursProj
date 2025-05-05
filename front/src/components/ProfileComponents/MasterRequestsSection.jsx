import React, { useState, useEffect } from 'react';
import { getUserMasterRequests } from '../../api/ApiClient.js';

function MasterRequestsSection({ userId }) {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const requestsData = await getUserMasterRequests(userId);
                setRequests(requestsData);
                setError(null);
            } catch (err) {
                setError('Не удалось загрузить заявки. Попробуйте позже.');
            }
        };
        fetchRequests();
    }, [userId]);

    return (
        <div className="master-requests-section">
            <h2 className="title_sect">Заявки мастеру</h2>
            {error ? (
                <p className="error-message">{error}</p>
            ) : requests.length === 0 ? (
                <p>У вас пока нет заявок.</p>
            ) : (
                <div className="requests-list">
                    {requests.map((request) => (
                        <div className="request-card" key={request.id}>
                            <p>Описание: {request.description}</p>
                            <p>Адрес: {request.address}</p>
                            <p>Дата и время: {new Date(request.preferredTime).toLocaleString()}</p>
                            <p>Статус: {request.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MasterRequestsSection;