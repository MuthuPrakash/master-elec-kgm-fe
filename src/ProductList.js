import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import Product from './Product';

export default class ProductList extends Component {

    constructor(props)
    {
        super(props);
        
        this.state= {
            products:[]
        }
    }

    componentDidMount()
    {        
    //     axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    //     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    //    axios.get('https://master-electricals.herokuapp.com/api/inventory',{
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*'
    //     }
    //     , responseType: 'json', credentials: 'same-origin',
    //    })
    //     .then(response => {
    //         response.header("Access-Control-Allow-Origin", "*");
    //         this.setState({ products: response.data })
    //     });


    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    //     axios.post(`https://master-electricals.herokuapp.com/api/inventory`, {}, {
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         }
    //         , responseType: 'json', credentials: 'same-origin',
    //     }).then(res => {
          

           
    //         console.log('Saved successfully in post access');
    //         alert('Success! Bill Added or Updated.');
    //     }).catch(function (error) {
    //         console.log('error in post')
    //         alert('Error! Please Add the bill again.');
    //         if (error.response) {
    //             console.log('error in post - Request made and server responded')// Request made and server responded
    //             console.log(error.response.data);
    //             console.log(error.response.status);
    //             console.log(error.response.headers);
    //         } else if (error.request) {
    //             console.log('error in post - The request was made but no response was received')// The request was made but no response was received
    //             console.log(error.request);
    //         } else {
    //             console.log('error in post - Something happened in setting up the request that triggered an Error')// Something happened in setting up the request that triggered an Error
    //             console.log('Error', error.message);
    //         }
    //     });



        this.setState({
            products: [{
                "_id":"6151bac83900df41a44dd66a","productId":1,"productName":"Drilling Machine","rentalPricePerDay":"500","totalQuantity":"5","availableQuantity":4},
                {"_id":"6151bb6a3900df41a44dd66d","productId":2,"productName":"Welding Machine","rentalPricePerDay":"800","totalQuantity":"3","availableQuantity":"3"}
            ]
        })
    }

    renderNoProducts = () => {
        return (
            <div>
                <span> No products available !! </span>
            </div>
        )
    }
    
    renderNoProducts = () => {
        return (
            <Container>
              <Row xs={1} md={2} lg={3} className="g-4">
                    {
                        this.state.products.map((product) =>{
                            return <Product info={product} /> 
                        })
                    }
                    <div className='additionRowCard'></div>
                </Row>
            </Container>
        )
    }

    render(){
        return(
        <div>
        {
            this.state.products && this.state.products.length < 1 ? this.renderNoProducts() : this.renderNoProducts()
        }   
        </div>)
    }
}