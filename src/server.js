import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import homeRoutes from "./routes/homeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import websockets from "./websockets/websockets.js";
import exphbs from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";

/** ★━━━━━━━━━━━★ variables ★━━━━━━━━━━━★ */

const app = express();
const PORT = 8080 || process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
/** ★━━━━━━━━━━━★ connection server ★━━━━━━━━━━━★ */

/** Tenemos dos servidores:  httpServer (http) y io (websocket)*/
const httpServer = http.createServer(app);

/** Crear nuevo servidor websocket */
const ioServer = new Server(httpServer);

ioServer.on("connection", (socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

/** ★━━━━━━━━━━━★ middlewares ★━━━━━━━━━━━★*/
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
  })
);

/** ★━━━━━━━━━━━★ frontend ★━━━━━━━━━━━★*/
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

/** ★━━━━━━━━━━━★ routes ★━━━━━━━━━━━★ */
app.use("/", homeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

/** ★━━━━━━━━━━━★ websockets ★━━━━━━━━━━━★*/
//websockets(io);

const server = app.listen(PORT, () =>
  console.log(
    `🚀 Server started on port ${PORT}. 
      at ${new Date().toLocaleString()}`
  )
);
server.on("error", (err) => console.log(err));
