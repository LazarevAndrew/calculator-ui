import { evaluate } from 'mathjs'

  
export const calculate = (calc: string): string => evaluate(calc);