import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/auth';  // Backend URL

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({ email: '', password: '', username: '' });
    const [isRegister, setIsRegister] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isRegister ? '/register' : '/login';
            const res = await axios.post(`${API_BASE}${endpoint}`, formData);

            if (!isRegister && res.data.token) {
                onLogin(res.data.token);
            } else {
                alert(res.data.message || 'Success! You can now login.');
                if (isRegister) setIsRegister(false);  // Switch to login after register
            }
        } catch (error) {
            alert(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="login-form">
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
            </form>
            <p onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </p>
        </div>
    );
};

export default Login;