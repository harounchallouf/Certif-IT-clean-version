import React, { Component } from "react";
import AuthService from "../../../service/auth.service";
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
  Role
} from "./Styles";
import { Formik, Form } from "formik";
import { TextInput } from "./FormLib";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { StyledContainer } from "./Styles";
import Logo from '../../../assets/logo 1.png'

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: "",
        email: "",
        password: "",
        role: "",
      },
      showToast: false,
      toastText: "",
    };
    this.authService = new AuthService();
  }

  handleInputChange = (e) =>
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value },
    });

  handleSubmit = (e) => {
    e.preventDefault();

    this.authService
      .signup(this.state.user)
      .then((newUser) => {
        this.props.storeUser(newUser.data);
        this.props.history.push("/courses");
        this.props.handleToast(true, "Register successful!", "#d4edda");
      })
      .catch((err) =>
        this.props.handleToast(
          true,
          err.response.data.message[0].msg,
          "#f8d7da"
        )
      );
  };
  render() {
    return (
      <div>
        <StyledContainer>
          <StyledFormArea>
            <Avatar image={Logo} />
            <StyledTitle color={colors.theme} size={30}>
              Inscription
            </StyledTitle>
            <Formik
              initialValues={{
                email: "",
                password: "",
                repeatPassword: "",
                username: "",
                role: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("obligatoire"),
                password: Yup.string()
                  .min(8, "Password is too short")
                  .max(30, "Password is too long")
                  .required("obligatoire"),
                username: Yup.string().required("obligatoire"),
                repeatPassword: Yup.string()
                  .required("obligatoire")
                  .oneOf(
                    [Yup.ref("password")],
                    "Les mots de passe doivent correspondre"
                  ),
                role: Yup.string().required("obligatoire"),
              })}
            >
              <Form validated={this.validated} onSubmit={this.handleSubmit}>
                <Role
                  name="role"
                  controlId="role"
                  value={this.state.role}
                  onChange={this.handleInputChange}
                >
                  <option value="Student">Apprenant</option>
                  <option value="Teacher">Instructeur</option>
                </Role>

                <TextInput
                  controlId="username"
                  name="username"
                  type="text"
                  label="Pseudo"
                  placeholder="John Doe"
                  icon={<FiUser />}
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
                <TextInput
                  controlId="email"
                  name="email"
                  type="text"
                  label="Email"
                  placeholder="john1@exemple.com"
                  icon={<FiMail />}
                  value={this.state.email}
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
                <TextInput
                  controlId="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  label="Répeter mot de passe"
                  placeholder="********"
                  icon={<FiLock />}
                />

                <ButtonGroup>
                  <StyledFormButton type="submit">S'inscrire</StyledFormButton>
                </ButtonGroup>
              </Form>
            </Formik>
            <ExtraText>
              Vous avez déjà un compte?{" "}
              <TextLink to="/login">Connectez-vous</TextLink>
            </ExtraText>
          </StyledFormArea>
        </StyledContainer>
      </div>
    );
  }
}

export default Signup;
