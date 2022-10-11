import * as React from "react";
import { Center } from "@chakra-ui/react";

type CalculatorButtonProps = {
    index: number;
    onClick: () => void;
    backgroundColor: string;
    value: string
}
const CalculatorButton = ({ index, onClick, backgroundColor, value } : CalculatorButtonProps) => (
    <Center
        key={index}
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