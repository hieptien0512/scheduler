import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserList({ token }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [message, setMessage] = useState('');

    const getUserData = async () => {
        const reqData = await fetch('http://localhost/final/scheduler/api/user.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const resData = await reqData.json();
        if (resData.fail) {
            navigate('/login');
        }

        setUserData(resData);
    }

    const handleDeleteUser = async (id) => {
        const res = await axios.delete(`http://localhost/final/scheduler/api/user.php/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        setMessage(res.data.success);
        getUserData();

        setTimeout(() => {
            setMessage('');
        }, 2000);
    }

    useEffect(() => {
        getUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 mt-4">
                        <h4 className="mb-4">List user</h4>
                        <p className="text-warning"> {message} </p>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">User id</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userData.map((user, index) => (
                                        <tr key={index}>
                                            <th>{user.id}</th>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <Link to={'/editUser/' + user.id} className="btn btn-success mx-2">Edit</Link>
                                                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default UserList;