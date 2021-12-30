import React, { useRef, useEffect, useState } from 'react';
import { Modal as ModalBS } from 'bootstrap';

const Modal = props => {
    /**
     * Props, Refs
     */
    const { onRegisterModal, children, title, footer, disableClose = false } = props;
    const $modalRef = useRef();
    const [modalInstance, setModalInstance] = useState(undefined);

    /**
     * Lifecycle Hooks
     */
    useEffect(() => {
        if ($modalRef?.current) {
            const modalBS = new ModalBS($modalRef.current);
            setModalInstance(modalBS);
            onRegisterModal(modalBS);
        }
    }, []);

    /**
     * Render
     */
    return (
        <div
            ref={$modalRef}
            className="modal fade"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            disabled={disableClose}
                            aria-label="Close"
                            onClick={() => modalInstance.hide()}
                        ></button>
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">{footer}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
