//import editIcon from '../../assets/edit_icon.png';

// TODO: User Card for Information Corner
/* const userCard = (
    <div>
        <div className="card">
            <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                    <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Admin"
                        className="rounded-circle"
                        width="100"
                    />
                    <div className="mt-3">
                        <h5>{username}</h5>
                        <span>
                            <strong>Mitglied seit: </strong>
                            {joinedDate}
                        </span>
                        <p>
                            <strong>Uploads: </strong>
                            {data?.userData?.uploadCount}
                        </p>
                        <a href="#">Alle Unterrichtsmaterialien</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
); */

{
    /* <Image
                    additionalStyles={{ filter: 'brightness(0) invert(1)' }}
                    image={editIcon}
                    width={22}
                    height={21}
                    alt="edit icon"
                /> */
}

// TODO: Refactor Edit Stuff with an Overlay
/*const actionButtonEditActive = (
        <>
            <Button variant={BUTTON_VARIANT.BTN_SUCCESS} additionalStyles={{ margin: '5px' }}>
                <i style={{ width: '20px', height: '18px' }} className={`icono-check ${styles.iconoCheckOverwrite}`} />
            </Button>
            <Button
                onClick={() => setEditMode(false)}
                variant={BUTTON_VARIANT.BTN_DANGER}
                additionalStyles={{ margin: '5px' }}
            >
                <i style={{ width: '20px', height: '18px' }} className="icono-cross" />
            </Button>
        </>
    );*/

/* useEffect(() => {
        setActionButtons(editMode ? actionButtonEditActive : actionButtonDefault);
        if (editMode) {
            $inputField.current.focus();
        }
    }, [editMode]); */

//const $inputField = useRef();
//const [editMode, setEditMode] = useState(false);
/* const [actionButtons, setActionButtons] = useState(actionButtonDefault); */

/**
 * Table Skeleton
 *
 */

/*

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIsMediaXS } from '../../selectors/clientInfoSelector';
import Table from './Table';
import styles from './TableSkeleton.module.css';
import TABLE_SKELETON from './tableSkeletonType';

const TableSkeleton = ({ type }) => {
    const isMobile = useSelector(selectIsMediaXS);

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


*/

// and corresponding module css

/*

.tableHeader {
    height: 41.5px;
    border-bottom: 0.5rem solid white;
    background-color: #f4f4f4;
    margin-bottom: 2rem;
}

.tableHeader td {
    vertical-align: middle;
}

.tableHeader td div {
    background-color: #e4e4e4;
    width: 100px;
    height: 100%;
    color: rgba(0, 0, 0, 0);
    background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 20px, #ddd 20px);
    animation: shine-tableheader 1.6s infinite;
}

.rowBodyElement {
    background-color: #e4e4e4;
    color: rgba(0, 0, 0, 0);
    position: relative;
    background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 20px, #ddd 20px);
    animation: shine-tablebody-text 1.6s infinite;
}

.rowBodyElement.rowBodyElementButtons {
    width: 48px;
    margin-left: 68px;
}

.rowBodyElement.rowBodyElementButtons > div {
    width: 48px;
    height: 40px;
    background-image: linear-gradient(90deg, #ddd 20px, #e8e8e8 60px, #ddd 120px);
    animation: shine-tablebody-buttons 1.6s infinite;
}

@keyframes shine-tableheader {
    0% {
        background-position-x: 0px;
    }
    40%,
    100% {
        background-position: 80px;
    }
}

@keyframes shine-tablebody-text {
    0% {
        background-position-x: 0px;
    }
    40%,
    100% {
        background-position: 162px;
    }
}

@keyframes shine-tablebody-buttons {
    0% {
        background-position-x: 0px;
    }
    40%,
    100% {
        background-position: 40px;
    }
}

/* @keyframes shine-lines {
    0% {
        background-position-x: 0px;
    }
    40%,
    100% {
        background-position: 180px;
        background-image: linear-gradient(90deg, #e8e8e8 0px, #ddd 40px, #ddd 140px);
    }
} */
