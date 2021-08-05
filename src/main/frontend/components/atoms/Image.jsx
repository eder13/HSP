import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ className, image, alt, additionalStyles, width, height }) => {
    return (
        <>
            <img className={className} width={width} height={height} style={additionalStyles} src={image} alt={alt} />
        </>
    );
};

Image.propTypes = {
    className: PropTypes.string,
    image: PropTypes.any,
    alt: PropTypes.string,
    additionalStyles: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number
};

export default Image;
