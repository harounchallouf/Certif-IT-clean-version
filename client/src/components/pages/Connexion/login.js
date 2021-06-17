import React, { Component } from "react";
import AuthService from "../../../service/auth.service";
import Logo from '../../../assets/logo 1.png'
import { StyledContainer } from "./Styles";
import * as Yup from "yup";
import {
  StyledTextInput,
  StyledFormArea,
  StyledFormButton,
  StyledLabel,
  Avatar,
  StyledTitle,
  colors,
  ButtonGroup,
  ExtraText,
  TextLink,
  CopyrightText,
} from "./Styles";
import { Formik, Form } from "formik";
import { TextInput } from "./FormLib";
import { FiMail, FiLock } from "react-icons/fi";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInfo: {
        username: "",
        password: "",
      },
    };
    this.authService = new AuthService();
  }

  handleInputChange = (e) =>
    this.setState({
      formInfo: { ...this.state.formInfo, [e.target.name]: e.target.value },
    });

  handleSubmit = (e) => {
    e.preventDefault();

    this.authService
      .login(this.state.formInfo)
      .then((theLoggedInUser) => {
        this.props.storeUser(theLoggedInUser.data);
        // this.props.closeModal();
        this.props.handleToast(true, "Log in successful!", "#d4edda");
      })
      .catch((err) =>
        this.props.handleToast(true, err.response.data.message, "#f8d7da")
      );
  };

  render() {
    return (
        <div>
            <StyledContainer>
        <StyledFormArea>
          <Avatar image={Logo} />
          <StyledTitle color={colors.theme} size={30}>
            Connexion
          </StyledTitle>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={Yup.object({
                username: Yup.string().required("obligatoire"),
              password: Yup.string()
                .min(8, "Password is too short")
                .max(30, "Password is too long")
                .required("obligatoire"),
            })}
            
          >
            <Form onSubmit={this.handleSubmit}>
              <TextInput
                controlId="username"
                name="username"
                type="text"
                label="Pseudo"
                placeholder="John Doe"
                icon={<FiMail />}
                value={this.state.username}
                onChange={this.handleInputChange}
              />

              <TextInput
                controlId="password"
                name="password"
                type="password"
                label="Mot de passe"
                placeholder="********"
                icon={<FiLock />}
                value={this.state.password}
                onChange={this.handleInputChange}
              />
              <ButtonGroup>
                <StyledFormButton type="submit">Se connecter</StyledFormButton>
              </ButtonGroup>
            </Form>
          </Formik>
          <ExtraText>
            Nouveau ici? <TextLink to="/signup">Inscrivez-vous</TextLink>
          </ExtraText>
        </StyledFormArea>

                </StyledContainer>
      </div>
    );
  }
}

export default Login;
