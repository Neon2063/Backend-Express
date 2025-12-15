import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS,
  })
);

app.use(
  express.json({
    limit: "20kb",
  })
);

app.use(express.urlencoded({

    limit: "20kb"
}));
app.use(express.static("public"))

app.use(cookieParser());

//import router
import userRouter from "./routes/user.routes.js"


//route declerations
app.use("/api/v1/",userRouter)
//intial route domain




export default app;
