import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Book Number',
        selector: 'booknumber',
        sortable: true
    },
    {
        name: 'Book Type',
        selector: 'booktype'
    },
    {
        name: 'Sheet No',
        selector: 'bookid',
        sortable: true
    },
    {
        name: 'Computer No',
        selector: 'sysid'
    },
    {
        name: 'Is Return',
        selector: 'isreturn'
    },
    {
        name: 'Return No',
        selector: 'returnid'
    },
    {
        name: 'Is Cancel',
        selector: 'iscancel',
        sortable: true
    },
    {
        name: 'Return Notes',
        selector: 'returnnotes',
        width: '200px',
        wrap: true
    },
    {
        name: 'Cancel Notes',
        selector: 'cancelnotes',
        width: '200px',
        wrap: true
    }
];

class Table extends Component {
    render() {
        console.log(JSON.stringify(this.props.names));
        return (
            <div>
                <DataTable
                    title="Book Items"
                    columns={columns}
                    data={this.props.names}
                    striped={true}
                    highlightOnHover={true}
                    responsive={true}
                    defaultSortField={"Book Id"}
                    defaultSortAsc={true}
                    pagination={true}
                    paginationPerPage={50}
                    paginationRowsPerPageOptions={[50, 100, 200]}
                />
            </div>);
    }
}


export default Table;