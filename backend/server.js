import path from "path";
import express from "express";
import cors from "cors"; // ✅ OK
import dotenv from "dotenv";
<<<<<<< HEAD
dotenv.config();
console.log("MONGO_DB_URI:", process.env.MONGO_DB_URI);

=======
>>>>>>> 7fe828e8187f7ae1ba9eebe92f507c0875716b59
import cookieParser from "cookie-parser";
import mongoose from "mongoose"; // ✅ OK
import http from 'http'; // Import http module
import { Server } from 'socket.io'; // Correct import for Server

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

const app = express();  // Initialize Express app

const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
	cors: {
	  origin: "http://localhost:3000",  // Allow localhost:3000 to connect
	  methods: ["GET", "POST"],
	  credentials: true,
	}
  });
  

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Socket.io connection logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  // Your socket logic here
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
