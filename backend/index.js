const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connections } = require('./configs/db');
const userRouter = require('./routers/UserRouter');
const resumeRouter = require('./routers/ResumeRouter');
const { auth } = require('./middilewares/AuthMiddileware');




const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use("/auth", userRouter);
app.use("/resumes", auth, resumeRouter);



app.listen(process.env.PORT, async () => {
    try {
        await connections
        console.log("Connected to DB")
    } catch (error) {
        console.log('error:', error);
    }
    console.log("Server listening");
})