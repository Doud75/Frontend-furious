import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const store = createStore(
    rootReducer,
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
