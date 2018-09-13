import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import ContextProvider from './components/ContextProvider';
import { AppContainer } from 'react-hot-loader';

const render = () => {
    ReactDOM.render(
        <AppContainer>
        <BrowserRouter>
            <ContextProvider>
                <App />
            </ContextProvider>
        </BrowserRouter>
        </AppContainer>, 
        document.getElementById('root'));
}

render();

if (module.hot) {
    module.hot.accept('./App', () => {
      render();
    });
  }
