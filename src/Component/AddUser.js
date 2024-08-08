import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser({ token }) {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({ username: '', email: '' });
    const [message, setMessage] = useState('');

    const handleInput = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { username: formValue.username, email: formValue.email, password: formValue.password };

        try {
            const res = await axios.post('http://localhost/final/scheduler/api/user.php', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success) {
                setMessage(res.data.success);
                setTimeout(() => {
                    navigate('/userList');
                }, 2000);
            }
        }
        catch (e) {
            navigate('/login');
        }


    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-4">
                        <h4 className="mb-4">Add user</h4>
                        <p className="text-warning"> {message} </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 row">
                                <label className="col-sm-2">User name</label>
                                <div className="col-sm-10">
                                    <input type="text" name="username" value={formValue.username} className="form-control" onChange={handleInput} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" name="password" value={formValue.password} className="form-control" onChange={handleInput} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" name="email" value={formValue.email} className="form-control" onChange={handleInput} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-sm-10">
                                    <button name="submit" className="btn btn-success">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AddUser;