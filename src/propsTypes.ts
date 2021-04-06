// props로 전달되는 유저 객체 타입
export interface userObjType {
    name: string,
    email: string,
    uid: string,
    isLoggin: false
};

// props로 전달되는 db 내 도서 아이템 객체 타입
export interface bookListItemType {
    thumbnail: string,
    title: string,
    authors: Array<string>,
    publisher: string,
    isEbook: boolean,
    isbn: string,
    url: string,
    isRent: boolean,
    borrower: string,
    borrow_data: string
};

// props로 전달되는 api 결과값 도서 아이템 객체 타입
export interface apiBookItemType {
    thumbnail: string,
    title: string,
    authors: Array<string>,
    publisher: string,
    isEbook: boolean,
    status: string,
    price: number,
    salePrice: number,
    isbn: string,
    url: string
};