import React from 'react';
import { useSelector } from 'react-redux';
import BookListItem from './BookListItem';


const BookList = () => {
    const list = useSelector(state => state.bookReducer.books);
    console.log(list);
    return (<section>
        <table>
            <thead>
                <tr>
                    <th>책 제목</th>
                    <th>저자</th>
                    <th>출판사</th>
                    <th>책 형태</th>
                    <th>대출 상태</th>
                    <th>대출 날짜</th>
                </tr>
            </thead>
                
            <tbody>
               {list.map((item:any) => { 
                   return (<BookListItem 
                    key={item.isbn}
                    authors={item.authors}
                    isbn={item.isbn}
                    publisher={item.publisher}
                    title={item.title}
                    isEbook={false}
                    possibleRent ={true}
                    rentDate={'yyyy-mm-dd'}
                   />)})}
            </tbody>
        </table>
      
    </section>)
};

export default React.memo(BookList);