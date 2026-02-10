import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const HelloComponent=()=> {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchHello();
    }, []);

    const fetchHello = async () => {
        try {
            setLoading(true);
            const response = await apiService.getHello();
            setMessage(response.data);
        } catch (error) {
            console.error('Error fetching hello:', error);
            setMessage('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await apiService.getUser();
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>React + Spring Boot App</h1>
            
            <div style={{ margin: '20px 0' }}>
                <button onClick={fetchHello} disabled={loading}>
                    {loading ? 'Loading...' : 'Get Hello Message'}
                </button>
                <button onClick={fetchUser} disabled={loading} style={{ marginLeft: '10px' }}>
                    Get User
                </button>
            </div>
            
            {message && (
                <div style={{ margin: '20px 0', padding: '10px', backgroundColor: '#f0f0f0' }}>
                    <h3>Server Response:</h3>
                    <p>{message}</p>
                </div>
            )}
            
            {user && (
                <div style={{ margin: '20px 0', padding: '10px', backgroundColor: '#e0ffe0' }}>
                    <h3>User Data:</h3>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default HelloComponent;