/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectUser, selectUserId } from '../../selectors/authSelector';
import { selectIsMobileNavbar } from '../../selectors/clientInfoSelector';
import ShowCase from '../ui/home-showcase/ShowCase';
import { useGetUserByIdQuery, useGetUserUploadsByIdQuery, useGetUserDownloadsByIdQuery } from '../../middleware/api';
import { parseSQLDateToJavaScript } from '../util/dateParserUtil';
import Table from '../atoms/Table';
import Button from '../atoms/Button';
import { BUTTON_VARIANT } from '../../constants/buttonVariants';
import BUTTON_SIZE from '../../constants/buttonSize';
import styles from './Home.module.css';
import editIcon from '../../assets/edit_icon.png';
import Image from '../atoms/Image';

const Home = () => {
    const isLoggedIn = useSelector(selectLoggedIn);
    const username = useSelector(selectUser);
    const isMobileNavDisplayed = useSelector(selectIsMobileNavbar);
    const userId = useSelector(selectUserId);
    const $inputField = useRef();

    const [editMode, setEditMode] = useState(false);
    const [actionButtons, setActionButtons] = useState({});

    const actionButtonDefault = (
        <>
            <Button
                onClick={() => setEditMode((editState) => !editState)}
                variant={BUTTON_VARIANT.BTN_LIGHT}
                additionalStyles={{ margin: '5px' }}
            >
                <Image image={editIcon} width={24} height={24} alt="edit icon" />
            </Button>
            <Button variant={BUTTON_VARIANT.BTN_DANGER} additionalStyles={{ width: '54px', margin: '5px' }}>
                <i
                    style={{ margin: 0, marginTop: '5px', width: '12px', height: '12px' }}
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
        const { data, error, isLoading } = useGetUserByIdQuery(userId);
        const joinedDate = parseSQLDateToJavaScript(data?.joined);

        const {
            data: uploads,
            error: uploadsFetchError,
            isLoading: isUploadsLoading
        } = useGetUserUploadsByIdQuery(userId);

        const {
            data: downloads,
            error: downloadsFetchError,
            isLoading: isDownloadsLoading
        } = useGetUserDownloadsByIdQuery(userId);

        if (
            !isLoading &&
            !error &&
            !uploadsFetchError &&
            !isUploadsLoading &&
            !downloadsFetchError &&
            !isDownloadsLoading
        ) {
            console.log(data);
            console.log(uploads);
            console.log(downloads);
        }

        console.log('##### editMode', editMode);

        // tableCellDataOfCorrespondingRowArray={[[uploads?._embedded?.uploads?.[0].name, uploadDate, <a href={`/download/${uploads?._embedded?.uploads?.[0].fileName}`}>download</a>, <><Button variant={BUTTON_VARIANT.BTN_WARNING}>Bearbeiten</Button> <Button variant={BUTTON_VARIANT.BTN_DANGER}>Löschen</Button></>], ["My Content"]]} />
        const getTableData = () => {
            return uploads?._embedded?.uploads.map((upload) => [
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
                <a href={`/download/${upload?.fileName}`}>download</a>,
                actionButtons
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
                                    {data?.uploadCount}
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
                            <img
                                src="//placehold.it/150"
                                className="mx-auto img-fluid img-circle d-block mb-3"
                                alt="avatar"
                            />
                            <span>
                                <i style={{ width: '24px' }} className="icono-mail" /> {username}
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
                                        Profile
                                    </Link>
                                </li>
                            </ul>
                            <div className="tab-content py-4">
                                <div className="tab-pane active" id="profile">
                                    <h5 className="mb-3">Statistik</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6>Mitglied seit</h6>
                                            <p>{joinedDate}</p>
                                            <h6>Uploads</h6>
                                            <p>{data?.uploadCount}</p>
                                        </div>
                                        <div className="col-md-6">
                                            {/* TODO: Badges Achievement */}
                                            <h6>Auszeichnungen</h6>
                                            <span className="badge bg-dark">Junior</span>
                                        </div>
                                        <div className="col-md-12">
                                            <h5 className="mt-2 mb-4">
                                                <span className="fa fa-clock-o ion-clock float-right"></span>Meine
                                                Uploads
                                            </h5>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    placeholder="Durchsuche Uploads nach Namen ..."
                                                />
                                                <Button
                                                    buttonSize={BUTTON_SIZE.SMALL}
                                                    variant={BUTTON_VARIANT.BTN_SECONDARY}
                                                >
                                                    <i className="icono-search" />
                                                </Button>
                                            </div>
                                            {uploads && (
                                                <Table
                                                    tableHeaderData={
                                                        <tr className="table-secondary">
                                                            <td>Name</td>
                                                            <td>Upload Datum</td>
                                                            <td>{}</td>
                                                            <td>Weitere Aktionen</td>
                                                        </tr>
                                                    }
                                                    tableRowsAmount={uploads?._embedded?.uploads?.length}
                                                    tableCellsAmmount={4}
                                                    tableCellDataOfCorrespondingRowArray={getTableData()}
                                                />
                                            )}
                                        </div>
                                        <div className="col-md-12">
                                            <h5 className="mt-2 mb-4">
                                                <span className="fa fa-clock-o ion-clock float-right"></span>Meine
                                                Downloads
                                            </h5>
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
