import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, setUserRole }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/final/scheduler/api/auth.php', { username, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userRole', response.data.role);
                setToken(response.data.token);
                setUserRole(response.data.role);
                navigate('/calendar');
            } else if (response.data.fail) {
                setMessage('Incorrect usernam or password');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-4">
                        <h4 className="mb-4">Login</h4>
                        <p className="text-warning"> {message} </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 row">
                                <input className="form-control" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                            </div>
                            <div className="mb-3 row">
                                <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                            </div>
                            <div className="mb-3 row">
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-success">Login</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </React.Fragment>

    );
};

export default Login;
