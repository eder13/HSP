import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => {
    return (
        <Link className="navbar-brand pt-4" to="/">
            <div className="ms-2 d-flex flex-column justify-content-center">
                <h3 className={styles.logo}>GeWe</h3>
                <p className={`mb-0 ${styles.subText}`}>Geschichtewerkstatt Uni Graz</p>
            </div>
        </Link>
    );
};

export default Logo;
