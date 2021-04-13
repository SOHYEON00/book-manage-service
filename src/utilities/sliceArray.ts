export const sliceAuthorArray = (array:Array<string>) => {
    let returnStr = '';

    array.forEach((item:string, index:number) => {
        if(index === 0) {
            returnStr = returnStr.concat(item);
        } else {
            returnStr = returnStr.concat(', ', item);
        }
    });
    return returnStr;
};

export default sliceAuthorArray;