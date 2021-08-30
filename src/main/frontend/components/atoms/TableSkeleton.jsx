import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIsMobile } from '../../selectors/clientInfoSelector';
import Table from './Table';
import styles from './TableSkeleton.module.css';
import TABLE_SKELETON from './tableSkeletonType';

const TableSkeleton = ({ type }) => {
    const isMobile = useSelector(selectIsMobile);

    switch (type) {
        case TABLE_SKELETON.UPLOADS:
            return (
                <Table
                    tableHeaderData={
                        <tr
                            style={{
                                borderBottom: '0.5rem solid white',
                                backgroundColor: '#f4f4f4',
                                marginBottom: '2rem'
                            }}
                            className={styles.tableHeader}
                        >
                            <td>
                                <div>LOL</div>
                            </td>
                            <td style={{ width: '40px' }}>
                                <div>{isMobile ? 'LOL' : ''}</div>
                            </td>
                            <td>
                                <div>{!isMobile ? 'LOL' : ''}</div>
                            </td>
                            {!isMobile && (
                                <td>
                                    <div></div>
                                </td>
                            )}
                        </tr>
                    }
                    tableRowsAmount={5}
                    tableCellsAmmount={isMobile ? 3 : 4}
                    tableCellDataOfCorrespondingRowArray={[...new Array(8)].map((_, index) => [
                        <div className={styles.rowBodyElement} key={index}>
                            TEST
                        </div>,
                        <div className={styles.rowBodyElement} key={index}>
                            {isMobile ? 'TEST' : ''}
                        </div>,
                        !isMobile ? (
                            <div className={styles.rowBodyElement} key={index}>
                                TEST
                            </div>
                        ) : (
                            <div
                                style={{ marginLeft: '40px' }}
                                className={`${styles.rowBodyElement} ${styles.rowBodyElementButtons} d-flex flex-column align-items-center justify-content-center`}
                                key={index}
                            >
                                <div style={{ border: '4px solid rgb(240, 240, 240)' }}>TET</div>
                                <div style={{ border: '4px solid rgb(240, 240, 240)' }}>TEST</div>
                            </div>
                        ),
                        <div
                            className={`${styles.rowBodyElement} ${styles.rowBodyElementButtons} d-flex flex-column align-items-center justify-content-center`}
                            key={index}
                        >
                            <div style={{ border: '4px solid rgb(240, 240, 240)' }}>TEST</div>
                            <div style={{ border: '4px solid rgb(240, 240, 240)' }}>TEST</div>
                        </div>
                    ])}
                    trStyles={{
                        height: '108px',
                        backgroundColor: 'rgb(240, 240, 240)',
                        borderBottom: '10px solid white'
                    }}
                    additionalStyles={{ backgroundColor: 'white' }}
                    skeleton={true}
                />
            );

        case TABLE_SKELETON.DOWNLOADS:
            return (
                <Table
                    tableHeaderData={
                        <tr className={styles.tableHeader}>
                            <td>
                                <div>LOL</div>
                            </td>
                            <td style={{ width: '40px' }}>
                                <div>LOL</div>
                            </td>
                            <td>
                                <div style={{ marginLeft: '1rem', borderRight: '38px solid #f4f4f4' }}>
                                    {!isMobile ? 'LOL' : ''}
                                </div>
                            </td>
                            {!isMobile && (
                                <td>
                                    <div></div>
                                </td>
                            )}
                        </tr>
                    }
                    tableRowsAmount={5}
                    tableCellsAmmount={isMobile ? 3 : 4}
                    tableCellDataOfCorrespondingRowArray={[...new Array(8)].map((_, index) => [
                        <div style={{ marginRight: '2.9rem' }} className={styles.rowBodyElement} key={index}>
                            --------------------------------------
                        </div>,
                        <div style={{ marginRight: '2.9rem' }} className={styles.rowBodyElement} key={index}>
                            -
                        </div>,
                        !isMobile ? (
                            <div style={{ marginLeft: '1rem' }} className={styles.rowBodyElement} key={index}>
                                TEST
                            </div>
                        ) : (
                            <div
                                style={{ marginLeft: '40px' }}
                                className={`${styles.rowBodyElement} ${styles.rowBodyElementButtons} d-flex flex-column align-items-center justify-content-center`}
                                key={index}
                            >
                                <div style={{ border: '4px solid rgb(240, 240, 240)' }}>TET</div>
                                <div style={{ border: '4px solid rgb(240, 240, 240)' }}>TEST</div>
                            </div>
                        ),
                        <div
                            style={{ margin: '0 auto' }}
                            className={`${styles.rowBodyElement} ${styles.rowBodyElementButtons} d-flex flex-column align-items-center justify-content-center`}
                            key={index}
                        >
                            <div style={{ border: '4px solid rgb(240, 240, 240)' }}>TEST</div>
                        </div>
                    ])}
                    trStyles={{
                        height: '108px',
                        backgroundColor: 'rgb(240, 240, 240)',
                        borderBottom: '10px solid white'
                    }}
                    additionalStyles={{ backgroundColor: 'white' }}
                    skeleton={true}
                />
            );

        default:
            return null;
    }
};

TableSkeleton.propTypes = {
    type: PropTypes.string
};

export default TableSkeleton;
