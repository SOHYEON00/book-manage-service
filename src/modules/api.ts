import axios from "axios";
import { dbService } from "fBase";



export const getBooks = async() => {
    return ((await dbService.collection('books').get()).docs).map(doc => doc.data());;
}


export const getBookListKakao = async() => {
    await axios.get('https://dapi.kakao.com/v3/search/book', {
        params: {
            size: 10,
            page: 1,
            target: 'title',
            query: '알고리즘'
        },
        headers: {
            Authorization: 'KakaoAK 944c0144b818850f00f4dc844d53751b',
        }
    }).then((res) => {
        const bookInfoList:Array<Object> = res.data.documents;
        console.log(bookInfoList);
    })
   
};
