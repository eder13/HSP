import React from 'react';
import { useSelector } from 'react-redux';
import useMobileNavbar from '../../../hooks/useMobileNavbar';
import { selectLoggedIn } from '../../../selectors/authSelector';
import Logo from '../../atoms/logo/Logo';
import LoginLogoutButton from '../login-logout-button/LoginLogoutButton';
import styles from './NavbarMobile.module.css';

const NavbarMobile = () => {
    const showNavbar = useMobileNavbar();

    console.log('#####** showNavbar', showNavbar);

    /**
     *
     */
    const isLoggedIn = useSelector(selectLoggedIn);

    //console.log('#####** showNavbar', showNavbar);

    return (
        <>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-6">
                        <Logo />
                    </div>
                    <div className="col-6">
                        <LoginLogoutButton isLoggedIn={isLoggedIn} />
                    </div>
                </div>
            </div>
            <nav
                style={showNavbar ? { transform: 'translateY(0)' } : { transform: 'translateY(70px)' }}
                className={`navbar ${styles.mobileNavbar}`}
            >
                {/* TODO: Design Mobile Navbar */}
                <div className="container-fluid">
                    <ul>
                        <li className="nav-item">
                            <i className="gg-search" />
                        </li>
                        <li className="nav-item">
                            <i className="gg-search" />
                        </li>
                        <li className="nav-item">
                            <i className="gg-search" />
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavbarMobile;
