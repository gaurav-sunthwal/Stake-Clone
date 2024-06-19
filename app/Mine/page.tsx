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

export default function Mine() {
  const { userAccountBalance, setUserAccountBalance } = useAppContext(); // Accessing context for user account balance

  // Arrays representing the mine and coin items
  const mineOptions = Array.from({ length: 24 }, (_, i) => i + 2);
  const coin = Array.from({ length: 25 }, (_, i) => i + 1);

  const audioRef = useRef(null); // Ref for audio element
  const [isPlaying, setIsPlaying] = useState(false); // State to manage audio playback

  // State variables to manage the game logic
  const [clickItem, setCLickedItem] = useState([]);
  const [mines, setMines] = useState([]);
  const [lose, setLose] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [selectedMine, setSelectedMine] = useState(1);
  const [rewards, setRewards] = useState(0);
  const [startBet, setStartBet] = useState(false);
  if (lose === true) {
    setInterval(() => {
      setLose(false);
    }, 5000);
  }
  // Function to check if the clicked item is a mine
  function mineChecker(itemNumber) {
    setIsPlaying(true); // Play the audio
    lose != true ? setRewards(rewards + rewards) : setRewards(0);
    if (!clickItem.includes(itemNumber)) {
      setCLickedItem((clickItem) => [...clickItem, itemNumber]);

      if (mines.includes(itemNumber)) {
        setLose(true);
        setRewards(0); // Reset rewards to 0 if the player loses
      }
    }
  }

  // Function to handle the bet action
  function handleBet() {
    setCLickedItem([]); // Reset clicked items
    setLose(false); // Reset lose state
    setMines([]); // Reset mines state

    if (userAccountBalance < betAmount) {
      alert("Low bet amount!!"); // Alert if bet amount is too low
      setStartBet(false);
      return;
    }

    setUserAccountBalance(userAccountBalance - betAmount); // Deduct bet amount from user balance
    setRewards((selectedMine / 100) * betAmount);
    setStartBet(true);

    // Generate the selected number of unique mines
    const newMines = [];
    while (newMines.length < selectedMine) {
      const randomMineNumber = Math.floor(Math.random() * coin.length) + 1;
      if (!newMines.includes(randomMineNumber)) {
        newMines.push(randomMineNumber);
      }
    }
    setMines(newMines); // Set the mines state with the new mines
  }

  // Function to handle cashing out rewards
  function handleRewards() {
    setUserAccountBalance(userAccountBalance + rewards);
    setCLickedItem([]);
    setMines([]);
    setStartBet(false);
  }

  return (
    <>
      <Box p={2}>
        <HStack w={"100%"} bg={"#171717"}>
          <VStack h={"88vh"} w={"100%"}>
            <HStack w={"100%"}>
              <Box w={"30%"} h={"88vh"} bg={"#2F4553"} p={3}>
                <Title text={"Bet Amount"} />
                <HStack>
                  <Input
                    type="number"
                    w={"70%"}
                    value={betAmount}
                    onChange={(e) => {
                      setBetAmount(Number(e.target.value));
                    }}
                  />
                  <HStack w={"40%"}>
                    <AddMoney
                      text={"1/2"}
                      work={() => {
                        setBetAmount(betAmount / 2);
                      }}
                    />
                    <AddMoney
                      text={"2"}
                      work={() => {
                        setBetAmount(betAmount * 2);
                      }}
                    />
                  </HStack>
                </HStack>
                <Box mt={2}>
                  <Title text={"Mine"} />
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
                    onClick={handleBet}
                  >
                    BET
                  </Button>
                  {startBet && (
                    <Button
                      mt={2}
                      w={"100%"}
                      p={7}
                      bg={"#557086"}
                      onClick={handleRewards}
                    >
                      Cash Out : {rewards}
                    </Button>
                  )}
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
                        {clickItem.includes(item) || lose ? (
                          <Box textAlign={"center"}>
                            {mines.includes(item) ? (
                              <>
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
                              </>
                            ) : (
                              <>
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
                              </>
                            )}
                          </Box>
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
function Title({ text }) {
  return <Text color={"#B1BAD3"}>{text}</Text>;
}
