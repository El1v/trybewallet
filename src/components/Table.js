import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          <tbody>
            {
              expenses.map((element) => {
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
