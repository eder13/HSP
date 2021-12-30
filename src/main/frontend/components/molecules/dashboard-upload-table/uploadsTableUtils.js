import React from 'react';
import { actionSetModal } from '../../../actions/modalActions';
import Button from '../../atoms/button/Button';
import Icon from '../../atoms/icons/Icon';
import ICONSIZE from '../../atoms/icons/iconSize';
import ICONTYPES from '../../atoms/icons/iconTypes';
import uploadStyles from './UploadsTable.module.css';
import { parseSQLDateToJavaScript } from '../../utils/dateParserUtil';
import { BUTTON_VARIANT } from '../../atoms/button/buttonVariants';

export const getUploadTableHeaderData = () => (
    <tr className={uploadStyles.tableHeaderTr}>
        <td className={uploadStyles.tableHeaderTd}>
            <span className={uploadStyles.tableHeaderTdInner}>Name</span>
        </td>
        <td className={uploadStyles.tableHeaderTd}>
            <span className={uploadStyles.tableHeaderTdInner}>Upload Datum</span>
        </td>
        <td className={uploadStyles.tableHeaderTd} />
    </tr>
);

export const getUploadTableData = (data, actionDispatchSetModal) => {
    return data?._embedded?.uploads.map(upload => [
        upload?.name,
        parseSQLDateToJavaScript(upload?.createdOn),
        <div key={upload?.id}>
            <a key={upload?.id} /*className={styles.downloadLinkButton}*/ href={`/download/${upload?.fileName}`}>
                <Icon iconType={ICONTYPES.DOWNLOAD} size={ICONSIZE.SIZE_1_5X} additionalStyles={{ top: '4px' }} />
            </a>
            <Button
                onClick={() => {
                    actionDispatchSetModal({
                        title: upload?.name,
                        id: upload?._links.upload?.href,
                        name: upload?.name
                    });

                    //setModalTitle(`${upload?.name} bearbeiten`);
                    //setModalBody({
                    //    id: upload?._links.upload?.href,
                    //    name: upload?.name
                    //});
                    //modalInstanceCb.show();
                }}
                variant={BUTTON_VARIANT.BTN_WARNING}
                additionalStyles={{
                    width: '48px',
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
