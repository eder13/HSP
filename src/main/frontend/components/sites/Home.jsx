/* eslint-disable react/jsx-key */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectUser, selectUserId } from '../../selectors/authSelector';
import { selectIsMobileNavbar } from '../../selectors/clientInfoSelector';
import ShowCase from '../ui/home-showcase/ShowCase';
import ROUTES from '../routers/Routes';
import { useGetUserByIdQuery, useGetUserUploadsByIdQuery } from '../../middleware/api';
import { parseSQLDateToJavaScript } from '../util/dateParserUtil';
import Table from '../atoms/Table';
import Button from '../atoms/Button';
import { BUTTON_VARIANT } from '../../constants/buttonVariants';
import BUTTON_SIZE from '../../constants/buttonSize';
import styles from "./Home.module.css";
import editIcon from "../../assets/edit_icon.png";

const Home = () => {
    const isLoggedIn = useSelector(selectLoggedIn);
    const username = useSelector(selectUser);
    const isMobileNavDisplayed = useSelector(selectIsMobileNavbar);
    const userId = useSelector(selectUserId);



    const renderDashboard = () => {

        const { data, error, isLoading } = useGetUserByIdQuery(userId);
        const joinedDate = parseSQLDateToJavaScript(data?.joined);

        const { data: uploads, error: uploadsFetchError, isLoading: isUploadsLoading } = useGetUserUploadsByIdQuery(userId);

        if (!isLoading && !error && !uploadsFetchError && !isUploadsLoading) {
            console.log(data);
            console.log(uploads);
        }

        // tableCellDataOfCorrespondingRowArray={[[uploads?._embedded?.uploads?.[0].name, uploadDate, <a href={`/download/${uploads?._embedded?.uploads?.[0].fileName}`}>download</a>, <><Button variant={BUTTON_VARIANT.BTN_WARNING}>Bearbeiten</Button> <Button variant={BUTTON_VARIANT.BTN_DANGER}>Löschen</Button></>], ["My Content"]]} />
        const getTableData = () => {
            return uploads?._embedded?.uploads.map((upload) =>
                [
                    upload?.name,
                    parseSQLDateToJavaScript(upload?.createdOn),
                    <a href={`/download/${upload?.fileName}`}>download</a>,
                    <><Button variant={BUTTON_VARIANT.BTN_WARNING}><img width="34" src={editIcon} /></Button> <Button variant={BUTTON_VARIANT.BTN_DANGER}><i className="icono-trash"></i></Button></>
                ]
            );
        }

        // TODO: User Card for Information Corner 
        const userCard = (
            <div>
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="100" />
                            <div className="mt-3">
                                <h5>{username}</h5>
                                <span><strong>Mitglied seit: </strong>{joinedDate}</span>
                                <p><strong>Uploads: </strong>{data?.uploadCount}</p>
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
                            <img src="//placehold.it/150" className="mx-auto img-fluid img-circle d-block mb-3" alt="avatar" />
                            <span><i style={{ width: '24px' }} className="icono-mail" /> {username}</span>
                        </div>
                        <div className="col-lg-8 order-lg-2">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <Link onClick={() => null} to="/" data-target="#profile" data-toggle="tab" className="nav-link active" style={{ cursor: 'default' }}>Profile</Link>
                                </li>
                            </ul>
                            <div className="tab-content py-4">
                                <div className="tab-pane active" id="profile">
                                    <h5 className="mb-3">Statistik</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6>Mitglied seit</h6>
                                            <p>
                                                {joinedDate}
                                            </p>
                                            <h6>Uploads</h6>
                                            <p>
                                                {data?.uploadCount}
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            {/* TODO: Badges Achievement */}
                                            <h6>Auszeichnungen</h6>
                                            <span className="badge bg-dark">Junior</span>
                                        </div>
                                        <div className="col-md-12">
                                            <h5 className="mt-2 mb-4"><span className="fa fa-clock-o ion-clock float-right"></span>Meine Uploads</h5>
                                            {uploads && <Table tableHeaderData={<tr className="table-secondary"><td>Name</td><td>Upload Datum</td><td>{ }</td><td>Weitere Aktionen</td></tr>} tableRowsAmount={uploads?._embedded?.uploads?.length} tableCellsAmmount={4} tableCellDataOfCorrespondingRowArray={getTableData()} />}
                                        </div>
                                        <div className="col-md-12">
                                            <h5 className="mt-2 mb-4"><span className="fa fa-clock-o ion-clock float-right"></span>Meine Downloads</h5>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }



    const renderHomepage = () => {
        return (
            <main className="container">
                <ShowCase isMobileNavDisplayed={isMobileNavDisplayed} />
                {/* TODO: Über die App */}
                {/* TODO: FAQ with accordions */}
                {/* Implement this highlight Nav link effect via that jQuery script */}
            </main>
        );
    }

    return (
        isLoggedIn ? renderDashboard() : renderHomepage()
    );
};

export default Home;
