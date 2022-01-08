import React from 'react';
import { useSelector } from 'react-redux';
import useMobileNavbar from '../../../hooks/useMobileNavbar';
import { selectLoggedIn } from '../../../selectors/authSelector';
import Logo from '../../atoms/logo/Logo';
import LoginLogoutButton from '../login-logout-button/LoginLogoutButton';
import styles from './NavbarMobile.module.css';
import Icon from '../../atoms/icons/Icon';
import ICONSIZE from '../../atoms/icons/iconSize';
import ICONTYPES from '../../atoms/icons/iconTypes';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../routers/Routes';

const NavbarMobile = props => {
    /**
     * Props
     */
    const { onLogout } = props;

    /**
     * Selectors
     */
    const isLoggedIn = useSelector(selectLoggedIn);

    /**
     * Hooks
     */
    const showNavbar = useMobileNavbar();

    return (
        <>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-6">
                        <Logo />
                    </div>
                    <div className="col-6">
                        <LoginLogoutButton onLogout={onLogout} isLoggedIn={isLoggedIn} />
                    </div>
                </div>
            </div>
            <nav
                style={showNavbar ? { transform: 'translateY(0)' } : { transform: 'translateY(80px)' }}
                className={`navbar ${styles.mobileNavbar}`}
            >
                {/* TODO: Design Mobile Navbar */}
                <div className="container-fluid h-100">
                    <ul className={`mx-5 mt-2 ${styles.navbarElementsContainer}`}>
                        <li className="nav-item " style={{ paddingTop: '6px' }}>
                            <NavLink
                                to={ROUTES.HOME_USERDASHBOARD}
                                exact
                                className="d-flex flex-column align-items-center text-decoration-none"
                                activeClassName={styles.active}
                            >
                                <Icon
                                    additionalClassNames={styles.homeIcon}
                                    iconType={ICONTYPES.HOME}
                                    size={ICONSIZE.SIZE_1_1X}
                                />
                                <span
                                    style={{ paddingTop: '6px', paddingLeft: '2px' }}
                                    className={`${styles.iconText}`}
                                >
                                    Home
                                </span>
                            </NavLink>
                        </li>
                        {isLoggedIn && (
                            <li style={{ paddingTop: '4px' }} className="nav-item">
                                <NavLink
                                    to={ROUTES.UPLOAD_FILE}
                                    exact
                                    className="text-decoration-none d-flex flex-column align-items-center"
                                    activeClassName={styles.active}
                                >
                                    <Icon
                                        additionalClassNames={styles.uploadIcon}
                                        iconType={ICONTYPES.UPLOAD}
                                        size={ICONSIZE.SIZE_1_15X}
                                    />
                                    <span style={{ paddingTop: '6px' }} className={`${styles.iconText}`}>
                                        Upload
                                    </span>
                                </NavLink>
                            </li>
                        )}
                        <li className="nav-item">
                            {/* TODO: isLoggedIn -> show Search Icon and oben search overlay */}
                            <NavLink
                                to={ROUTES.ABOUT}
                                exact
                                className="text-decoration-none d-flex flex-column align-items-center"
                                activeClassName={styles.active}
                            >
                                <Icon
                                    additionalClassNames={styles.infoIcon}
                                    iconType={ICONTYPES.INFO}
                                    size={ICONSIZE.SIZE_1_1X}
                                />
                                <span
                                    style={{ paddingTop: '4px', paddingLeft: '2px' }}
                                    className={`${styles.iconText}`}
                                >
                                    Über
                                </span>
                            </NavLink>
                        </li>
                        <li style={isLoggedIn ? { paddingTop: '0px' } : { paddingTop: '1px' }} className="nav-item">
                            <NavLink
                                to={ROUTES.ACCOUNT}
                                exact
                                className="text-decoration-none d-flex flex-column align-items-center"
                                activeClassName={styles.active}
                            >
                                <Icon
                                    additionalClassNames={styles.profileIcon}
                                    iconType={ICONTYPES.PROFILE}
                                    size={ICONSIZE.SIZE_1X}
                                />
                                <span style={{ paddingTop: '2px' }} className={`${styles.iconText}`}>
                                    Account
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavbarMobile;
