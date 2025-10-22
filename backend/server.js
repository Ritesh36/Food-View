import app from "./src/app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
dotenv.config();


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

connectDB();