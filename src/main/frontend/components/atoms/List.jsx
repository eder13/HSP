import React from 'react';
import PropTypes from 'prop-types';

const List = ({ ulClassName, listItemsContent, liClassName = '' }) => {
    return (
        <ul className={ulClassName}>
            {listItemsContent.map((item, index) => (
                <li className={liClassName} key={index}>
                    {item}
                </li>
            ))}
        </ul>
    );
};

List.propTypes = {
    ulClassName: PropTypes.string,
    listItemsContent: PropTypes.array,
    liClassName: PropTypes.string
};

export default List;
