import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Testa a page Wallet', () => {
  it('Verifica se renderiza as informações corretamente', () => {
    global.fetch = jest.fn(mockData);
    renderWithRouterAndRedux(<Wallet />);

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

    const totalSpan = screen.getByText(/54.10/i);
    expect(totalSpan).toBeInTheDocument();
  });
});
