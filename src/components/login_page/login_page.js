import React from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import loginIcon from './assets/img/user.svg';
import uiImg from './assets/img/login.svg';
import './login_page.css';

export class LoginPage extends React.Component{
    render() {
        return (
            <>
                <Container className="mt-5">
                    <Row>
                        <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3">
                            <img className="icon-img" src={loginIcon} alt="icon"/>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>

                                <Button variant="primary btn-block" type="submit">Login</Button>

                                <div className="text-left mt-3">
                                    <a href="#"><small className="reset">Password Reset</small></a> II
                                    <a href="#"><small className="reset ml-2"> Quick Recover</small></a>
                                </div>
                            </Form>
                        </Col>

                        <Col lg={8} md={6} sm={12}>
                            <img className="w-100" src={uiImg} alt=""/>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}