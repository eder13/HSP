import React from 'react';
import PropTypes from 'prop-types';
import CLIENT_CONSTANTS from '../../constants/clientConstants';
import cns from '../util/cssClassHelper';
import { scrollToElement } from '../util/scroll';
import { getPageNumberFromURL } from './paginationUtils';

const Pagination = props => {
    const { gettingDataCallbackArray, currentSelection, prev, next, first, last, setPage } = props;

    /// TODO: replace this with query-string library -> removes getPageNumberFormURL
    const prevPageNumber = getPageNumberFromURL(prev);
    const nextPageNumber = getPageNumberFromURL(next);
    const firstPageNumber = getPageNumberFromURL(first);
    const lastPageNumber = getPageNumberFromURL(last);

    return (
        <div style={{ margin: '0 auto' }}>
            <ul className="pagination">
                {gettingDataCallbackArray.length > CLIENT_CONSTANTS.PAGINATION_LIMIT ? (
                    // TODO: IMPLEMENT like so https://cdn.dribbble.com/users/1231641/screenshots/8873527/085.png?compress=1&resize=400x300
                    <></>
                ) : (
                    <>
                        <li className={cns(['page-item', !prev && 'disabled'])}>
                            <a
                                onClick={e => {
                                    if (!prev) {
                                        return;
                                    }
                                    e.preventDefault();
                                    setPage(prevPageNumber);
                                    e.target.blur();
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
                                    onClick={e => {
                                        e.preventDefault();
                                        callback();
                                        e.target.blur();
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
                                onClick={e => {
                                    if (!next) {
                                        return;
                                    }
                                    e.preventDefault();
                                    setPage(nextPageNumber);
                                    e.target.blur();
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
};

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
