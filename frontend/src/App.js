import React, { useState } from "react";
import "./style.css";
import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  HStack,
  Heading,
  Select,
} from "@chakra-ui/react";

const App = () => {
  const [message, setMessage] = useState(0);
  const [data, setData] = useState("");
  const [typing, setTyping] = useState(false);
  const [ws, setWs] = useState(null);
  const [isFree, setIsFree] = useState(true);
  const [myArr, setMyArr] = useState([
    "What's the core idea of SICP in 150 words?",
    "Why did Terry Davis go mad?",
    "What did John Carmack achieve at ID Software?",
    "What were the last words of Captain Ahab in Moby Dick?",
    "Do you think K's inability to find The Castle is a mirroring of man's inability to find answers to the most important questions in his life?",
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const socket = new WebSocket("ws://localhost:3001");
    setWs(socket);

    console.log("msg is", message);

    socket.onopen = () => {
      socket.send(message);
    };

    let count = 1;

    socket.onmessage = (reply) => {
      setIsFree(false);
      setTimeout(() => {
        setData((prevData) => prevData + reply.data + " ");
      }, count * 100);

      // const xyz = reply.data.split(" ");

      // xyz.forEach((word, index) => {
      //   setTimeout(() => {
      //     setData((prevData) => prevData + word + " ");
      //   }, index * 1000);
      // });
      count += 1;
    };

    console.log("FREED");
    setIsFree(true);

    setData("");

    console.log("dsads", data, data.length);

    // if (data.length === 0) {
    //   setTyping(false);
    //   console.log("ds");
    // }
  };

  const handleInput = (event) => {
    setMessage(event.target.value);
  };

  const handleStop = (event) => {
    console.log("aaassasas", event.target.value, ws);
    setIsFree(true);
    if (ws) {
      console.log("aaassasas");
      // setMessage(event.target.value);
      // socket.send(message);
      ws.close();
      // setData(null);
      // setMessage(0);
    }
  };

  return (
    <>
      <Box bg="white" minH="100vh">
        <Box bg="gray.100" minW="100vw">
          <Center>
            <Heading as="h1" p="5px">
              Better-GPT
            </Heading>
          </Center>
        </Box>

        <Box
          minW="500px"
          minH="500px"
          p="50px"
          bg="gray.100"
          borderBottom="1px solid"
          borderColor="gray.300"
        >
          <span className={isFree ? "cursor-done" : "cursor"}>
            {data && data}
          </span>
        </Box>

        <Center>
          <Box bg="white" p="10px">
            <form onSubmit={handleSubmit}>
              <HStack>
                <FormLabel>Select a Prompt</FormLabel>
                {myArr && (
                  <Select size="sm" w="400px" onChange={handleInput}>
                    {myArr.map((prompt, index) => (
                      <option className="opt" key={index} value={index}>
                        {prompt}
                      </option>
                    ))}
                  </Select>
                )}

                <Button type="submit" colorScheme="green" isDisabled={!isFree}>
                  Enter
                </Button>
                <Button onClick={handleStop} value="stop" colorScheme="red">
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
