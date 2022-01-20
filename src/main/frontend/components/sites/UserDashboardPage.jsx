import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../../middleware/api';
import { selectUser, selectUserId } from '../../selectors/authSelector';
import UserStats from '../molecules/dashboard-user-stats/UserStats';
import DashboardTable from '../organisms/dashboard-table-components/DashboardTable';
import { parseSQLDateToJavaScript } from '../utils/dateParserUtil';

const UserDashboardPage = () => {
    /**
     * Selectors
     */
    const username = useSelector(selectUser);
    const userId = useSelector(selectUserId);

    /**
     * Hooks, Data Fetching
     */
    const { data, error, isLoading } = useGetUserByIdQuery(userId);
    const uploadCount = data?.uploadCount;
    const joinedDate = parseSQLDateToJavaScript(data?.joined);

    /**
     * Render
     */
    return (
        <main style={{ backgroundColor: 'rgb(242, 244, 254)' }} className="pt-3 mb-5 pb-5">
            <div className="container-fluid">
                <h1 className="mb-4 text-center">Mein Account</h1>

                {!isLoading ? (
                    <UserStats username={username} uploadCount={uploadCount} joinedDate={joinedDate} />
                ) : (
                    <>Loading...</>
                )}
            </div>

            <div className="container-lg container-fluid">
                <DashboardTable />
            </div>
        </main>
    );
};

export default memo(UserDashboardPage);
