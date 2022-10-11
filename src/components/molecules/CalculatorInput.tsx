import * as React from "react";
import { SimpleGrid } from "@chakra-ui/react";

import { Calculation, CalculationStatus, useAppContext } from "../organisms/Calculator";
import CalculatorButton from "../atoms/CalculatorButton";
import { calculate } from "../../utils/calcUtils";
import { calcButtons, inputButtons } from "../../config/calculatorConfig";

export default function CalculatorInput() {
    const {
        currentCalculation,
        setCalculation,
        isResult,
        setIsResult,
        history,
        setHistory
      } = useAppContext();

      const evaluateCalculation = (calc: string) => {
        try {
          let result = calculate(calc);
          const successResult = { calc: `${calc}=${result}`, status: CalculationStatus.SUCCESS };

          setHistory([...history, successResult]);
          postCalculation(successResult)
          return result
      } catch (error) {
          const errorResult =  { calc, status: CalculationStatus.ERROR };
          setHistory([...history, errorResult]);
          postCalculation(errorResult)
          return "Try again..."
        }
      }

      /* 
        logs a calculations, does not affect UI behaviour
      */
      /*TODO move to hooks */
      const postCalculation = async (calculation: Calculation) => {
        try {
            const response = await fetch('/history', {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(calculation),
              });
              if(response.status !== 201) {
                throw new Error()
              }
              console.log(`${calculation.calc} has been saved`)
        } catch(error) {
            console.error(`${calculation.calc} has not been saved`)
        }
      }

      const updateCalculation = (currentCalculation: string, pressedBtn: string) => {
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
      }

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
                  key={i}
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
                key={i}
              />
              )
            )}
          </SimpleGrid>
        </>
      );
}
