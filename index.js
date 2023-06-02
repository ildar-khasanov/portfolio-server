import express from "express";
import mongoose from "mongoose";
import { register, login, getMe } from "./controllers/UserControllers.js";
import { handleValidateErr } from "./utils/handleValidErr.js";
import { registerValidation } from "./validations.js";
import cors from "cors";
import checkAuth from "./utils/checkAuth.js";

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cors());

mongoose
    .connect(
        "mongodb+srv://test:wwwwwww@cluster0.y6xxsht.mongodb.net/portfolio?retryWrites=true&w=majority"
    )
    .then(() => console.log("BD ok"))
    .catch((err) => console.log("BD not okay"));

app.get("/", (req, res) => {
    // res.send("Hello world 25");
    res.json({ name: "ILdar" });
});

app.get("/auth/me", checkAuth, getMe);

// Create Users
app.post("/auth/register", registerValidation, handleValidateErr, register);

// Auth Users
app.post("/auth/login", login);

app.listen(PORT, () => {
    console.log("SERVER START " + PORT);
});
