import express from "express";
import { getRepos } from "../controllers/repoController";

const router = express.Router();

router.get("/", getRepos);

export default router;
