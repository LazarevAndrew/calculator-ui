import * as React from "react";
import { Box, ListIcon, List, ListItem, Flex, Button } from "@chakra-ui/react";
import { MdCheckCircle, MdError } from 'react-icons/md'

import { CalculationStatus, useAppContext } from "../organisms/Calculator";

export default function CalculatorHistory() {
  const { historyActive, history, setHistoryActive } = useAppContext();

  return (
    <Flex
        justifyContent="center"
        pt="15px"
       >
    <Box>
        {history.length && (<Button
            aria-label="History"
            onClick={() => setHistoryActive(!historyActive)}
            variant="unstyled"
            zIndex="2"
        >Histoty</Button>)}
      </Box>
    <Box
      borderRadius="2xl"
      zIndex="1"
    > 
        <List spacing={3}>
        {(historyActive ? history : history.slice(-1)).map(({ calc, status }, index) => (
                <ListItem key={index} color="grey">
                <ListIcon 
                    as={status === CalculationStatus.SUCCESS ? MdCheckCircle : MdError } 
                    color={status === CalculationStatus.SUCCESS ? 'green.500': 'red'}
                />
                {calc}
                </ListItem>
        ))}
        </List>
    </Box>
    </Flex>
  );
}
