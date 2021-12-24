import React, { Component } from "react";
import {Col, Card, Button, Badge, Form, Container, Modal} from 'react-bootstrap';
import axios from 'axios'
import config from './config.json';

export default class Product extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            showModal : false,
            rentalId: Date.now(),             
            renteeName: "",
            renteeAddress: "",
            renteePhone: "",
            renteeReferral: "",
            quantity: 1,
            pricePerDay: props.info.rentalPricePerDay,
            fromDate: new Date()
        }


    }

    handleClose = () => {
        this.setState({
                showModal : false
            });
    }

    showModal = () => {
        this.setState({
            showModal: true
        })
    }

    handleChange = (formField, value) => {
        this.setState({
            [formField]: value
        })
    }

    assignProduct = () => {

        var rentinfo=  {
        "productId": this.props.info.productId,
        "isUpdate": false,
        "isReturned": false,
        "renteeName": this.state.renteeName,
        "rentalId": this.state.rentalId,
        "fromDate": this.state.fromDate,
        "pricePerDay": this.state.pricePerDay,
        "renteeAddress": this.state.renteeAddress,
        "renteePhone": this.state.renteePhone,
        "renteeReferral": this.state.renteeReferral,
        "returnNotes": "",
        "toDate": null,
        "productName": this.props.info.productName,
        "availableQuantity": this.props.info.availableQuantity - this.state.quantity,
        "quantity": this.state.quantity
        };


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

    render(){
        return(
            <Container className="productCard">
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.info.productName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group >
                            <Form.Label>Rentee Name: </Form.Label> 
                            <Form.Control type="text" onChange={(e) => { this.handleChange('renteeName', e.target.value)}} value={this.state.renteeName} placeholder="Name"/>           
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Rentee Address: </Form.Label> 
                            <Form.Control as="textarea" placeholder="Address"  onChange={(e) => { this.handleChange('renteeAddress', e.target.value)}} value={this.state.renteeAddress}/>       
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Rentee Phone Number: </Form.Label> 
                            <Form.Control type="number" onChange={(e) => { this.handleChange('renteePhone', e.target.value)}} value={this.state.renteePhone} placeholder="Phone number"/>           
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Rentee Referal: </Form.Label> 
                            <Form.Control type="text" onChange={(e) => { this.handleChange('renteeReferral', e.target.value)}} value={this.state.renteeReferral} placeholder="Rentee referal"/>           
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>From Date: </Form.Label> 
                            <Form.Control type="date"  onChange={(e) => { this.handleChange('fromDate', e.target.value)}} value={this.state.fromDate} placeholder="From date"/>           
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Quantity (Available: 3): </Form.Label> 
                            <Form.Control type="number" onChange={(e) => { this.handleChange('quantity', e.target.value)}} value={this.state.quantity} placeholder="Quantity"/>           
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Price: </Form.Label> 
                            <Form.Control type="number" onChange={(e) => { this.handleChange('pricePerDay', e.target.value)}} value={this.state.pricePerDay} placeholder="Price"/>           
                        </Form.Group>

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
                
                <Col key={this.props.productId}> 
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{this.props.info.productName}</Card.Title>
                            <Card.Subtitle>{this.props.info.productSubTitle}</Card.Subtitle>
                            <Badge pill bg="primary">Available:  {this.props.info.availableQuantity}</Badge>
                            <Card.Text> Total:  {this.props.info.totalQuantity}</Card.Text>
                            <Card.Text>Price Per Day : {this.props.info.rentalPricePerDay}</Card.Text>
                            {this.props.info.availableQuantity > 0 && <Button variant="primary" onClick={this.showModal}>Rent</Button> }
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        )
    }
}