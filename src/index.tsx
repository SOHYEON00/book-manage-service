import { rootReducer } from 'modules/reducers';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import rootSaga from 'modules/sagas/index';
import { Provider } from 'react-redux';

// create saga middleware
const sagaMiddleware = createSagaMiddleware(); 

// rootReducer 가져와 스토어 생성 후 리턴
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware)); //saga를 리덕스 미들웨어에 추가

  sagaMiddleware.run(rootSaga); //루트사가 실행



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
