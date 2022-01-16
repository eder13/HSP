import React from 'react';
import styles from './ShowCase.module.css';
import PropTypes from 'prop-types';
import image from '../../../assets/collaboration-cut.png';
import cssClassNamesHelper from '../../utils/cssClassNamesHelper';
import Image from '../../atoms/image/Image';
import { useSelector } from 'react-redux';
import { selectIsMediaLG, selectIsMediaMD } from '../../../selectors/clientInfoSelector';

const ShowCase = () => {
    /**
     * Variables
     */
    const imageStyles = cssClassNamesHelper(['img-fluid', styles.homeLandingImage, styles.homeLandingImageDesktop]);
    const isMediaLG = useSelector(selectIsMediaLG);
    const isMediaMD = useSelector(selectIsMediaMD);
    const isMediaLGorMD = isMediaLG || isMediaMD;

    /**
     * Sub Render
     */
    const renderedTitle = (
        <h1 className={styles.title}>
            Ein Platz zum Austausch didaktisch hochwertiger Unterrichtsmaterialien für das Schulfach{' '}
            <span className={styles.emphasize}>Geschichte, Sozialkunde und Politische Bildung</span>.
        </h1>
    );

    /**
     * Render
     */
    return (
        <>
            <div className="container py-5">
                <div className="row gy-4 gy-md-0">
                    {isMediaLGorMD && <div className="col-12">{renderedTitle}</div>}
                    <div className="col-lg-6 col-md-5">
                        <div className="h-100 d-flex flex-column justify-content-lg-center">
                            <article>
                                {!isMediaLGorMD && renderedTitle}
                                <p className={`${styles.text} mt-4`}>
                                    Teile deine Geschichte-Unterrichtsmaterialien mit anderen Lehrpersonen oder
                                    Studierenden, erhalte Feedback von anderen oder erhalte Zugriff auf ausgearbeitete
                                    Unterrichtsmaterialien von KollegInnen.
                                </p>
                            </article>
                        </div>
                    </div>
                    <div className="col-md-6 col-xs-6 mt-md-4 mt-lg-0">
                        <Image className={imageStyles} image={image} width="800" height="600" alt="Collaboration" />
                    </div>
                </div>
            </div>
        </>
    );
};

ShowCase.propTypes = {
    isMobileNavDisplayed: PropTypes.bool
};

export default ShowCase;
