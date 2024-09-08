import React from "react";
import { useParams, Link } from "react-router-dom";
import { useRepoContext } from "../contexts/RepoContext";

const RepoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRepoDetail } = useRepoContext();
  const repoDetail = getRepoDetail(id || "");

  if (!repoDetail) return <div>Repository not found</div>;

  return (
    <div>
      <h1>Repository Detail</h1>
      <button>
        <Link to="/">Back to List</Link>
      </button>
      <h2>{repoDetail.name}</h2>
      <p>Description: {repoDetail.description}</p>
      <p>Language: {repoDetail.language}</p>
      <p>Forks: {repoDetail.forks}</p>
      <h3>Latest Commit</h3>
      <p>SHA: {repoDetail.latestCommit.sha}</p>
      <p>Author: {repoDetail.latestCommit.author}</p>
      <p>Date: {repoDetail.latestCommit.date}</p>
      <p>Message: {repoDetail.latestCommit.message}</p>
    </div>
  );
};

export default RepoDetail;
