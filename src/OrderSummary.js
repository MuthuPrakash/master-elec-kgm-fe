import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import config from './config.json';

export default class OrderSummary extends Component {
  constructor(props) {
    super(props);

    this.pendingOrderColumns = [
      {
        name: "Product Name",
        selector: (row) => row.productName,
        sortable: true,
      },
      {
        name: "Rentee Name",
        selector: (row) => row.renteeName,
      },
      {
        name: "Rentee Id",
        selector: (row) => row.rentalId,
      },
      {
        name: "Rentee Address",
        selector: (row) => row.renteeAddress,
        sortable: true,
      },
      {
        name: "Rentee Phone",
        selector: (row) => row.renteePhone,
      },
      {
        name: "From Date",
        selector: (row) => row.fromDate,
      },
      {
        name: "Price Per Day",
        selector: (row) => row.pricePerDay,
        sortable: true,
      },
      {
        cell: (row) => (
          <Button onClick={() => this.showModal(row)} id={row.rentalId}>
            Return
          </Button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ];

    this.state = {
      showModal: false,
      productId: null,
      productName: "",
      quantity: null,
      rentedItem: null,
      renteeName: "",
      renteeAddress: "",
      rentalId: null,
      renteePhone: null,
      renteeReferral: "",
      returnNotes: "",
      fromDate: null,
      toDate: new Date(),
      pricePerDay: null,
      availableQuantity: null,
      totalAmount: null,
      products: {}
    };
  }

  componentDidMount() {

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .get(config.apiHost + `/api/inventoryRentalNonReturn`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "json",
        credentials: "same-origin",
      })
      .then((response) => {
        this.setState({ pendingOrders: response.data });
      });

      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .get(config.apiHost + `/api/inventory`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "json",
        credentials: "same-origin",
      })
      .then((response) => {
        console.log('products');
        console.log(response.data)
        this.setState({ products: response.data });
      });
  }

