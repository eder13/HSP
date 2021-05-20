import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../selectors/authSelector';

const Home = () => {
    const isLoggedIn = useSelector(selectLoggedIn);

    return (
        <>
            <h1>Home of App</h1>
            {isLoggedIn && <Link to="/dash">Proceed to site</Link>}
        </>
    );
};

export default Home;
