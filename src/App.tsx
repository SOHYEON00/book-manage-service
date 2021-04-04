import {useState, useEffect} from 'react';
import BookList from './components/BookList';
import Nav from './components/Nav';
import * as React from 'react';
// import * as types from './modules/types';
import {useDispatch} from 'react-redux';
import { authService } from 'fBase';
import AppRouter from 'components/AppRouter';


const mainStyle = {
  padding: '6rem 3rem',
  backgroundColor: '#f0f2f5',
};

const titleStyle = {
  fontSize: '1.4rem',
  color: '#4b5258'
};


const App = () => {
  const dispatch = useDispatch();
  const [userObj, setUserObj] = useState(null);
  // 유저 로그인 출력 -> router가 하기
  // 유저 로그인 정보 가져오는 역할 -> app이 하기
  

  // useEffect(() => {
  //   // dispatch({type: types.GET_LIST_DB_REQUEST});

  //   // 사용자의 로그인 상태 관찰자
  //   authService.onAuthStateChanged((user) => { 
  //     if(user) {
  //       console.log(user);
  //     } else {
  //       setUserObj(null);
  //     }
  //   });
    
  // },[dispatch]);


  return (
    <>
      <main style={mainStyle}>
        <p style={titleStyle}>도서 관리 서비스</p>
        <AppRouter />
      </main>
    </>
  );

  // DB 도서 추가
  // const addBook = (bookInfoList:Array<any>) => {
  //   bookInfoList.forEach((bookInfo) => {
  //     dbService.collection('books').add({
  //       authors: bookInfo.authors,
  //       isbn: bookInfo.isbn,
  //       price: bookInfo.price,
  //       publisher: bookInfo.publisher,
  //       sale_price: bookInfo.sale_price,
  //       status: bookInfo.status,
  //       thumbnail: bookInfo.thumbnail,
  //       title: bookInfo.title
  //     }).then(() => console.log('working well.'))
  //     .catch((error:any) => console.error(`Error : ${error}`));
  //   })   
  // }

  //  const getBookList = async() => {
  //       await axios.get('https://dapi.kakao.com/v3/search/book', {
  //       params: {
  //           size: 30,
  //           page: 1,
  //           target: 'title',
  //           query: '디자인'
  //       },
  //       headers: {
  //           Authorization: 'KakaoAK 944c0144b818850f00f4dc844d53751b',
  //       }
  //       })
  //       .then((res) => {
  //           const bookInfoList:Array<Object> = res.data.documents;
  //           console.log(bookInfoList);
  //        addBook(bookInfoList );     
  //       })
  //   }; 

 
}

export default App;
