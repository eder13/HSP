import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputSearch from '../../atoms/input-search/InputSearch';
import Table from '../../atoms/table-component/Table';
import Pagination from '../../atoms/pagination-component/Pagination';
import styles from './UploadsTable.module.css';
import { selectUserId } from '../../../selectors/authSelector';
import { useGetUserUploadsByIdQuery } from '../../../middleware/api';
import { getUploadTableData, getUploadTableHeaderData } from './uploadsTableUtils';
import { actionSetModal } from '../../../actions/modalActions';
import { selectModalActive } from '../../../selectors/modalSelector';

const AMOUNT_OF_UPLOAD_COLUMNS = 3;

const UploadsTable = () => {
    /**
     * Dispatch
     */
    const dispatch = useDispatch();
    const actionDispatchSetModal = payload => dispatch(actionSetModal(payload));

    /**
     * Selectors
     */
    const userId = useSelector(selectUserId);
    const isModalActive = useSelector(selectModalActive);

    /**
     * State
     */
    const [currentPage, setCurrentPage] = useState(0);

    /**
     * Hooks, Data Fetching
     */
    const { data, error, isLoading, status, isFetching, isSuccess, isError } = useGetUserUploadsByIdQuery({
        id: userId,
        page: currentPage
    });

    /*
    
    const [
        patchUserUploadWithId,
        {
            status: patchStatus,
            error: patchUploadError,
            data: patchedData,
            isUninitialized,
            isLoading,
            isSuccess,
            isError
        }
    ] = usePatchUserUploadsByIdMutation();

    */

    // TODO: Set Modal with Data and Patch Stuff for Uploads
    /*     useEffect(() => {
        if (isModalActive) {
            console.log('##### Modal Is Active and Should be displayed in App!');
        }
    }, [isModalActive]); */

    /**
     * Render
     */
    return (
        <>
            {isLoading || isFetching ? (
                //TODO: Initial Loading and Fetching Handling
                <>Loading...</>
            ) : (
                <>
                    <h2 className={styles.title}>Meine Uploads {'⬆️'}</h2>
                    <InputSearch inputPlaceholder="Durchsuche Uploads ..." />

                    <>
                        <Table
                            tableHeaderData={getUploadTableHeaderData()}
                            tableRowsAmount={data?._embedded?.uploads?.length}
                            tableCellsAmmount={AMOUNT_OF_UPLOAD_COLUMNS}
                            tableCellDataOfCorrespondingRowArray={getUploadTableData(data, actionDispatchSetModal)}
                            className={styles.table}
                        />
                        <Pagination
                            gettingDataCallbackArray={[...new Array(data?.page?.totalPages)].map(
                                (_, index) => () => setCurrentPage(index)
                            )}
                            currentSelection={data?.page?.number}
                            prev={data?._links?.prev?.href}
                            next={data?._links?.next?.href}
                            first={data?._links?.first?.href}
                            last={data?._links?.last?.href}
                            setPage={setCurrentPage}
                        />
                        {/* TODO: Include Modal here */}
                    </>
                </>
            )}
        </>
    );
};

export default UploadsTable;
