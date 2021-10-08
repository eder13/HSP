import React, { useState, memo } from 'react';
import useInitialDashboardData from '../../hooks/useInitialDashboardData';
import { usePatchUserUploadsByIdMutation } from '../../middleware/api';
import Table from '../atoms/Table';
import Pagination from '../atoms/Pagination';
import Button from '../atoms/Button';
import { BUTTON_VARIANT } from '../../constants/buttonVariants';
import { parseSQLDateToJavaScript } from '../util/dateParserUtil';
import { useSelector } from 'react-redux';
import { selectUser, selectUserId } from '../../selectors/authSelector';
import Image from '../atoms/Image';
import cssClassNamesHelper from '../util/cssClassHelper';
import { selectIsMobile } from '../../selectors/clientInfoSelector';
import Icon from '../atoms/icons/Icon';
import ICONTYPES from '../atoms/icons/iconTypes';
import ICONSIZE from '../atoms/icons/iconSize';
import styles from './UserDashboardPage.module.css';
import TableSkeleton from '../atoms/TableSkeleton';
import TABLE_SKELETON from '../atoms/tableSkeletonType';
import InputSearch from '../atoms/input-search/InputSearch';
import Modal from '../atoms/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { isEmpty } from 'lodash';
import { getPropertyNameAsString } from '../util/jsobjectUtils';
import LaddaButton from '../atoms/LaddaButton';

