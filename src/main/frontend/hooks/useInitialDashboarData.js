import { useGetUserByIdQuery, useGetUserUploadsByIdQuery, useGetUserDownloadsByIdQuery } from '../middleware/api';

const useInitialDashboardData = (userId, currentUploadsPage, currentDownloadsPage) => {
    const { data: userData, error: userDataError, isLoading: isUserDataLoading } = useGetUserByIdQuery(userId);

    const {
        data: uploadData,
        error: uploadDataError,
        isFetching: isUploadDataLoading
    } = useGetUserUploadsByIdQuery(
        { id: userId, page: currentUploadsPage },
        {
            selectFromResult: ({ data }) => ({ data })
        }
    );

    const {
        data: downloadData,
        error: downloadDataError,
        isFetching: isDownloadDataLoading
    } = useGetUserDownloadsByIdQuery(userId); // TODO: currentDownloadsPage

    // TODO: check if any error occured --> return first error if so
    //       the following Types are also returned from the hook:
    //          * isLoading (for initial Loading only, not for refetching)
    //          * status
    //          * isSuccess
    //          * isError

    return {
        isUserDataLoading,
        isUploadDataLoading,
        isDownloadDataLoading,
        error: {
            userDataError,
            uploadDataError,
            downloadDataError
        },
        data: {
            userData,
            downloadData,
            uploadData
        }
    };
};

export default useInitialDashboardData;
