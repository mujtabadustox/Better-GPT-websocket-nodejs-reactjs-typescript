const socket = new WebSocket("ws://localhost:3001");

const openConnection = (message) => {
  if (message.trim() !== "") {
    socket.send(message);
  }

  socket.onmessage = (event) => {
    return event.data;
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default openConnection;
