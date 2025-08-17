import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import AboutPage from './pages/AboutPage.jsx'
import OngoingPage from './pages/OngoingPage.jsx'
import AiSkillsPage from './pages/AiSkillsPage.jsx'
import WebSkillsPage from './pages/WebSkillsPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import BlogPostPage from './pages/BlogPostPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <HashRouter>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ongoing" element={<OngoingPage />} />
        <Route path="/ai-skills" element={<AiSkillsPage />} />
        <Route path="/web-skills" element={<WebSkillsPage />} />
        <Route path="/project1" element={<ProjectsPage />} />
        <Route path="/project2" element={<ProjectsPage />} />
        <Route path="/project3" element={<ProjectsPage />} />
        <Route path="/miniprojects" element={<ProjectsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
)