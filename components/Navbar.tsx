//@ts-nocheck

import { useAppContext } from "@/Context";
import { Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { FaBitcoin, FaUser } from "react-icons/fa";

export default function Navbar() {
  const { userAmount } = useAppContext();
  return (
    <>
      <nav
        style={{
          width: "100%",
          position: "fixed",
          backdropFilter: "blur(10px)",
          backgroundColor: "#171717",
          zIndex: 1000,
        }}
      >
        <Box p={2}>
          <HStack justifyContent={"space-around"}>
            <Box>
              <Heading className="title">Stake</Heading>
            </Box>
            <Box bg={"black"} borderRadius={4}>
              <HStack>
                <HStack p={2}>
                  <Box fontSize={"20px"} fontWeight={400}>
                    <Text>{userAmount}</Text>
                  </Box>
                  <Box color={"yellow"}>
                    <FaBitcoin />
                  </Box>
                </HStack>
                <Box>
                  <Button colorScheme="purple">Wallet</Button>
                </Box>
              </HStack>
            </Box>
            <Box>
              <HStack>
                <Text>
                  <FaUser />
                </Text>
              </HStack>
            </Box>
          </HStack>
        </Box>
      </nav>
    </>
  );
}
