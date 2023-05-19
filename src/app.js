import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import websockets from "./websockets/websockets.js";
import exphbs from "express-handlebars";

/** ★━━━━━━━━━━━★ variables ★━━━━━━━━━━━★ */

const app = express();
const PORT = 8080 || process.env.PORT;

/** ★━━━━━━━━━━━★ connection server ★━━━━━━━━━━━★ */

/** Tenemos dos servidores:  httpServer (http) y io (websocket)*/
const httpServer = http.createServer(app);

/** Crear nuevo servidor websocket */
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

/** ★━━━━━━━━━━━★ middlewares ★━━━━━━━━━━━★*/
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
  })
);

/** ★━━━━━━━━━━━★ frontend ★━━━━━━━━━━━★*/
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "views");

/** ★━━━━━━━━━━━★ routes ★━━━━━━━━━━━★ */
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

/** ★━━━━━━━━━━━★ websockets ★━━━━━━━━━━━★*/
websockets(io);

const server = app.listen(PORT, () =>
  console.log(
    `🚀 Server started on port ${PORT}. 
      at ${new Date().toLocaleString()}`
  )
);
server.on("error", (err) => console.log(err));
