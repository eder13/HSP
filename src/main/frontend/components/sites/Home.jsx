import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectUser } from '../../selectors/authSelector';

const Home = () => {
    const isLoggedIn = useSelector(selectLoggedIn);
    const username = useSelector(selectUser);

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
            <h1>Welcome!</h1>
        );
    }

    return (
        isLoggedIn ? renderDashboard() : renderHomepage()
    );
};

export default Home;
