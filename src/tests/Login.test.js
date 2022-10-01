import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('Testa tela de login', () => {
  it('Verifica se os elementos estão na tela ', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    const submitBtn = screen.getByRole('button', { name: /entrar/i });
    expect(submitBtn).toBeInTheDocument();
  });
  it('Verifica validação de login ', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    userEvent.type(emailInput, 'eliveltonmn@trybe.com');

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    userEvent.type(passwordInput, 'senha');

    const submitBtn = screen.getByRole('button', { name: /entrar/i });
    expect(submitBtn).toBeDisabled();

    userEvent.type(passwordInput, 'senha1234');
    expect(submitBtn).not.toBeDisabled();
    history.push('/carteira');
    // userEvent.click(submitBtn);
  });
});
