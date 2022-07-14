import { useCallback, useEffect, useState } from "react";
import {NavDropdown, Navbar, Nav, Container, Image, InputGroup, Form, Button} from "react-bootstrap"
import b_image from "./assets/b.png"
import user_image from "./assets/user.svg"
import businesses_image from "./assets/hair-salon.png"
import order_image from "./assets/price.png"
import support_image from "./assets/customer-service.png"
import {getLoginInfo, changeLink, axios_request, BASE_URL} from "../../utils/utils.js"
import "./TNavbar.css";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


const TNavbar = () => {

  const [userInfo, setUserInfo] = useState(false);
  const data = getLoginInfo();

  const navigate = useNavigate()

  const getUserInfo = useCallback(
    async () => {
      await axios_request({
        method: "get",
        url: BASE_URL + "user/" + data.user_id + "/",
      }).then(
        (response) => setUserInfo(response.data)
      ).catch(
        (errors) => console.log(errors)
      )
    }, [data]
  );

  const logOut = () => {
      Cookies.remove("jwt_session")
      navigate("/login")
      window.location.reload()
  }

  useEffect(() => {
    getUserInfo();
  }, []);



  if (userInfo) { return (
    <Navbar expand="lg" sticky="top" collapseOnSelect className="nav-panel">
      <Container fluid>
        <Navbar.Brand href="/">
          <Image src={b_image} className="brand_icon"></Image>
        </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav variant="tabs" className="me-auto">

      <NavDropdown  
                title={
                    <div >
                        <Image className="user__image__logo" 
                            src={changeLink(userInfo.avatar)} 
                            alt="user pic"
                        />
                    </div>
                } 
                id="basic-nav-dropdown">
                    <NavDropdown.Item className="ms-auto custom_nav_link">{userInfo.first_name}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item a href="#" className="ms-auto custom_nav_link">My Profile</NavDropdown.Item>
                    <NavDropdown.Item a href="#" className="ms-auto custom_nav_link" onClick={logOut}>Sign out</NavDropdown.Item>
        </NavDropdown>

        <Nav.Link href="/"> <Image title="My Businesses" className="element__image__nav" src={businesses_image} alt="businesses"/> </Nav.Link>
        <Nav.Link href="/"> <Image title="My Orders" className="element__image__nav" src={order_image} alt="orders"/> </Nav.Link>
        <Nav.Link href="/"> <Image title="Site Support" className="element__image__nav" src={support_image} alt="support"/> </Nav.Link>
        
      </Nav>

      <Container className="me-auto">
      <InputGroup>
      
        <Form.Control
          type="text"
          placeholder="Search for businesses..."
        />
        <Button variant="outline-primary">Search</Button>{' '}
      </InputGroup>
    </Container>
    </Navbar.Collapse>
        
            </Container>
    </Navbar>
  )
  } else {
    return(
    <Navbar collapseOnSelect expand="sm" bg="light" className="nav-panel">
      <Container fluid>
        <Navbar.Brand href="/">
          <Image src={b_image} className="brand_icon"></Image>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">

      <NavDropdown 
                title={
                    <div >
                        <img className="user__image__logo" 
                            src={user_image} 
                            alt="user pic"
                        />
                    </div>
                } 
                className="ms-auto"
                id="basic-nav-dropdown">
                    <NavDropdown.Item className="custom_nav_link">Please, kill me</NavDropdown.Item>
                    <NavDropdown.Item a href="/login" className="custom_nav_link">Sign in</NavDropdown.Item>
                    <NavDropdown.Item a href="/register" className="custom_nav_link">Sign up</NavDropdown.Item>
            </NavDropdown>

      <InputGroup>
      
      <Form.Control
        type="text"
        placeholder="Search for businesses..."
      />
      <Button variant="outline-primary">Search</Button>{' '}
    </InputGroup>
     
            </Navbar.Collapse>
            </Container>
    </Navbar>

      

    )
  }
  
}

export default TNavbar;