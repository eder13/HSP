import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../stores/AuthStore';

const Home = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <>
            <h1>This App is great!</h1>
            {isLoggedIn && <Link to="/dash">Proceed to site</Link>}
        </>
    );
};

export default Home;
