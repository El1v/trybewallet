import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';
import { getEmail } from '../redux/actions';
import {
  CustomAsideLogin, CustomContentLogin, CustomFormLogin, CustomStackLogin,
} from '../styles/login';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  // handleChange = ({ target }) => {
  //   const { name } = target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   this.setState({ [name]: value });
  // };
  handleChangeLogin = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.verifiyBtn();
    });
  };

  handleBtn = (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(getEmail(email));
    history.push('/carteira');
  };

  verifiyBtn = () => {
    const { email, password } = this.state;
    const minCharacterPassword = 6;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = email && regex.test(email);
    const verifyPassword = password.length >= minCharacterPassword;

    this.setState({ isDisabled: !(verifyEmail && verifyPassword) });
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <CustomContentLogin>
        <CustomAsideLogin>
          <img width={ 700 } src="/assets/ilustracao.jpg" alt="" />
        </CustomAsideLogin>
        <CustomFormLogin elevation={ 3 }>
          <CustomStackLogin spacing={ 2 }>
            <img width={ 170 } src="/assets/money.png" alt="" />

            <TextField
              variant="outlined"
              label="Email"
              type="text"
              fullWidth
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ this.handleChangeLogin }
            />
            <TextField
              variant="outlined"
              label="Senha"
              type="password"
              fullWidth
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ this.handleChangeLogin }
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              onClick={ this.handleBtn }
              disabled={ isDisabled }
            >
              Entrar
            </Button>
          </CustomStackLogin>
        </CustomFormLogin>
      </CustomContentLogin>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
