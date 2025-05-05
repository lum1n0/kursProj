import React, { useState, useEffect } from 'react';
import { getSpendingReport } from '../../api/ApiClient.js';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function SpendingSection({ userId }) {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const report = await getSpendingReport(userId, year, month);
                setData(report);
                setError(null);
            } catch (err) {
                setError('Не удалось загрузить данные отчёта');
            }
        };
        fetchData();
    }, [userId, year, month]);

    const handlePrevMonth = () => {
        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const chartData = {
        labels: data.map(item => item.category),
        datasets: [{
            data: data.map(item => item.totalSpent),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
            ],
        }],
    };

    return (
        <div className="spending-section">
            <h2 className="title_sect">Мои траты</h2>
            <div className="month-selector">
                <button onClick={handlePrevMonth}>&lt;</button>
                <span>{`${month}/${year}`}</span>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            {error ? (
                <p className="error-message">{error}</p>
            ) : data.length === 0 ? (
                <p>Нет данных за этот период</p>
            ) : (
                <Pie data={chartData} />
            )}
        </div>
    );
}

export default SpendingSection;