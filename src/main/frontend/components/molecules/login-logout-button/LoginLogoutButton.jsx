import React from 'react';
import PropTypes from 'prop-types';
import cssClassNamesHelper from '../../utils/cssClassNamesHelper';
import styles from './LoginLogoutButton.module.css';
import Button from '../../atoms/button/Button';
import GoogleButton from '../../atoms/google-sign-button/GoogleButton';
import { BUTTON_VARIANT, BUTTON_VARIANT_LIGHT } from '../../atoms/button/buttonVariants';
import BUTTON_SIZE from '../../atoms/button/buttonSize';
import Icon from '../../atoms/icons/Icon';
import ICONTYPES from '../../atoms/icons/iconTypes';
import { useSelector } from 'react-redux';
import { selectIsMediaXS } from '../../../selectors/clientInfoSelector';

const LoginLogoutButton = ({ isLoggedIn, isMobileNavbarActive, onLogout, containerClassNames = '' }) => {
    const containerStyles = cssClassNamesHelper([containerClassNames, 'd-flex', 'justify-content-center']);
    const logoutBtnStyles = cssClassNamesHelper(['my-2 px-4 my-sm-0', styles.logoutButton]);

    const isMediaXS = useSelector(selectIsMediaXS);

    return (
        <div className={containerStyles} style={isMediaXS ? { transform: 'scale(0.8)' } : {}}>
            {isLoggedIn ? (
                <Button
                    className={logoutBtnStyles}
                    variant={BUTTON_VARIANT.BTN_DANGER}
                    buttonSize={BUTTON_SIZE.NORMAL}
                    onClick={onLogout}
                    additionalStyles={{ display: 'flex', width: '160px', justifyContent: 'space-evenly' }}
                >
                    <Icon iconType={ICONTYPES.LOGOUT} additionalStyles={{ top: '4px' }} />
                    <span style={{ marginLeft: '1rem' }}>Abmelden</span>
                </Button>
            ) : (
                <div style={{ color: 'white' }} className="d-flex justify-content-center">
                    <a
                        style={{ display: 'flex', textDecoration: 'none', color: 'white' }}
                        href="/oauth2/authorization/google"
                    >
                        <GoogleButton />
                    </a>
                </div>
            )}
        </div>
    );
};

LoginLogoutButton.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isMobileNavbarActive: PropTypes.bool,
    onLogout: PropTypes.func
};

export default LoginLogoutButton;
