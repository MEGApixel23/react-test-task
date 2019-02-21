import {createStore, combineReducers, applyMiddleware} from 'redux';
import promisesMiddleware from './reducers/middlewares/promiseMiddleware';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(promisesMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer, {
  players: [
    { firstName: 'Alice', lastName: 'Geary', score: 96 },
    { firstName: 'John', lastName: 'Junge', score: 96 },
    { firstName: 'Rob', lastName: 'Vera', score: 88 }
  ]
});

export default store;