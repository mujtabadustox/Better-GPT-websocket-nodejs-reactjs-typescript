import React, { useState } from "react";
import "./style.css";
import {
  Box,
  Button,
  Center,
  FormLabel,
  HStack,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react";

const App = () => {
  const myArr = [
    "What's the core idea of SICP in 150 words?",
    "Why did Terry Davis go mad?",
    "What did John Carmack achieve at ID Software?",
    "What were the last words of Captain Ahab in Moby Dick?",
    "Do you think K's inability to find The Castle is a mirroring of man's inability to find answers to the most important questions in his life?",
  ];

  const [message, setMessage] = useState(0);
  const [data, setData] = useState("");
  const [ws, setWs] = useState(null);
  const [isFree, setIsFree] = useState(true);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setPrompt(myArr[message]);

    const socket = new WebSocket("ws://localhost:3001");
    setWs(socket);

    socket.onopen = () => {
      setData("");
      socket.send(message);
    };

    socket.onclose = () => {
      setIsFree(true);
    };

    socket.onmessage = (reply) => {
      setIsFree(false);

      setData((prevData) => prevData + reply.data + " ");
    };
  };

  const handleInput = (event) => {
    setMessage(event.target.value);
  };

  const handleStop = (event) => {
    setIsFree(true);
    if (ws) {
      ws.close();
    }
  };

  return (
    <>
      <Box bg="white" minH="100vh">
        <Box bg="gray.100" maxW="100vw">
          <Center>
            <Heading as="h1" p="5px">
              Better-GPT
            </Heading>
          </Center>
        </Box>

        <Box
          minW="500px"
          minH="550px"
          maxH="550px"
          p="50px"
          bg="gray.100"
          borderBottom="1px solid"
          borderColor="gray.300"
        >
          <Box mb="20px">
            {data && prompt && (
              <Text as="b" fontSize="1.5em" fontFamily="monospace">
                "Q:" {prompt}
              </Text>
            )}
          </Box>
          {data && (
            <span className={isFree ? "cursor-done" : "cursor"}>
              "A:" {data && data}
            </span>
          )}
        </Box>

        <Center>
          <Box bg="white" p="10px">
            <form onSubmit={handleSubmit}>
              <HStack>
                <FormLabel>Select a Prompt</FormLabel>
                {myArr && (
                  <Select size="sm" w="400px" onChange={handleInput}>
                    {myArr.map((prompt, index) => (
                      <option key={index} value={index}>
                        {prompt}
                      </option>
                    ))}
                  </Select>
                )}

                <Button type="submit" colorScheme="green" isDisabled={!isFree}>
                  Enter
                </Button>
                <Button
                  onClick={handleStop}
                  value="stop"
                  colorScheme="red"
                  isDisabled={isFree}
                >
                  Stop
                </Button>
              </HStack>
            </form>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default App;
