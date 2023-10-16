import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { Server } from "http";

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Application app listening on port ${config.port}`);
    });
    console.log("database connected");
  } catch (error) {
    console.log("database fail to connect", error);
  }

  process.on("unhandledRejection", (error) => {
    console.log("unhandled rejection is detected, we are closing out server");
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});
