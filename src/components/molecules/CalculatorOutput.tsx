import * as React from "react";
import { Flex } from "@chakra-ui/react";

const CalculatorOutput = ({ output }: { output: string}) => (
    <Flex
      id="outputSection"
      flexDirection="row-reverse"
      alignItems="flex-end"
      h="25%"
      px="15px"
      fontSize="48px"
    >
      {output}
    </Flex>
  );

  export default CalculatorOutput;