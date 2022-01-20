import React, { useEffect, useState } from 'react';
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
import Button from '../../atoms/button/Button';
import { BUTTON_VARIANT } from '../../atoms/button/buttonVariants';
import { useDispatch } from 'react-redux';
import { actionSetModal } from '../../../actions/modalActions';
import { MODAL_TYPE } from '../../../constants/modalTypes';
import { selectModalActive, selectModalType } from '../../../selectors/modalSelector';
import Modal from '../../atoms/modal-overlay/Modal';
import cssClassNamesHelper from '../../utils/cssClassNamesHelper';

const NavbarMobile = props => {
    /**
     * Props
     */
    const { onLogout } = props;

    /**
     * Dispatch
     */
    const dispatch = useDispatch();

    /**
     * Selectors
     */
    const isLoggedIn = useSelector(selectLoggedIn);
    const isModalActive = useSelector(selectModalActive);
    const modalType = useSelector(selectModalType);
    const isMobileSearchModalActive = isModalActive && modalType === MODAL_TYPE.MOBILE_SEARCH;

    /**
     * State
     */
    const [modal, setModal] = useState(undefined);

    console.log('##### isMobileSearchModalActive', isMobileSearchModalActive);

    /**
     * Hooks
     */
    const showNavbar = useMobileNavbar();

    useEffect(() => {
        if (isMobileSearchModalActive) {
            console.log('##### Modal for Mobile Search should be displayed');
        }
    }, [isModalActive, modalType]);

    return (
        <>
            <Modal title="Suche" onRegisterModal={modalCb => setModal(modalCb)} disableClose={false}>
                TODO: Implement Search on Mobile
            </Modal>

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
                <div className="container-fluid h-100">
                    <ul className={`mx-5 mt-2 ${styles.navbarElementsContainer}`}>
                        <li className="nav-item " style={{ paddingTop: '6px', width: '50px' }}>
                            <NavLink
                                to={!isMobileSearchModalActive ? ROUTES.HOME_USERDASHBOARD : '#'}
                                exact
                                className="d-flex flex-column align-items-center text-decoration-none"
                                activeClassName={!isMobileSearchModalActive ? styles.active : ''}
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
                            <li style={{ paddingTop: '4px', width: '50px' }} className="nav-item">
                                <NavLink
                                    to={!isMobileSearchModalActive ? ROUTES.UPLOAD_FILE : '#'}
                                    exact
                                    className="text-decoration-none d-flex flex-column align-items-center"
                                    activeClassName={!isMobileSearchModalActive ? styles.active : ''}
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
                        {isLoggedIn ? (
                            <li className="nav-item" style={{ width: '50px' }}>
                                <Button
                                    variant={BUTTON_VARIANT.BTN_NONE}
                                    className={`border-0 bg-white text-decoration-none d-flex flex-column align-items-center`}
                                    onClick={() => {
                                        dispatch(
                                            actionSetModal({
                                                type: MODAL_TYPE.MOBILE_SEARCH
                                            })
                                        );
                                        modal.show();
                                    }}
                                >
                                    <Icon
                                        additionalClassNames={cssClassNamesHelper([
                                            !isMobileSearchModalActive && styles.searchIcon,
                                            isMobileSearchModalActive && styles.searchIconActive
                                        ])}
                                        iconType={ICONTYPES.SEARCH}
                                        size={ICONSIZE.SIZE_1_1X}
                                    />
                                    <span
                                        style={{ paddingTop: '7px', paddingLeft: '4px' }}
                                        className={cssClassNamesHelper([
                                            !isMobileSearchModalActive && styles.iconText,
                                            isMobileSearchModalActive && styles.iconTextSearchActive
                                        ])}
                                    >
                                        Suche
                                    </span>
                                </Button>
                            </li>
                        ) : (
                            <li className="nav-item" style={{ width: '50px' }}>
                                <NavLink
                                    to={!isMobileSearchModalActive ? ROUTES.LEGAL : '#'}
                                    exact
                                    className="text-decoration-none d-flex flex-column align-items-center"
                                    activeClassName={!isMobileSearchModalActive ? styles.active : ''}
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
                                        Impressum
                                    </span>
                                </NavLink>
                            </li>
                        )}
                        <li
                            style={
                                isLoggedIn ? { paddingTop: '0px', width: '50px' } : { paddingTop: '1px', width: '50px' }
                            }
                            className="nav-item"
                        >
                            <NavLink
                                to={!isMobileSearchModalActive && isLoggedIn ? ROUTES.ACCOUNT : '#'}
                                exact
                                className="text-decoration-none d-flex flex-column align-items-center"
                                activeClassName={!isMobileSearchModalActive && isLoggedIn ? styles.active : ''}
                                style={!isLoggedIn ? { cursor: 'not-allowed' } : {}}
                            >
                                <Icon
                                    additionalClassNames={cssClassNamesHelper([
                                        styles.profileIcon,
                                        !isLoggedIn && styles.disabled
                                    ])}
                                    iconType={ICONTYPES.PROFILE}
                                    size={ICONSIZE.SIZE_1X}
                                />
                                <span
                                    style={{ paddingTop: '2px' }}
                                    className={cssClassNamesHelper([
                                        styles.iconText,
                                        !isLoggedIn && styles.disabledText
                                    ])}
                                >
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
