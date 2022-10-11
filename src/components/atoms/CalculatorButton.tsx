import * as React from "react";
import { Center } from "@chakra-ui/react";

type CalculatorButtonProps = {
    onClick: () => void;
    backgroundColor: string;
    value: string
}
const CalculatorButton = ({ onClick, backgroundColor, value } : CalculatorButtonProps) => (
    <Center
        onClick={onClick}
        height="52px"
        border="1px solid grey"
        _hover={{backgroundColor:  "grey", color: "white" }}
        bg={backgroundColor}
        color="grey"
        cursor="pointer"
    >
        {value}
  </Center>
)

export default CalculatorButton;