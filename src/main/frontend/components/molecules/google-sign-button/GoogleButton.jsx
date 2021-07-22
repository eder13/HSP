import React from 'react';
import styles from './GoogleButton.module.css';

const GoogleButton = () => {
    return (
        <a className={styles.loginContainer} href="/oauth2/authorization/google">
            <div className={styles.loginGoogleIconWrapper}>
                {/* TODO: Download the Google Logo locally */}
                <img className={styles.loginGoogleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" />
            </div>
            <div className={styles.loginTextWrapper}>
                <p className={styles.loginText}>Sign in with Google</p>
            </div>
        </a>
    );
}

export default GoogleButton;
