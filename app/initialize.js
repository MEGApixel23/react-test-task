import ReactDOM from 'react-dom';
import React from 'react';
import App from 'components/App';

import store from './state';
import fetch from 'isomorphic-fetch';
import {Provider} from 'react-redux';


// const store = createStore({
//
// }, module.hot && module.hot.data && module.hot.data.counter || 0);

if (module.hot) {
  // module.hot.accept('./reducers/counter', () => {
  //   store.replaceReducer(require('./reducers').default);
  // });
  module.hot.accept();

  module.hot.dispose((data) => {
    // data.counter = store.getState();
    [].slice.apply(document.querySelector('#app').children).forEach(function(c) { c.remove() });
  });
}

const load = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app')
  );
};

store.subscribe(() => {
  console.log('New state', store.getState());
});

if (document.readyState !== 'complete') {
  document.addEventListener('DOMContentLoaded', load);
} else {
  load();
}