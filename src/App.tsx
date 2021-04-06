
import * as React from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import AppRouter from 'components/AppRouter';
import {mainStyle, titleStyle} from 'styleComponent';


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
  const {userObj, error} = useSelector((state) => ({
    userObj: state.userReducer.userObj,
    error: state.userReducer.error
  }), shallowEqual); // 컴포넌트 렌더링 최적화

  return (
    <>
      <main style={mainStyle}>
        <p style={titleStyle}>도서 관리 서비스</p>
        {error 
          ? <div>{error.message}</div> // 에러 메시지 표시
          : <AppRouter userObj={userObj}/>
        }
      </main>
    </>
  );
 
}

export default App;
