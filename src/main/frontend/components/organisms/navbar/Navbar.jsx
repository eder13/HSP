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

const Navbar = () => {
    /**
     * Selectors
     */
    const isMediaXS = useSelector(selectIsMediaXS);
    const isMediaSM = useSelector(selectIsMediaSM);
    const isMediaMD = useSelector(selectIsMediaMD);
    const isMediaLG = useSelector(selectIsMediaLG);
    const isMediaXL = useSelector(selectIsMediaXL);
    const isMediaXXL = useSelector(selectIsMediaXXL);

    const isMobileView = isMediaXS || isMediaSM;
    const isDesktopView = isMediaMD || isMediaLG || isMediaXL || isMediaXXL;

    if (isMobileView) {
        return <NavbarMobile />;
    } else if (isDesktopView) {
        return <NavbarDesktop />;
    } else {
        return null;
    }
};

export default Navbar;
