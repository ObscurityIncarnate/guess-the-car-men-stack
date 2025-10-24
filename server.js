import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import "dotenv/config"

const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded());

app.listen(3000);