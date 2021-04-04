import {useState, useEffect} from 'react';
import * as React from 'react';
import * as types from './modules/types';
import {useDispatch, useSelector} from 'react-redux';
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
  const stateUserObj = useSelector(state => state.userReducer.userObj);
  const isLoggin = useSelector(state => state.userReducer.isLoggin);

  return (
    <>
      <main style={mainStyle}>
        <p style={titleStyle}>도서 관리 서비스</p>
        <AppRouter isLogin={isLoggin} userObj={stateUserObj}/>
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
