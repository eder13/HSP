import { useGetUserByIdQuery, useGetUserUploadsByIdQuery, useGetUserDownloadsByIdQuery } from '../middleware/api';

const useInitialDashboardData = (userId, currentUploadsPage, currentDownloadsPage) => {
    const { data: userData, error: userDataError, isLoading: isUserDataLoading } = useGetUserByIdQuery(userId);

    const {
        data: uploadData,
        error: uploadDataError,
        isFetching: isUploadDataLoading
    } = useGetUserUploadsByIdQuery({ id: userId, page: currentUploadsPage });

    console.log('##### isUploadDataLoadingHook', isUploadDataLoading);

    const {
        data: downloadData,
        error: downloadDataError,
        isFetching: isDownloadDataLoading
    } = useGetUserDownloadsByIdQuery(userId); // TODO: currentDownloadsPage

    // TODO: check if any error occured --> return first error if so

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
