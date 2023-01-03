import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField }
  from '@mui/material';
import { fetchAPI, fetchApiPrice, removeExpense, calculateTotal, addExpense, getTotal }
  from '../redux/actions';
import { CustomInputBox } from '../styles/wallet';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    tag: 'Alimentação',
    method: 'Dinheiro',
    currency: 'USD',
    lastId: 0,
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
    const { dispatch } = this.props;
    const { value, description, tag, method, currency, lastId } = this.state;
    let newValue = Number(value);
    if (Number.isNaN(newValue)) {
      newValue = 0;
    }
    let id = lastId;
    dispatch(fetchApiPrice({ id, newValue, description, tag, method, currency }));
    this.setState({ value: '', description: '', lastId: id += 1 });
  };

  handleBtnEdit = () => {
    const { idToEdit, expenses, dispatch, valueToEdit } = this.props;
    const { value, description, tag, method, currency } = this.state;
    let newValue = Number(value);
    if (Number.isNaN(newValue)) {
      newValue = 0;
    }
    dispatch(removeExpense(idToEdit));
    dispatch(calculateTotal(valueToEdit));
    const objTeste = {
      id: idToEdit,
      newValue,
      description,
      tag,
      method,
      currency,
    };
    dispatch(addExpense(
      { ...objTeste, exchangeRates: expenses[idToEdit].exchangeRates, isEditing: false },
    ));
    const newTotal = expenses[idToEdit].exchangeRates[currency].ask * value;
    dispatch(getTotal(newTotal));
    this.setState({ value: '', description: '' });
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
          <CustomInputBox>
            <Stack direction="row" spacing={ 2 }>
              <TextField
                variant="outlined"
                label="Valor"
                id="value"
                type="text"
                data-testid="value-input"
                name="value"
                value={ value }
                onChange={ this.handleChange }
              />

              <FormControl>
                <InputLabel id="currencyLabel">Moeda</InputLabel>

                <Select
                  label="Moeda"
                  labelId="currencyLabel"
                  id="currency"
                  value={ currency }
                  name="currency"
                  onChange={ this.handleChange }
                  data-testid="currency-input"
                >
                  {currencies.map((item) => (
                    <MenuItem key={ item } value={ item }>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="methodLabel">Método de pagamento</InputLabel>
                <Select
                  label="Método de pagamento"
                  labelId="methodLabel"
                  id="method"
                  value={ method }
                  name="method"
                  onChange={ this.handleChange }
                  data-testid="method-input"
                >
                  <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                  <MenuItem value="Cartão de crédito">Cartão de crédito</MenuItem>
                  <MenuItem value="Cartão de débito">Cartão de débito</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="tagLabel">Categoria</InputLabel>
                <Select
                  label="Categoria"
                  labelId="tagLabel"
                  id="tag"
                  value={ tag }
                  name="tag"
                  onChange={ this.handleChange }
                  data-testid="tag-input"
                >
                  <MenuItem value="Alimentação">Alimentação</MenuItem>
                  <MenuItem value="Lazer">Lazer</MenuItem>
                  <MenuItem value="Trabalho">Trabalho</MenuItem>
                  <MenuItem value="Transporte">Transporte</MenuItem>
                  <MenuItem value="Saúde">Saúde</MenuItem>
                </Select>
              </FormControl>

              <TextField
                variant="outlined"
                label="Descrição"
                id="description"
                type="text"
                data-testid="description-input"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />

              {!editor && (
                <Button
                  variant="contained"
                  type="button"
                  onClick={ this.handleBtn }
                // disabled={ isDisabled }
                >
                  Adicionar despesa
                </Button>)}

              {editor && (
                <Button
                  variant="contained"
                  type="button"
                  onClick={ this.handleBtnEdit }
                >
                  Editar despesa
                </Button>)}
            </Stack>
          </CustomInputBox>) }
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
