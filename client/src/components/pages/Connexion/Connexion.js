import {
  StyledTitle,
  StyledSubTitle,
  Avatar,
  StyledButton,
  ButtonGroup,
} from "./Styles";
import { StyledContainer } from "./Styles";

import Logo from "../../../assets/logo 1.png";

const Connexion = () => {
  return (
    <StyledContainer>
      <div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            background: "transparent",
            width: "100%",
            padding: "15px",
            display: "flex",
            justifyContent: "flex-start",
            top: "30%",
          }}
        >
          <Avatar style={{ width: "122px", height: "64px" }} image={Logo} />
        </div>
        <StyledTitle size={65}>Bienvenue sur Certif IT</StyledTitle>
        <StyledSubTitle size={27}>
          Connectez ou inscrivez vous pour vous certifiez
        </StyledSubTitle>

        <ButtonGroup>
          <StyledButton to="/login">Login</StyledButton>
                  <StyledButton to="/signup">Signup</StyledButton>
                  <StyledButton to="/certification">certif</StyledButton>
        </ButtonGroup>
      </div>
    </StyledContainer>
  );
};

export default Connexion;
