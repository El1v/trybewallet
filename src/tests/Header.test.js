import { screen } from '@testing-library/react';
import { renderWithRedux } from './helpers/renderWith';
import Header from '../components/Header';

describe('Testes no componente Header', () => {
  it('Verifica se o componente header carrega as informações corretamente', () => {
    renderWithRedux(<Header />);
    const emailSpan = screen.getByText(/email:eliveltonmn@trybe\.com/i);
    expect(emailSpan).toBeInTheDocument();
    const totalSpan = screen.getByText(/0/i);
    expect(totalSpan).toBeInTheDocument();
    const currencySpan = screen.getByText(/0/i);
    expect(currencySpan).toBeInTheDocument();
  });
});
