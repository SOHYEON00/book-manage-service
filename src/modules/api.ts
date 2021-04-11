import axios from "axios";
import { authInstance, authService } from "fBase";
import * as types from 'modules/types';


const init = {
    'apiKey': process.env.REACT_APP_GOOGLE_API_KEY,
    'clientId': process.env.REACT_APP_CLIENT_ID,
    'scope': types.SCOPE,
    'discoveryDocs':['https://sheets.googleapis.com/$discovery/rest?version=v4']
};

export const addBookGoogleSheet = async(data:any) => {
    return await new Promise((resolve, reject) => {
        gapi.client.init(init)
            .then(async() => {
                const params = {
                    spreadsheetId: process.env.REACT_APP_SPREADSHEET_ID || "",
                    range: 'A1:J1',
                    valueInputOption: "RAW",
                    insertDataOption: 'INSERT_ROWS',
                };
                const valueRangeBody = {
                    "values": [data.params]
                };
                await gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody)
                .then((res) => {
                    console.log(res.result);
                    resolve(res.result);
                })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                reject(err);
            })
    })
};


 // client.init으로 client 인증 -> sheets 정보 읽어온다.
export const getGoogleSheetsData = async() => {

    // 성공 시, promise의 resolve()를 리턴
    return await new Promise((resolve, reject) => {
        gapi.load('client:auth2', async () => {
            try {
                const params = {
                    spreadsheetId: process.env.REACT_APP_SPREADSHEET_ID || '',
                    ranges: [],
                    includeGridData: true
                };
               gapi.client.init(init).then(async() => {
                    await gapi.client.sheets.spreadsheets.get(params)
                        .then((res) => {
                            resolve(res.result.sheets); // 요청 성공 시, resolve를 통해 api 요쳥 결과값 전달
                        })
                        .catch((err) => {console.log(err);});
               }).catch((err) => {console.log(err);})
            }
            catch(err) {
                console.log(err);
                reject(err);
            }
        })
    })
};


// firebase를 이용한 구글 로그인 기능
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


