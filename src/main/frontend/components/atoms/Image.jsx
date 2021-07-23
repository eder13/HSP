import React from 'react'
import PropTypes from 'prop-types'

const Image = ({className, image, alt}) => {    
    return (
        <>
            <img className={className} src={image} alt={alt} />
        </>
    )
}

Image.propTypes = {
    className: PropTypes.string,
    image: PropTypes.any,
    alt: PropTypes.string
}

export default Image
