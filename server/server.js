import 'dotenv/config';
import express from 'express'
import { connectDB } from './config/db.js';
import authRoutes from "./routes/authRoutes.js"


//create and configure an express application
const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json()); 

app.use("/api/auth", authRoutes);

//test home route
app.get("/", (req, res) => res.json("Helllooo"));
app.get("/about", (req, res) => res.json("This is about endpoint."));
app.get("/services", (req, res) => {
    res.send("<h1> Hello API Endpoint</h1> <p> Welcome to the server side. </p>")
});
app.get("/users", (req, res) => res.json("Users loading..."));

//connect to the MONGODB Database
await connectDB(process.env.MONGODB_URI);

//
app.listen(PORT, () => {
    console.log(`SERVER is running on http://localhost:${PORT}`)
})