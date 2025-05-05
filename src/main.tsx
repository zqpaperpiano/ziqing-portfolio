import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import Project from './components/Projects/Project.tsx';
import ProjectShop from './components/Projects/ProjectShop.tsx';


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/projects/:id" element={<ProjectShop />} />
       </Routes>
    </BrowserRouter>
)
