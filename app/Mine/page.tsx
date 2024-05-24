//@ts-nocheck
"use client";

import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Mine() {
  let mine = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24,
  ];
  let coin = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];

  let mineplot = 2;
  const [clickItem, setCLickedItem] = useState({});
  function mineChecker(itemNumber) {
   
  }

  return (
    <>
      <Box p={2}>
        <HStack w={"100%"} bg={"#171717"}>
          <VStack h={"80vh"} w={"100%"}>
            <HStack w={"100%"}>
              <Box w={"30%"} h={"80vh"} bg={"#2F4553"} p={3}>
                <Tite text={"Bet Amount"} />
                <HStack>
                  <Input type="number" w={"70%"} />
                  <HStack w={"40%"}>
                    <AddMoney text={"1/2"} />
                    <AddMoney text={"2"} />
                  </HStack>
                </HStack>
                <Box mt={2}>
                  <Tite text={"Mine"} />
                  <Select>
                    <option value="1" selected>
                      1
                    </option>
                    {mine.map((item) => {
                      return (
                        <>
                          <option key={item} value={`${item}`}>
                            {item}
                          </option>
                        </>
                      );
                    })}
                  </Select>
                </Box>
                <Box w={"100%"} mt={3}>
                  <Button w={"100%"} p={7} colorScheme="yellow">
                    BET
                  </Button>
                </Box>
              </Box>
              <VStack w={"100%"} h={"80vh"} p={3}>
                <HStack wrap={"wrap"} justifyContent={"center"} w={"700px"}>
                  {coin.map((item) => {
                    return (
                      <>
                        <Box
                          m={1}
                          cursor={"pointer"}
                          w={"110px"}
                          h={"110px"}
                          bg={"#2F4553"}
                          borderRadius={7}
                          onClick={mineChecker(item)}
                        >
                         
                        </Box>
                      </>
                    );
                  })}
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </>
  );
}

function AddMoney({ text }) {
  return (
    <>
      <Button>{text}</Button>
    </>
  );
}

function Tite({ text }) {
  return (
    <>
      <Text color={"#B1BAD3"}>{text}</Text>
    </>
  );
}

//bg={"#2F4553"}
