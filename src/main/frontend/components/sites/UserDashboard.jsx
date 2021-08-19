import React, { useState, useRef } from 'react';
import useInitialDashboardData from '../../hooks/useInitialDashboarData';
import Table from '../atoms/Table';
import Pagination from '../atoms/Pagination';
import Button from '../atoms/Button';
import BUTTON_SIZE from '../../constants/buttonSize';
import { BUTTON_VARIANT } from '../../constants/buttonVariants';
import { Link } from 'react-router-dom';
import { parseSQLDateToJavaScript } from '../util/dateParserUtil';
import { useSelector } from 'react-redux';
import { selectUser, selectUserId } from '../../selectors/authSelector';
import Image from '../atoms/Image';
import cssClassNamesHelper from '../util/cssClassHelper';
import { selectIsMobile } from '../../selectors/clientInfoSelector';
import Loader from '../atoms/loader/Loader';
import Icon from '../atoms/icons/Icon';
import ICONTYPES from '../atoms/icons/iconTypes';
import ICONSIZE from '../atoms/icons/iconSize';
import styles from './UserDashboard.module.css';
import usePrevious from '../../hooks/usePrevious';
import TableSkeleton from '../atoms/TableSkeleton';

const UserDashboard = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const username = useSelector(selectUser);
    const userId = useSelector(selectUserId);
    const isMobile = useSelector(selectIsMobile);

    const $myUploadsHeadingRef = useRef();

    const uploadHeadingClasses = cssClassNamesHelper(['mt-2 mb-4', isMobile && 'mt-3']);

    /// TODO: isNextPaginationLoading
    let { isUserDataLoading, isDownloadDataLoading, isUploadDataLoading, error, data } = useInitialDashboardData(
        userId,
        currentPage,
        undefined
    );
    // initial big load: execution of all queries at once to get page data
    const initialLoad = isUserDataLoading && isDownloadDataLoading && isUploadDataLoading;

    if (initialLoad) {
        return (
            <div className="vw-100 vh-100 d-flex flex-row align-items-center justify-content-center">
                <Loader />
            </div>
        );
    }

    /**
     * Selectors
     * */
    const joinedDate = parseSQLDateToJavaScript(data?.userData?.joined);

    const getTableData = () => {
        return data?.uploadData?._embedded?.uploads.map((upload, i) => [
            upload?.name,
            parseSQLDateToJavaScript(upload?.createdOn),
            <div key={upload?.id}>
                <a key={upload?.id} className={styles.downloadLinkButton} href={`/download/${upload?.fileName}`}>
                    <Icon iconType={ICONTYPES.DOWNLOAD} size={ICONSIZE.SIZE_1_5X} additionalStyles={{ top: '4px' }} />
                </a>
                <Button
                    //onClick={() => setEditMode(editState => !editState)}
                    onMouseOver={e => {
                        if (e.target.type === 'button') {
                            e.currentTarget.style.borderColor = '#b67108';
                            e.currentTarget.style.backgroundColor = 'white';
                            e.target.children[0].style.color = '#b67108';
                        } else {
                            e.currentTarget.style.borderColor = '#b67108';
                            e.currentTarget.style.backgroundColor = 'white';
                            e.target.style.color = '#b67108';
                        }
                    }}
                    onMouseOut={e => {
                        if (e.currentTarget.type === 'button') {
                            e.currentTarget.style.borderColor = '#ff9800';
                            e.currentTarget.style.backgroundColor = 'white';
                            if (e.target.children[0] !== undefined) {
                                e.target.children[0].style.color = '#ff9800';
                            }
                        }
                    }}
                    variant={BUTTON_VARIANT.BTN_WARNING}
                    additionalStyles={{
                        width: '48px',
                        height: '40px',
                        margin: '5px',
                        color: '#ff9800',
                        border: '2px solid',
                        boxShadow: 'none',
                        backgroundColor: 'white'
                    }}
                >
                    <Icon
                        iconType={ICONTYPES.EDIT_PEN}
                        additionalStyles={{ marginLeft: '1px', transition: 'color 0.4s' }}
                    />
                </Button>
            </div>
        ]);
    };

    // TODO: Table Entries Name and Autor --> Handle long Names so that it does not overflow whole page!
    const getDownloadsTableData = () => {
        return data?.downloadData?._embedded?.uploads.map(download => [
            download?.name,
            parseSQLDateToJavaScript(download?.createdOn),
            'Maximilian LangerNameWiederHier',
            <a key={download?.id} className={styles.downloadLinkButton} href={`/download/${download?.fileName}`}>
                <Icon iconType={ICONTYPES.DOWNLOAD} size={ICONSIZE.SIZE_1_5X} additionalStyles={{ top: '4px' }} />
            </a>
        ]);
    };

    return (
        <main>
            <h1 className="text-center mx-2 mt-4">Meine Uploads & Downloads</h1>
            <div className="container mt-5">
                <div className="row my-2">
                    <div className="col-lg-4 order-lg-1 text-center">
                        <Image
                            className="mx-auto img-fluid img-circle d-block mb-3"
                            image={'//placehold.it/150'}
                            alt="profile picture"
                        />
                        <div>
                            <div className="d-flex flex-row align-items-center justify-content-center my-2">
                                <Icon
                                    iconType={ICONTYPES.USER_ICON}
                                    additionalStyles={{ marginTop: '-3px' }}
                                    additionalClassNames="mx-2"
                                />
                                TODO: My Full Name
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <Icon iconType={ICONTYPES.MAIL} additionalClassNames="mx-2" />
                                {username}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 order-lg-2">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link
                                    onClick={() => null}
                                    to="/"
                                    className="nav-link active"
                                    style={{ cursor: 'default' }}
                                >
                                    Profil
                                </Link>
                            </li>
                        </ul>
                        <div className="tab-content py-4">
                            <div className="tab-pane active" id="profile">
                                <h3 className="mb-3">Statistik</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Mitglied seit</h6>
                                        <p>{joinedDate}</p>
                                        <h6>Uploads</h6>
                                        <p>{data?.userData?.uploadCount}</p>
                                    </div>
                                    <div className="col-md-6">
                                        {/* TODO: Badges Achievement */}
                                        <h6>Auszeichnungen</h6>
                                        <span className="badge bg-dark">Junior</span>
                                    </div>
                                    {isMobile && (
                                        <hr
                                            style={{
                                                maxWidth: '90vw',
                                                marginLeft: '8px'
                                            }}
                                            className="mt-4"
                                        />
                                    )}
                                    <div className="col-md-12">
                                        <h2 ref={$myUploadsHeadingRef} className={uploadHeadingClasses}>
                                            Meine Uploads {'⬆️'}
                                        </h2>
                                        {isUploadDataLoading ? (
                                            <div
                                                style={{
                                                    width: '100%',
                                                    height: '38px',
                                                    backgroundColor: '#e8e8e8'
                                                }}
                                            ></div>
                                        ) : (
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    placeholder="Durchsuche Uploads ..."
                                                />
                                                <Button
                                                    buttonSize={BUTTON_SIZE.NORMAL}
                                                    variant={BUTTON_VARIANT.BTN_SECONDARY}
                                                    additionalStyles={{}}
                                                >
                                                    <Icon iconType={ICONTYPES.SEARCH} size={ICONSIZE.SIZE_1_5X} />
                                                </Button>
                                            </div>
                                        )}

                                        {isUploadDataLoading ? (
                                            <TableSkeleton />
                                        ) : (
                                            data?.uploadData && (
                                                <>
                                                    <Table
                                                        tableHeaderData={
                                                            <tr
                                                                style={{
                                                                    color: 'white',
                                                                    backgroundColor: '#2196f3',
                                                                    borderBottom: '3px solid #333'
                                                                }}
                                                            >
                                                                <td
                                                                    style={{
                                                                        verticalAlign: 'middle'
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            borderBottom: '1px dotted white'
                                                                        }}
                                                                    >
                                                                        Name
                                                                    </span>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        verticalAlign: 'middle'
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            borderBottom: '1px dotted white'
                                                                        }}
                                                                    >
                                                                        Upload Datum
                                                                    </span>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        verticalAlign: 'middle'
                                                                    }}
                                                                ></td>
                                                            </tr>
                                                        }
                                                        tableRowsAmount={data?.uploadData?._embedded?.uploads?.length}
                                                        tableCellsAmmount={3}
                                                        tableCellDataOfCorrespondingRowArray={getTableData()}
                                                        additionalStyles={{
                                                            borderTopLeftRadius: '3px',
                                                            borderTopRightRadius: '3px',
                                                            overflow: 'hidden'
                                                        }}
                                                    />
                                                    {/* 0 = 1 etc. --> Array Counting */}
                                                    <Pagination
                                                        gettingDataCallbackArray={[
                                                            ...new Array(data?.uploadData?.page?.totalPages)
                                                        ].map((_, index) => () => setCurrentPage(index))}
                                                        currentSelection={data?.uploadData?.page?.number}
                                                        ref={$myUploadsHeadingRef}
                                                        prev={data?.uploadData?._links?.prev?.href}
                                                        next={data?.uploadData?._links?.next?.href}
                                                        first={data?.uploadData?._links?.first?.href}
                                                        last={data?.uploadData?._links?.last?.href}
                                                        setPage={setCurrentPage}
                                                    />
                                                </>
                                            )
                                        )}
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="mt-2 mb-4">Meine Downloads {'⬇️'}</h2>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Durchsuche Downloads ..."
                                            />
                                            <Button
                                                buttonSize={BUTTON_SIZE.NORMAL}
                                                variant={BUTTON_VARIANT.BTN_SECONDARY}
                                            >
                                                <Icon iconType={ICONTYPES.SEARCH} size={ICONSIZE.SIZE_1_5X} />
                                            </Button>
                                        </div>
                                        {isUploadDataLoading ? (
                                            <div>Upload Data Loading ...</div>
                                        ) : (
                                            data?.downloadData && (
                                                <>
                                                    <Table
                                                        tableHeaderData={
                                                            <tr
                                                                style={{
                                                                    color: 'white',
                                                                    backgroundColor: '#2196f3',
                                                                    borderBottom: '3px solid #333'
                                                                }}
                                                            >
                                                                <td
                                                                    style={{
                                                                        verticalAlign: 'middle'
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            borderBottom: '1px dotted white'
                                                                        }}
                                                                    >
                                                                        Name
                                                                    </span>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        verticalAlign: 'middle'
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            borderBottom: '1px dotted white'
                                                                        }}
                                                                    >
                                                                        Upload Datum
                                                                    </span>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        verticalAlign: 'middle'
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            borderBottom: '1px dotted white'
                                                                        }}
                                                                    >
                                                                        AutorIn
                                                                    </span>
                                                                </td>
                                                                <td>{}</td>
                                                            </tr>
                                                        }
                                                        tableRowsAmount={data?.downloadData?._embedded?.uploads?.length}
                                                        tableCellsAmmount={4}
                                                        tableCellDataOfCorrespondingRowArray={getDownloadsTableData()}
                                                        additionalStyles={{
                                                            borderTopLeftRadius: '3px',
                                                            borderTopRightRadius: '3px',
                                                            overflow: 'hidden'
                                                        }}
                                                    />
                                                </>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UserDashboard;
