import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    total: 0,
    currency: 'BRL',
  };

  render() {
    const { user } = this.props;
    const { email } = user;
    const { total, currency } = this.state;

    return (
      <div>
        <span data-testid="email-field">
          Email:
          {email}
        </span>
        <span data-testid="total-field">
          Despesa Total: R$
          {total}
        </span>
        <span data-testid="header-currency-field">
          {currency}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  total: PropTypes.string,
  currency: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
