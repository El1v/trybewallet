import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

describe('Testes no componente WalletForm', () => {
  const LOADING = 'LOADING...';
  it('Verifica se o componente carrega as informações corretas', async () => {
    renderWithRedux(<WalletForm />);
    await waitForElementToBeRemoved(() => screen.getByText(LOADING));

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
  it('Verifica se é possivel deletar algum item da lista', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    await waitForElementToBeRemoved(() => screen.getByText(LOADING));
    expect(store.getState().wallet.expenses.length).toBe(1);
    const deleteBtn = screen.getByRole('button', { name: /excluir/i });
    expect(deleteBtn).toBeInTheDocument();
    userEvent.click(deleteBtn);
    expect(store.getState().wallet.expenses.length).toBe(0);
  });
  it('Verifica se é possivel editar algum item da lista', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    await waitForElementToBeRemoved(() => screen.getByText(LOADING));
    expect(store.getState().wallet.expenses.length).toBe(1);
    const editBtn = screen.getByRole('button', { name: /editar/i });
    expect(editBtn).toBeInTheDocument();
    userEvent.click(editBtn);
    const mainEditBtn = screen.getByRole('button', { name: /editar despesa/i });
    expect(mainEditBtn).toBeInTheDocument();
    userEvent.click(mainEditBtn);
    expect(store.getState().wallet.expenses.length).toBe(1);
  });
});
