
import * as React from 'react';
import {useSelector} from 'react-redux';
import AppRouter from 'components/AppRouter';
import { RootState } from 'modules/reducers';
import 'style.scss';


const App = () => {
  const {userObj, error} = useSelector((state:RootState) => state.userReducer);

  return (
    <>
      <main>
        <h5>도서 관리 서비스</h5>
        <AppRouter userObj={userObj} error={error}/>
      </main>
    </>
  );
 
}

export default App;
