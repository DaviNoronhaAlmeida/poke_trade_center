import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import errorhandler from "./middlewares/errorHandler.js";
import https from "https";
import fs from "fs";

dotenv.config({ path: "/.env" });

const options = {
    key: fs.readFileSync("ssl/key.pem"),
    cert: fs.readFileSync("ssl/cert.pem"),
};

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(json());
app.use(router);
app.use(cookieParser);

app.use(errorhandler);

const PORT = process.env.PORT;
// app.listen(PORT, () => {
//     console.log(process.env.DATABASE_URL);
//     console.log(`Running on port ${PORT}`);
// });
https.createServer(options, app).listen(PORT, () => {
    console.log(process.env.DATABASE_URL);
    console.log(`Running on port ${PORT}`);
});
