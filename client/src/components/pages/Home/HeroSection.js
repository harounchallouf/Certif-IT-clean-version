import React from "react";
import "./HeroSection.css";
// import "../../App.css";
import Image from "../../../assets/banner.jpg";
import { Button } from "./Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";
import { IconButton, Collapse } from "@material-ui/core";

function HeroSection() {
  return (
    <div>
      <div className="hero-container">
        <img src={Image} alt="img" />
        <h1>QUE SOUHAITEZ-VOUS APPRENDRE?</h1>
        <p>
          {" "}
          Grâce à nos formations en ligne, développez vos compétences dans le
          domaine IT <br />
          et sécurisez votre avenir en vous certifiant
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
      </div>
    </div>
  );
}

export default HeroSection;
