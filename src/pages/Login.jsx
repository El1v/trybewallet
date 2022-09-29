import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmail } from '../redux/actions';

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
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
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
      <div>
        <form>
          <input
            type="text"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChangeLogin }
            placeholder="Digite seu email"
          />
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChangeLogin }
            placeholder="Digite sua senha"
          />
          <button
            type="submit"
            onClick={ this.handleBtn }
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
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
