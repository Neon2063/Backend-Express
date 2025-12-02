import DataBase from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

DataBase()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Eroor in connecting database", err);
  });

//router
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter)
