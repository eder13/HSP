import React from 'react'
import PropTypes from 'prop-types'
import cssClassNamesHelper from '../../util/cssClassHelper';
import styles from './LoginLogoutButton.module.css';
import Button from '../../atoms/Button';
import GoogleButton from '../google-sign-button/GoogleButton';
import { BUTTON_VARIANT_LIGHT } from '../../../constants/buttonVariants';
import BUTTON_SIZE from '../../../constants/buttonSize';

const LoginLogoutButton = ({isLoggedIn, isMobileNavbarActive, onLogout}) => {
    
    const containerStyles = cssClassNamesHelper([
        'd-flex', 
        'justify-content-center',
        isMobileNavbarActive && 'mt-5'
    ]);

    const logoutBtnStyles = cssClassNamesHelper([
        'my-2 px-4 my-sm-0',
        styles.logoutButton
    ]);
    
    const iconoStyles = cssClassNamesHelper([
        'icono-signOut',
        styles.iconoSignOut
    ]);

    return (
        <div className={containerStyles}>
            {
                isLoggedIn ? (
                    <Button className={logoutBtnStyles} variant={BUTTON_VARIANT_LIGHT.BTN_DANGER} buttonSize={BUTTON_SIZE.SMALL} onClick={onLogout}>
                        <i className={iconoStyles}></i>Abmelden
                    </Button>
                ) : (
                    <div style={{color: 'white'}} className="d-flex justify-content-center">
                        {!isMobileNavbarActive && <div className="align-items-center mx-2">Sign In <i style={{marginTop: '19px', marginBottom: '19px'}} className="icono-rightArrow"/></div>}
                        <GoogleButton />
                    </div>
                )
            }
        </div>
    )
}

LoginLogoutButton.propTypes = {
    isLoggedIn: PropTypes.bool,
    isMobileNavbarActive: PropTypes.bool,
    onLogout: PropTypes.func
}

export default LoginLogoutButton
