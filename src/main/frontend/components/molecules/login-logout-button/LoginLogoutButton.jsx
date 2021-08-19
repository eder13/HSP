import React from 'react';
import PropTypes from 'prop-types';
import cssClassNamesHelper from '../../util/cssClassHelper';
import styles from './LoginLogoutButton.module.css';
import Button from '../../atoms/Button';
import GoogleButton from '../google-sign-button/GoogleButton';
import { BUTTON_VARIANT_LIGHT } from '../../../constants/buttonVariants';
import BUTTON_SIZE from '../../../constants/buttonSize';
import Icon from '../../atoms/icons/Icon';
import ICONTYPES from '../../atoms/icons/iconTypes';
import ICONSIZE from '../../atoms/icons/iconSize';

const LoginLogoutButton = ({ isLoggedIn, isMobileNavbarActive, onLogout }) => {
    const containerStyles = cssClassNamesHelper(['d-flex', 'justify-content-center', isMobileNavbarActive && 'mt-5']);
    const logoutBtnStyles = cssClassNamesHelper(['my-2 px-4 my-sm-0', styles.logoutButton]);

    return (
        <div className={containerStyles}>
            {isLoggedIn ? (
                <Button
                    className={logoutBtnStyles}
                    variant={BUTTON_VARIANT_LIGHT.BTN_DANGER}
                    buttonSize={BUTTON_SIZE.SMALL}
                    onClick={onLogout}
                    additionalStyles={{ display: 'flex', width: '160px', justifyContent: 'space-evenly' }}
                >
                    <Icon iconType={ICONTYPES.LOGOUT} additionalStyles={{ top: '2px' }} />
                    <span style={{ marginLeft: '1rem' }}>Abmelden</span>
                </Button>
            ) : (
                <div style={{ color: 'white' }} className="d-flex justify-content-center">
                    <a
                        style={{ display: 'flex', textDecoration: 'none', color: 'white' }}
                        href="/oauth2/authorization/google"
                    >
                        {!isMobileNavbarActive && (
                            <div className="align-items-center mx-2">
                                <Icon
                                    iconType={ICONTYPES.LOGIN}
                                    size={ICONSIZE.SIZE_1_5X}
                                    additionalStyles={{ marginTop: '12px', marginRight: '4px' }}
                                />
                            </div>
                        )}
                        <GoogleButton />
                    </a>
                </div>
            )}
        </div>
    );
};

LoginLogoutButton.propTypes = {
    isLoggedIn: PropTypes.bool,
    isMobileNavbarActive: PropTypes.bool,
    onLogout: PropTypes.func
};

export default LoginLogoutButton;
