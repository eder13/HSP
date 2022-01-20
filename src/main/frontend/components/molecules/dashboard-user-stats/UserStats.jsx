import React from 'react';
import styles from './UserStats.module.css';

const UserStats = props => {
    /**
     * Props
     */
    const { username, joinedDate, uploadCount } = props;

    /**
     * Render
     */
    return (
        <div className="container">
            <div className="row align-items-center justify-content-center gy-md-0 gy-3">
                <div className="col-lg-5 col-md-7">
                    <div className="d-flex flex-column">
                        <h3 className={styles.username}>{username}</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="d-flex flex-column">
                        <span>
                            <strong>Mitglied seit: </strong>
                            {joinedDate}
                        </span>
                        <span>
                            <strong>Uploads: </strong>
                            {uploadCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserStats;
