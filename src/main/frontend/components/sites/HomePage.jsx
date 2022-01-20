import React from 'react';
import AboutAppSection from '../organisms/about-landing/AboutAppSection';
import FAQSection from '../organisms/faq-landing/FAQSection';
import FeaturesAppSection from '../organisms/features-landing/FeaturesAppSection';
import ShowCaseSection from '../organisms/showcase-landing/ShowCaseSection';

const HomePage = () => {
    const renderHomepage = () => {
        return (
            <>
                <main>
                    <ShowCaseSection />
                    <AboutAppSection />
                    <FeaturesAppSection />
                    <FAQSection />
                </main>
            </>
        );
    };

    return renderHomepage();
};

export default HomePage;
