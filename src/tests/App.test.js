import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa a page Wallet', () => {
  it('Verifica se renderiza as informações corretamente do login', () => {
    renderWithRouterAndRedux(<App />);
  });
});
