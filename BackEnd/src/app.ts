import express from "express";
import repoRoutes from "./routes/repoRoutes";
import { PORT } from "./utils/env";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // TODO fix hardcode
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/repos", repoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
