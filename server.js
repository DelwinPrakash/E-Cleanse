import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password, "in server")
})

app.listen(3000, () => {
    console.log("Server is running on 3000");
})