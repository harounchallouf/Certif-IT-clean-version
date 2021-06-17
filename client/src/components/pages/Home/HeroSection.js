import React from "react";
import "./HeroSection.css";
import Image from "../../../assets/quiz.png";
import Image1 from "../../../assets/head.png"
// import { Button } from "./Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";
import { IconButton, Collapse } from "@material-ui/core";
import {Container, Grid, Hidden, Button} from '@material-ui/core';

function HeroSection() {
  return (
    <div>
      <Container className="welcome-page">
        <div className="welcome-screen">
          <Grid container spacing={0}>
            <Grid item xs={12} md={6} className="heading-section">
              <img src={Image1} className="quiz-image" alt="welcome" />
              <Button className="hero-btn" size="large">Inscrivez-vous maintenant</Button>
            </Grid>
            <Hidden smDown>
              <Grid item xs={12} md={6} className="pin-section">
                <img src={Image} className="pin-image" alt="welcome"/>
              </Grid>
            </Hidden>
          </Grid>
        </div>
      </Container>
      {/* <div className="hero-container">
        <img src={Image} alt="img" />
        <h1>VOTRE PARCOURS VERS LA RÉUSSITE</h1>
        <p>
          {" "}
          Grâce à nos certifications en ligne, développez vos compétences dans le
          domaine IT <br />
          et élargissez les perspectives de vos carrières.
        </p>

        <div className="hero-btns">
          <Button
            className="btn"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            Get Started
          </Button>
        </div>
        <Scroll to="CCour" smooth={true}>
          <IconButton>
            <ExpandMoreIcon className="go-down" />
          </IconButton>
        </Scroll>
      </div> */}
    </div>
  );
}

export default HeroSection;
