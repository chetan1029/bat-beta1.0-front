import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducers from './reducers';
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export function configureStore(initialState) {
    const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

    const store = createStore(
        reducers,
        initialState,
        composeEnhancers(
            applyMiddleware(...middlewares)
        ),
    );
    sagaMiddleware.run(rootSaga);
    return store;
}

