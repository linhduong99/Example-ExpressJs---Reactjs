import React, { createContext, useContext, useState, ReactNode } from "react";
import { Repository as IRepo } from "../interfaces/repository";

interface RepoContextProps {
  repos: IRepo[];
  filteredRepos: IRepo[];
  setRepos: React.Dispatch<React.SetStateAction<IRepo[]>>;
  getRepoDetail: (repoId: number) => IRepo | undefined;
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const RepoContext = createContext<RepoContextProps | undefined>(undefined);

export const useRepoContext = () => {
  const context = useContext(RepoContext);
  if (context === undefined) {
    throw new Error("useRepoContext must be used within a RepoProvider");
  }
  return context;
};

export const RepoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const getRepoDetail = (repoId: number) => {
    return repos.find((repo) => repo.id === repoId);
  };

  const filteredRepos = repos.filter((repo) =>
    selectedLanguage ? repo.language === selectedLanguage : true
  );

  return (
    <RepoContext.Provider
      value={{
        repos,
        filteredRepos,
        setRepos,
        getRepoDetail,
        selectedLanguage,
        setSelectedLanguage,
      }}
    >
      {children}
    </RepoContext.Provider>
  );
};
