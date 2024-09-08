import { useQuery } from "react-query";
import axios from "axios";

// Hàm để lấy dữ liệu từ API
const fetchRepos = async () => {
  const response = await axios.get("http://localhost:3001/repos");
  return response.data;
};

// Hook để sử dụng trong các component
const useRepos = () => {
  return useQuery("repos", fetchRepos);
};

export default useRepos;
