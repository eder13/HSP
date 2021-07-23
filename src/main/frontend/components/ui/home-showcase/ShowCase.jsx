import React from 'react'
import styles from './ShowCase.module.css'
import PropTypes from 'prop-types'
import image from '../../../assets/file-transfer.png';
import GoogleButton from '../../molecules/google-sign-button/GoogleButton';
import cssClassNamesHelper from '../../util/cssClassHelper';
import Image from '../../atoms/Image';

const ShowCase = ({ isMobileNavDisplayed }) => {
    
    const imageStyles = cssClassNamesHelper([
        'img-fluid',
        styles.homeLandingImage,
        styles.homeLandingImageDesktop
    ]);

    return (
        <div className="jumbotron">
            <div className="d-flex justify-content-center">
                <Image className={imageStyles} image={image} alt="File Upload" />
            </div>
            <h1 className="display-5">Teilen von Unterrichtsmaterialien leicht gemacht.</h1>
            <p className="lead">Melde dich an. </p>
            {isMobileNavDisplayed && (
                    <div className="d-flex justify-content-center">
                        <GoogleButton />
                    </div>
                )
            }
            <hr />
        </div>
    )
}

ShowCase.propTypes = {
    isMobileNavDisplayed: PropTypes.bool
}

export default ShowCase
