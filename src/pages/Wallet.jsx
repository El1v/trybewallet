import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    // const { user } = this.props;
    // console.log(user);
    return <h1>TrybeWallet</h1>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Wallet);
