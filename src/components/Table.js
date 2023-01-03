import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, Paper, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import TableUi from '@mui/material/Table';
import { removeExpense, calculateTotal, editExpense } from '../redux/actions';

class Table extends Component {
  handleRemove = (id, value) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(id));
    dispatch(calculateTotal(value));
  };

  handleEdit = (idToEdit, value) => {
    const { dispatch } = this.props;
    dispatch(editExpense({ idToEdit, value }));
  };

  render() {
    const { expenses, editor } = this.props;
    const expensesSort = expenses.sort((a, b) => a.id - b.id);
    return (
      <TableContainer elevation={ 3 } component={ Paper }>
        <TableUi sx={ { minWidth: 650 } } aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Tag</TableCell>
              <TableCell align="right">Método de pagamento</TableCell>
              <TableCell data-testid="value-header" align="right">Valor</TableCell>
              <TableCell data-testid="coin-header" align="right">Moeda</TableCell>
              <TableCell align="right">Câmbio utilizado</TableCell>
              <TableCell align="right">Valor convertido</TableCell>
              <TableCell align="right">Moeda de conversão</TableCell>
              <TableCell align="right">Editar/Excluir</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              expensesSort.map((element) => {
                const convertedValue = parseFloat(
                  element.exchangeRates[element.currency].ask,
                )
          * parseFloat(element.newValue);
                const convertedValueFixed = convertedValue.toFixed(2);

                const convertedCurrency = parseFloat(
                  element.exchangeRates[element.currency].ask,
                );
                const convertedCurrencyFixed = convertedCurrency.toFixed(2);
                return (
                  <TableRow
                    key={ element.id }
                    sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
                  >
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      {element.description}

                    </TableCell>
                    <TableCell align="right">{element.tag}</TableCell>
                    <TableCell align="right">{element.method}</TableCell>
                    <TableCell
                      align="right"
                    >
                      {parseFloat(element.newValue).toFixed(2)}

                    </TableCell>
                    <TableCell
                      align="right"
                    >
                      {element.exchangeRates[element.currency].name}

                    </TableCell>
                    <TableCell align="right">{convertedCurrencyFixed}</TableCell>
                    <TableCell align="right">{convertedValueFixed}</TableCell>
                    <TableCell align="right">Real</TableCell>
                    <TableCell align="right">
                      <Stack spacing={ 2 }>
                        <Button
                          variant="contained"
                          size="small"
                          data-testid="delete-btn"
                          type="button"
                          disabled={ editor }
                          onClick={
                            () => this.handleRemove(element.id, convertedValueFixed)
                          }
                        >
                          Excluir
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          data-testid="edit-btn"
                          type="button"
                          disabled={ editor }
                          onClick={
                            () => this.handleEdit(element.id, convertedValueFixed)
                          }
                        >
                          Editar
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </TableUi>
      </TableContainer>
    );
  }
}

Table.propTypes = {
  expense: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Table);
