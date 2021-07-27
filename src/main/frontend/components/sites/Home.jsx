import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectUser, selectUserId } from '../../selectors/authSelector';
import { selectIsMobileNavbar } from '../../selectors/clientInfoSelector';
import ShowCase from '../ui/home-showcase/ShowCase';
import ROUTES from '../routers/Routes';
import { useGetUserByIdQuery } from '../../middleware/api';
import { parseSQLDateToJavaScript } from '../util/dateParserUtil';

const Home = () => {
    const isLoggedIn = useSelector(selectLoggedIn);
    const username = useSelector(selectUser);
    const isMobileNavDisplayed = useSelector(selectIsMobileNavbar);
    const userId = useSelector(selectUserId);



    const renderDashboard = () => {

        const { data, error, isLoading } = useGetUserByIdQuery(userId);
        const joinedDate = parseSQLDateToJavaScript(data?.joined);

        if (!isLoading && !error) {
            console.log(data);
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
                                <span><strong>Mitglied seit: </strong>{`${joinedDate.getDate()}.${joinedDate.getMonth() + 1}.${joinedDate.getUTCFullYear()}`}</span>
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
                                    <Link onClick={() => null} to="/" data-target="#profile" data-toggle="tab" className="nav-link active" style={{cursor: 'default'}}>Profile</Link>
                                </li>
                            </ul>
                            <div className="tab-content py-4">
                                <div className="tab-pane active" id="profile">
                                    <h5 className="mb-3">Statistik</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6>Mitglied seit</h6>
                                            <p>
                                                {`${joinedDate.getDate()}.${joinedDate.getMonth() + 1}.${joinedDate.getUTCFullYear()}`}
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
                                            <table className="table table-sm table-hover table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <strong>Abby</strong> joined ACME Project Team in <strong>`Collaboration`</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>Gary</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>Kensington</strong> deleted MyBoard3 in <strong>`Discussions`</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>John</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>Skell</strong> deleted his post Look at Why this is.. in <strong>`Discussions`</strong>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-md-12">
                                            <h5 className="mt-2 mb-4"><span className="fa fa-clock-o ion-clock float-right"></span>Meine Downloads</h5>
                                            <table className="table table-sm table-hover table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <strong>Abby</strong> joined ACME Project Team in <strong>`Collaboration`</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>Gary</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>Kensington</strong> deleted MyBoard3 in <strong>`Discussions`</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>John</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>Skell</strong> deleted his post Look at Why this is.. in <strong>`Discussions`</strong>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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
