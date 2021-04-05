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
    
}
    

