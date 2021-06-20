import React, { Component } from "react";
import { Link } from "react-router-dom";
import {NavLink} from 'react-router-dom'
import { motion } from "framer-motion";
import AuthService from "./../../../service/auth.service";
import { Navbar, Nav, Image } from "react-bootstrap";
// import Popup from "../../shared/Popup/Popup";
// import LoginForm from "../../pages/Login-form/LoginForm";
import logo from "../../../assets/logo 1.png";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import "./Navigation.css";

class Navigation extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   showModal: false,
    // };
    this.authService = new AuthService();
  }

  logOut = () => {
    this.authService
      .logout()
      .then(() => {
        this.props.storeUser(undefined);
        this.props.handleToast(true, "Déconnexion réussie!", "#d4edda");
      })
      .catch((err) => this.props.handleToast(true, err.message, "#f8d7da"));
  };

  // handleModal = (visible) => this.setState({ showModal: visible });
  listener = null;
  state = {
    navBackground:"navbarTransparent",
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
 }

  componentWillUnmount() {
     window.removeEventListener('scroll', this.handleScroll);
   }
   handleScroll = () => {

       if (window.pageYOffset > 310) {
           this.setState({navBackground: "navbarSolid"})
       } else {
           this.setState({navBackground: "navbarTransparent"})
       }
   }
  render() {
    return (
      <>
        {/* <Popup
          show={this.state.showModal}
          handleModal={this.handleModal}
          color={"#fafafa"}
        >
          <LoginForm
            handleToast={this.props.handleToast}
            closeModal={() => this.handleModal(false)}
            storeUser={this.props.storeUser}
          />
        </Popup> */}

        <Navbar
          // bg="light"
          // variant="light"
          expand="md"
          className={`navbarTransparent ${this.state.navBackground} fixed-top`}
          // style={{ borderBottom: "1px solid #ddd" }}
        >
          <Link to="/">
            <Navbar.Brand variant="h6" style={{ marginLeft: "30%" }}>
              <motion.img
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1 }}
                alt="logo"
                src={logo}
                width="40"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Certif IT
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavLink exact activeClassName="activee" to="/" className="border-top">
                <Nav.Link as="div">Accueil</Nav.Link>
              </NavLink>
              <NavLink activeClassName="activee" to="/courses" className="border-top">
                <Nav.Link as="div">Certificats</Nav.Link>
              </NavLink>
              <NavLink activeClassName="activee" to="/teachers" className="border-top">
                <Nav.Link as="div">Instructeurs</Nav.Link>
              </NavLink>
              {this.props.loggedUser ? (
                <>
                  

                  <Link
                    style={{marginTop: '-1.2%', whiteSpace: 'nowrap'}}
                    to="/profile"
                    className="d-flex align-items-center border-top padding-top"
                  >
                    <Nav.Link as="div">{`Bonjour, ${this.props.loggedUser.username}!`}</Nav.Link>
                    <CDropdown inNav className="c-header-nav-items" direction="down">
                      <CDropdownToggle className="c-header-nav-link" caret={false}>
                      <Image
      style={{ width: "38px", height: "38px" }}
      className="img-fit ml-1"
      roundedCircle
      src={this.props.loggedUser.imageUrl}
    />
                      </CDropdownToggle>
                      <CDropdownMenu className="pt-0" placement="bottom-end">
                        <CDropdownItem header tag="div" color="light" className="text-center">
                          {this.props.loggedUser.username}
                        </CDropdownItem>
                        
                        <CDropdownItem>
                        <Link to="/profile">
                            <CIcon content={freeSet.cilUser} className="mfe-2" />Profile
                            </Link>
                        </CDropdownItem>
                        
                        <CDropdownItem>
                        <Link to="/contact">
                            <CIcon content={freeSet.cilEnvelopeOpen} className="mfe-2" />Contact
                            </Link>
                          </CDropdownItem>
                       
                        <CDropdownItem  onClick={this.logOut}>
          <CIcon content={freeSet.cilAccountLogout} name="cil-bell" className="mfe-2" />
                            Déconnexion
        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                    
                    {/* <NavDropdown title={<Image
      style={{ width: "38px", height: "38px" }}
      className="img-fit ml-1"
      roundedCircle
      src={this.props.loggedUser.imageUrl}
    />} id='basic-nav-dropdown'>
                    
                      <NavDropdown.Item><Nav.Link
                    as="div"
                    className="border-top mouse-hover"
                    onClick={this.logOut}
                  >
                    Déconnexion
                  </Nav.Link></NavDropdown.Item>
                    </NavDropdown> */}
                    
                  </Link>
                </>
              ) : (
                <>
                  <NavLink activeClassName="activee" to="/connexion">
                    <Nav.Link as="div" className="border-top ">
                      Connexion
                    </Nav.Link>
                    </NavLink>
                    
                  
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default Navigation;
