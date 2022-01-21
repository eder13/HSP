import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectIsMediaLG,
    selectIsMediaMD,
    selectIsMediaSM,
    selectIsMediaXL,
    selectIsMediaXS,
    selectIsMediaXXL
} from '../../../selectors/clientInfoSelector';
import NavbarDesktop from '../../molecules/navbar-desktop/NavbarDesktop';
import NavbarMobile from '../../molecules/navbar-mobile/NavbarMobile';
import Cookies from 'js-cookie';
import API_ENDPOINTS, { getDefaultHeader, HTTP_METHOD } from '../../../middleware/APIHelper';

const Navbar = () => {
    /**
     * Selectors, Variables
     */
    const isMediaXS = useSelector(selectIsMediaXS);
    const isMediaSM = useSelector(selectIsMediaSM);
    const isMediaMD = useSelector(selectIsMediaMD);
    const isMediaLG = useSelector(selectIsMediaLG);
    const isMediaXL = useSelector(selectIsMediaXL);
    const isMediaXXL = useSelector(selectIsMediaXXL);
    const isMobileView = isMediaXS || isMediaSM;
    const isDesktopView = isMediaMD || isMediaLG || isMediaXL || isMediaXXL;

    /**
     * Callback Functions
     */
    const onLogout = async () => {
        const req = await fetch(API_ENDPOINTS.LOGOUT, { method: HTTP_METHOD.POST, headers: getDefaultHeader() });
        await req.ok;
        window.location.href = process.env.DOMAIN_URL;
    };

    if (isMobileView) {
        return <NavbarMobile onLogout={onLogout} />;
    } else if (isDesktopView) {
        return <NavbarDesktop onLogout={onLogout} />;
    } else {
        return null;
    }
};

export default Navbar;
