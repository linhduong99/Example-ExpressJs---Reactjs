import { Request, Response } from "express";
import axios from "axios";
import { FORKS_THRESHOLD } from "../utils/constants";
import { API_BASE_URL } from "../utils/env";

const API_URL = `${API_BASE_URL}/users/freeCodeCamp/repos`;

export const getRepos = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(API_URL);
    const repos = response.data;

    const filteredRepos = repos
      .filter((repo: any) => !repo.fork && repo.forks > FORKS_THRESHOLD)
      .sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    res.json(filteredRepos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching repositories" });
  }
};
