import React, { Component } from 'react';
import { Badge, Form, Button, Row, Container } from 'react-bootstrap';
import './index.css';


class SheetInfoFinder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookid: 1,
            filteredRecords: [{
                "bookid": '',
                "booknumber": '',
                "booktype": '',
                "cancelnotes": '',
                "sysid": '',
                "iscancel": '',
                "return": '',
                "returnid": "",
                "returnnotes": ""
            }],
            booktype: 'A'
        }
    }

    updateValue(fieldName, value) {
        console.log(fieldName + "  " + value);
        this.setState({
            [fieldName]: value
        })
    }

    onApplySearch = (e) => {
        e.preventDefault();
        let bookidValue = parseInt(this.state.bookid, 10)
        let booktypeValue = this.state.booktype
        console.log('this.state.bookid textbox  value: ', bookidValue)
        console.log('this.state.booktype select  value: ', booktypeValue)
        var filteredRow = this.props.names.filter(function (itm) {
            return itm.bookid == bookidValue && itm.booktype == booktypeValue;
        });
        console.log('filteredRow: ', filteredRow.length)

        this.setState({
            filteredRecords: filteredRow
        });
    }

    render() {
        return (
            <div>
                <div className="app-input">
                    <div>
                        <h2>
                            Sheet Finder<Badge variant="secondary"></Badge>
                        </h2>
                    </div>
                    <div>
                        <Container>
                            <Row>
                                <Form>
                                    <Form.Group className=''>
                                        <Form.Label>Book Type</Form.Label>
                                        <Form.Control as="select" id="bookType" value={this.state.booktype} onChange={(e) => {
                                            this.updateValue('booktype', e.target.value)
                                        }}>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                            <option value="E">E</option>
                                            <option value="F">F</option>
                                            <option value="G">G</option>
                                            <option value="H">H</option>
                                            <option value="I">I</option>
                                            <option value="J">J</option>
                                            <option value="K">K</option>
                                            <option value="L">L</option>
                                            <option value="M">M</option>
                                            <option value="N">N</option>
                                            <option value="O">O</option>
                                            <option value="P">P</option>
                                            <option value="Q">Q</option>
                                            <option value="R">R</option>
                                            <option value="S">S</option>
                                            <option value="T">T</option>
                                            <option value="U">U</option>
                                            <option value="V">V</option>
                                            <option value="W">W</option>
                                            <option value="X">X</option>
                                            <option value="Y">Y</option>
                                            <option value="Z">Z</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Sheet Number</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Sheet Number" onChange={(e) => {
                                            this.updateValue('bookid', e.target.value)
                                        }} />
                                    </Form.Group>
                                    <br />
                                    <Button variant="primary" type="submit" onClick={(e) => {
                                        this.onApplySearch(e)
                                    }}>Find</Button>
                                </Form>
                            </Row>
                        </Container>
                    </div>
                </div>
                <div>
                    {/* <SearchTable names={this.state.filteredRecords} /> */}
                    <Form>
                        <Form.Group className={this.state.filteredRecords.length > 0 ? 'displayNone' : 'displayBlock'}>
                            <Form.Label><h4>{this.state.filteredRecords.length > 0 ? 'Item Exists' : 'No Record Found. Try with a different Sheet No'}</h4></Form.Label>
                        </Form.Group>

                        <Form.Group className={this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].booktype != '' ? 'displayBlock' : 'displayNone'}>
                            <Form.Label><h4>Book Type: {this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].booktype ? this.state.filteredRecords[0].booktype : ''}</h4> <h5></h5> </Form.Label>
                        </Form.Group>
                        <Form.Group className={this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].booknumber != '' ? 'displayBlock' : 'displayNone'}>
                            <Form.Label><h4>Book No: {this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].booknumber ? this.state.filteredRecords[0].booknumber : ''}</h4> <h5></h5></Form.Label>
                        </Form.Group>
                        <Form.Group className={this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].bookid != '' ? 'displayBlock' : 'displayNone'}>
                            <Form.Label><h4>Sheet No: {this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].bookid ? this.state.filteredRecords[0].bookid : ''}</h4> <h5></h5></Form.Label>
                        </Form.Group>
                        <Form.Group className={this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].sysid != '' ? 'displayBlock' : 'displayNone'}>
                            <Form.Label><h4>Computer No: {this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].sysid ? this.state.filteredRecords[0].sysid : ''}</h4> <h5></h5></Form.Label>
                        </Form.Group>
                        <Form.Group className={this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].returnid != '' ? 'displayBlock' : 'displayNone'}>
                            <Form.Label><h4>Return No: {this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].returnid ? this.state.filteredRecords[0].returnid : ''}</h4> <h5></h5></Form.Label>
                        </Form.Group>
                        <Form.Group className={this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].returnnotes != '' ? 'displayBlock' : 'displayNone'}>
                            <Form.Label><h4>Return Notes: {this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].returnnotes ? this.state.filteredRecords[0].returnnotes : ''}</h4> <h5></h5></Form.Label>
                        </Form.Group>
                        <Form.Group className={this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].cancelnotes != '' ? 'displayBlock' : 'displayNone'}>
                            <Form.Label><h4>Cancel Notes: {this.state.filteredRecords.length > 0 && this.state.filteredRecords[0].cancelnotes ? this.state.filteredRecords[0].cancelnotes : ''}</h4> <h5></h5></Form.Label>
                        </Form.Group>

                    </Form>
                </div>
            </div>
        );
    }
}


export default SheetInfoFinder;

