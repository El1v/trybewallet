import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    const { expenses } = this.props;
    const expensesSort = expenses.sort((a, b) => a.id - b.id);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th data-testid="value-header">Valor</th>
              <th data-testid="coin-header">Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          <tbody>
            {
              expensesSort.map((element) => {
                const convertedValue = parseFloat(
                  element.exchangeRates[element.currency].ask,
                )
                * parseFloat(element.value);
                const convertedValueFixed = convertedValue.toFixed(2);

                const convertedCurrency = parseFloat(
                  element.exchangeRates[element.currency].ask,
                );
                const convertedCurrencyFixed = convertedCurrency.toFixed(2);
                return (
                  <tr key={ element.id }>
                    <td>{element.description}</td>
                    <td>{element.tag}</td>
                    <td>{element.method}</td>
                    <td>{parseFloat(element.value).toFixed(2)}</td>
                    <td>{element.exchangeRates[element.currency].name}</td>
                    <td>{convertedCurrencyFixed}</td>
                    <td>{convertedValueFixed}</td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="delete-btn"
                        type="button"
                        onClick={
                          () => this.handleRemove(element.id, convertedValueFixed)
                        }
                      >
                        Excluir
                      </button>
                      <button
                        data-testid="edit-btn"
                        type="button"
                        onClick={
                          () => this.handleEdit(element.id, convertedValueFixed)
                        }
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expense: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
