import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import "dotenv/config";
import CARS from "./models/car.js";
//config
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//*middleware
app.use(morgan("dev"));
app.use(express.urlencoded());

const connect = ()=>{
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Successfully Connected to MongoDB")
    } catch (error) {
        console.log("🚨Failed to Connect to the Database🚨")
    }
    
}
connect();

//*routes

app.get("/", (req, res)=>{
    res.render("index");
})
app.get("/cars", async (req, res)=>{
    try{
         const cars = await CARS.find();
         res.render("car/index",
            {
                cars
            }
         );
    }
    catch(error){
        console.log(error);
        res.send("Something Went Wrong. Please Try Again At Another Time");
    }

})
app.listen(3000);