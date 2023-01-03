import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { CustomContentHeader } from '../styles/wallet';

class Header extends Component {
  state = {
    currency: 'BRL',
  };

  render() {
    const { user } = this.props;
    const { email, total } = user;
    const { currency } = this.state;

    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CustomContentHeader>

              <CurrencyExchangeIcon
                sx={ { display: { xs: 'none', md: 'flex' }, mr: 1 } }
              />
              <Typography
                component="a"
                href="/"
                variant="h6"
                noWrap
                sx={ {
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                } }
              >
                Trybewallet
              </Typography>
              <Typography
                data-testid="email-field"
                variant="h6"
                noWrap
                sx={ {
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 400,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                } }
              >
                {email}
              </Typography>

              <Typography
                data-testid="total-field"
                variant="h6"
                noWrap
                sx={ {
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 400,
                  color: 'inherit',
                  textDecoration: 'none',
                } }
              >
                Despesa Total: R$
                {`${total} ${currency}`}
              </Typography>
            </CustomContentHeader>
          </Toolbar>
        </Container>
      </AppBar>
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
