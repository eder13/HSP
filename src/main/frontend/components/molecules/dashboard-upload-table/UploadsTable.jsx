import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputSearch from '../../atoms/input-search/InputSearch';
import Table from '../../atoms/table-component/Table';
import Pagination from '../../atoms/pagination-component/Pagination';
import styles from './UploadsTable.module.css';
import { selectUserId } from '../../../selectors/authSelector';
import { useGetUserUploadsByIdQuery, usePatchUserUploadsByIdMutation } from '../../../middleware/api';
import { getUploadTableData, getUploadTableHeaderData } from './uploadsTableUtils';
import { actionResetModal, actionSetModal } from '../../../actions/modalActions';
import { selectModalActive, selectModalData, selectModalType } from '../../../selectors/modalSelector';
import Modal from '../../atoms/modal-overlay/Modal';
import { MODAL_TYPE } from '../../../constants/modalTypes';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getPropertyAsString } from '../../utils/jsobjectUtils';
import LaddaButton from '../../atoms/button-ladda/LaddaButton';
import { isEmpty } from 'lodash';
import { selectIsMediaSM, selectIsMediaXS } from '../../../selectors/clientInfoSelector';
import cssClassNamesHelper from '../../utils/cssClassNamesHelper';

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
    const activeModalType = useSelector(selectModalType);
    const modalData = useSelector(selectModalData);
    const isMediaSM = useSelector(selectIsMediaSM);
    const isMediaXS = useSelector(selectIsMediaXS);

    /**
     * State, Variables
     */
    const [currentPage, setCurrentPage] = useState(0);
    const [modal, setModal] = useState(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formFields = {
        id: modalData.id,
        title: modalData.title
    };

    /**
     * Hooks, Data Fetching
     */
    const { data, error, isLoading, status, isFetching, isSuccess, isError } = useGetUserUploadsByIdQuery({
        id: userId,
        page: currentPage
    });

    const [
        patchUserUploadWithId,
        {
            status: patchStatus,
            error: patchUploadError,
            data: patchedData,
            isUninitialized: isPatchUninitialized,
            isLoading: isPatching,
            isSuccess: isPatchSuccess,
            isError: isPatchError
        }
    ] = usePatchUserUploadsByIdMutation();

    useEffect(() => {
        if (isModalActive && activeModalType === MODAL_TYPE.UPLOAD) {
            modal.show();
        }
    }, [isModalActive, activeModalType]);

    /**
     * Sub Logic, Callbacks
     */
    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        setIsSubmitting(true);

        try {
            await new Promise(res => setTimeout(() => res(), 5000));

            await patchUserUploadWithId({
                id: modalData.id,
                body: { name: values.title }
            }).unwrap();

            dispatch(actionResetModal());

            modal.hide();
        } catch (e) {
            console.log(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Render
     */
    return (
        <>
            {isLoading || isFetching ? (
                <>Loading...</>
            ) : (
                <>
                    <h4 className={styles.title}>Uploads {'⬆️'}</h4>
                    <div className={cssClassNamesHelper(['w-25', 'mb-4', (isMediaSM || isMediaXS) && 'w-100'])}>
                        <InputSearch placeholder="Durchsuche Uploads ..." />
                    </div>

                    <>
                        <Table
                            tableHeaderData={getUploadTableHeaderData()}
                            tableRowsAmount={data?._embedded?.uploads?.length}
                            tableCellsAmmount={AMOUNT_OF_UPLOAD_COLUMNS}
                            tableCellDataOfCorrespondingRowArray={getUploadTableData(data, actionDispatchSetModal)}
                            tableLayoutFixed={true}
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
                        <Modal
                            onRegisterModal={modalCb => setModal(modalCb)}
                            title={`${modalData.title} bearbeiten`}
                            footer={<small>Diese Aktion kann nicht rückgängig gemacht werden!</small>}
                            disableClose={isSubmitting}
                        >
                            <Formik
                                enableReinitialize={true}
                                initialValues={formFields}
                                validate={values => {
                                    const errors = {};
                                    if (isEmpty(values.title)) {
                                        errors.title = 'Dieses Feld darf nicht leer sein!';
                                    }
                                    return errors;
                                }}
                                onSubmit={onSubmit}
                            >
                                <Form>
                                    <Field
                                        id="uploadId"
                                        hidden
                                        type="text"
                                        name={getPropertyAsString(formFields, formFields.id)}
                                    />
                                    <ErrorMessage name={getPropertyAsString(formFields, formFields.title)}>
                                        {msg => (
                                            <div className="alert alert-danger" role="alert">
                                                {msg}
                                            </div>
                                        )}
                                    </ErrorMessage>
                                    <label for="uploadName" class="form-label">
                                        Neuer Upload Name:
                                    </label>
                                    <Field
                                        class="form-control mb-3"
                                        id="uploadName"
                                        type="text"
                                        name={getPropertyAsString(formFields, formFields.title)}
                                    />
                                    <LaddaButton disabled={isSubmitting}>Update</LaddaButton>
                                </Form>
                            </Formik>
                        </Modal>
                    </>
                </>
            )}
        </>
    );
};

export default UploadsTable;
