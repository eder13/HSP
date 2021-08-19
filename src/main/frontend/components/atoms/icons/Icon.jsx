import React from 'react';
import PropTypes from 'prop-types';
import ICONTYPES from './iconTypes';
import cssClassNamesHelper from '../../util/cssClassHelper';
import 'css.gg/icons/css/log-in.css';
import 'css.gg/icons/css/log-out.css';
import 'css.gg/icons/css/software-download.css';
import 'css.gg/icons/css/software-upload.css';
import 'css.gg/icons/css/pen.css';
import 'css.gg/icons/css/user.css';
import 'css.gg/icons/css/mail.css';
import 'css.gg/icons/css/search.css';

const Icon = ({ iconType, additionalClassNames = '', additionalStyles = {}, size = {} }) => {
    let iconClass;

    switch (iconType) {
        case ICONTYPES.LOGIN:
            iconClass = ICONTYPES.LOGIN;
            break;

        case ICONTYPES.LOGOUT:
            iconClass = ICONTYPES.LOGOUT;
            break;

        case ICONTYPES.DOWNLOAD:
            iconClass = ICONTYPES.DOWNLOAD;
            break;

        case ICONTYPES.UPLOAD:
            iconClass = ICONTYPES.UPLOAD;
            break;

        case ICONTYPES.EDIT_PEN:
            iconClass = ICONTYPES.EDIT_PEN;
            break;

        case ICONTYPES.USER_ICON:
            iconClass = ICONTYPES.USER_ICON;
            break;

        case ICONTYPES.MAIL:
            iconClass = ICONTYPES.MAIL;
            break;

        case ICONTYPES.SEARCH:
            iconClass = ICONTYPES.SEARCH;
            break;

        default:
            return null;
    }

    const classNames = cssClassNamesHelper([iconClass, additionalClassNames]);
    return <i style={{ ...additionalStyles, ...size }} className={classNames} />;
};

Icon.propTypes = {
    iconType: PropTypes.string.isRequired,
    additionalClassNames: PropTypes.string,
    additionalStyles: PropTypes.object,
    size: PropTypes.object
};

export default Icon;
