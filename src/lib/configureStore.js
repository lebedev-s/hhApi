import { createStore, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./reducers"
import saga from "../containers/Countries/saga"
import { composeWithDevTools } from 'redux-devtools-extension'

const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = composeWithDevTools({});

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware, loggerMiddleware) 
    ))

  sagaMiddleware.run(saga)

  return store
}
