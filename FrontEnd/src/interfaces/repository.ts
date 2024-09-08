export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  forks: number;
  created_at: string;
  latestCommit: {
    sha: string;
    author: string;
    date: string;
    message: string;
  };
}
