import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectUser } from '../../selectors/authSelector';
import { Link } from 'react-router-dom';
import { axios } from '../util/axiosConfig';
import styles from './Navbar.module.css';

const Navbar = () => {
    const isLoggedIn = useSelector(selectLoggedIn);
    const username = useSelector(selectUser);

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
                <div className={styles.navbarUser}>{username}</div>
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