  OnUpdate = (row) => {
    var rentinfo = {
      isUpdate: true,
      productId: this.state.rentedItem.productId,
      isReturned: this.state.isReturned,
      returnNotes: this.state.returnNotes,
      toDate: this.state.toDate,
      quantity: this.state.quantity,
      renteeName: this.state.renteeName,
      fromDate: this.state.fromDate,
      pricePerDay: this.state.pricePerDay,
      renteeAddress: this.state.rentedItem.renteeAddress,
      renteePhone: this.state.rentedItem.renteePhone,
      renteeReferral: this.state.rentedItem.renteeReferral,
      productName: this.state.rentedItem.availableQuantity,
      availableQuantity: this.state.rentedItem.availableQuantity,
    };

    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios
      .post(
        config.apiHost + `/api/addInventoryRental`,
        rentinfo,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          responseType: "json",
          credentials: "same-origin",
        }
      )
      .then((res) => {
        console.log("res: ", res);
        console.log("Saved successfully in post access");

        console.log("Saved successfully in post access");
        alert("Success! Bill Added or Updated.");
      })
      .catch(function (error) {
        console.log("error in post");
        alert("Error! Please Add the bill again.");
        if (error.response) {
          console.log("error in post - Request made and server responded"); // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(
            "error in post - The request was made but no response was received"
          ); // The request was made but no response was received
          console.log(error.request);
        } else {
          console.log(
            "error in post - Something happened in setting up the request that triggered an Error"
          ); // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  handleChange = (formField, value) => {
    this.setState({
      [formField]: value,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
      rentedItem: null,
    });
  };

  showModal = (row) => {
    console.log('row');
    console.log(row);
    this.setState({
      showModal: true,
      productId: row.productId,
      productName: row.productName,
      quantity: row.quantity,
      rentedItem: row,
      renteeName: row.renteeName,
      renteeAddress: row.renteeAddress,
      rentalId: row.rentalId,
      renteePhone: row.renteePhone,
      renteeReferral: row.renteeReferral,
      returnNotes: row.returnNotes,
      fromDate: new Date(row.fromDate),
      toDate: new Date(),
      pricePerDay: row.pricePerDay
    });
  };

  assignProduct = () => {

    var rentinfo=  {
    "productId": this.state.productId,
    "isUpdate": true,
    "isReturned": true,
    "renteeName": this.state.renteeName,
    "rentalId": this.state.rentalId,
    "fromDate": this.state.fromDate,
    "pricePerDay": this.state.pricePerDay,
    "renteeAddress": this.state.renteeAddress,
    "renteePhone": this.state.renteePhone,
    "renteeReferral": this.state.renteeReferral,
    "returnNotes": "",
    "toDate": this.state.toDate,
    "productName": this.state.productName,
    "availableQuantity": this.state.products.filter(x => x.productId == this.state.productId)[0].availableQuantity + 1,
    "quantity": this.state.quantity,
    "totalAmount": this.calculateTotalAmount()
    };

    console.log('assignProduct');
    console.log(rentinfo);

    

    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(config.apiHost + `/api/addInventoryRental`, rentinfo, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        , responseType: 'json', credentials: 'same-origin',
    }).then(res => {
        console.log('res: ', res);
        console.log('Saved successfully in post access');
        
    
        console.log('Saved successfully in post access');
        alert('Success! Rental Inventory Added.');
        window.location = '/products';
    }).catch(function (error) {
        console.log('error in post')
        alert('Error! Please Add the bill again.');
        if (error.response) {
            console.log('error in post - Request made and server responded')// Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log('error in post - The request was made but no response was received')// The request was made but no response was received
            console.log(error.request);
        } else {
            console.log('error in post - Something happened in setting up the request that triggered an Error')// Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
    });
    
}

calculateTotalAmount = () => {
  var amount = this.state.pricePerDay * Math.ceil(Math.abs(new Date(this.state.toDate).setHours(0,0,0,0) - new Date(this.state.fromDate).setHours(0,0,0,0)) / (1000 * 60 * 60 * 24));
  return amount;
}

  buildUpdateFormModel = () => {
    return (
      <Modal show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.rentedItem.productName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group>
            <Form.Label>Product Name: </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                this.handleChange("productName", e.target.value);
              }}
              value={this.state.productName}
              placeholder="Product Name"
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rentee Name: </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                this.handleChange("renteeName", e.target.value);
              }}
              value={this.state.renteeName}
              placeholder="Name"
              readOnly
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>From Date: </Form.Label>
            <Form.Control
              type="text"
              value={new Date(this.state.fromDate).toDateString()}
              placeholder="From date"
              readOnly
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>To Date : {new Date(this.state.toDate).toDateString()} </Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => {
                this.handleChange("toDate", e.target.value);
              }}
              value={this.state.toDate}
              placeholder="To Date"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price: </Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                this.handleChange("pricePerDay", e.target.value);
              }}
              value={this.state.pricePerDay}
              placeholder="Price"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Total Amount: </Form.Label>
            <Form.Control
              type="number"
              value= {this.calculateTotalAmount()}
              // value = {0}
              placeholder="Quantity"
              readOnly
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Return Notes : </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                this.handleChange("returnNotes", e.target.value);
              }}
              value={this.state.returnNotes}
              placeholder="Return Notes"
            />
          </Form.Group>

          {this.state.isReturned && (
            <div>
              <Form.Group>
                <Form.Check
                  type={"checkbox"}
                  label={"Returned"}
                  onChange={(e) => {
                    this.handleChange("isReturned", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>To Date: </Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => {
                    this.handleChange("todate", e.target.value);
                  }}
                  value={this.state.fromDate}
                  placeholder="To date"
                  readOnly
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Return Notes: </Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={(e) => {
                    this.handleChange("pricePerDay", e.target.value);
                  }}
                  value={this.state.pricePerDay}
                  placeholder="Notes"
                />
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.assignProduct}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    console.log(JSON.stringify(this.props.names));
    return (
      <div>
        {this.state.rentedItem != null && this.buildUpdateFormModel()}
        <DataTable
          title="Pending Items"
          columns={this.pendingOrderColumns}
          data={this.state.pendingOrders}
          striped={true}
          highlightOnHover={true}
          responsive={true}
          defaultSortField={"Book Id"}
          defaultSortAsc={true}
          pagination={true}
          paginationPerPage={50}
          paginationRowsPerPageOptions={[50, 100, 200]}
        />
      </div>
    );
  }
}
