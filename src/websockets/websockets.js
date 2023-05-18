const mensajes = [];

export default (io) => {
  io.on("connection", (socket) => {
    // el socket trae toda la data del cliente
    console.log("New user connected. Soquet ID : ", socket.id);

    /** on para escuchar
     *  emit para enviar
     */
    socket.on("set-user", (user) => {
      console.log("Current User Data", user);
    });

    /** El servidor recibe un nuevo msj y los re-envia */
    socket.on("new-message", (message) => {
      console.log("New Message", message);
      mensajes.push(message);
      socket.emit("all-messages", mensajes);
      socket.broadcast.emit("all-messages", mensajes);
    });

    socket.on("disconnect", (user) => {
      console.log("User disconnected:", user);
    });
  });
};
