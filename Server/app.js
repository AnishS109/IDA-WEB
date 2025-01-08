import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';

import ConnectionDB from "./database/database.js";
import router from "./routes/router.js";

dotenv.config();

const app = express();
const numCPUs = os.cpus().length; // Get the number of CPU cores

// This function will be executed by each worker process
const startServer = () => {
  app.use(cors());
  app.use("/", router);

  const PORT = process.env.BACKEND_PORT || 3000; // Ensure PORT is set correctly
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  ConnectionDB();
};

// If we're in the master process, fork worker processes
if (cluster.isMaster) {
  console.log(`Master process is running on PID: ${process.pid}`);

  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // When a worker dies, log it
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share the same server port
  startServer();
}
