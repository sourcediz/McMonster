//Makes numbers over one thousand readable
export const convertThousands = (number: number) => {
    if (typeof number !== "number") {
        return "";
    }
    //Add thousand dot
    let tempNum =  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    //remove last 2 char
    tempNum = tempNum.substring(0, tempNum.length - 2);

    //remove last char if 0
    if(tempNum[tempNum.length - 1] === '0'){
        tempNum = tempNum.substring(0, tempNum.length - 2);
    }
    return tempNum + "K";
}