const express = require("express");
const app = express();
const http = require("http"); // Create HTTP server
const { Server } = require("socket.io"); // WebSocket library
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");
const passport = require("./config/passportConfig");
const errorHandler = require("./Middleware/errorHandler");
const userRoutes = require("./Routes/authRoute");
const updateuserRoutes = require("./Routes/updateuserRoutes");
const healthRoutes = require("./Routes/healthRoute");
const timeSlotRoutes = require("./Routes/timeSlotRoutes");
const chatRoomRoutes = require("./Routes/chatRoomRoutes");
const ChatRoomModel = require("./Models/chatRoomModel"); // Chat Room model
const tripPlanRoutes = require("./Routes/tripPlanRoutes");
const chatBotRoutes = require("./Routes/chatbotRoutes");
const path = require("path");

dotenv.config();
const port = process.env.PORT;
const _dirname = path.resolve();


// Create HTTP server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://trip-planner-2lxk.onrender.com", // Allow frontend requests
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: "https://trip-planner-2lxk.onrender.com",
  credentials: true,
}));

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Database connection
require("./Connection/connectDB");

// Routes
app.use(userRoutes);
app.use(healthRoutes);
app.use(timeSlotRoutes);
app.use(chatRoomRoutes);
app.use(updateuserRoutes);
app.use(tripPlanRoutes);
app.use(chatBotRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

// WebSocket for real-time chat
io.on("connection", (socket) => {
 res.send("Connected");

  // Join a chat room
  socket.on("joinRoom", async ({ chatRoomId, userId }) => {
    try {
      const chatRoom = await ChatRoomModel.findById(chatRoomId);
      if (!chatRoom) {
        socket.emit("error", "Chat room not found");
        return;
      }

      // Ensure user is part of the chat room
      if (
        (!chatRoom.user || chatRoom.user.toString() !== userId) &&
        (!chatRoom.guide || chatRoom.guide.toString() !== userId)
      ) {
        socket.emit("error", "You are not authorized to join this chat room");
        return;
      }

      socket.join(chatRoomId);

      // Send previous messages to the user when they join
      socket.emit("previousMessages", chatRoom.messages);
    } catch (error) {
      console.error("❌ Error in joinRoom:", error);
      socket.emit("error", "Internal Server Error");
    }
  });

  // Send a message
  socket.on("sendMessage", async ({ chatRoomId, senderId, message }) => {
    try {
      const chatRoom = await ChatRoomModel.findById(chatRoomId);
      if (!chatRoom) {
        socket.emit("error", "Chat room not found");
        return;
      }

      // Save message in MongoDB
      const newMessage = { sender: senderId, message, timestamp: new Date() };
      chatRoom.messages.push(newMessage);
      await chatRoom.save();

      // Emit the message to everyone in the room
      io.to(chatRoomId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("❌ Error in sendMessage:", error);
      socket.emit("error", "Internal Server Error");
    }
  });

  socket.on("disconnect", () => {
  res.send("Disconnected");
  });
});


//frontend file serve
app.use(express.static(path.join(_dirname, "/trip_client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "trip_client", "dist", "index.html"));
}); 

// Start the server
server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
