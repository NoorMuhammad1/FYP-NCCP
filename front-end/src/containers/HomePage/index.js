import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  Container,
  Dropdown,
  DropdownButton,
  NavLink,
  Carousel,
  Card,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/index";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
//import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import HomeIcon from "@material-ui/icons/Home";
// import "../HomePage/index.css";
import CloseIcon from "@material-ui/icons/Close";
import Logo from "../../components/Logo";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Bacteria from "./Images/bacteria.jpg";
import Miccroorganism from "./Images/hqdefault.jpg";
import Bacteria2 from "./Images/bacteria-2.jpg";
import AboutUsImage from "./Images/about-us-image.jpg";
import { Link } from "react-router-dom";
import ObjectSlider from "../../components/ObjectSlider";

import "./style.css";
import PhoneIcon from "@material-ui/icons/Phone";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { EmailOutlined } from "@material-ui/icons";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import StarIcon from "@material-ui/icons/Star";
import PublishIcon from "@material-ui/icons/Publish";
import PublicIcon from "@material-ui/icons/Public";
import StarsIcon from "@material-ui/icons/Stars";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import ReactMapGL, { Marker } from "react-map-gl";
import PageHeader from "../../components/PageHeader";

const HomePage = (props) => {
  const dispatch = useDispatch();

  const [viewport, setViewport] = React.useState({
    latitude: 33.678403942756674,
    longitude: 73.13901040682869,
    zoom: 15,
  });

  const loggedInNavLinks = () => {
    return (
      <>
        <DropdownButton title="options">
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
        </DropdownButton>
      </>
    );
  };

  // const products = [
  //   { category: "Bactaria", samples: 200 },
  //   { category: "Fungi", samples: 553 },
  //   { category: "Bactaria", samples: 200 },
  //   { category: "Fungi", samples: 553 },
  //   { category: "Bactaria", samples: 200 },
  // ];

  return (
    <>
      <PageHeader />
      <div id="hero-div" className="hero-div">
        <Container>
          {/* {searchBarShow ? (
            <div className="search-box">
              <input placeholder="Enter Keyword" />
            </div>
          ) : null} */}
        </Container>
        <Carousel className="carousel">
          <Carousel.Item interval={2000} className="carousel-item">
            <img
              src={Bacteria2}
              alt="Bacteria img"
              className="carousel-images"
            />
            <Carousel.Caption className="carousel-data">
              <h2>Welcome to</h2>
              <h1>National Culture Collection</h1>
              <h1>Pakistan (NCCP)</h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              src={Bacteria}
              alt="Bacteria img"
              className="carousel-images"
            />
            <Carousel.Caption className="carousel-data">
              <h2>Welcome to</h2>
              <h1>National Culture Collection</h1>
              <h1>Pakistan (NCCP)</h1>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div id="about-us" className="about-us-div">
        <Container className="about-us-content">
          <div className="about-us-image">
            <img src={Bacteria2} alt="about-us-image" />
          </div>
          <div className="about-us-details">
            <div className="about-us-title">
              <h5>ABOUT US</h5>
              <h2>
                We are the leading institute for microorganism reasearch in
                Pakistan
              </h2>
            </div>
            <div className="about-us-description">
              NCCP plays an important role in offering services not only to
              preserve microorganisms using techniques that maintain viability,
              purity, and important characteristics of microorganisms, but also
              to supply high quality microorganisms for use in teaching,
              research and industrial applications.
            </div>
            {/* <div className="about-us-featured-list">
              <Timeline>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Eat</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Code</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                  </TimelineSeparator>
                  <TimelineContent>Sleep</TimelineContent>
                </TimelineItem>
              </Timeline>
            </div> */}
            <div className="about-us-featured-list">
              <div className="about-us-featured-item">
                <div className="about-us-featured-item-icon">
                  <div className="icon">01</div>
                </div>
                <div className="about-us-featured-item-detials">
                  <h5>Plant growth promoting microbess</h5>
                  <p>
                    Isolation, identification and molecular characterization of
                    plant growth promoting microbes
                  </p>
                </div>
              </div>
              <div className="about-us-featured-item">
                <div className="about-us-featured-item-icon">
                  <div className="icon">02</div>
                </div>
                <div className="about-us-featured-item-detials">
                  <h5>Heavy metal tolerant bacteria</h5>
                  <p>
                    solation, identification and characterization of heavy metal
                    tolerant bacteria for bioremediation of contaminated soil.
                  </p>
                </div>
              </div>
              <div className="about-us-featured-item">
                <div className="about-us-featured-item-icon">
                  <div className="icon">03</div>
                </div>
                <div className="about-us-featured-item-detials">
                  <h5>Halotolerant rhizobacteria </h5>
                  <p>
                    Identification and characterization of halotolerant
                    rhizobacteria containing ACC-deaminase, for growth promotion
                    of Phaseolus vulgaris L. under salt stress
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div id="achievements" className="achievements-div">
        <Container className="achievement-content">
          <div className="achievement">
            <div className="achievement-icon">
              <PublishIcon />
            </div>
            <div className="achievement-details">
              <h3 onClick={(e) => alert("odsfjo")}> 40+</h3>
              <h4>Publications</h4>
            </div>
          </div>
          <div className="achievement">
            <div className="achievement-icon">
              <StarIcon />
            </div>
            <div className="achievement-details">
              <h3>Accomplishment</h3>
              <h4>Women in agriculture forum</h4>
            </div>
          </div>
          <div className="achievement">
            <div className="achievement-icon">
              <StarsIcon />
            </div>
            <div className="achievement-details">
              <h3>Achievement</h3>
              <h4>Association of Farmers association</h4>
            </div>
          </div>
          <div className="achievement">
            <div className="achievement-icon">
              <PublicIcon />
            </div>
            <div className="achievement-details">
              <h3>81+</h3>
              <h4>International linkages</h4>
            </div>
          </div>
        </Container>
      </div>

      <div id="services" className="services">
        <h5>OUR SERVICES</h5>
        <h2>Explore Our Main Services</h2>
        <div className="services-tag">
          <Container className="services-content">
            <Link to="#">
              <div className="service">
                <MenuRoundedIcon style={{ fontSize: "40px", fill: "white" }} />
                <h5>Order</h5>
                <p>Order some things from us</p>
              </div>
            </Link>
            <Link to="#">
              <div className="service">
                <MenuRoundedIcon style={{ fontSize: "40px", fill: "white" }} />
                <h5>Deposit</h5>
                <p>Deposit some things from us</p>
              </div>
            </Link>
            <Link to="/catalogue">
              <div className="service">
                <MenuRoundedIcon style={{ fontSize: "40px", fill: "white" }} />
                <h5>Resources</h5>
                <p>Seek some things from us</p>
              </div>
            </Link>
          </Container>
        </div>
      </div>

      <div id="location" className="location">
        <div className="location-heading">
          <h5>Where are we</h5>
          <h2>Our Current Location</h2>
        </div>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="450px"
          mapboxApiAccessToken={`pk.eyJ1IjoiemFpbm5vb3IwMzUwMjAiLCJhIjoiY2tsZ2ZubG80MndtdDJvbnAwYnVya2tjZiJ9.r49QIKppAmNWiDhexQhQTw`}
          mapStyle="mapbox://styles/zainnoor035020/cklgg7lq54jp617meh87g9vqi"
        >
          <Marker longitude={viewport.longitude} latitude={viewport.latitude}>
            <LocationOnIcon fontSize="large" color="blue" />
          </Marker>
          <div className="map-detials">
            <Container className="map-content">
              <h3>
                Park Rd, National Agricultural Research Center, Islamabad,
                Islamabad Capital Territory, Pakistan
              </h3>
            </Container>
          </div>
        </ReactMapGL>
        {/* <Container className="location-content">
          <div className="location-map">
           
          </div>
          {/* <div className="location-details">Details</div> */}
        {/* </Container> */}
      </div>

      <div className="footer">
        <Container className="footer-content">
          <div className="first-footer">
            <div className="footer-contact">
              <div className="footer-contact-icon">
                <LocationOnOutlinedIcon />
              </div>
              <div className="footer-details">
                <h5>Address</h5>
                <p>National Agricultural Research Center, Islamabad</p>
              </div>
            </div>
            <div className="footer-contact">
              <div className="footer-contact-icon">
                <PhoneIcon />
              </div>
              <div className="footer-details">
                <h5>Contact Number</h5>
                <p>+92335 6291805</p>
              </div>
            </div>
            <div className="footer-contact">
              <div className="footer-contact-icon">
                <EmailOutlined />
              </div>
              <div className="footer-details">
                <h5>Email</h5>
                <p>zainnoor6035020@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="second-footer">
            <div className="second-footer-detail-box">
              <div>Logo</div>
              <p>
                NCCP plays an important role in offering services not only to
                preserve microorganisms using techniques that maintain
                viability, purity, and important characteristics of
                microorganisms, but also to supply high quality microorganisms
                for use in teaching, research and industrial applications.
              </p>
              <a>Read More!</a>
            </div>
            <div className="second-footer-useful-links-box">
              <h3>Useful Links</h3>
              <div className="useful-links-div">
                <a href="#hero-div">Home</a>
                <a href="#about-us">About Us</a>
                <a href="#achievements">Achievement</a>
                <a href="#services">Services</a>
                <a href="#location">Current Location</a>
                <a>Cart</a>
                {/* <a>- Home</a> */}
                {/* <a>- Home</a> */}
              </div>
            </div>
          </div>
          <div className="third-footer">
            <div>Copyright</div>
            <div>social links</div>
          </div>
        </Container>
      </div>

      {/* <div className={sideBarshow ? "sidebar-active" : "sidebar"}>
        <div className="sidebar-upper-div">
          <div className="sidebar-upper-div-options">
            <HomeIcon fontSize="large" />
            <span>Sign In</span>
          </div>
          <CloseIcon onClick={(e) => setSideBarShow(false)} />
        </div>
        <div className="sidebar-links">
          <ul className="sidebar-links-list">
            <li className="sidebar-links-list-item">
              <a className="sidebar-links-list-item-link">About NCCP</a>
            </li>
            <li className="sidebar-links-list-item">
              <a className="sidebar-links-list-item-link">Deposit</a>
            </li>
            <li className="sidebar-links-list-item">
              <a className="sidebar-links-list-item-link">Order</a>
            </li>
            <li className="sidebar-links-list-item">
              <a className="sidebar-links-list-item-link">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <ul className="sidebar-footer-list">
            <li className="sidebar-footer-list-items">
              <ShoppingCartIcon className="sidebar-footer-list-item" />
            </li>
            <li className="sidebar-footer-list-items">
              <ShoppingCartIcon className="sidebar-footer-list-item" />
            </li>
            <li className="sidebar-footer-list-items">
              <ShoppingCartIcon className="sidebar-footer-list-item" />
            </li>
          </ul>
        </div>
      </div>
      <div className="header">
        <div className="header-logo">
          <h1>NCCP</h1>
        </div>
        <div className="header-content">
          <div className="menu-content">
            <Link>Sign In</Link>
          </div>
          <div className="hamburger-menu-box">
            <MenuRoundedIcon
              className="hamburger-menu"
              fontSize="large"
              onClick={(e) => setSideBarShow(!sideBarshow)}
            />
          </div>
        </div>
      </div>

      <div className="navigation-bar">
        <Link>About NCCP</Link>
        <Link>Deposit</Link>
        <Link>Order</Link>
        <Link>Contact Us</Link>
      </div>

      <div className="hero-div">
        <div>
          <h1>Welcome to NCCP</h1>
          <p>
            We are the leading institute of microbial research and preservation
            in Pakistan...
          </p>
        </div>
        <Link>Learn More</Link>
      </div>

      <div className="product-category-div">
        <h1>Resources</h1>
        <ObjectSlider />
      </div>
      <div className="about-us-div">
        <img src={AboutUsImage} />
      </div> */}

      {/* <div className="carousel-div">
        <Carousel className="carousel">
          <Carousel.Item interval={2000}>
            <img src={Bacteria2} alt="Bacteria img" />
            <Carousel.Caption>
              <h3>Welcome to NCCP</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img src={Bacteria2} alt="Bacteria img" />
            <Carousel.Caption>
              <h3>We are a leading institute in Microorganism reasearch</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div> */}

      {/* <div className="navigation-bar">
        <Container className="navigation-bar-content">
          <Logo />
          <div className="navigation-links">
            <SearchOutlinedIcon />
            <MenuRoundedIcon />
          </div>
        </Container>
      </div> */}

      {/* <Layout>
        <div id="homepage-upper-nav-bar">
          <NavDropdown
            title="NCCP"
            id="collasible-nav-dropdown"
            show={show}
            onMouseEnter={(e) => setShow(true)}
            onMouseLeave={(e) => setShow(false)}
          >
            <NavLink>NCCP</NavLink>

            <NavLink>Deposit</NavLink>
            <NavLink>Orders</NavLink>
            <NavLink>Catalogue</NavLink>
            <NavDropdown
              title="NCCP"
              id="collasible-nav-dropdown"
              show={show}
              onMouseEnter={(e) => setShow(true)}
              onMouseLeave={(e) => setShow(false)}
              subme
            >
              <NavLink>NCCP</NavLink>

              <NavLink>Deposit</NavLink>
              <NavLink>Orders</NavLink>
              <NavLink>Catalogue</NavLink>
            </NavDropdown>
          </NavDropdown>
          <NavLink>NCCP</NavLink>

          <NavLink>Deposit</NavLink>
          <NavLink>Orders</NavLink>
          <NavLink>Catalogue</NavLink>
        </div>
        <div>other content</div>
      </Layout> */}
    </>
  );
};

export default HomePage;
