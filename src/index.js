import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routers from './router';
import { store } from './reducers';
import './index.css';
import { ToastContainer } from 'react-toastify';

render(
  <Provider store={store}>
    <div>
      <Routers />
      {/* Toast working on all pages and transitions */}
      <ToastContainer autoClose={1500}/>
    </div>
  </Provider>,
  document.getElementById('root')
);