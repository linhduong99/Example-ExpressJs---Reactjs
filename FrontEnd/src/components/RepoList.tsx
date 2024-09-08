import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useRepoContext } from "../contexts/RepoContext";

const fetchRepos = async () => {
  const { data } = await axios.get("/repos");
  return data;
};

const RepoList: React.FC = () => {
  const { repos, setRepos, filteredRepos, setSelectedLanguage } =
    useRepoContext();
  const { data, error, isLoading } = useQuery("repos", fetchRepos);

  useEffect(() => {
    if (data) {
      setRepos(data);
    }
  }, [data, setRepos]);

  const handleLanguageFilter = (language: string) => {
    setSelectedLanguage(language);
  };

  const languages = Array.from(
    new Set(repos.map((repo) => repo.language))
  ).filter(Boolean);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as any).message}</div>;

  return (
    <div>
      <h1>Repository List</h1>
      <div>
        <button onClick={() => handleLanguageFilter("")}>All Languages</button>
        {languages.map((language) => (
          <button key={language} onClick={() => handleLanguageFilter(language)}>
            {language}
          </button>
        ))}
      </div>
      <ul>
        {filteredRepos.map((repo) => (
          <li key={repo.id}>
            <Link to={`/repo/${repo.id}`}>
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <p>{repo.language}</p>
              <p>Forks: {repo.forks}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
