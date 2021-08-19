import React from 'react';
import PropTypes from 'prop-types';
import cssClassNamesHelper from '../util/cssClassHelper';

const Table = props => {
    const {
        tableRowsAmount,
        tableCellsAmmount,
        tableCellDataOfCorrespondingRowArray,
        tableHeaderData,
        tableFooterData,
        additionalStyles,
        trStyles,
        skeleton = false
    } = props;

    let tableBodyData = [];
    let td = [];

    const render = () => {
        const renderedTable = renderTable();
        tableBodyData = [];
        td = [];
        return renderedTable;
    };

    const renderTable = () => {
        for (let rows = 0; rows < tableRowsAmount; rows++) {
            for (let column = 0; column < tableCellsAmmount; column++)
                td.push(
                    <td style={{ verticalAlign: 'middle' }} key={`${rows}-${column}`}>
                        {tableCellDataOfCorrespondingRowArray[rows][column]}
                    </td>
                );
            tableBodyData.push(
                <tr style={trStyles} key={rows}>
                    {td.map(jsx => jsx)}
                </tr>
            );
            td = [];
        }
        return tableBodyData.map(jsx => jsx);
    };

    const tableStyles = cssClassNamesHelper([
        'table',
        'table-xl',
        !skeleton && 'table-hover',
        !skeleton && 'table-striped'
    ]);

    return (
        <table style={additionalStyles} className={tableStyles}>
            {tableHeaderData ? <thead>{tableHeaderData}</thead> : null}
            <tbody>{render()}</tbody>
            {tableFooterData ? <thead>{tableFooterData}</thead> : null}
        </table>
    );
};

Table.propTypes = {
    tableRowsAmount: PropTypes.number,
    tableCellsAmmount: PropTypes.number,
    tableCellDataOfCorrespondingRowArray: PropTypes.array,
    tableHeaderData: PropTypes.object,
    tableFooterData: PropTypes.object,
    additionalStyles: PropTypes.object,
    trStyles: PropTypes.object,
    skeleton: PropTypes.bool
};

export default Table;
