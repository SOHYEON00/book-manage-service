
import * as React from 'react';
import {useSelector} from 'react-redux';
import AppRouter from 'components/AppRouter';
import {mainStyle, titleStyle} from 'styleComponent';
import { RootState } from 'modules/reducers';


//  // DB 도서 추가
//  const addBook = (bookInfoList:Array<any>) => {
//   bookInfoList.forEach((bookInfo) => {
//     dbService.collection('books').add({
//       authors: bookInfo.authors,
//       title: bookInfo.title,
//       publisher: bookInfo.publisher,
//       isEbook: false,
//       isRent: false,
//       borrower: ''
//     }).then(() => console.log('working well.'))
//     .catch((error:any) => console.error(`Error : ${error}`));
//   })   
// }



const App = () => {
  const {userObj, error} = useSelector((state:RootState) => state.userReducer);

  return (
    <>
      <main style={mainStyle}>
        <p style={titleStyle}>도서 관리 서비스</p>
        {error 
          ? <div>{JSON.stringify(error)}</div> // 에러 메시지 표시
          : <AppRouter userObj={userObj}/>
        }
      </main>
    </>
  );
 
}

export default App;
