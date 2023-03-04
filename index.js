const Express = require("express");
const mongoService = require("./src/helpers/mongodb_service");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const socketService = require("./src/helpers/socket_service")

const authRoute = require("./src/routes/authRoute");
const userRoute = require("./src/routes/userRoute");
const messageRoute = require("./src/routes/messageRoute");
const conversationRoute = require("./src/routes/conversationRoute");
const uploadRoute = require("./src/routes/uploadRoute");
const taskRoute = require("./src/routes/taskRoute");

const app = Express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", parameterLimit:50000, extended: true }));
app.use(Express.static('./src/public'))

const PORT = process.env.PORT || 3000;

// Routers
app.use("/v1/auth", authRoute);
app.use("/v1/users", userRoute);
app.use("/v1/messages", messageRoute);
app.use("/v1/conversations", conversationRoute);
app.use("/v1/tasks", taskRoute);
app.use("/v1/uploads", uploadRoute);

// MongoDB
mongoService.connectMongoDB();

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Socket.io
socketService(server);
