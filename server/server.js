import express from "express";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/events", eventRoutes);

app.listen(port, () => {
    console.log("Started server");
});
