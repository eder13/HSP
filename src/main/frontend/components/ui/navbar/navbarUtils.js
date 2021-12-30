import React from 'react';
import cssClassNamesHelper from '../../utils/cssClassNamesHelper';
import { Link } from 'react-router-dom';

export const navbarListItems = (isLoggedIn, isMobileNavbarActive) => {
    const linkClasses = cssClassNamesHelper(['nav-link', 'mx-3', isMobileNavbarActive && 'text-center']);

    const li1 = (
        <Link className={`${linkClasses} active`} to="/">
            {isLoggedIn ? 'Meine Uploads & Downloads' : 'Home'}
            <span className="visually-hidden">(current)</span>
        </Link>
    );
    const li2 = isLoggedIn ? (
        <Link className={linkClasses} to="">
            Alle Uploads
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
