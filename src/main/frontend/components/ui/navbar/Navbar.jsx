import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../../selectors/authSelector';
import { Link, useHistory } from 'react-router-dom';
import { selectIsMobileNavbar } from '../../../selectors/clientInfoSelector';
import List from '../../atoms/List';
import cssClassNamesHelper from '../../utils/cssClassNamesHelper';
import Button from '../../atoms/button/Button';
import LoginLogoutButton from '../../molecules/login-logout-button/LoginLogoutButton';
import { BUTTON_VARIANT } from '../../atoms/button/buttonVariants';
import ROUTES from '../../routers/Routes';
import BUTTON_SIZE from '../../atoms/button/buttonSize';
import Cookies from 'js-cookie';
import Icon from '../../atoms/icons/Icon';
import ICONTYPES from '../../atoms/icons/iconTypes';
import styles from './Navbar.module.css';
import { navbarListItems } from './navbarUtils';

const Navbar = () => {
    /**
     * Variables, Selectors, State
     */
    const history = useHistory();
    const [navbarCollapsed, setNavbarCollapsed] = useState(false);
    const isLoggedIn = useSelector(selectLoggedIn);
    const isMobileNavbarActive = useSelector(selectIsMobileNavbar);

    // TODO: Toggle Navbar myself using state
    const additionalNavTogglerProps = {
        'aria-controls': 'navbarColor01',
        'aria-expanded': 'false',
        'aria-label': 'Toggle navigation'
    };

    /**
     * Function Callbacks
     */
    const onLogout = async () => {
        const req = await fetch('/logout', { method: 'post', headers: { 'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') } });
        await req.ok;
        window.location.href = process.env.DOMAIN_URL;
    };

    const onNewUploadClick = () => {
        history.push(ROUTES.UPLOAD_FILE);
    };

    /**
     * Render
     */
    const buttonTogglerClassNames = cssClassNamesHelper([
        !navbarCollapsed ? 'navbar-toggler' : 'navbar-toggler collapse show'
    ]);
    const collapsedDivClassNames = cssClassNamesHelper([
        !navbarCollapsed ? 'collapse navbar-collapse' : 'navbar-collapse collapse show'
    ]);

    return (
        <header className="header">
            <nav
                className="navbar navbar-expand-lg navbar-dark bg-primary"
                style={
                    isMobileNavbarActive
                        ? {
                              height: !navbarCollapsed ? '78px' : '306px',
                              transition: 'all 0.2s ease-in',
                              ...(!navbarCollapsed ? { flexFlow: 'column' } : {})
                          }
                        : {}
                }
            >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        LG
                    </Link>
                    {isLoggedIn && (
                        <Button
                            onClick={onNewUploadClick}
                            buttonSize={BUTTON_SIZE.SMALL}
                            variant={BUTTON_VARIANT.BTN_SECONDARY}
                            additionalStyles={{ display: 'flex', width: '160px', justifyContent: 'space-evenly' }}
                        >
                            <Icon iconType={ICONTYPES.UPLOAD} additionalStyles={{ top: '3px' }} />
                            Neuer Upload
                        </Button>
                    )}
                    <Button
                        id="navbarColor01"
                        className={buttonTogglerClassNames}
                        additionalProps={additionalNavTogglerProps}
                        onClick={() => setNavbarCollapsed(!navbarCollapsed)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </Button>
                    <div
                        style={
                            isMobileNavbarActive
                                ? { height: !navbarCollapsed ? '78px' : '228px', transition: 'all 0.2s ease-in' }
                                : {}
                        }
                        className={collapsedDivClassNames}
                        id="navbarColor01"
                    >
                        <List
                            ulClassName={`navbar-nav me-auto ${isMobileNavbarActive && styles.fadeIn}`}
                            listItemsContent={navbarListItems(isLoggedIn, isMobileNavbarActive)}
                            liClassName="nav-item"
                        />
                        <LoginLogoutButton
                            containerClassNames={isMobileNavbarActive && styles.fadeIn}
                            isLoggedIn={isLoggedIn}
                            isMobileNavbarActive={isMobileNavbarActive}
                            onLogout={onLogout}
                        />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
