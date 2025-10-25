import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import "dotenv/config";
import CARS from "./models/car.js";
import methodOverride from "method-override"
//config
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"))

//*middleware
app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(methodOverride("_method"));
;
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
app.post("/cars", async (req, res) => {
    try {
        console.log(req.body)
        await CARS.create(req.body);
        res.redirect(`/cars`);
    } catch (error) {
        res.status(500).send("Failed to Create a new Car");
    } 
})
app.get("/cars/new", async (req, res) => {
    res.render("car/new")    
})
app.get("/cars/:carsId",  async (req, res)=>{
    try {
        const carId = req.params.carsId;
        const car = await CARS.findById(carId);
        res.render("car/show", {
            car
        });
    } catch (error) {
        res.status(500).send("Something went wrong, please try again!")
    }
    
})
app.get("/cars/:carsId/edit",  async (req, res)=>{
    try {
        const carId = req.params.carsId;
        const car = await CARS.findById(carId);
        res.render("car/edit", {
            car
        });
    } catch (error) {
        res.status(500).send("Something went wrong, please try again!")
    }
    
})
app.listen(3000);