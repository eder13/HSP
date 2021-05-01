import React, { useContext } from 'react';
import AuthContext from '../../stores/AuthStore';
import { Link } from 'react-router-dom';
import { axios } from '../util/axiosConfig';
import styles from './Navbar.module.css';

const Navbar = () => {
    const { isLoggedIn, user } = useContext(AuthContext);

    const onLogout = async () => {
        await axios.post('/logout');
        window.location.href = process.env.DOMAIN_URL;
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <Link to="/">
                    <h1>HSP</h1>
                </Link>
            </div>
            <div className={styles.navbarRight}>
                <div className={styles.navbarUser}>{user}</div>
                <div>
                    {isLoggedIn ? (
                        <button onClick={onLogout}>logout</button>
                    ) : (
                        <a href="/oauth2/authorization/google">Sign In</a>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
