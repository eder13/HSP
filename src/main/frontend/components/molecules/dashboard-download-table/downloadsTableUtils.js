import React from 'react';
import Icon from '../../atoms/icons/Icon';
import ICONSIZE from '../../atoms/icons/iconSize';
import ICONTYPES from '../../atoms/icons/iconTypes';
import downloadStyles from './DownloadsTable.module.css';
import { parseSQLDateToJavaScript } from '../../utils/dateParserUtil';

export const getDownloadTableHeaderData = () => (
    <tr className={downloadStyles.tableHeaderTr}>
        <td className={downloadStyles.tableHeaderTd}>
            <span className={downloadStyles.tableHeaderTdInner}>Name</span>
        </td>
        <td className={downloadStyles.tableHeaderTd}>
            <span className={downloadStyles.tableHeaderTdInner}>Upload Datum</span>
        </td>
        <td className={downloadStyles.tableHeaderTd}>
            <span className={downloadStyles.tableHeaderTdInner}>AutorIn</span>
        </td>
        <td>{}</td>
    </tr>
);

export const getDownloadTableData = data => {
    return data?._embedded?.uploads.map(download => [
        download?.name,
        parseSQLDateToJavaScript(download?.createdOn),
        'Maximilian LangerNameWiederHier',
        <a key={download?.id} href={`/download/${download?.fileName}`}>
            <Icon iconType={ICONTYPES.DOWNLOAD} size={ICONSIZE.SIZE_1_5X} additionalStyles={{ top: '4px' }} />
        </a>
    ]);
};
