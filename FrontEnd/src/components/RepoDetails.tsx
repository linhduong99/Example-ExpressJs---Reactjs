import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useRepoContext } from "../contexts/RepoContext";
import axios from "axios";
import { useQuery } from "react-query";

const fetchCommit = async (repoName: string) => {
  const { data } = await axios.get(
    `https://api.github.com/repos/freeCodeCamp/${repoName}/commits` // TODO fix hardcode
  );
  return data;
};

export default function RepoDetail() {
  const { id } = useParams<{ id: string }>();
  const { getRepoDetail } = useRepoContext();
  const repoDetail = getRepoDetail(Number(id));

  const { data: commitData } = useQuery({
    queryKey: "repo-commit",
    queryFn: () => fetchCommit(repoDetail?.name || ""),
    enabled: !!repoDetail,
  });

  const latestCommit = useMemo(() => {
    if (!commitData) return undefined;
    const listCommit = commitData.map((e: any) => e?.commit);
    const lCommit = listCommit.reduce((latest: any, current: any) => {
      const latestDate = new Date(latest.committer.date);
      const currentDate = new Date(current.committer.date);
      return latestDate > currentDate ? latest : current;
    });
    return lCommit;
  }, [commitData]);

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
      {latestCommit && (
        <>
          <h3>Latest Commit</h3>
          <p>SHA: {latestCommit?.sha}</p>
          <p>Author: {latestCommit.author}</p>
          <p>Date: {latestCommit.date}</p>
          <p>Message: {latestCommit.message}</p>
        </>
      )}
    </div>
  );
}
