import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsMobileNavbar } from '../../selectors/clientInfoSelector';
import ShowCase from '../ui/home-showcase/ShowCase';

const Home = () => {
    const isMobileNavDisplayed = useSelector(selectIsMobileNavbar);

    const renderHomepage = () => {
        return (
            <main className="container">
                <ShowCase isMobileNavDisplayed={isMobileNavDisplayed} />
                {/* TODO: Über die App */}
                {/* TODO: FAQ with accordions */}
                {/* Implement this highlight Nav link effect via that jQuery script */}
            </main>
        );
    };

    return renderHomepage();
};

export default Home;
