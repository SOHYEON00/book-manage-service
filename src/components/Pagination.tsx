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
    const firstPage = 1; // 첫번째 페이지

     // 현제 페이지 위치와 앞,뒤 2개의 페이지 출력 ex) ...4,5,6,7,8...
    const continueMiddlePageBox = (current:number, array:Array<pageBoxType>) => {
        for(let i=current-2; i<=current+2; i++) {
            array.push({ pageNum: i, type: 'page'});
        }
        return array; // 리턴: 배열값
    };

    // 현재 페이지위치가 맨 끝(처음, 마지막) 포함 2개일 때 (1,2,3 or 마지막페이지-2 ~ 마지막페이지)
    const continueEndPageBox = (page1:number, page2:number, array:Array<pageBoxType>) => {
        let from;
        let to;

        // for문 시작, 마지막 지점 정하기 위한 조건문
        if(page1 <= page2) {
            from = page1;
            to = page2;
        } else {
            from = page2;
            to = page1;
        }

        for(let i=from; i<=to; i++) {
            array.push({ pageNum: i, type: 'page'});
        }
        return array; // 리턴: 배열값
    };



    const makePageBoxList = (firstPage:number, currentPage:number, endPage:number) => {
        let tempList:Array<pageBoxType> = [];

        // api 결과값이 없는 경우 (endPage === 0)
        if(endPage === 0) {
            tempList = [];
        }

        // 현재 페이지 위치:1 ~ 3  
        else if(currentPage <= firstPage + 2)  {
            continueEndPageBox(firstPage, firstPage+3, tempList);
            tempList.push({ pageNum: 0, type: 'next'});
            tempList.push({ pageNum: endPage, type: 'page'});
        } 
        
        // 현재 페이지 위치: 마지막 3개 (endPage-2 ~ endPage)
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

        // 페이지네이션 출력
        if(endPage === firstPage ) { // 1페이지만 있는 경우
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