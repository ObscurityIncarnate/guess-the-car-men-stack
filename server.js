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
});


let cars =await CARS.find();
let randomCar =  Math.floor(Math.random()*cars.length);

app.get("/quiz", async (req, res)=>{
    try {
        cars =await CARS.find();
        randomCar =  Math.floor(Math.random()*cars.length);
        console.log(randomCar);
        // console.log(cars[randomCar]);
        res.render("quiz", {
            car: cars[randomCar]
        });
    } catch (error) {
        res.status(404).send("Counldnt find any car");
        console.log(error);
    }
    
});
app.post("/quiz", async (req, res) => {

     res.render("quiz_revealed", {
            car: cars[randomCar],
            guess: req.body.name
    });
})
app.get("/cars", async (req, res)=>{
    try{
         const cars = await CARS.find();

         res.render("car/index",{cars });
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
        console.log(error);
    } 
})
app.get("/cars/new", async (req, res) => {
    res.render("car/new")    
})
app.get("/cars/:carId",  async (req, res)=>{
    try {
        const carId = req.params.carId;
        const car = await CARS.findById(carId);
        if(!car){ res.status(404).send("Car not found")}
        res.render("car/show", {
            car
        });
    } catch (error) {
        res.status(500).send("Something went wrong, please try again!");
        console.log(error);
    }
    
})
app.put("/cars/:carId", async(req, res)=>{
    try {
        const carId = req.params.carId;
        
        await CARS.findByIdAndUpdate(carId, req.body);
        res.redirect(`/cars/${carId}`);
        console.log("Successful update operation");
    } catch (error) {
       res.status(500).send("Failed to update details!");
       console.log(error);
    }
})
app.delete("/cars/:carId", async(req, res)=>{
    try {
        const carId =  req.params.carId;
        await CARS.findByIdAndDelete(carId);
        res.redirect("/cars");
        console.log("Successful delete operation");
    } catch (error) {
        res.status(404).send("Failed to find and delete details!")
        console.log(error)
    }
})
app.get("/cars/:carId/edit",  async (req, res)=>{
    try {
        const carId = req.params.carId;
        const car = await CARS.findById(carId);
        res.render("car/edit", {
            car
        });
    } catch (error) {
        res.status(500).send("Something went wrong, please try again!")
    }
    
})
app.listen(3000);