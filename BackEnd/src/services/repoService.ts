import axios from "axios";
import { API_BASE_URL } from "../utils/env";
import { FORKS_THRESHOLD } from "../utils/constants";
import { Repository } from "../interfaces/repository";

export const fetchRepos = async (): Promise<Repository[]> => {
  const response = await axios.get<Repository[]>(
    `${API_BASE_URL}/users/freeCodeCamp/repos`
  );
  return response.data.filter(
    (repo) => !repo.fork && repo.forks > FORKS_THRESHOLD
  );
};
