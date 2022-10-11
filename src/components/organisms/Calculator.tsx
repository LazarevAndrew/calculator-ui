import { Box, Center } from "@chakra-ui/react";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import CalculatorHistory from "../molecules/CalculatorHistory";
import CalculatorInput from "../molecules/CalculatorInput";
import CalculatorOutput from "../molecules/CalculatorOutput";

export enum CalculationStatus {
    SUCCESS,
    ERROR
};

interface Calculation {
    calc: string;
    status: CalculationStatus
}

interface CalculatorCtxInterface {
    currentCalculation: string;
    setCalculation: Dispatch<SetStateAction<string>>;
    isResult: boolean;
    setIsResult: Dispatch<SetStateAction<boolean>>;
    historyActive: boolean;
    setHistoryActive: Dispatch<SetStateAction<boolean>>;
    history: Calculation[];
    setHistory: Dispatch<SetStateAction<Calculation[]>>;
};

const initialCalculatorCtx:  CalculatorCtxInterface = {
    currentCalculation: '',
    setCalculation: (): void => {
        throw new Error('setCalculation function must be overridden');
    },
    isResult: false,
    setIsResult: (): void => {
        throw new Error('setIsResult function must be overridden');
    },
    historyActive: true,
    setHistoryActive: (): void => {
        throw new Error('setHistoryActive function must be overridden');
    },
    history: [],
    setHistory: (): void => {
        throw new Error('setHistoryOverlayActive function must be overridden');
    },
}

const AppContext = createContext<CalculatorCtxInterface>(initialCalculatorCtx);
export const useAppContext = () => useContext(AppContext);

export default function Calculator() {
  const [currentCalculation, setCalculation] = useState(initialCalculatorCtx.currentCalculation);
  const [isResult, setIsResult] = useState(initialCalculatorCtx.isResult);
  const [historyActive, setHistoryActive] = useState(initialCalculatorCtx.historyActive);
  const [history, setHistory] = useState(initialCalculatorCtx.history);

  return (
    <AppContext.Provider
      value={{
        currentCalculation,
        setCalculation,
        isResult,
        setIsResult,
        historyActive,
        setHistoryActive,
        history,
        setHistory,
      }}
    >
      <Center
        w="100vw"
        h="100vh"
        flexDirection="column"
        data-testid="calculator"
      >
        <Box
          w="300px"
          boxShadow="0px 0px 100px -15px grey"
          bg="grey"
        >
          <CalculatorOutput output={currentCalculation} />
          <CalculatorInput />
        </Box>
        <CalculatorHistory />
      </Center>
    </AppContext.Provider>
  );
}
