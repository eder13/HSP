import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectUser, selectUserId } from '../../selectors/authSelector';
import { selectIsMobileNavbar } from '../../selectors/clientInfoSelector';
import ShowCase from '../ui/home-showcase/ShowCase';
import ROUTES from '../routers/Routes';
import { useGetUserByIdQuery } from '../../middleware/api';

const Home = () => {
    const isLoggedIn = useSelector(selectLoggedIn);
    const username = useSelector(selectUser);
    const isMobileNavDisplayed = useSelector(selectIsMobileNavbar);

    if(isLoggedIn) {
        const userId = useSelector(selectUserId);
        const { data, error, isLoading } = useGetUserByIdQuery(userId); 
    
        if(!isLoading) {
            console.log(data);
        }
    }

    const renderDashboard = () => {
        return (
            <main>
                <h1>Dashboard</h1>
                <h3>Hallo {username.split('@')[0]} 👋 </h3>
                <Link to={ROUTES.UPLOAD_FILE}>Upload new Files here</Link>
            </main>
        );
    }

    const renderHomepage = () => {
        return (
            <main className="container">
                <ShowCase isMobileNavDisplayed={isMobileNavDisplayed} />
                {/* TODO: Über die App */}
                {/* TODO: FAQ with accordions */}
                {/* Implement this highlight effect via that jQuery script */}
            </main>
        );
    }

    return (
        isLoggedIn ? renderDashboard() : renderHomepage()
    );
};

export default Home;
