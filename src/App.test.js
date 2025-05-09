import { render } from '@testing-library/react';
import {MemoryRouter} from 'react-router'
import App from './App';
import ReactGa from 'react-ga';

test('renders learn react link', () => {
  window.GA_INITIALIZED = true;
  ReactGa.initialize('UA-166027980-1', {testMode: true});
  render(<App />, {wrapper: MemoryRouter});
});
