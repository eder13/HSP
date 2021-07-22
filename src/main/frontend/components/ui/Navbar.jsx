import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../selectors/authSelector';
import { Link } from 'react-router-dom';
import { axios } from '../util/axiosConfig';
import styles from './Navbar.module.css';
import GoogleButton from '../molecules/google-sign-button/GoogleButton';
import { selectIsMobileNavbar } from '../../selectors/clientInfoSelector';

const Navbar = () => {
    const isLoggedIn = useSelector(selectLoggedIn);
    const isMobileNavbarActive = useSelector(selectIsMobileNavbar);

    const onLogout = async () => {
        await axios.post('/logout');
        window.location.href = process.env.DOMAIN_URL;
    };

    // TODO: split this Navbar into smaller components
    return (
        <header className="header">
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
                                    <div style={{color: 'white'}} className="d-flex justify-content-center">
                                        {!isMobileNavbarActive && <div className="align-items-center mx-2">Sign In <i style={{marginTop: '19px', marginBottom: '19px'}} className="icono-rightArrow"/></div>}
                                        <GoogleButton />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
