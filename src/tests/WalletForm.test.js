import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import mockData from './helpers/mockData';

describe('Testes no componente WalletForm', () => {
  // beforeEach(() => {
  //   global.fetch = jest.fn(mockData);
  // });

  // afterEach(() => {
  //   global.fetch.mockClear();
  // });

  it('Verifica se o componente carrega as informações corretas', async () => {
    renderWithRedux(<WalletForm />);
    await waitForElementToBeRemoved(() => screen.getByText('LOADING...'));

    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();
    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addExpense).toBeInTheDocument();
  });
  it('Verifica se é possivel preencher os inputs', async () => {
    global.fetch = jest.fn(mockData);
    renderWithRedux(<WalletForm />);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const valueInput = screen.getByRole('textbox', { name: /valor:/i });
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByTestId('description-input');

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'descrição');

    userEvent.selectOptions(currencyInput, 'CAD');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.selectOptions(tagInput, 'Lazer');

    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addExpense);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
