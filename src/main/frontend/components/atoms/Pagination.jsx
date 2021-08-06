import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import CLIENT_CONSTANTS from '../../constants/clientConstants';
import cns from '../util/cssClassHelper';
import { scrollToElement } from '../util/scroll';
import { getPageNumberFromURL } from './paginationUtils';

const Pagination = forwardRef((props, ref) => {
    const { gettingDataCallbackArray, currentSelection, prev, next, first, last, setPage } = props;
    const prevPageNumber = getPageNumberFromURL(prev);
    const nextPageNumber = getPageNumberFromURL(next);
    const firstPageNumber = getPageNumberFromURL(first);
    const lastPageNumber = getPageNumberFromURL(last);

    return (
        <div style={{ margin: '0 auto' }}>
            <ul className="pagination">
                {gettingDataCallbackArray.length > CLIENT_CONSTANTS.PAGINATION_LIMIT ? (
                    <></>
                ) : (
                    <>
                        <li className={cns(['page-item', !prev && 'disabled'])}>
                            <a
                                onClick={(e) => {
                                    if (!prev) {
                                        return;
                                    }

                                    e.preventDefault();
                                    setPage(prevPageNumber);

                                    scrollToElement(ref.current);

                                    // TODO: If when clicked the prev is not clickable -> blur
                                    //e.target.blur();
                                }}
                                className="page-link"
                                href="#"
                            >
                                &laquo;
                            </a>
                        </li>
                        {gettingDataCallbackArray.map((callback, index) => (
                            <li key={index} className={cns(['page-item', index === currentSelection && 'active'])}>
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                        callback();
                                        scrollToElement(ref.current);
                                    }}
                                    className="page-link"
                                    href="#"
                                >
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                        <li className={cns(['page-item', !next && 'disabled'])}>
                            <a
                                onClick={(e) => {
                                    if (!next) {
                                        return;
                                    }

                                    e.preventDefault();
                                    setPage(nextPageNumber);

                                    scrollToElement(ref.current);

                                    // TODO: If when clicked the next is not clickable -> blur
                                    //e.target.blur();
                                }}
                                className="page-link"
                                href="#"
                            >
                                &raquo;
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
});

Pagination.propTypes = {
    gettingDataCallbackArray: PropTypes.array,
    currentSelection: PropTypes.number,
    prev: PropTypes.string,
    next: PropTypes.string,
    first: PropTypes.string,
    last: PropTypes.string,
    setPage: PropTypes.func
};

Pagination.displayName = 'Pagination';

export default Pagination;
