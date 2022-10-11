 export const calcButtons =
    ['-', '*', '/', '+', 'DEL']
        .map((i) => ({value: String(i)}));

  export const inputButtons =
    Array.from(Array(10).keys())
        .map((i) => ({value: String(i)}))
        .concat([{value: '.'}, {value: '='}])