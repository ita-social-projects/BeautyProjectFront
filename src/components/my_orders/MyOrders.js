import React, { useCallback, useState, useEffect } from "react";
import {
  getLoginInfo,
  changeLink,
  axios_request,
  BASE_URL,
} from "../../utils/utils.js";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import date_image from "./assets/date.png"
import time_image from "./assets/time.png"
import "./MyOrders.css";

const OrderView = (props) => {

  const [specialistInfo, setSpecialistInfo] = useState({first_name: "None"});

  const getSpecialistInfo = useCallback(
    async () => {
      await axios_request({
        method: "get",
        url: BASE_URL + "specialist/" + props.obj.specialist + "/",
      }).then(
        (response) => setSpecialistInfo(response.data)
      ).catch(
        (errors) => console.log(errors)
      )
    }, []
  );

  useEffect(() => {
    getSpecialistInfo();
  }, []);

  let [date, time] = props.obj.start_time.split('T');
  time = time.split('+')[0];

  return (
    <Tab.Pane eventKey={props.node}>
    <Card className="card-order">
      <Card.Header className="card-order">
      <Row className="row-order">
        <Col className="order-name">
        Order No. {props.obj.id}
        </Col>
        <Col className="time-date-ord">
          <Image src={date_image} className="micro_image_ord"></Image> {date} <Image src={time_image} className="micro_image_ord"></Image> {time}
        </Col>
      </Row>
        </Card.Header>
      <Card.Body>
        <Card.Text>
          <Container fluid>

            {props.obj.note ? "Notes: " + props.obj.note : "There is no notes in this order..."}
          </Container>
        </Card.Text>
        <br></br>
        <Container fluid>
        <Row className="row-order">
              <Col className="row-order">
                <Button className="button-col-ord btn-ord-open" variant="primary">Open order</Button>
                <Button className="button-col-ord btn-ord-delete" variant="primary">Cancel order</Button>
              </Col>
              <Col className="row-order">Specialist: <Image className="order-img-spec" src= {specialistInfo.avatar ? changeLink(specialistInfo.avatar) : '#'}/> {specialistInfo.first_name}</Col>
            </Row>
        </Container>
      </Card.Body>
    </Card>
    </Tab.Pane>
  )

};

const MyOrders = () => {
  const data = getLoginInfo();

  const [customerOrders, setCustomerOrders] = useState([]);
  const [specialistOrders, setSpecialistOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = useCallback(async () => {
    const response = await axios_request({
      method: "get",
      url: BASE_URL + "user/" + data.user_id + "/",
    });

    const customerOrdersPromises = response.data.customer_exist_orders.map(
      (el) => axios_request({ url: changeLink(el) })
    );
    const specialistOrdersPromises = response.data.specialist_exist_orders.map(
      (el) => axios_request({ url: changeLink(el.url) })
    );

    const customerOrders = await Promise.all(customerOrdersPromises);
    const specialistOrders = await Promise.all(specialistOrdersPromises);

    setCustomerOrders(customerOrders);
    setSpecialistOrders(specialistOrders);
  }, [data]);

  const result = [
    ...customerOrders.map((el) => (
      <OrderView key={el.data.id} node="first" obj={el.data} />
    )),
    ...specialistOrders.map((el) => (
      <OrderView key={el.data.id} node="second" obj={el.data} />
    )),
  ];

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first" href="#">
                My Customer Orders <Badge bg="secondary">{customerOrders.length}</Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second" href="#">
                My Specialist Orders <Badge bg="secondary">{specialistOrders.length}</Badge>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>{result}</Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default MyOrders;