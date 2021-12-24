import React, { Component } from 'react';
import { Badge, Form, Button, Row, Container } from 'react-bootstrap';
import SearchTable from './searchTable';
import './index.css';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromValue: '',
            toValue: '',
            isReturn: 1,
            filteredRecords: [],
            booknumber: '1',
            finalDropDownValues: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.names.length !== prevProps.names.length) {
            var ddCount = {};
            this.props.names.forEach(element => {
                ddCount[element.booknumber] = (ddCount[element.booknumber] || 0) + 1
            });

            var finalDropDownValues = [];

            for(var key in ddCount){
                if(ddCount.hasOwnProperty(key) && ddCount[key] < 50){
                    finalDropDownValues.push(key);
                }
            }
            this.setState({
                finalDropDownValues: finalDropDownValues
            })
        }
    }

    updateValue(fieldName, value) {
        console.log(fieldName + "  " + value);
        this.setState({
            [fieldName]: value
        })
    }

    fillDDValues = () => {
        var dropDownItems = [];
        this.state.finalDropDownValues.forEach(element => {
            dropDownItems.push(<option value={element}>{element}</option>)
        })
        return dropDownItems
    }

    onApplySearch = (e) => {
        e.preventDefault();
        let bookNumberSelected = parseInt(this.state.booknumber, 10);
        let fromValue = 1;
        let toValue = 50;
        console.log('this.state.booknumber dropdown select value: ', parseInt(this.state.booknumber, 10))
        if (bookNumberSelected > 1) {
            fromValue = ((bookNumberSelected - 1) * 50) + 1;
            toValue = bookNumberSelected * 50;
        }
        if (!parseInt(fromValue, 10) || !parseInt(toValue, 10)) {
            alert("Please enter valid value for search");
        }
        if (parseInt(fromValue, 10) > parseInt(toValue, 10)) {
            alert("from value should be less than the to value");
        }
        var filteredRows = [];
        for (var i = fromValue; i <= toValue; i++) {
            // eslint-disable-next-line
            var hasReturnRecord = this.props.names.filter((item) => {
                return item.bookid === i;
            });
            if (hasReturnRecord.length === 0) {
                filteredRows.push({
                    bookid: i
                })
            }
        }

        this.setState({
            filteredRecords: filteredRows
        });
    }

    render() {
        return (
            <div>
                <div className="app-input">
                    <div>
                        <h2>
                            Missing Sheets<Badge variant="secondary"></Badge>
                        </h2>
                    </div>
                    <div>
                        <Container>
                            <Row >
                                <Form>
                                    <Form.Group className='displayNone'>
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

                                    <br />

                                    <Form.Group>
                                        <Form.Label>Book Number</Form.Label>
                                        <Form.Control as="select" id="booknumber" value={this.state.booknumber} onChange={(e) => {
                                            this.updateValue('booknumber', e.target.value)
                                        }}>
                                            <option value='0'>Click to select!</option>
                                            {
                                                this.fillDDValues()
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className='displayNone'>
                                        <Form.Label>From</Form.Label>
                                        <Form.Control type="text" placeholder="Enter From Value" onChange={(e) => {
                                            this.updateValue('fromValue', e.target.value)
                                        }} />
                                    </Form.Group>
                                    <Form.Group className='displayNone'>
                                        <Form.Label>To</Form.Label>
                                        <Form.Control type="text" placeholder="Enter To Value" onChange={(e) => {
                                            this.updateValue('toValue', e.target.value)
                                        }} />
                                    </Form.Group>
                                    <Button variant="success" type="submit" onClick={(e) => {
                                        this.onApplySearch(e)
                                    }}>Search</Button>
                                </Form>
                            </Row>
                        </Container>
                    </div>
                </div>
                <div>
                    <SearchTable names={this.state.filteredRecords} />
                </div>
            </div>
        );
    }
}


export default Search;

