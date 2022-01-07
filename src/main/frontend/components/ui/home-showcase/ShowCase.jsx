import React from 'react';
import styles from './ShowCase.module.css';
import PropTypes from 'prop-types';
import image from '../../../assets/file-transfer.png';
import cssClassNamesHelper from '../../utils/cssClassNamesHelper';
import Image from '../../atoms/image/Image';

const ShowCase = ({ isMobileNavDisplayed }) => {
    const imageStyles = cssClassNamesHelper(['img-fluid', styles.homeLandingImage, styles.homeLandingImageDesktop]);

    return (
        <div className="jumbotron">
            <div className="d-flex justify-content-center">
                <Image className={imageStyles} image={image} alt="File Upload" />
            </div>
            <h1 className="display-5">Sharing and uploading data has never been so easy-</h1>
            <p className="lead">Login to join the community and get access to thousands of files!</p>
            <hr />
        </div>
    );
};

ShowCase.propTypes = {
    isMobileNavDisplayed: PropTypes.bool
};

export default ShowCase;
