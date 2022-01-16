import React, { useEffect, useRef } from 'react';
import styles from './NavbarDesktopToggler.module.css';
import LoginLogoutButton from '../../login-logout-button/LoginLogoutButton';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../../../selectors/authSelector';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../../routers/Routes';

const NavbarDesktopToggler = props => {
    /**
     * Props
     */
    const { onLogout } = props;

    /**
     * State, Refs, Callbacks
     */
    const checkBoxRef = useRef();
    const dropdownRef = useRef();

    const onCheckboxClick = e => {
        if (!e.target.checked) {
            document.activeElement.blur();
        }
    };

    /**
     * Selectors
     */
    const isLoggedIn = useSelector(selectLoggedIn);

    /**
     * Hooks
     */
    useEffect(() => {
        const dropdownMenuObserver = new IntersectionObserver(async entries => {
            await new Promise(res =>
                setTimeout(() => {
                    res();
                }, 100)
            );

            if (entries[0].isIntersecting) {
                checkBoxRef.current.checked = true;
            } else {
                checkBoxRef.current.checked = false;
            }
        });
        dropdownMenuObserver.observe(dropdownRef.current);

        return () => dropdownMenuObserver.disconnect();
    }, []);

    /**
     * Render
     */
    return (
        <div className={styles.dropdown}>
            <div className={styles.hamburgerWrapper}>
                <input type="checkbox" className={styles.dropdownTitle} ref={checkBoxRef} onClick={onCheckboxClick} />
                <div className={styles.hamburger}></div>
                <div className={styles.hamburgerCircle}></div>
            </div>

            <ul className={styles.dropdownMenu} ref={dropdownRef}>
                <li className="nav-item">
                    <NavLink
                        onClick={onCheckboxClick}
                        activeClassName={styles.active}
                        to={ROUTES.HOME_USERDASHBOARD}
                        exact
                    >
                        <span>Home</span>
                    </NavLink>
                </li>
                {isLoggedIn ? (
                    <li className="nav-item">
                        <NavLink
                            onClick={onCheckboxClick}
                            activeClassName={styles.active}
                            to={ROUTES.UPLOAD_FILE}
                            exact
                        >
                            <span>Upload</span>
                        </NavLink>
                    </li>
                ) : (
                    <li className="nav-item">
                        <NavLink onClick={onCheckboxClick} activeClassName={styles.active} to={ROUTES.ABOUT} exact>
                            <span>Über</span>
                        </NavLink>
                    </li>
                )}
                <li className="nav-item">
                    <NavLink onClick={onCheckboxClick} activeClassName={styles.active} to={ROUTES.ACCOUNT} exact>
                        <span>Mein Account</span>
                    </NavLink>
                </li>
                {isLoggedIn && (
                    <li className="nav-item pb-2">
                        <LoginLogoutButton onLogout={onLogout} isLoggedIn={isLoggedIn} />
                    </li>
                )}
            </ul>
        </div>
    );
};

export default NavbarDesktopToggler;
