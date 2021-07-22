import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectUser } from '../../selectors/authSelector';
import image from "../../assets/file-transfer.png";
import styles from "./Home.module.css";
import GoogleButton from '../molecules/google-sign-button/GoogleButton';
import { selectIsMobileNavbar } from '../../selectors/clientInfoSelector';

const Home = () => {
    const isLoggedIn = useSelector(selectLoggedIn);
    const username = useSelector(selectUser);
    const isMobileNavDisplayed = useSelector(selectIsMobileNavbar);

    const renderDashboard = () => {
        return (
            <>
                <h1>Dashboard</h1>
                <h3>Hallo {username.split('@')[0]} 👋 </h3>
                <Link to="/dash">Upload new Files here</Link>
            </>
        );
    }

    const renderHomepage = () => {
        return (
            <div className="container">
                <div className="jumbotron">
                    <div className="d-flex justify-content-center">
                        <img className={`img-fluid ${styles.homeLandingImage} ${styles.homeLandingImageDesktop}`} src={image} alt="File Upload"/>
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
            </div>
        );
    }

    return (
        isLoggedIn ? renderDashboard() : renderHomepage()
    );
};

export default Home;
