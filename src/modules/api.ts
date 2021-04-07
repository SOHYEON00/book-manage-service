import axios from "axios";
import { authInstance, authService, dbService } from "fBase";


export const getBooks = async() => {
    return ((await dbService.collection('books').get()).docs).map(doc => ({
        id: doc.id,
        authors: doc.data().authors,
        title: doc.data().title,
        publisher: doc.data().publisher,
        isEbook: false,
        isRent: false,
        borrower: doc.data().borrwer
    }));;
};

export const googleLogin = async() => {
    const googleProvider = new authInstance.auth.GoogleAuthProvider();
    const userResponse = await authService.signInWithPopup(googleProvider);
    
    // 값이 있는 경우만 처리
    if(userResponse.user && userResponse.additionalUserInfo) {
        const userObj = {
            name: userResponse.user.displayName,
            uid: userResponse.user.uid,
            email: userResponse.user.email,
            isLoggin: true
        };
        return userObj;
    } 
    else {
        return 'nothing';
    }
    
};
    
// 카카오 오픈 api 요청
export const getApiBookList = async(text:string, currentPage:number) => {
    // api request 결과: 도서 리스트
    return await axios.get('https://dapi.kakao.com/v3/search/book', {
    params: {
        size: 5,
        page: currentPage,
        target: 'title', 
        query: text,
        sort: 'recency'
    },
    headers: {
        Authorization: 'KakaoAK 944c0144b818850f00f4dc844d53751b',
    }
    })
    .then((res) => {return res.data})
    .catch((err) => {return err})
}; 
