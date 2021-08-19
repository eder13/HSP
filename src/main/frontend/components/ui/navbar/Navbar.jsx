import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../../selectors/authSelector';
import { Link, useHistory } from 'react-router-dom';
import { selectIsMobileNavbar } from '../../../selectors/clientInfoSelector';
import List from '../../atoms/List';
import cssClassNamesHelper from '../../util/cssClassHelper';
import Button from '../../atoms/Button';
import LoginLogoutButton from '../../molecules/login-logout-button/LoginLogoutButton';
import { BUTTON_VARIANT } from '../../../constants/buttonVariants';
import ROUTES from '../../routers/Routes';
import BUTTON_SIZE from '../../../constants/buttonSize';
import Cookies from 'js-cookie';
import Icon from '../../atoms/icons/Icon';
import ICONTYPES from '../../atoms/icons/iconTypes';

const getLiContent = (isLoggedIn, isMobileNavbarActive) => {
    const linkClasses = cssClassNamesHelper(['nav-link', 'mx-3', isMobileNavbarActive && 'text-center']);

    const li1 = (
        <Link className={`${linkClasses} active`} to="/">
            {isLoggedIn ? 'Meine Uploads & Downloads' : 'Home'}
            <span className="visually-hidden">(current)</span>
        </Link>
    );
    const li2 = isLoggedIn ? (
        <Link className={linkClasses} to="">
            Unterrichtsmaterialien
        </Link>
    ) : (
        <a className={`${linkClasses}`} href="#">
            Über x
        </a>
    );
    const li3 = !isLoggedIn && (
        <a className={`${linkClasses}`} href="#">
            FAQ
        </a>
    );

    if (li3) {
        return [li1, li2, li3];
    } else {
        return [li1, li2];
    }
};

const Navbar = () => {
    const history = useHistory();

    const isLoggedIn = useSelector(selectLoggedIn);
    const isMobileNavbarActive = useSelector(selectIsMobileNavbar);
    const additionalNavTogglerProps = {
        'data-bs-toggle': 'collapse',
        'data-bs-target': '#navbarColor01',
        'aria-controls': 'navbarColor01',
        'aria-expanded': 'false',
        'aria-label': 'Toggle navigation'
    };

    /* const iconoUpArrowStyle = {
        width: '12px', height: '4px', margin: 0, marginRight: '10px'
    } */

    const onLogout = async () => {
        const req = await fetch('/logout', { method: 'post', headers: { 'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') } });
        await req.ok;
        window.location.href = process.env.DOMAIN_URL;
    };

    const onNewUploadClick = () => {
        history.push(ROUTES.UPLOAD_FILE);
    };

    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        LOGO
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
                    <Button className="navbar-toggler" additionalProps={additionalNavTogglerProps}>
                        <span className="navbar-toggler-icon"></span>
                    </Button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <List
                            ulClassName="navbar-nav me-auto"
                            listItemsContent={getLiContent(isLoggedIn, isMobileNavbarActive)}
                            liClassName="nav-item"
                        />
                        <LoginLogoutButton
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
