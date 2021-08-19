import React from 'react';
import styles from './ShowCase.module.css';
import PropTypes from 'prop-types';
import image from '../../../assets/file-transfer.png';
import cssClassNamesHelper from '../../util/cssClassHelper';
import Image from '../../atoms/Image';
import LoginLogoutButton from '../../molecules/login-logout-button/LoginLogoutButton';
import { selectLoggedIn } from '../../../selectors/authSelector';
import { useSelector } from 'react-redux';

const ShowCase = ({ isMobileNavDisplayed }) => {
    const imageStyles = cssClassNamesHelper(['img-fluid', styles.homeLandingImage, styles.homeLandingImageDesktop]);
    const isLoggedIn = useSelector(selectLoggedIn);

    return (
        <div className="jumbotron">
            <div className="d-flex justify-content-center">
                <Image className={imageStyles} image={image} alt="File Upload" />
            </div>
            <h1 className="display-5">Teilen von Unterrichtsmaterialien leicht gemacht.</h1>
            <p className="lead">Melde dich an. </p>
            {isMobileNavDisplayed && (
                <LoginLogoutButton
                    isLoggedIn={isLoggedIn}
                    isMobileNavbarActive={isMobileNavDisplayed}
                    onLogout={() => {}}
                />
            )}
            <hr />
        </div>
    );
};

ShowCase.propTypes = {
    isMobileNavDisplayed: PropTypes.bool
};

export default ShowCase;
