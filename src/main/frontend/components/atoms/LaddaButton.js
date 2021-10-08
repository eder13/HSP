import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { BUTTON_VARIANT } from '../../constants/buttonVariants';
import 'ladda/dist/ladda-themeless.min.css';
import useLaddaBtn from '../../hooks/useLaddaBtn';

const LaddaButton = props => {
    /**
     * Props, Refs
     */
    const { disabled, children, onStartStopLoadingCb } = props;
    const $laddaBtnRef = useRef();

    /**
     * Hooks
     */
    const { startLoading, stopLoading } = useLaddaBtn($laddaBtnRef);

    useEffect(() => {
        if (startLoading !== null && stopLoading !== null) {
            onStartStopLoadingCb({ startLoading, stopLoading });
        }
    }, [startLoading, stopLoading]);

    return (
        <Button
            type="submit"
            variant={BUTTON_VARIANT.BTN_PRIMARY}
            id="update-upload-test"
            disabled={disabled}
            additionalClassNames="ladda-button"
            ref={$laddaBtnRef}
            additionalProps={{ 'data-style': 'expand-right' }}
        >
            {children}
        </Button>
    );
};

LaddaButton.propTypes = {
    disabled: PropTypes.bool.isRequired,
    children: PropTypes.any,
    onStartStopLoadingCb: PropTypes.func.isRequired
};

export default LaddaButton;
