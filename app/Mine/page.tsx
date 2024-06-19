//@ts-nocheck
"use client"; // This indicates that the code is meant to run in the client-side environment

import { useAppContext } from "@/Context";
import {
  Box,
  Button,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import diamond from "/Other/Img/diamond.png";
import bomb from "/Other/Img/bomb.png";
import src from "/Other/sound/got.mp3"; // Importing the audio file

export default function Mine() {
  const { userAccountBalance, setUserAccountBalance } = useAppContext(); // Accessing context for user account balance

  // Arrays representing the mine and coin items
  let mineOptions = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24,
  ];
  let coin = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];

  const audioRef = useRef(null); // Ref for audio element
  const [isPlaying, setIsPlaying] = useState(false); // State to manage audio playback

  // State variables to manage the game logic
  const [clickItem, setCLickedItem] = useState([]);
  const [mines, setMines] = useState([]); // Changed from mineNumber to mines
  const [lose, setLose] = useState(false);
  const [betAmount, setBatAmount] = useState(1);
  const [selectedMine, setSelectedMine] = useState(1);

  // Function to check if the clicked item is a mine
  function mineChecker(itemNumber) {
    setIsPlaying(true); // Play the audio
    if (!clickItem.includes(itemNumber)) {
      setCLickedItem((clickItem) => [...clickItem, itemNumber]);

      if (mines.includes(itemNumber)) {
        setLose(true); // Player loses if the clicked item is a mine
      }
    }
  }

  // Function to handle the bet action
  function handalBet() {
    setCLickedItem([]); // Reset clicked items
    setLose(false); // Reset lose state
    if (userAccountBalance > 0) {
      setUserAccountBalance(userAccountBalance - betAmount); // Deduct bet amount from user balance
    } else {
      alert("Low bet amount!!"); // Alert if bet amount is too low
    }
    // Generate the selected number of unique mines
    let newMines = [];
    while (newMines.length < selectedMine) {
      const randomMineNumber = Math.floor(Math.random() * coin.length) + 1;
      if (!newMines.includes(randomMineNumber)) {
        newMines.push(randomMineNumber);
      }
    }
    setMines(newMines); // Set the mines state with the new mines
    console.log(newMines);
  }

  return (
    <>
      <Box p={2}>
        <HStack w={"100%"} bg={"#171717"}>
          <VStack h={"88vh"} w={"100%"}>
            <HStack w={"100%"}>
              <Box w={"30%"} h={"88vh"} bg={"#2F4553"} p={3}>
                <Tite text={"Bet Amount"} />
                <HStack>
                  <Input
                    type="number"
                    w={"70%"}
                    value={betAmount}
                    onChange={(e) => {
                      setBatAmount(e.target.value);
                    }}
                  />
                  <HStack w={"40%"}>
                    <AddMoney
                      text={"1/2"}
                      work={() => {
                        setBatAmount(betAmount / 2);
                      }}
                    />
                    <AddMoney
                      text={"2"}
                      work={() => {
                        setBatAmount(betAmount * 2);
                      }}
                    />
                  </HStack>
                </HStack>
                <Box mt={2}>
                  <Tite text={"Mine"} />
                  <Select
                    value={selectedMine}
                    onChange={(e) => setSelectedMine(Number(e.target.value))}
                  >
                    <option value="1">1</option>
                    {mineOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box w={"100%"} mt={3}>
                  <Button
                    w={"100%"}
                    p={7}
                    colorScheme="yellow"
                    onClick={handalBet}
                    disabled
                  >
                    BET
                  </Button>
                </Box>
              </Box>
              <VStack w={"100%"} h={"80vh"} p={3}>
                <HStack wrap={"wrap"} justifyContent={"center"} w={"700px"}>
                  {coin.map((item) => (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      key={item}
                    >
                      <Box
                        _hover={{
                          background: "#557086",
                        }}
                        m={1}
                        cursor={"pointer"}
                        className={`box-${item}`}
                        w={"110px"}
                        h={"110px"}
                        bg={"#2F4553"}
                        borderRadius={7}
                        onClick={() => mineChecker(item)}
                      >
                        {clickItem.includes(item) || lose ? ( // Show item if clicked or player lost
                          <>
                            {mines.includes(item) ? (
                              <Box textAlign={"center"}>
                                <Image src={bomb} alt="bomb" />
                                <audio autoPlay>
                                  <source
                                    src={
                                      "https://cdn.pixabay.com/audio/2022/03/10/audio_174242f3f4.mp3"
                                    }
                                    type="audio/mpeg"
                                  />
                                  Your browser does not support the audio
                                  element.
                                </audio>
                              </Box>
                            ) : lose === false ? (
                              <Box textAlign={"center"}>
                                <Image src={diamond} alt="diamond" />
                                <audio autoPlay>
                                  <source
                                    src={
                                      "https://cdn.pixabay.com/audio/2024/01/09/audio_28c453a8ff.mp3"
                                    }
                                    type="audio/mpeg"
                                  />
                                  Your browser does not support the audio
                                  element.
                                </audio>
                              </Box>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : null}
                      </Box>
                    </motion.button>
                  ))}
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </>
  );
}

// Component for buttons that modify the bet amount
function AddMoney({ text, work }) {
  return <Button onClick={work}>{text}</Button>;
}

// Component for displaying titles
function Tite({ text }) {
  return <Text color={"#B1BAD3"}>{text}</Text>;
}