import React, { useState } from "react";
import openConnection from "./socket/chat.js";

const socket = new WebSocket("ws://localhost:3001");

const App = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message.trim() !== "") {
      socket.send(message);
      setMessage("");
    }

    socket.onmessage = (reply) => {
      console.log(reply.data);
      const abc = reply.data + " ";
      console.log("ha", abc);
      setData((prevData) => prevData + abc);
    };

    setData("");
  };

  const handleInput = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      Hi Mom!
      <form onSubmit={handleSubmit}>
        <label>Enter Prompt</label>
        <input
          placeholder="Hi,how are you!"
          type="text"
          value={message}
          onChange={handleInput}
        ></input>
        <button type="submit">Enter</button>
      </form>
      <p>{data && data}</p>
    </>
  );
};

export default App;
