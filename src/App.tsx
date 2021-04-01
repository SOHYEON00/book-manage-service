import {useEffect} from 'react';
import BookList from './components/BookList';
import Nav from './components/Nav';
import * as React from 'react';
import * as types from './modules/types';
import {useDispatch} from 'react-redux';




const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: types.GET_LIST_DB_REQUEST});
  },[dispatch]);

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

  return (
    <>
      <main>
        <h2>도서 관리 서비스</h2>
        <Nav />
        <BookList />
      </main>
    </>
  );
}

export default App;
