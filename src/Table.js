import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Book Number',
        selector: (row) => row.booknumber,
        sortable: true
    },
    {
        name: 'Book Type',
        selector: (row) => row.booktype
    },
    {
        name: 'Sheet No',
        selector: (row) => row.bookid,
        sortable: true
    },
    {
        name: 'Computer No',
        selector: (row) => row.sysid
    },
    {
        name: 'Is Return',
        selector: (row) => row.isreturn
    },
    {
        name: 'Return No',
        selector: (row) => row.returnid
    },
    {
        name: 'Is Cancel',
        selector: (row) => row.iscancel,
        sortable: true
    },
    {
        name: 'Return Notes',
        selector: (row) => row.returnnotes,
        width: '200px',
        wrap: true
    },
    {
        name: 'Cancel Notes',
        selector: (row) => row.cancelnotes,
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