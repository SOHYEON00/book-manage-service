// props로 전달되는 유저 객체 타입
export interface userObjType {
    name: string;
    email: string;
    uid: string;
    isLoggin: boolean;
};

export interface errorType {
    code: string;
    message: string;
};

export interface bookRentType {
    rowNumber: number;
    borrower: string;
    borrow_date: string;
    isRent: boolean;
};

// props로 전달되는 db 내 도서 아이템 객체 타입
export interface bookListItemType {
    title: string;
    publisher: string;
    authors: Array<string>;
    thumbnail: string;
    url: string;
    borrower: string;
    borrow_date: string;
    isEbook: boolean;
    isRent: boolean;
    isbn: string;
    rowNumber: number;
};

// props로 전달되는 api 결과값 도서 아이템 객체 타입
export interface apiBookItemType {
    thumbnail: string;
    title: string;
    authors: Array<string>;
    publisher: string;
    isEbook: boolean;
    status: string;
    price: number;
    salePrice: number;
    isbn: string;
    url: string;
};

export interface sheetsItemType {
    values: Array<sheetsItemValueType>;
};

export interface sheetsItemValueType {
    formattedValue: string;
}