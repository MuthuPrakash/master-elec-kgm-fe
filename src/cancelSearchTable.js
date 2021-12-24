import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Book Id',
    selector: (row) => row.bookid,
    sortable: true,
    center: true
  },
  {
    name: 'Cancel Notes',
    selector: (row) => row.cancelnotes,
    sortable: true,
    center: true
  },

];

class CacnelSearchTable extends Component {
  render() {
    return (
      <DataTable
        title="Cancelled Items"
        columns={columns}
        data={this.props.names}
        striped={true}
        highlightOnHover={true}
        responsive={true}
        defaultSortField={"Book Id"}
        defaultSortAsc={false}
        center={true}
        pagination={true}
        paginationPerPage={50}
        paginationRowsPerPageOptions={[50, 100, 200]}
      />
    )
  }
};

export default CacnelSearchTable;