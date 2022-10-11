import * as React from "react";
import { Box, ListIcon, List, ListItem, Button } from "@chakra-ui/react";
import { MdCheckCircle, MdError } from 'react-icons/md'

import { CalculationStatus, useAppContext } from "../organisms/Calculator";

export default function CalculatorHistory() {
  const { historyActive, history, setHistoryActive } = useAppContext();

  if(!history.length) return <></>;

  return (
    <Box>
        <Button
            aria-label="History"
            onClick={() => setHistoryActive(!historyActive)}
            variant="unstyled"
            fontSize="small"
            zIndex="2"
            color="grey"
        >{historyActive ? 'Show last calculation': 'Show more calculations'}</Button>
        <List spacing={3}>
        {/* retunrs last 5 logged calculations by default state */}
        {history.slice(historyActive ? Number((process.env.HISTORY_COUNT || -5)) : -1).map(({ calc, status }, index) => (
                <ListItem key={index} color="grey" fontSize="small">
                <ListIcon 
                    as={status === CalculationStatus.SUCCESS ? MdCheckCircle : MdError } 
                    color={status === CalculationStatus.SUCCESS ? 'green.500': 'red'}
                />
                {calc}
                </ListItem>
        ))}
        </List>
      </Box>
  );
}
