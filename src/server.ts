import { Server } from "http";
import app from "./app";
import config from "./config";

let server: Server;

const startServer = () => {
  try {
    server = app.listen(config.port, () => {
      console.log("server listening to port", config.port);
    });
  } catch (error) {
    console.log("server connection failed!");
  }
};
startServer();

process.on("unhandledRejection", (err) => {
  console.log("unhandled rejection detected.server shutting down!!!", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("uncaught exception detected.server shutting down!!!", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received...server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