const UserDashboardPage = () => {
    /**
     * State, Selectors
     */
    const [currentPage, setCurrentPage] = useState(0);
    const [modalInstanceCb, setModalInstanceCb] = useState(null);
    const [modalTitle, setModalTitle] = useState('Modal Title');
    const [modalBody, setModalBody] = useState({ id: -1, name: 'not-selected' });
    const [isModalSubmitting, setIsModalSubmitting] = useState(false);
    const [laddaStartStopCb, setLaddaStartStopCb] = useState(undefined);
    const username = useSelector(selectUser);
    const userId = useSelector(selectUserId);
    const isMobile = useSelector(selectIsMobile);

    /**
     * Hooks
     */ /// TODO: Filter out Errors -> Message under Navbar + refresh site button (const rerender = useForceRerender -- onClick Button: rerender())
    const { isUserDataLoading, isDownloadDataLoading, isUploadDataLoading, error, data } = useInitialDashboardData(
        userId,
        currentPage,
        undefined
    );
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

    /**
     * Variables, Callbacks, Sub-Render Logic, ClassNames
     */
    const onRegisterModal = modalBSInstance => setModalInstanceCb(modalBSInstance);
    const uploadHeadingClasses = cssClassNamesHelper(['mt-2 mb-4', isMobile && 'mt-3']);
    const formFieldsAndValues = {
        id: modalBody.id,
        name: modalBody.name
    };
    const initialLoad = isUserDataLoading && isDownloadDataLoading && isUploadDataLoading; // TODO: Set Skeletons everywhere
    const joinedDate = parseSQLDateToJavaScript(data?.userData?.joined);

    // TODO: Replace with react-table
    const getTableData = () => {
        return data?.uploadData?._embedded?.uploads.map((upload, i) => [
            upload?.name,
            parseSQLDateToJavaScript(upload?.createdOn),
            <div key={upload?.id}>
                <a key={upload?.id} className={styles.downloadLinkButton} href={`/download/${upload?.fileName}`}>
                    <Icon iconType={ICONTYPES.DOWNLOAD} size={ICONSIZE.SIZE_1_5X} additionalStyles={{ top: '4px' }} />
                </a>
                <Button
                    onClick={() => {
                        setModalTitle(`${upload?.name} bearbeiten`);
                        setModalBody({
                            id: upload?._links.upload?.href,
                            name: upload?.name
                        });
                        modalInstanceCb.show();
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

    /**
     * Render
     */
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
                                <span className="nav-link active" style={{ cursor: 'default' }}>
                                    Profil
                                </span>
                            </li>
                        </ul>
                        <div className="tab-content py-4">
                            <div className="tab-pane active" id="profile">
                                <h3 className="mb-3">Statistik</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Mitglied seit</h6>
                                        <p>{joinedDate}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Uploads</h6>
                                        <p>{data?.userData?.uploadCount}</p>
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
                                        <h2 className={uploadHeadingClasses}>Meine Uploads {'⬆️'}</h2>
                                        {isUploadDataLoading ? (
                                            <>
                                                <InputSearch showSkeleton={true} />
                                                <TableSkeleton type={TABLE_SKELETON.UPLOADS} />
                                            </>
                                        ) : (
                                            <>
                                                <InputSearch inputPlaceholder="Durchsuche Uploads ..." />
                                                {data?.uploadData && (
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
                                                            tableRowsAmount={
                                                                data?.uploadData?._embedded?.uploads?.length
                                                            }
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
                                                            prev={data?.uploadData?._links?.prev?.href}
                                                            next={data?.uploadData?._links?.next?.href}
                                                            first={data?.uploadData?._links?.first?.href}
                                                            last={data?.uploadData?._links?.last?.href}
                                                            setPage={setCurrentPage}
                                                        />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="mt-2 mb-4">Meine Downloads {'⬇️'}</h2>
                                        {isDownloadDataLoading ? (
                                            <>
                                                <InputSearch showSkeleton={true} />
                                                <TableSkeleton type={TABLE_SKELETON.DOWNLOADS} />
                                            </>
                                        ) : (
                                            <>
                                                <InputSearch inputPlaceholder="Durchsuche Downloads ..." />
                                                {data?.downloadData && (
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
                                                            tableRowsAmount={
                                                                data?.downloadData?._embedded?.uploads?.length
                                                            }
                                                            tableCellsAmmount={4}
                                                            tableCellDataOfCorrespondingRowArray={getDownloadsTableData()}
                                                            additionalStyles={{
                                                                borderTopLeftRadius: '3px',
                                                                borderTopRightRadius: '3px',
                                                                overflow: 'hidden'
                                                            }}
                                                        />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                onRegisterModal={onRegisterModal}
                title={modalTitle}
                footer="footertest"
                disableClose={isModalSubmitting}
            >
                <Formik
                    enableReinitialize={true}
                    initialValues={formFieldsAndValues}
                    validate={values => {
                        const errors = {};
                        if (isEmpty(values.name)) {
                            errors.name = 'Not Empty';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        // this disables outer click and esc key press to dismiss modal
                        modalInstanceCb._config.backdrop = false;
                        modalInstanceCb._config.keyboard = false;

                        // start ladda animation
                        laddaStartStopCb?.startLoading();

                        // set submitting to true for modal and formik
                        setSubmitting(true);
                        setIsModalSubmitting(true);

                        try {
                            /// FIXME: Remove this, just for testing purposes to see if setSubmitting Works
                            await new Promise((resolve, _) => setTimeout(() => resolve(), 4000));

                            await patchUserUploadWithId({
                                id: modalBody.id,
                                body: { name: values.name }
                            }).unwrap();

                            modalInstanceCb.hide();
                        } catch (e) {
                            // TODO: Show Error inside Modal if any occurs
                            console.log('e', e);
                        } finally {
                            setIsModalSubmitting(false);
                            laddaStartStopCb?.stopLoading();
                            modalInstanceCb._config.backdrop = true;
                            modalInstanceCb._config.keyboard = true;
                        }
                    }}
                >
                    {formik => {
                        const { isSubmitting } = formik;
                        return (
                            <Form>
                                <Field
                                    type="text"
                                    name={getPropertyNameAsString(formFieldsAndValues, formFieldsAndValues.id)}
                                    hidden
                                />
                                <Field
                                    type="text"
                                    name={getPropertyNameAsString(formFieldsAndValues, formFieldsAndValues.name)}
                                />
                                <ErrorMessage
                                    name={getPropertyNameAsString(formFieldsAndValues, formFieldsAndValues.name)}
                                    component="div"
                                />
                                <LaddaButton
                                    disabled={isSubmitting}
                                    onStartStopLoadingCb={ladda => setLaddaStartStopCb(ladda)}
                                >
                                    Update
                                </LaddaButton>
                                <Button id="delete-upload" disabled={isSubmitting} variant={BUTTON_VARIANT.BTN_DANGER}>
                                    Löschen
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Modal>
        </main>
    );
};

export default memo(UserDashboardPage);
