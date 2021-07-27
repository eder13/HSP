import React from 'react'
import PropTypes from 'prop-types'
import { BUTTON_VARIANT } from '../../constants/buttonVariants'
import cssClassNamesHelper from '../util/cssClassHelper'
import BUTTON_SIZE from '../../constants/buttonSize'

const Button = (props) => {
    
    const { 
        id = '', 
        className = '', 
        variant = BUTTON_VARIANT.BTN_NONE, 
        buttonSize = BUTTON_SIZE.NORMAL, 
        type = 'button', 
        children = 'My Button Text', 
        additionalStyles, 
        additionalProps,
        onClick = () => {}
    } = props;

    const buttonClasses = cssClassNamesHelper([
        variant, 
        buttonSize,
        className
    ]);
    
    return (
        <button onClick={onClick} id={id} className={buttonClasses} type={type} style={additionalStyles} {...additionalProps}>
            {children}
        </button>
    )
}

Button.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.string,
    buttonSize: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.any,
    additionalStyles: PropTypes.object,
    additionalProps: PropTypes.object,
    onClick: PropTypes.func
}

export default Button