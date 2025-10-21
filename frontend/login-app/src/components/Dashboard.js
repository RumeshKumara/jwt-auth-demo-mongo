import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/auth';

const Dashboard = ({ token, onLogout }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await axios.get(`${API_BASE}/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(res.data);
            } catch (error) {
                alert(error.response?.data?.error || 'Session expired');
                onLogout();
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [token, onLogout]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            {userData && (
                <div>
                    <p>{userData.message}</p>
                    <p>Welcome, {userData.user.email}!</p>
                </div>
            )}
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;