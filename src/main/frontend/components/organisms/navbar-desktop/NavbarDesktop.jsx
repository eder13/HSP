import React from 'react';
import LoginLogoutButton from '../../molecules/login-logout-button/LoginLogoutButton';
import NavbarDesktopToggler from '../../molecules/navbar-desktop-toggler/NavbarDesktopToggler';
import { selectLoggedIn } from '../../../selectors/authSelector';
import { useSelector } from 'react-redux';
import InputSearch from '../../atoms/input-search/InputSearch';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavbarDesktop = () => {
    const isLoggedIn = useSelector(selectLoggedIn);

    const onLogout = async () => {
        const req = await fetch('/logout', { method: 'post', headers: { 'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') } });
        await req.ok;
        window.location.href = process.env.DOMAIN_URL;
    };

    // TODO: Transform this into navbar component of bootstrap for easy alignment
    // https://getbootstrap.com/docs/5.0/components/navbar/
    return (
        <div className="container-fluid pt-4">
            <div className="row">
                <div className="col-2">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <NavbarDesktopToggler />
                            </div>
                            <div className="col">
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <div class="row">
                                    <div class="col">
                                        <Link to="">Neuer Upload</Link>
                                    </div>
                                    <div class="col">
                                        <InputSearch inputPlaceholder="Suche nach Unterrichtsmaterialien ..." />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <LoginLogoutButton isLoggedIn={isLoggedIn} onLogout={onLogout} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarDesktop;
