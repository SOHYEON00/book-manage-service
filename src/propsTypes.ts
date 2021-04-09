// props로 전달되는 유저 객체 타입
export interface userObjType {
    name: string,
    email: string,
    uid: string,
    isLoggin: boolean
};

export interface errorType {
    code: string,
    message: string
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

export interface sheetsItemType {
    values: Array<sheetsItemValueType>
};

export interface sheetsItemValueType {
    formattedValue: string
}