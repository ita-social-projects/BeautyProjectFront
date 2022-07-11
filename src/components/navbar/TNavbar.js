import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {NavDropdown, Navbar, Nav, Container, Image} from "react-bootstrap"
import user_image from "./assets/user.svg"
import businesses_image from "./assets/hair-salon.png"
import order_image from "./assets/price.png"
import support_image from "./assets/customer-service.png"
import statistics_image from "./assets/statistics.png"
import settings_image from "./assets/control.png"
import "./TNavbar.css";


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}


const getLoginInfo = () => {
  const token = getCookie("jwt_session");
  const user_id = token ? jwt_decode(token).user_id : null;

  return {token: token, user_id: user_id};
};


const TNavbar = () => {

  const [userInfo, setUserInfo] = useState(false);
  const data = getLoginInfo();

  const getUserInfo = useCallback(
    async () => {
      await axios({
        method: "get",
        url: "https://g6bcybbjx1.execute-api.eu-central-1.amazonaws.com/api/v1/user/" + data.user_id + "/",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": 'JWT ' + data.token
        }
      }).then(
        (response) => setUserInfo(response.data)
      ).catch(
        (errors) => console.log(errors)
      )
    }, [data]
  );


  
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);



  if (userInfo) { return (
    <Navbar expand="lg" sticky="top" collapseOnSelect bg="light" className="nav-panel">
      <Container>
        <Navbar.Brand href="/">
          BeautyProject
        </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav variant="tabs" className="me-auto">

        <Nav.Link href="/"> <Image title="My Businesses" className="element__image__nav" src={businesses_image} alt="businesses"/> </Nav.Link>
        <Nav.Link href="/"> <Image title="My Orders" className="element__image__nav" src={order_image} alt="orders"/> </Nav.Link>
        <Nav.Link href="/"> <Image title="Business Analytics" className="element__image__nav" src={statistics_image} alt="statistics"/> </Nav.Link>
        <Nav.Link href="/"> <Image title="Settings" className="element__image__nav" src={settings_image} alt="settings"/> </Nav.Link>
        <Nav.Link href="/"> <Image title="Site Support" className="element__image__nav" src={support_image} alt="support"/> </Nav.Link>

      </Nav>

      <Nav className="ms-auto">
      <NavDropdown  
                title={
                    <div >
                        <Image className="user__image__logo" 
                            src={userInfo.avatar} 
                            alt="user pic"
                        />
                    </div>
                } 
                id="basic-nav-dropdown">
                    <NavDropdown.Item className="ms-auto custom_nav_link">{userInfo.first_name}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item a href="#" className="ms-auto custom_nav_link">My Profile</NavDropdown.Item>
                    <NavDropdown.Item a href="#" className="ms-auto custom_nav_link">Sign out</NavDropdown.Item>
            </NavDropdown>
    </Nav>
    </Navbar.Collapse>
        
            </Container>
    </Navbar>
  )
  } else {
    return(
    <Navbar collapseOnSelect expand="sm" bg="light" className="nav-panel">
      <Container>
        <Navbar.Brand href="/">
          BeautyProject
        </Navbar.Brand>


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
        
            </Container>
    </Navbar>

      

    )
  }
  
}

export default TNavbar;