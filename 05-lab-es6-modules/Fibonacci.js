const generateFibonacci =(n)=> {
    const result = [];
    let a = 0;
    let b = 1;

    for (let i = 0; i < n; i++) {
        result.push(a);
        const temp = a + b;
        a = b;
        b = temp;
    }

    return result;
}

export default generateFibonacci;