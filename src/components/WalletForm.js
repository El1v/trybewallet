import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, fetchApiPrice, removeExpense, calculateTotal, addExpense, getTotal }
  from '../redux/actions';
import Table from './Table';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    tag: 'Alimentação',
    method: 'Dinheiro',
    currency: 'USD',
  };

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies = async () => {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleBtn = () => {
    const { dispatch, expenses } = this.props;
    const { value, description, tag, method, currency } = this.state;
    const id = expenses.length;
    dispatch(fetchApiPrice({ id, value, description, tag, method, currency }));
    this.setState({ value: '', description: '' });
  };

  handleBtnEdit = () => {
    const { idToEdit, expenses, dispatch, valueToEdit } = this.props;
    const { value, description, tag, method, currency } = this.state;
    dispatch(removeExpense(idToEdit));
    dispatch(calculateTotal(valueToEdit));
    const objTeste = {
      id: idToEdit,
      value,
      description,
      tag,
      method,
      currency,
    };
    dispatch(addExpense(
      { ...objTeste, exchangeRates: expenses[idToEdit].exchangeRates },
    ));
    const newTotal = expenses[idToEdit].exchangeRates[currency].ask * value;
    dispatch(getTotal(newTotal));
  };

  // const total = data[obj.currency].ask * obj.value;
  // const totalFixed = total.toFixed(2);
  // dispatch(getTotal(totalFixed));

  render() {
    const { value, description, tag, method, currency } = this.state;
    const { isLoading, currencies, editor } = this.props;
    return (
      <div>
        {isLoading && <div>LOADING...</div>}
        {!isLoading && (
          <div>
            <label htmlFor="value">
              Valor:
              <input
                id="value"
                type="text"
                data-testid="value-input"
                name="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="currency">
              Moeda:
              <select
                id="currency"
                value={ currency }
                name="currency"
                onChange={ this.handleChange }
                data-testid="currency-input"
              >
                {currencies.map((item) => (
                  <option key={ item } value={ item }>{item}</option>
                ))}
              </select>
            </label>

            <label htmlFor="method">
              Método de pagamento:
              <select
                id="method"
                value={ method }
                name="method"
                onChange={ this.handleChange }
                data-testid="method-input"
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>

            <label htmlFor="tag">
              Categoria:
              <select
                id="tag"
                value={ tag }
                name="tag"
                onChange={ this.handleChange }
                data-testid="tag-input"
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>

            <label htmlFor="description">
              Descrição:
              <input
                id="description"
                type="text"
                data-testid="description-input"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>

            {!editor && (
              <button
                type="button"
                onClick={ this.handleBtn }
                // disabled={ isDisabled }
              >
                Adicionar despesa
              </button>)}

            {editor && (
              <button
                type="button"
                onClick={ this.handleBtnEdit }
              >
                Editar despesa
              </button>)}

            <Table />
          </div>) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.wallet.isLoading,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  valueToEdit: state.wallet.valueToEdit,

});

// const mapDispatchToProps = (dispatch) => ({
//   getCurrencies: () => dispatch(fetchAPI()),
//   expense: (expense) => dispatch(addExpense(expense)),
// });

WalletForm.propTypes = {
  isLoading: PropTypes.string,
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, null)(WalletForm);
