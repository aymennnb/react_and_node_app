const express = require("express");
const cors = require("cors");
const https = require("https");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const route = require("./routes/userRoute");

const app = express();
dotenv.config();

const corsPort = process.env.PORTCLIENT;

const corsOptions = {
  origin: `http://localhost:${corsPort}`,
  credentials: true,
  optionsSuccessStatus: 200
};

const certsPath = path.join(__dirname, 'certs');

const webServerCerts = {
  key: fs.readFileSync(path.join(certsPath, 'server-web.key')),
  cert: fs.readFileSync(path.join(certsPath, 'server-web.crt'))
};

const mongooseOptions = {
  tls: true,
  tlsCAFile: path.join(certsPath, 'ca.crt'),
  tlsCertificateKeyFile: path.join(certsPath, 'node-client-combined.pem'),
  tlsAllowInvalidCertificates: false,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
dotenv.config();

const port = process.env.PORT;
const mongourl = process.env.MONGODB_URL;


mongoose
  .connect(mongourl, mongooseOptions)
  .then(() => {
    console.log("Database connection established: Mutual TLS authentication verified.");

    https.createServer(webServerCerts, app).listen(port, () => {
        console.log(`Backend service listening on https://localhost:${port}`);
        console.log("Security Mode: HTTPS / TLS 1.3 encryption active.");
    });
  })
  .catch((error) => {
    console.error("Critical Security Failure: Database connection could not be established.");
    console.error(`Error Details: ${error.message}`);
    process.exit(1);
  });

app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[ACCESS] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - IP: ${req.ip} - ${duration}ms`);

    if (res.statusCode === 401 || res.statusCode === 403) {
      console.warn(`[SECURITY ALERT] Unauthorized access attempt detected at ${req.originalUrl}`);
    }
  });

  next();
});

app.use("/api",route);
