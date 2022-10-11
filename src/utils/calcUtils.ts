export const calculate = (calc: string): string => {
    // eslint-disable-next-line no-eval
    let result = eval(calc);
    return String(Math.round((Number(result) + Number.EPSILON) * 100) / 100);
}
