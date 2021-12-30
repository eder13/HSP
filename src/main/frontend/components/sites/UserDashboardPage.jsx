import React, { useState, memo, useEffect } from 'react';
import useInitialDashboardData from '../../hooks/useInitialDashboardData';
import { usePatchUserUploadsByIdMutation } from '../../middleware/api';
import Table from '../atoms/table-component/Table';
import Button from '../atoms/button/Button';
import { BUTTON_VARIANT } from '../atoms/button/buttonVariants';
import { parseSQLDateToJavaScript } from '../utils/dateParserUtil';
import { useSelector } from 'react-redux';
import { selectUser, selectUserId } from '../../selectors/authSelector';
import Image from '../atoms/image/Image';
import cssClassNamesHelper from '../utils/cssClassNamesHelper';
import { selectIsMobile } from '../../selectors/clientInfoSelector';
import Icon from '../atoms/icons/Icon';
import ICONTYPES from '../atoms/icons/iconTypes';
import ICONSIZE from '../atoms/icons/iconSize';
import styles from './UserDashboardPage.module.css';
import InputSearch from '../atoms/input-search/InputSearch';
import Modal from '../atoms/modal-overlay/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { isEmpty } from 'lodash';
import { getPropertyAsString } from '../utils/jsobjectUtils';
import LaddaButton from '../atoms/button-ladda/LaddaButton';
import UploadsTable from '../molecules/dashboard-upload-table/UploadsTable';
import DownloadsTable from '../molecules/dashboard-download-table/DownloadsTable';
import { selectModalActive } from '../../selectors/modalSelector';

const UserDashboardPage = () => {
    /**
     * State, Selectors
     */
    const [modalInstanceCb, setModalInstanceCb] = useState(null);
    const [modalTitle, setModalTitle] = useState('Modal Title');
    const [modalBody, setModalBody] = useState({ id: -1, name: 'not-selected' });
    const [isModalSubmitting, setIsModalSubmitting] = useState(false);
    const [laddaStartStopCb, setLaddaStartStopCb] = useState(undefined);
    const username = useSelector(selectUser);
    const userId = useSelector(selectUserId);
    const isMobile = useSelector(selectIsMobile);

    const isModalActive = useSelector(selectModalActive);

    /**
     * Hooks
     */ /// TODO: Filter out Errors -> Message under Navbar + refresh site button (const rerender = useForceRerender -- onClick Button: rerender())
    const { isUserDataLoading, error, data } = useInitialDashboardData(userId);
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

    useEffect(() => {
        if (isModalActive) {
            console.log('##### Modal Is Active and Should be displayed in App!');
        }
    }, [isModalActive]);

    /**
     * Variables, Callbacks, Sub-Render Logic, ClassNames
     */
    const onRegisterModal = modalBSInstance => setModalInstanceCb(modalBSInstance);
    const onRegisterLadda = ladda => setLaddaStartStopCb(ladda);
    const formFieldsAndValues = {
        id: modalBody.id,
        name: modalBody.name
    };
    const initialLoad = isUserDataLoading;
    const joinedDate = parseSQLDateToJavaScript(data?.userData?.joined);

    /**
     * Render
     */
    return (
        <main>
            <h1 className={styles.title}>Meine Uploads & Downloads</h1>
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
                                        <UploadsTable />
                                    </div>
                                    <div className="col-md-12">
                                        <DownloadsTable />
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
                                    name={getPropertyAsString(formFieldsAndValues, formFieldsAndValues.id)}
                                    hidden
                                />
                                <Field
                                    type="text"
                                    name={getPropertyAsString(formFieldsAndValues, formFieldsAndValues.name)}
                                />
                                <ErrorMessage
                                    name={getPropertyAsString(formFieldsAndValues, formFieldsAndValues.name)}
                                    component="div"
                                />
                                <LaddaButton disabled={isSubmitting} onStartStopLoadingCb={onRegisterLadda}>
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
