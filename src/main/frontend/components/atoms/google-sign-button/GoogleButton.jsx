import React from 'react';
import styles from './GoogleButton.module.css';

const GoogleButton = () => (
    <div className={styles.loginContainer}>
        <div className={styles.loginGoogleIconWrapper}>
            <img
                className={styles.loginGoogleIcon}
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google Logo"
            />
        </div>
        <div className={styles.loginTextWrapper}>
            <p className={styles.loginText}>Sign in with Google</p>
        </div>
    </div>
);
export default GoogleButton;
