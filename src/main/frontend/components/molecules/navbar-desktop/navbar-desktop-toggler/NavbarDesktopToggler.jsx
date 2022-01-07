import React, { useEffect, useRef } from 'react';
import styles from './NavbarDesktopToggler.module.css';
import LoginLogoutButton from '../../login-logout-button/LoginLogoutButton';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../../../selectors/authSelector';
import Cookies from 'js-cookie';

const NavbarDesktopToggler = () => {
    // TODO: onLogout for NavbarDesktops dropdown
    const onLogout = async () => {
        const req = await fetch('/logout', { method: 'post', headers: { 'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') } });
        await req.ok;
        window.location.href = process.env.DOMAIN_URL;
    };

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

            return () => dropdownMenuObserver.disconnect();
        });
        dropdownMenuObserver.observe(dropdownRef.current);
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
                <li>
                    <a href="#">Donuts</a>
                </li>
                <li>
                    <a href="#">Cupcakes</a>
                </li>
                <li>
                    <a href="#">Chocolate</a>
                </li>
                {isLoggedIn && (
                    <li>
                        <LoginLogoutButton onLogout={onLogout} isLoggedIn={isLoggedIn} />
                    </li>
                )}
            </ul>
        </div>
    );
};

export default NavbarDesktopToggler;
