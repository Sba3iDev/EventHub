import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/events", eventRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
