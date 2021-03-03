import React, { Component } from 'react';
import { Form, Button, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class Input extends Component {

    initialState = {
        booknumber: '',
        booktype: 'A',
        id: '',
        sysid: '',
        isreturn: 0,
        returnid: '',
        returnnotes: '',
        iscancel: 0,
        cancelnotes: ''
    }
    constructor() {
        super();

        this.state = {
            ...this.initialState,
            adminpin: 0,
            loginValidate: false
        }
        // this.setState({ adminpin: 0 })
        // this.setState({ loginValidate: false })
    }

    componentDidMount() {
        this.loginText.focus();
    }

    resetToInitialState = () => {
        this.setState({ ...this.initialState });
    }

    updateValue(fieldName, value) {
        this.setState({
            [fieldName]: value
        })
    }

    onAddClick(e) {
        e.preventDefault();
        this.props.onAddClick(parseInt(this.state.id, 10), parseInt(this.state.sysid, 10), parseInt(this.state.isreturn, 10), (this.state.returnid === "" || this.state.returnid === String.empty) ? "" : this.state.returnid, this.state.booktype, this.state.returnnotes, parseInt(this.state.iscancel, 10), this.state.cancelnotes);
        this.resetToInitialState();
        this.sheetNumberText.value = "";
        this.sheetNumberText.focus();
    }

    loginValidateCheck(e) {
            e.preventDefault();
            var loginCheck = parseInt(this.state.adminpin, 10) === parseInt('4767', 10) ? true : false;
            console.log('loginCheck: ', loginCheck);
            this.setState({ loginValidate: loginCheck });
            loginCheck ? alert('Login Success') : alert('Wrong Admin PIN. Login Failure')
            this.sheetNumberText.focus();
    }

    render() {
        return (
            <div className="app-input">
                <div>
                    <Container>
                        <Row>
                            <Form ref={form => this.messageForm = form} className="alignCenter">
                                <Form.Group controlId="formAdminPin" className={!this.state.loginValidate ? 'displayBlock' : 'displayNone'}>
                                    <Form.Label>Admin PIN</Form.Label>
                                    <Form.Control ref={loginText => this.loginText = loginText} type="text" placeholder="Enter Admin PIN" onChange={(e) => {
                                        console.log('Admin PIN value change: ', e.target.value)

                                        this.updateValue('adminpin', e.target.value)
                                    }} />
                                </Form.Group>

                                <Form.Group controlId="formButtonLogin">
                                    <Button className={!this.state.loginValidate ? 'displayBlock' : 'displayNone'} variant="info" type="submit" onClick={(e) => this.loginValidateCheck(e)}>Login</Button>
                                </Form.Group>

                                <Form.Group controlId="formBookNumber" className='displayNone'>
                                    <Form.Label>Book Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Book Number" onChange={(e) => {
                                        this.updateValue('booknumber', e.target.value)
                                    }} />
                                </Form.Group>
                                <Form.Group controlId="formBookType" className='displayNone'>
                                    <Form.Label>Book Type</Form.Label>
                                    <Form.Control as="select" onChange={(e) => {
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
                                <Form.Group controlId="formBookId" className={this.state.loginValidate ? 'displayBlock' : 'displayNone'}>
                                    <Form.Label>1 + 2 Sheet No</Form.Label>
                                    <Form.Control ref={sheetNumberText => this.sheetNumberText = sheetNumberText} type="text" placeholder="Enter 1 + 2 Sheet No" onChange={(e) => {
                                        this.updateValue('id', e.target.value)
                                    }} />
                                </Form.Group>
                                <br />

                                <Form.Group controlId="formIsCancel" className={this.state.loginValidate ? 'displayBlock' : 'displayNone'}>
                                    <Form.Label>Is Cancel?</Form.Label>
                                    <Form.Control as="select" onChange={(e) => {
                                        this.updateValue('iscancel', e.target.value)
                                    }}>
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </Form.Control>
                                </Form.Group>
                                <br />
                                <Form.Group controlId="formCancelNotes" className={this.state.iscancel ? 'displayBlock' : 'displayNone'}>
                                    <Form.Label>Cancel Notes</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Cancel Notes" onChange={(e) => {
                                        this.updateValue('cancelnotes', e.target.value)
                                    }} />
                                </Form.Group>
                                <br />



                                <Form.Group controlId="formsysid" className={this.state.loginValidate ? 'displayBlock' : 'displayNone'}>
                                    <Form.Label>Computer No</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Computer No" onChange={(e) => {
                                        this.updateValue('sysid', e.target.value)
                                    }} />
                                </Form.Group>
                                <br />
                                <Form.Group controlId="formIsReturn" className={this.state.loginValidate ? 'displayBlock' : 'displayNone'}>
                                    <Form.Label>Is Return?</Form.Label>
                                    <Form.Control as="select" onChange={(e) => {
                                        this.updateValue('isreturn', e.target.value)
                                    }}>
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </Form.Control>
                                </Form.Group>
                                <br />
                                <Form.Group controlId="formReturnId" className={this.state.isreturn ? 'displayBlock' : 'displayNone'}>
                                    <Form.Label>Return No</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Return No" onChange={(e) => {
                                        this.updateValue('returnid', e.target.value)
                                    }} />
                                </Form.Group>
                                <br />
                                <Form.Group controlId="formReturnNotes" className={this.state.isreturn ? 'displayBlock' : 'displayNone'}>
                                    <Form.Label>Return Notes</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Return Notes" onChange={(e) => {
                                        this.updateValue('returnnotes', e.target.value)
                                    }} />
                                </Form.Group>
                                <br />
                                <Button className={this.state.loginValidate ? 'displayBlock' : 'displayNone'} variant="info" type="submit" onClick={(e) => {
                                    e.preventDefault();
                                    console.log('loginValidate button click')
                                    this.onAddClick(e)
                                    this.resetToInitialState();
                                }}>Add</Button>
                            </Form>
                        </Row>
                    </Container>

                </div>
            </div>
        );
    }
}

export default Input;

