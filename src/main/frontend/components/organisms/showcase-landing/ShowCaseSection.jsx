import React from 'react';
import ShowCase from '../../molecules/home-showcase/ShowCase';
import styles from './ShowCaseSestion.module.css';

const ShowCaseSection = () => (
    <section className={styles.container}>
        <ShowCase />

        {/* BOTTOM Page Divider with triangle */}
        {/* TODO: Create Bottom Page Divider with triangle */}
        <div style={{ overflow: 'hidden', backgroundColor: 'rgba(184, 198, 199, 0)' }}>
            <svg
                preserveAspectRatio="none"
                viewBox="0 0 1200 120"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fill: 'rgb(242, 244, 254)', width: '100%', height: 107, transform: 'rotate(180deg)' }}
            >
                <path d="M1200 120L0 16.48V0h1200v120z" />
            </svg>
        </div>
    </section>
);

export default ShowCaseSection;
