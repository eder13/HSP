import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { BUTTON_VARIANT } from '../../constants/buttonVariants';
import cssClassNamesHelper from '../util/cssClassHelper';
import BUTTON_SIZE from '../../constants/buttonSize';

const Button = forwardRef((props, ref) => {
    const {
        id = '',
        className = '',
        variant = BUTTON_VARIANT.BTN_NONE,
        buttonSize = BUTTON_SIZE.NORMAL,
        type = 'button',
        children = 'My Button Text',
        disabled = false,
        additionalClassNames = '',
        additionalStyles,
        additionalProps,
        onClick = () => {},
        onMouseOver = () => {},
        onMouseOut = () => {}
    } = props;

    const buttonClasses = cssClassNamesHelper([
        variant,
        buttonSize,
        className,
        disabled && 'disabled',
        additionalClassNames
    ]);

    return (
        <button
            ref={ref}
            onClick={onClick}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            id={id}
            className={buttonClasses}
            type={type}
            style={additionalStyles}
            {...additionalProps}
        >
            {children}
        </button>
    );
});

Button.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.string,
    buttonSize: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.any,
    disabled: PropTypes.bool,
    additionalClassNames: PropTypes.string,
    additionalStyles: PropTypes.object,
    additionalProps: PropTypes.object,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func
};

Button.displayName = 'Button';

export default Button;
