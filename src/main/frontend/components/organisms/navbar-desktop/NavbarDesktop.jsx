import React from 'react';
import LoginLogoutButton from '../../molecules/login-logout-button/LoginLogoutButton';
import NavbarDesktopToggler from '../../molecules/navbar-desktop-toggler/NavbarDesktopToggler';
import { selectLoggedIn } from '../../../selectors/authSelector';
import { useSelector } from 'react-redux';
import InputSearch from '../../atoms/input-search/InputSearch';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './NavbarDesktop.module.css';

const NavbarDesktop = () => {
    const isLoggedIn = useSelector(selectLoggedIn);

    // TODO: Define a new component named <Navbar> that combines mobile and desktop navbar
    // if isSM or isXS -> Mobile Navbar show, else show desktop Navbar

    return (
        <>
            <nav className="navbar">
                <div className="container-fluid">
                    {/* TODO: Place Logo in extra component */}
                    <Link className="navbar-brand pt-4" to="/">
                        <div className="ms-2 d-flex flex-column justify-content-center">
                            <h3 className={styles.logo}>GeWe</h3>
                            <p className={`mb-0 ${styles.subText}`}>Geschichtewerkstatt Uni Graz</p>
                        </div>
                    </Link>
                    <div className="navbar-header navbar-right pull-right me-5">
                        <ul
                            style={isLoggedIn ? {} : { width: '300px' }}
                            className="nav navbar-nav navbar-right d-flex flex-row align-items-center justify-content-between"
                        >
                            <li style={{ marginRight: '-5rem' }}>
                                {isLoggedIn ? (
                                    <InputSearch
                                        placeholder="Suche ..."
                                        classNames={`d-flex mb-0 ${styles.searchFormInput}`}
                                    />
                                ) : (
                                    <LoginLogoutButton isLoggedIn={false} />
                                )}
                            </li>
                            <li>
                                <NavbarDesktopToggler />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavbarDesktop;
