import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectUser, selectUserId } from '../../selectors/authSelector';
import { selectIsMobile, selectIsMobileNavbar } from '../../selectors/clientInfoSelector';
import ShowCase from '../ui/home-showcase/ShowCase';
import { parseSQLDateToJavaScript } from '../util/dateParserUtil';
import Table from '../atoms/Table';
import Button from '../atoms/Button';
import { BUTTON_VARIANT } from '../../constants/buttonVariants';
import BUTTON_SIZE from '../../constants/buttonSize';
import styles from './Home.module.css';
import editIcon from '../../assets/edit_icon.png';
import Image from '../atoms/Image';
import cssClassNamesHelper from '../util/cssClassHelper';
import Pagination from '../atoms/Pagination';
import useInitialDashboardData from '../../hooks/useInitialDashboarData';

const Home = () => {
    const isLoggedIn = useSelector(selectLoggedIn);
    const username = useSelector(selectUser);
    const isMobileNavDisplayed = useSelector(selectIsMobileNavbar);
    const isMobile = useSelector(selectIsMobile);
    const userId = useSelector(selectUserId);
    const $inputField = useRef();
    const $myUploadsHeadingRef = useRef();

    const uploadHeadingClasses = cssClassNamesHelper(['mt-2 mb-4', isMobile && 'mt-3']);

    const [editMode, setEditMode] = useState(false);
    const [actionButtons, setActionButtons] = useState(actionButtonDefault);

    const actionButtonDefault = (
        <>
            <Button
                onClick={() => setEditMode(editState => !editState)}
                variant={BUTTON_VARIANT.BTN_PRIMARY}
                additionalStyles={{ margin: '5px' }}
            >
                <Image
                    additionalStyles={{ filter: 'brightness(0) invert(1)' }}
                    image={editIcon}
                    width={22}
                    height={21}
                    alt="edit icon"
                />
            </Button>
            <Button variant={BUTTON_VARIANT.BTN_DANGER} additionalStyles={{ width: '54px', margin: '5px' }}>
                <i
                    style={{
                        margin: 0,
                        marginTop: '5px',
                        width: '12px',
                        height: '12px'
                    }}
                    className={`icono-trash ${styles.iconoOverwrite}`}
                />
            </Button>
        </>
    );

    const actionButtonEditActive = (
        <>
            <Button variant={BUTTON_VARIANT.BTN_SUCCESS} additionalStyles={{ margin: '5px' }}>
                <i style={{ width: '20px', height: '18px' }} className={`icono-check ${styles.iconoCheckOverwrite}`} />
            </Button>
            <Button
                onClick={() => setEditMode(false)}
                variant={BUTTON_VARIANT.BTN_DANGER}
                additionalStyles={{ margin: '5px' }}
            >
                <i style={{ width: '20px', height: '18px' }} className="icono-cross" />
            </Button>
        </>
    );

    useEffect(() => {
        setActionButtons(editMode ? actionButtonEditActive : actionButtonDefault);
        if (editMode) {
            $inputField.current.focus();
        }
    }, [editMode]);

    const renderDashboard = () => {
        const [currentPage, setCurrentPage] = useState(0);

        /// TODO: isNextPaginationLoading
        const { loading, error, data } = useInitialDashboardData(userId, currentPage, undefined);

        if (loading) {
            return <div>Loading...</div>;
        }

        /**
         * Selectors
         * */
        const joinedDate = parseSQLDateToJavaScript(data?.userData?.joined);

        const getTableData = () => {
            return data?.uploadData?._embedded?.uploads.map(upload => [
                editMode ? (
                    <input
                        ref={$inputField}
                        value={upload?.name}
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Neuer Name"
                        id="inputSmall"
                    />
                ) : (
                    upload?.name
                ),
                parseSQLDateToJavaScript(upload?.createdOn),
                actionButtons,
                <a key={upload?.id} href={`/download/${upload?.fileName}`}>
                    download
                </a>
            ]);
        };

        const getDownloadsTableData = () => {
            return data?.downloadData?._embedded?.uploads.map(download => [
                download?.name,
                parseSQLDateToJavaScript(download?.createdOn),
                'Autor',
                <a key={download?.id} href={`/download/${download?.fileName}`}>
                    download
                </a>
            ]);
        };

        // TODO: User Card for Information Corner
        const userCard = (
            <div>
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                            <img
                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                alt="Admin"
                                className="rounded-circle"
                                width="100"
                            />
                            <div className="mt-3">
                                <h5>{username}</h5>
                                <span>
                                    <strong>Mitglied seit: </strong>
                                    {joinedDate}
                                </span>
                                <p>
                                    <strong>Uploads: </strong>
                                    {data?.userData?.uploadCount}
                                </p>
                                <a href="#">Alle Unterrichtsmaterialien</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

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
                            <span>
                                <i
                                    style={{
                                        width: '24px',
                                        margin: '12px 1px 5px'
                                    }}
                                    className={`icono-user ${styles.iconoUserOverwrite}`}
                                />{' '}
                                {'TODO: My Full Name'} <br />
                                <i style={{ width: '24px' }} className="icono-mail" />
                                {' ' + username}
                            </span>
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
                                            <h5 ref={$myUploadsHeadingRef} className={uploadHeadingClasses}>
                                                <span className="fa fa-clock-o ion-clock float-right"></span>
                                                Meine Uploads {'⬆️'}
                                            </h5>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    placeholder="Durchsuche Uploads ..."
                                                />
                                                <Button
                                                    buttonSize={BUTTON_SIZE.SMALL}
                                                    variant={BUTTON_VARIANT.BTN_SECONDARY}
                                                >
                                                    <i className="icono-search" />
                                                </Button>
                                            </div>
                                            {data?.uploadData && (
                                                <>
                                                    <Table
                                                        tableHeaderData={
                                                            <tr className="table-dark">
                                                                <td
                                                                    style={{
                                                                        verticalAlign: 'middle'
                                                                    }}
                                                                >
                                                                    <strong>Name</strong>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        verticalAlign: 'middle'
                                                                    }}
                                                                >
                                                                    <strong>Upload Datum</strong>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        verticalAlign: 'middle'
                                                                    }}
                                                                >
                                                                    <strong>Aktionen</strong>
                                                                </td>
                                                                <td>{}</td>
                                                            </tr>
                                                        }
                                                        tableRowsAmount={data?.uploadData?._embedded?.uploads?.length}
                                                        tableCellsAmmount={4}
                                                        tableCellDataOfCorrespondingRowArray={getTableData()}
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
                                            )}
                                        </div>
                                        <div className="col-md-12">
                                            <h5 className="mt-2 mb-4 text-dark">Meine Downloads {'⬇️'}</h5>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    placeholder="Durchsuche Downloads ..."
                                                />
                                                <Button
                                                    buttonSize={BUTTON_SIZE.SMALL}
                                                    variant={BUTTON_VARIANT.BTN_SECONDARY}
                                                >
                                                    <i className="icono-search" />
                                                </Button>
                                            </div>
                                            {data?.downloadData && (
                                                <>
                                                    <Table
                                                        tableHeaderData={
                                                            <tr className="table-dark">
                                                                <td
                                                                    style={{
                                                                        verticalAlign: 'middle'
                                                                    }}
                                                                >
                                                                    <strong>Name</strong>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        verticalAlign: 'middle'
                                                                    }}
                                                                >
                                                                    <strong>Upload Datum</strong>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        verticalAlign: 'middle'
                                                                    }}
                                                                >
                                                                    <strong>AutorIn</strong>
                                                                </td>
                                                                <td>{}</td>
                                                            </tr>
                                                        }
                                                        tableRowsAmount={data?.downloadData?._embedded?.uploads?.length}
                                                        tableCellsAmmount={4}
                                                        tableCellDataOfCorrespondingRowArray={getDownloadsTableData()}
                                                    />
                                                </>
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

    const renderHomepage = () => {
        return (
            <main className="container">
                <ShowCase isMobileNavDisplayed={isMobileNavDisplayed} />
                {/* TODO: Über die App */}
                {/* TODO: FAQ with accordions */}
                {/* Implement this highlight Nav link effect via that jQuery script */}
            </main>
        );
    };

    return isLoggedIn ? renderDashboard() : renderHomepage();
};

export default Home;
