import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    tag: '',
    method: '',
  };

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies = async () => {
    const { getCurrencies } = this.props;
    getCurrencies();
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  render() {
    const { value, description, tag, method } = this.state;
    const { isLoading, currencies } = this.props;
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

            <label htmlFor="currencies">
              Moeda:
              <select
                id="currencies"
                value={ currencies }
                name="currencies"
                onChange={ this.handleChange }
                data-testid="currency-input"
              >
                {currencies.map((currency) => (
                  <option key={ currency } value={ currency }>{currency}</option>
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
          </div>) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.wallet.isLoading,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
