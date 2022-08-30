import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import useRoutes from './routes/routes.js';

dotenv.config();

const app = express();

// Using necessery middleware functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());

// Routes
app.get('/' , (req, res)=>{
    res.send('Hello, Welcome to the Booking App')
});
useRoutes(app);

// PORT
const PORT = process.env.PORT || 8000;

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {});
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on('connected' , ()=>{
    console.log('DB Connected');
})
mongoose.connection.on('disconnected' , ()=>{
    console.log('DB Disconnected');
})

app.listen(PORT, () => {
  connectMongoDb();
  console.log(`Server is running at http://localhost:${PORT}`);
});
