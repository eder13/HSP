import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../selectors/authSelector';
import { Link } from 'react-router-dom';
import { axios } from '../util/axiosConfig';
import styles from './Navbar.module.css';

const Navbar = () => {
    const isLoggedIn = useSelector(selectLoggedIn);

    const onLogout = async () => {
        await axios.post('/logout');
        window.location.href = process.env.DOMAIN_URL;
    };

    // TODO: split this Navbar into smaller components
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">LOGO</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className={`nav-link active ${styles.navLink}`} to="/">Home
                                <span className="visually-hidden">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${styles.navLink}`} href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${styles.navLink}`} href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${styles.navLink}`} href="#">About</a>
                        </li>
                    </ul>
                    <div className={`d-flex ${styles.placeCenter}`}>
                        {
                            isLoggedIn ? (
                                <>
                                    <button className="btn btn-light btn-sm my-2 px-4 my-sm-0" type="submit" onClick={onLogout}><i style={{marginRight: '10px', height: '30px', }} className="icono-signOut"></i>Abmelden</button>
                                </>
                                ) : (
                                <a className={styles.loginContainer} href="/oauth2/authorization/google">
                                    <div className={styles.loginGoogleIconWrapper}>
                                        {/* TODO: Download the Google Logo locally */}
                                        <img className={styles.loginGoogleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" />
                                    </div>
                                    <div className={styles.loginTextWrapper}>
                                        <p className={styles.loginText}>Sign in with Google</p>
                                    </div>
                                </a>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
