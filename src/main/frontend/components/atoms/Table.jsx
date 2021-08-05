import React from 'react';
import PropTypes from 'prop-types';

const Table = (props) => {
    const {
        tableRowsAmount,
        tableCellsAmmount,
        tableCellDataOfCorrespondingRowArray,
        tableHeaderData,
        tableFooterData
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
            tableBodyData.push(<tr key={rows}>{td.map((jsx) => jsx)}</tr>);
            td = [];
        }

        // TODO try with <Fragment> as key
        return tableBodyData.map((jsx) => jsx);
    };

    return (
        <table className="table table-xl table-hover table-striped">
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
    tableFooterData: PropTypes.object
};

export default Table;
