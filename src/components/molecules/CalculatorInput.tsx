import { useCallback, useMemo } from "react";
import { SimpleGrid } from "@chakra-ui/react";

import { CalculationStatus, useAppContext } from "../organisms/Calculator";
import CalculatorButton from "../atoms/CalculatorButton";

export default function CalculatorInput() {
    const {
        currentCalculation,
        setCalculation,
        isResult,
        setIsResult,
        history,
        setHistory
      } = useAppContext();

      const calcButtons = useMemo(
        () =>
            ['-', '*', '/', '+', 'DEL']
            .map((i) => ({value: String(i)})),
        []
      );
      const inputButtons = useMemo(
        () =>
            [ ...Array(10).keys(), '.', '=']
            .map((i) => ({value: String(i)})),
        []
      );

      const evaluateCalculation = (calc: string) => {
        try {
            let result = eval(calc);
            result = Math.round((Number(result) + Number.EPSILON) * 100) / 100;
      
            const historyResult = { calc: `${calc}=${result}`, status: CalculationStatus.SUCCESS };
            if (history.length < 6) {
                setHistory([...history, historyResult]);
              } else {
                const [, ...newHistory] = history;
                setHistory([...newHistory, historyResult]);
              }
            return result
        }
        catch (error) {
            setHistory([...history, { calc, status: CalculationStatus.ERROR }]);
            return "Try again..."
        };
      }
      const updateCalculation = useCallback(
        (currentCalculation: string, pressedBtn: string) => {
          switch (pressedBtn) {
            case "DEL":
              setCalculation("");
              setIsResult(false);
              break;
    
            case "=":
              setCalculation(evaluateCalculation(currentCalculation));
              setIsResult(true);
              break;      
            default:
              if (isResult) {
                setCalculation(pressedBtn);
                setIsResult(false);
              } else {
                setCalculation(currentCalculation.concat(pressedBtn));
              }
              break;
          }
        },
        [isResult, setIsResult, setCalculation]
      );
      return (
        <>
        <SimpleGrid columns={5} >
         {calcButtons.map((btn, i) => (
            <CalculatorButton 
                onClick={() =>
                updateCalculation(currentCalculation, btn.value)
                }
                backgroundColor="cornflowerblue"
                value={btn.value}
                index={i}
            />
        )
         )}
        </SimpleGrid>
        <SimpleGrid columns={3}>
          {inputButtons.map((btn, i) => (
            <CalculatorButton 
              onClick={() =>
                updateCalculation(currentCalculation, btn.value)
              }
              backgroundColor="navajowhite"
              value={btn.value}
              index={i}
            />
            )
          )}
        </SimpleGrid>
        </>
      );
}
