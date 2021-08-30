import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import BUTTON_SIZE from '../../../constants/buttonSize';
import { BUTTON_VARIANT } from '../../../constants/buttonVariants';
import Icon from '../icons/Icon';
import ICONTYPES from '../icons/iconTypes';
import ICONSIZE from '../icons/iconSize';
import styles from './InputSearch.module.css';

const InputSearch = ({ showSkeleton = false, inputPlaceholder = '' }) => {
    if (showSkeleton) {
        return <div className={styles.skeleton}></div>;
    } else {
        return (
            <div className="input-group mb-3">
                <input type="text" className="form-control form-control-sm" placeholder={inputPlaceholder} />
                <Button buttonSize={BUTTON_SIZE.NORMAL} variant={BUTTON_VARIANT.BTN_SECONDARY} additionalStyles={{}}>
                    <Icon iconType={ICONTYPES.SEARCH} size={ICONSIZE.SIZE_1_5X} />
                </Button>
            </div>
        );
    }
};

InputSearch.propTypes = {
    showSkeleton: PropTypes.bool,
    inputPlaceholder: PropTypes.string
};

export default InputSearch;
