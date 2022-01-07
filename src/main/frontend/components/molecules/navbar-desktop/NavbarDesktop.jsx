import React from 'react';
import LoginLogoutButton from '../login-logout-button/LoginLogoutButton';
import NavbarDesktopToggler from './navbar-desktop-toggler/NavbarDesktopToggler';
import { selectLoggedIn } from '../../../selectors/authSelector';
import { useSelector } from 'react-redux';
import InputSearch from '../../atoms/input-search/InputSearch';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './NavbarDesktop.module.css';
import Logo from '../../atoms/logo/Logo';

const NavbarDesktop = () => {
    /**
     * Selectors
     */
    const isLoggedIn = useSelector(selectLoggedIn);

    /**
     * Render
     */
    return (
        <>
            <nav className="navbar">
                <div className="container-fluid">
                    <Logo />
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
