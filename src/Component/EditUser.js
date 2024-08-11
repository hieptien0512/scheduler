import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditUser({ token }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formValue, setFormValue] = useState({ username: '', email: '' });
    const [message, setMessage] = useState('');

    const handleInput = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`http://localhost/final/scheduler/api/user.php/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const userData = await response.json();
            setFormValue(userData);
            console.log(token);
        };

        fetchUserData();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { id: id, username: formValue.username, email: formValue.email };
        const res = await axios.put('http://localhost/final/scheduler/api/user.php', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (res.data.success) {
            setMessage(res.data.success);
            setTimeout(() => {
                navigate('/userList');
            }, 2000);
        }
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-4">
                        <h4 className="mb-4">Edit user</h4>
                        <p className="text-warning"> {message} </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 row">
                                <label className="col-sm-2">User name</label>
                                <div className="col-sm-10">
                                    <input type="text" name="username" value={formValue.username} className="form-control" onChange={handleInput} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" name="email" value={formValue.email} className="form-control" onChange={handleInput} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2"></label>
                                <div className="col-sm-10">
                                    <button name="submit" className="btn btn-success">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EditUser;