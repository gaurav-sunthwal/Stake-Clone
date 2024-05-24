//@ts-nocheck
"use client";
import { useAppContext } from "@/Context";
import Navbar from "@/components/Navbar";
// import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  Img,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";

import mine from "../Other/Img/mine.png";
import { title } from "process";
import Link from "next/link";

export default function Home() {
  const { userAccountBalance, setUserAccountBalance } = useAppContext();
  return (
    <>
      <Box h={"8vh"}></Box>
      <Box m={3}>
        <GameSec Sectitle={"🔥 Top Games"} />
      </Box>
    </>
  );
}

function GameSec({ Sectitle, allGames }) {
  return (
    <>
      <Box>
        <Text fontSize={"20px"} m={2} fontWeight={"600"}>
          {Sectitle}
        </Text>
      </Box>
      <Box p={2} w={"100%"}>
        <HStack w={"100%"} overflow={"auto"}>
          <GameCard src={mine} />
          <GameCard src={mine} />
          <GameCard src={mine} />
          <GameCard src={mine} />
          <GameCard src={mine} />
          <GameCard src={mine} />
          <GameCard src={mine} />
          <GameCard src={mine} />
        </HStack>
      </Box>
    </>
  );
}

function GameCard({ src }) {
  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <Link href={"/Mine"}>
          <Card w={"200px"}>
            <Box w={"200px"}>
              <Image src={src} alt="gameImg" />
            </Box>
          </Card>
        </Link>
      </SimpleGrid>
    </>
  );
}
