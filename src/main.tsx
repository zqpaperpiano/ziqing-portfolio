import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import Project from './components/Projects/Project.tsx';
import ProjectShop from './components/Projects/ProjectShop.tsx';
import Ziqing from './components/Ziqing/Ziqing.tsx';
import AllRecentActivity from './components/Ziqing/components/AllRecentActivity.tsx';
import { RepoProvider } from './contexts/repoContext.tsx';


createRoot(document.getElementById('root')!).render(
    <RepoProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/projects/:id" element={<ProjectShop />} />
          <Route path="/ziqing" element={<Ziqing />} />
          <Route path="/ziqing/projects/recently-active" element={<AllRecentActivity />} />
          <Route path="*" element={<div className="text-white">404 Not Found</div>} />
          </Routes>
      </BrowserRouter>
    </RepoProvider>
)
