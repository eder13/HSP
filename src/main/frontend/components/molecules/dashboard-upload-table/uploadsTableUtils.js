import React from 'react';
import Button from '../../atoms/button/Button';
import Icon from '../../atoms/icons/Icon';
import ICONSIZE from '../../atoms/icons/iconSize';
import ICONTYPES from '../../atoms/icons/iconTypes';
import uploadStyles from './UploadsTable.module.css';
import { parseSQLDateToJavaScript } from '../../utils/dateParserUtil';
import { BUTTON_VARIANT } from '../../atoms/button/buttonVariants';
import { MODAL_TYPE } from '../../../constants/modalTypes';

export const getUploadTableHeaderData = () => (
    <tr className={uploadStyles.tableHeaderTr}>
        <td className={uploadStyles.tableHeaderTdName}>
            <span className={uploadStyles.tableHeaderTdInner}>
                <strong>Name</strong>
            </span>
        </td>
        <td className={uploadStyles.tableHeaderTdUploadDate}>
            <span className={uploadStyles.tableHeaderTdInner}>
                <strong>Upload Datum</strong>
            </span>
        </td>
        <td className={uploadStyles.tableHeaderTdActions} />
    </tr>
);

export const getUploadTableData = (data, actionDispatchSetModal) => {
    return data?._embedded?.uploads.map(upload => [
        <span>{upload?.name}</span>,
        parseSQLDateToJavaScript(upload?.createdOn),
        <div className="d-flex flex-column gap-3 align-items-center" key={upload?.id}>
            <a key={upload?.id} className="pt-2" href={`/download/${upload?.fileName}`}>
                <Icon iconType={ICONTYPES.DOWNLOAD} size={ICONSIZE.SIZE_1_5X} additionalStyles={{ top: '4px' }} />
            </a>
            <Button
                onClick={() => {
                    actionDispatchSetModal({
                        title: upload?.name,
                        id: upload?._links.upload?.href,
                        type: MODAL_TYPE.UPLOAD
                    });
                }}
                variant={BUTTON_VARIANT.BTN_WARNING}
                additionalStyles={{
                    width: '42px',
                    height: '40px',
                    margin: '5px',
                    color: '#ff9800',
                    border: '2px solid',
                    boxShadow: 'none',
                    backgroundColor: 'white'
                }}
            >
                <Icon
                    iconType={ICONTYPES.EDIT_PEN}
                    additionalStyles={{ marginLeft: '1px', transition: 'color 0.4s' }}
                />
            </Button>
        </div>
    ]);
};
