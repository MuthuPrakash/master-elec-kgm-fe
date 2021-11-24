import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form  } from 'react-bootstrap'
import axios from 'axios'

export default class OrderSummary extends Component {
    
    constructor(props)
    {
        super(props);

        this.pendingOrderColumns = [ {
            name: 'Product Name',
            selector: 'productName',
            sortable: true
        },
        {
            name: 'Rentee Name',
            selector: 'renteeName'
        },
        {
            name: 'Rentee Address',
            selector: 'renteeAddress',
            sortable: true
        },
        {
            name: 'Rentee Phone',
            selector: 'renteePhone'
        },
        {
            name: 'From Date',
            selector: 'fromDate'
        },
        {
            name: 'Price Per Day',
            selector: 'pricePerDay',
            sortable: true
        }, 
        {
            cell:(row) => <Button onClick={() => this.showModal(row)} id={row.rentalId}>Return</Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
        ];


        this.state = {
            showModal : false,
            renteeName: '',
            fromDate:'',
            toDate: '',
            pricePerDay:null,
            returnNotes: '',
            isReturned: false, 
            rentedItem : null,
            quantity:0
        }

    }

    componentDidMount(){
        var pendingOrders = [
            {"_id":"618b7238b10d7188141f9659","productId":1,"renteeName":"Eswaran","fromDate":"2021-11-09T18:30:00.000Z","isReturned":false,"pricePerDay":400,"renteeAddress":"Agilandapuram Kangayam","renteePhone":"9842959789","returnNotes":"","toDate":"1899-12-31T18:38:50.000Z","rentalId":"1","productName":"Drilling Machine","isUpdate":false}
        ]

        this.setState({
            pendingOrders: pendingOrders
        });
    }

    OnUpdate = (row) => {
        var rentinfo=  {
            "isUpdate": true,
            "productId": this.state.rentedItem.productId,
            "isReturned": this.state.isReturned,
            "returnNotes": this.state.returnNotes,
            "toDate": this.state.toDate,
            "quantity": this.state.quantity,
            "renteeName": this.state.renteeName,
            "fromDate": this.state.fromDate,
            "pricePerDay": this.state.pricePerDay,
            "renteeAddress": this.state.rentedItem.renteeAddress,
            "renteePhone": this.state.rentedItem.renteePhone,
            "renteeReferral": this.state.rentedItem.renteeReferral,
            "productName": this.state.rentedItem.availableQuantity,
            "availableQuantity": this.state.rentedItem.availableQuantity,
            
            };
    
    
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios.post(`https://master-electricals.herokuapp.com/api/addInventoryRental`, rentinfo, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
                , responseType: 'json', credentials: 'same-origin',
            }).then(res => {
                console.log('res: ', res);
                console.log('Saved successfully in post access');
                
            
                console.log('Saved successfully in post access');
                alert('Success! Bill Added or Updated.');
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

    handleChange = (formField, value) => {
        this.setState({
            [formField]: value
        })
    }

    handleClose = () => {
        this.setState({
                showModal : false, 
                rentedItem : null
            });
    }

    showModal = (row) => {
        this.setState({
            showModal: true, 
            rentedItem: row,
            renteeName: row.renteeName, 
            fromDate:new Date(row.fromDate),
            pricePerDay:row.pricePerDay,
        })
        console.log(row);
    }

    buildUpdateFormModel =() => {
        return (
            <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.rentedItem.productName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group >
                            <Form.Label>Rentee Name: </Form.Label> 
                            <Form.Control type="text" onChange={(e) => { this.handleChange('renteeName', e.target.value)}} value={this.state.renteeName} placeholder="Name" readOnly/>           
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>From Date: </Form.Label> 
                            <Form.Control type="date"  onChange={(e) => { this.handleChange('fromDate', e.target.value)}} value={this.state.fromDate} placeholder="From date" readOnly/>           
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Quantity (Available: 3): </Form.Label> 
                            <Form.Control type="number" onChange={(e) => { this.handleChange('quantity', e.target.value)}} value={this.state.quantity} placeholder="Quantity" readOnly/>           
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Price: </Form.Label> 
                            <Form.Control type="number" onChange={(e) => { this.handleChange('pricePerDay', e.target.value)}} value={this.state.pricePerDay} placeholder="Price"/>           
                        </Form.Group>
                        {

                            this.state.isReturned && (
                                <div>
                                    <Form.Group > 
                                        <Form.Check type={'checkbox'}  label={'Returned'} onChange={(e) => { this.handleChange('isReturned', e.target.value)}}/>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>To Date: </Form.Label> 
                                        <Form.Control type="date"  onChange={(e) => { this.handleChange('todate', e.target.value)}} value={this.state.fromDate} placeholder="To date" readOnly/>           
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Return Notes: </Form.Label> 
                                        <Form.Control as="textarea" onChange={(e) => { this.handleChange('pricePerDay', e.target.value)}} value={this.state.pricePerDay} placeholder="Notes"/>           
                                    </Form.Group>
                                </div>
                            )
                        
                        }
                        

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
        )
    }

    render() {
        console.log(JSON.stringify(this.props.names));
        return (
            <div>
                {
                    this.state.rentedItem != null &&  this.buildUpdateFormModel()
                }
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
            </div>);
    }
}