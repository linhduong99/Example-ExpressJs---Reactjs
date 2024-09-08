// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
import RepoDetailsPage from "./pages/RepoDetailsPage";
import { RepoProvider } from "./contexts/RepoContext";

// Tạo một QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <RepoProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/repo/:id" element={<RepoDetailsPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </RepoProvider>
  );
}

export default App;
