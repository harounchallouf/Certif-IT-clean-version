import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AuthService from './../../../service/auth.service'
// import logo from './logo2.png'
import { Navbar, Nav, Image } from 'react-bootstrap'
import Popup from '../../shared/Popup/Popup'
import LoginForm from '../../pages/Login-form/LoginForm'
import './Navigation.css'
import logo from '../../../assets/logo 1.png'
// import Connexion from '../../pages/Connexion/Connexion'
class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
        this.authService = new AuthService()
    }

    logOut = () => {
        this.authService
            .logout()
            .then(() => {
                this.props.storeUser(undefined)
                this.props.handleToast(true, 'Déconnexion réussie!', '#d4edda')
            })
            .catch(err => this.props.handleToast(true, err.message, '#f8d7da'))
    }

    handleModal = visible => this.setState({ showModal: visible })
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
                <Popup show={this.state.showModal} handleModal={this.handleModal} color={'#fafafa'}>
                    <LoginForm handleToast={this.props.handleToast} closeModal={() => this.handleModal(false)} storeUser={this.props.storeUser} />
                </Popup>

                <Navbar  expand="md" className={`navbarTransparent ${this.state.navBackground } fixed-top`}>
                    <Link to="/">
                        <Navbar.Brand style={{marginLeft: '40px',color: '#fff'}} >
                            <motion.img
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 1 }}
                                alt="logo"
                                src={logo}
                                width="30%"
                                height="30"
                                className="d-inline-block align-top"
                            /> Certif IT_</Navbar.Brand>
                    </Link>
                   
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" style={{marginRight: '60px'}}>
                        <Nav className="ml-auto">
                            <Link to="/" className="border-top">
                                <Nav.Link as="div">Accueil</Nav.Link>
                            </Link>
                            <Link to="/courses" className="border-top">
                                <Nav.Link as="div">Certificats</Nav.Link>
                            </Link>
                            <Link to="/teachers" className="border-top">
                                <Nav.Link as="div">Instructeurs</Nav.Link>
                            </Link>
                            {/* <Link to="/login" className="border-top">
                                <Nav.Link as="div">Connexion</Nav.Link>
                            </Link> */}
                            {
                                this.props.loggedUser
                                    ?
                                    <>
                                        <Nav.Link as="div" className="border-top" onClick={this.logOut}>déconnexion</Nav.Link>

                                        <Link to="/profile" className="d-flex align-items-center border-top padding-top">
                                            <Nav.Link as="div">{`Hi, ${this.props.loggedUser.username}!`}</Nav.Link>
                                            <Image style={{ width: '38px', height: '38px' }} className="img-fit ml-1" roundedCircle src={this.props.loggedUser.imageUrl} />

                                        </Link>
                                    </>
                                    :
                                    <>
                                        <Nav.Link as="div" onClick={() => this.handleModal(true)} className="border-top">Connexion</Nav.Link>

                                        <Link to="/signup">
                                            <Nav.Link as="div" className="border-top">S'inscrire</Nav.Link>
                                        </Link>
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}


export default Navigation


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import MenuIcon from "@material-ui/icons/Menu";
// import Searchbar from "./Searchbar";
// import { makeStyles } from "@material-ui/core/styles";
// import { useScrollTrigger } from "@material-ui/core";
// import { Fab, Zoom, Toolbar } from "@material-ui/core";
// import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// const useStyles = makeStyles((theme) => ({
//   navbarSolid: {
//     background: " linear-gradient(to right, #4b6cb7, #182848)",
//     // 'linear-gradient(to right, #4b6cb7, #182848)',
//     // ' linear-gradient(to right, #0f0c29, #302b63, #24243e)'
//     height: " 60px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: "1.2rem",
//     position: "sticky",
//     top: 0,
//     zIndex: "999",
//   },
//   navbarTransparent: {
//     backgroundColor: "transparent",
//     boxShadow: "none",
//     height: " 60px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: "1.2rem",
//     position: "sticky",
//     top: 0,
//     zIndex: "999",
//   },
//   scrollTop: {
//     zIndex: 2000,
//     position: "fixed",
//     bottom: theme.spacing(2),
//     right: theme.spacing(2),
//   },
// }));

// function ElevationScroll(props) {
//   const { children } = props;
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 100,
//   });

//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0,
//   });
// }

// function ScrollTop(props) {
//   const { children } = props;
//   const classes = useStyles();
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 100,
//   });

//   const handleClick = (event) => {
//     const anchor = (event.target.ownerDocument || document).querySelector(
//       "#back-to-top-anchor"
//     );

//     if (anchor) {
//       anchor.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   };
//   return (
//     <Zoom in={trigger}>
//       <div
//         onClick={handleClick}
//         role="presentation"
//         className={classes.scrollTop}
//       >
//         {children}
//       </div>
//     </Zoom>
//   );
// }

// function Navigation(props) {
//   const [click, setClick] = useState(false);
//   const [button, setButton] = useState(true);

//   const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

//   const showButton = () => {
//     if (window.innerWidth <= 960) {
//       setButton(false);
//     } else {
//       setButton(true);
//     }
//   };

//   useEffect(() => {
//     showButton();
//   }, []);

//   window.addEventListener("resize", showButton);

//   let { openToggleClicked, drawerToggleClicked } = props;
//   const [navBackground, setnavBackground] = useState("navbarTransparent");

//   const navRef = React.useRef();
//   navRef.current = navBackground;
//   useEffect(() => {
//     const handleScroll = () => {
//       const show = window.scrollY > 310;
//       if (show) {
//         setnavBackground("navbarSolid");
//       } else {
//         setnavBackground("navbarTransparent");
//       }
//     };
//     document.addEventListener("scroll", handleScroll);
//     return () => {
//       document.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const classes = useStyles();

//   return (
//     <ElevationScroll {...props}>
//       <>
//         <nav position="fixed" className={classes[navRef.current]}>
//           <div className="navbar-container">
//             <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
//               Certif IT
//               <i class="fab fa-typo3" />
//             </Link>

//             <div className="menu-icon" onClick={handleClick}>
//               <MenuIcon color="white" medium />
//             </div>

//             <ul className={click ? "nav-menu active" : "nav-menu"}>
//               <li className="nav-item">
//                 <Link className="nav-links" onClick={closeMobileMenu}>
//                   <Searchbar />
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   to="/cours"
//                   className="nav-links"
//                   onClick={closeMobileMenu}
//                 >
//                   {/* <DashboardIcon style={{marginRight:'3px', marginBottom:'9px'}}/> */}
//                   Cours
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   to="/Connexion"
//                   className="nav-links"
//                   onClick={closeMobileMenu}
//                 >
//                   {/* <PersonIcon style={{marginRight:'3px', marginBottom:'9px'}}/> */}
//                   Connexion
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   to="/Login"
//                   className="nav-links"
//                   onClick={closeMobileMenu}
//                 >
//                   {/* <PersonIcon style={{marginRight:'3px', marginBottom:'9px'}}/> */}
//                   Créer un compte
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </nav>
//         <Toolbar id="back-to-top-anchor" disableGutters />
//         <ScrollTop {...props}>
//           <Fab color="primary" size="small" aria-label="scroll back to top">
//             <KeyboardArrowUpIcon />
//           </Fab>
//         </ScrollTop>
//       </>
//     </ElevationScroll>
//   );
// }

// export default Navigation;
