import { first } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

interface Props {
    endPage: number,
    currentPage: number,
    onClickEvent: any
};

interface pageBoxType {
    pageNum: number,
    type: string // page, prev, next
};


const PaginationComponent = (prop:Props) => {
    const {endPage, currentPage, onClickEvent} = prop; // end page number
    const [pageBoxList, setPageBoxList] = useState<Array<pageBoxType>>([]);
    const firstPage = 1;

     // from부터 to까지의 수 만큼 연속된 페이지박스 생성
    const continueMiddlePageBox = (current:number, array:Array<pageBoxType>) => {
        let tempList:Array<pageBoxType> = [];

        for(let i=current-2; i<=current+2; i++) {
            tempList.push({ pageNum: i, type: 'page'});
        }
        tempList.forEach((value:pageBoxType)=> array.push(value));
        return array; // 리턴: 배열값
    };

    const continueEndPageBox = (page1:number, page2:number, array:Array<pageBoxType>) => {
        let tempList:Array<pageBoxType> = [];
        let from;
        let to;

        if(page1 <= page2) {
            from = page1;
            to = page2;
        } else {
            from = page2;
            to = page1;
        }

        for(let i=from; i<=to; i++) {
            tempList.push({ pageNum: i, type: 'page'});
        }
        tempList.forEach((value:pageBoxType)=> array.push(value));
        return array; // 리턴: 배열값
    };



    const makePageBoxList = (firstPage:number, currentPage:number, endPage:number) => {
        let tempList:Array<pageBoxType> = [];

        // 1 ~ 5 사이 
        if(currentPage <= firstPage + 2)  {
            continueEndPageBox(firstPage, firstPage+3, tempList);
            tempList.push({ pageNum: 0, type: 'next'});
            tempList.push({ pageNum: endPage, type: 'page'});
        } 
        
        // endPage - 5 ~ endPage 사이
        else if(currentPage >= endPage - 2) {
            tempList.push({ pageNum: firstPage, type: 'page'});
            tempList.push({ pageNum: 0, type: 'prev'});
            continueEndPageBox(endPage-3, endPage, tempList);
        } 
        // 그 외의 범위
        else {
            tempList.push({ pageNum: firstPage, type: 'page'});
            tempList.push({ pageNum: 0, type: 'prev'});
            continueMiddlePageBox(currentPage, tempList);
            tempList.push({ pageNum: 0, type: 'next'});
            tempList.push({ pageNum: endPage, type: 'page'});
        }
        return tempList;

    };

    useEffect(() => {
        // 잘못된 값이 입력된 경우.
        if(endPage < currentPage) {
            console.log('Error: endPage는 currentPage보다 작을 수 없습니다.');
        } 

        // 페이지네이션 출력
        if(endPage === 1 ) {
            const arr = continueEndPageBox(currentPage, endPage, []);
            setPageBoxList(arr);
        }
        else {
            setPageBoxList(makePageBoxList(firstPage, currentPage, endPage));
        }
    }, [currentPage, endPage]);


    return (
        <section>
            <Pagination>
                {pageBoxList.map((item:pageBoxType, index) => {
                    const active = (item.pageNum === currentPage) ? true : false;
                        if(item.type === 'page') {
                            return ( 
                                <Pagination.Item onClick={onClickEvent} active={active} key={`${item}/${index}`} id={JSON.stringify(item)}>
                                    {item.pageNum}
                                </Pagination.Item>
                            )
                        } else {
                            return (
                                <Pagination.Item onClick={onClickEvent} active={active} key={`${item}/${index}`} id={JSON.stringify(item)}>
                                    ...
                                </Pagination.Item>
                        );
                    }
                })}
            </Pagination>
        </section>
    );    
};

export default PaginationComponent;