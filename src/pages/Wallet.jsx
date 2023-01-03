import { Box } from '@mui/material';
import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { CustomContentHeader, CustomLabelBox } from '../styles/wallet';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    // const { user } = this.props;
    // console.log(user);
    return (
      <Box>
        <CustomContentHeader>
          <Header />
        </CustomContentHeader>
        <CustomLabelBox>
          <WalletForm />
        </CustomLabelBox>
        <CustomLabelBox>
          <Table />
        </CustomLabelBox>

      </Box>
    );
  }
}

export default Wallet;
