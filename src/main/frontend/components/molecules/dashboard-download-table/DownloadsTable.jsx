import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserDownloadsByIdQuery } from '../../../middleware/api';
import { selectUserId } from '../../../selectors/authSelector';
import InputSearch from '../../atoms/input-search/InputSearch';
import Table from '../../atoms/table-component/Table';
import { getDownloadTableHeaderData, getDownloadTableData } from './downloadsTableUtils';
import styles from './DownloadsTable.module.css';
import Pagination from '../../atoms/pagination-component/Pagination';

const AMOUNT_OF_DOWNLOAD_COLUMNS = 4;

const DownloadsTable = () => {
    /**
     * Selectors
     */
    const userId = useSelector(selectUserId);

    /**
     * State
     */
    const [currentPage, setCurrentPage] = useState(0);

    /**
     * Hooks, Data Fetching
     */
    const { data, error, isLoading, status, isFetching, isSuccess, isError } = useGetUserDownloadsByIdQuery(userId);

    return isLoading || isFetching ? (
        <>Loading...</>
    ) : (
        <>
            <h2 className={styles.title}>Meine Downloads {'⬇️'}</h2>
            <InputSearch inputPlaceholder="Durchsuche Downloads ..." />
            <>
                <Table
                    tableHeaderData={getDownloadTableHeaderData()}
                    tableRowsAmount={data?._embedded?.uploads?.length}
                    tableCellsAmmount={AMOUNT_OF_DOWNLOAD_COLUMNS}
                    tableCellDataOfCorrespondingRowArray={getDownloadTableData(data)}
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
            </>
        </>
    );
};

export default DownloadsTable;
