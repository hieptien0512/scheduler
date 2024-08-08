import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header({ userRole, setToken, setUserRole }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setToken(null);
        setUserRole(null);
        navigate('/login');
    };

    const token = localStorage.getItem('token');

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg bg-warning">
                <div className="container">
                    <Link to={'/'} className="navbar-brand">Scheduler</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {userRole !== '0' && userRole !== null && (
                                <>
                                    <li className="nav-item">
                                        <NavLink to={'/userList'} className="nav-link">User List</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={'/addUser'} className="nav-link">Add User</NavLink>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <NavLink to={'/calendar'} className="nav-link">Calendar</NavLink>
                            </li>
                        </ul>
                        {token && <button className="btn " onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default Header;
