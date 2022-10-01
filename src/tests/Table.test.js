import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Table from '../components/Table';

describe('Testes no componente Table', () => {
  it('Verifica se carrega os elementos corretamente', () => {
    renderWithRedux(<Table />);

    const descriptionHeader = screen.getByRole('columnheader', { name: /descrição/i });
    expect(descriptionHeader).toBeInTheDocument();
    const methodHeader = screen.getByRole('columnheader', { name: /método de pagamento/i });
    expect(methodHeader).toBeInTheDocument();
    const valueHeader = screen.getByTestId('value-header');
    expect(valueHeader).toBeInTheDocument();
    const coinHeader = screen.getByTestId('coin-header');
    expect(coinHeader).toBeInTheDocument();
    const exchangeHeader = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    expect(exchangeHeader).toBeInTheDocument();
    const convertedValueHeader = screen.getByRole('columnheader', { name: /valor convertido/i });
    expect(convertedValueHeader).toBeInTheDocument();
    const conversionCurrencyHeader = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    expect(conversionCurrencyHeader).toBeInTheDocument();
    const editAndDeleteHeader = screen.getByRole('columnheader', { name: /editar\/excluir/i });
    expect(editAndDeleteHeader).toBeInTheDocument();
  });
  it('Verifica se é renderizado os dados da store na tabela', () => {
    renderWithRedux(<Table />);
    const descriptionCell = screen.getByRole('cell', { name: /description/i });
    expect(descriptionCell).toBeInTheDocument();
    const tagCell = screen.getByRole('cell', { name: /lazer/i });
    expect(tagCell).toBeInTheDocument();
    const methodCell = screen.getByRole('cell', { name: /dinheiro/i });
    expect(methodCell).toBeInTheDocument();
    const valueCell = screen.getByRole('cell', { name: /10\.00/i });
    expect(valueCell).toBeInTheDocument();
    const coinCell = screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i });
    expect(coinCell).toBeInTheDocument();
    const exchangeCell = screen.getByRole('cell', { name: /5\.41/i });
    expect(exchangeCell).toBeInTheDocument();
    const convertedValueCell = screen.getByRole('cell', { name: /54\.1/i });
    expect(convertedValueCell).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', { name: /excluir/i });
    expect(deleteBtn).toBeInTheDocument();
    userEvent.click(deleteBtn);
  });
});
