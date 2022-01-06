import React, { useEffect, useRef } from 'react';
import styles from './NavbarDesktopToggler.module.css';

const NavbarDesktopToggler = () => {
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
        <div class={styles.dropdown}>
            <div className={styles.hamburgerWrapper}>
                <input type="checkbox" class={styles.dropdownTitle} ref={checkBoxRef} onClick={onCheckboxClick} />
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
                <li>
                    <a href="#">Bonbons</a>
                </li>
            </ul>
        </div>
    );
};

export default NavbarDesktopToggler;
