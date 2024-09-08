export interface Repository {
  id: number;
  name: string;
  full_name: string;
  fork: boolean;
  forks: number;
  description?: string;
  latestCommit: {
    sha: string;
    author: string;
    date: string;
    message: string;
  };
}
