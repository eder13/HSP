import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsMobile } from '../../selectors/clientInfoSelector';
import Table from './Table';
import styles from './TableSkeleton.module.css';

const TableSkeleton = () => {
    const isMobile = useSelector(selectIsMobile);

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
                        <div>{!isMobile ? 'LOL' : ''}</div>
                    </td>
                    {!isMobile && (
                        <td>
                            <div></div>
                        </td>
                    )}
                </tr>
            }
            tableRowsAmount={8}
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
            trStyles={{ height: '108px', backgroundColor: 'rgb(240, 240, 240)', borderBottom: '10px solid white' }}
            additionalStyles={{ backgroundColor: 'white' }}
            skeleton={true}
        />
    );
};

export default TableSkeleton;
