import { useGetUserByIdQuery, useGetUserDownloadsByIdQuery } from '../middleware/api';

const useInitialDashboardData = userId => {
    const { data: userData, error: userDataError, isLoading: isUserDataLoading } = useGetUserByIdQuery(userId);

    return {
        isUserDataLoading,
        error: {
            userDataError
        },
        data: {
            userData
        }
    };
};

export default useInitialDashboardData;
