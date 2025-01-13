// import express from "express";
// import cors from "cors";
// import dotenv from 'dotenv';
// import cluster from 'cluster';
// import os from 'os';

// import ConnectionDB from "./database/database.js";
// import router from "./routes/router.js";

// dotenv.config();

// const app = express();
// const numCPUs = os.cpus().length; 

// const startServer = () => {
//   app.use(cors());
//   app.use("/", router);

//   const PORT = process.env.BACKEND_PORT || 3000; // Ensure PORT is set correctly
//   app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });

//   ConnectionDB();
// };


// if (cluster.isMaster) {

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//   });
// } else {
//   startServer();
// }
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import ConnectionDB from "./database/database.js";
import router from "./routes/router.js";

dotenv.config();

const app = express();

  app.use(cors());
  app.use("/", router);

  const PORT = process.env.BACKEND_PORT || 3000; // Ensure PORT is set correctly
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });

  ConnectionDB();
