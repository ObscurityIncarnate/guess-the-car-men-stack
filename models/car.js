import { name } from "ejs";
import mongoose from "mongoose";
car = {
    name: {type: String, required: true},
    description: {type: String},
    image: {type: String, required: true},
    manufacture_date: {type: Date},
    manufacturer: {type: String, required: true},  
}

const CARS = mongoose.model("Cars", car );
export default CARS;