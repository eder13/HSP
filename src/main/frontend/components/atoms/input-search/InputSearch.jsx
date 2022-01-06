import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import BUTTON_SIZE from '../button/buttonSize';
import { BUTTON_VARIANT } from '../button/buttonVariants';
import Icon from '../icons/Icon';
import ICONTYPES from '../icons/iconTypes';
import ICONSIZE from '../icons/iconSize';
import styles from './InputSearch.module.css';

const InputSearch = props => {
    /**
     * Props
     */
    const { placeholder = '', classNames } = props;

    /**
     * Render
     */
    return (
        <form className={`input-group ${classNames}`}>
            <input type="text" className="form-control form-control-sm" placeholder={placeholder} />
            <Button buttonSize={BUTTON_SIZE.NORMAL} variant={BUTTON_VARIANT.BTN_SECONDARY} additionalStyles={{}}>
                <Icon iconType={ICONTYPES.SEARCH} size={ICONSIZE.SIZE_0_75X} />
            </Button>
        </form>
    );
};

InputSearch.propTypes = {
    showSkeleton: PropTypes.bool,
    placeholder: PropTypes.string
};

export default InputSearch;
