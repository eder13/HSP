import React from 'react';
import PropTypes from 'prop-types';
import cssClassNamesHelper from '../../utils/cssClassNamesHelper';

const Table = props => {
    const {
        tableRowsAmount,
        tableCellsAmmount,
        tableCellDataOfCorrespondingRowArray,
        tableHeaderData,
        tableFooterData,
        additionalStyles,
        trStyles,
        skeleton = false,
        className = ''
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
        className,
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
    tableHeaderData: PropTypes.object.isRequired,
    tableRowsAmount: PropTypes.number.isRequired,
    tableCellsAmmount: PropTypes.number.isRequired,
    tableCellDataOfCorrespondingRowArray: PropTypes.array.isRequired,
    tableFooterData: PropTypes.object,
    className: PropTypes.string,
    additionalStyles: PropTypes.object,
    trStyles: PropTypes.object,
    skeleton: PropTypes.bool
};

export default Table;
