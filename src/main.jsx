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
import CategoryPage from './pages/CategoryPage.jsx'
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
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/projects/academic" element={<CategoryPage category="academic" />} />
          <Route path="/projects/machine-learning" element={<CategoryPage category="machine-learning" />} />
          <Route path="/projects/data-analyst" element={<CategoryPage category="data-analyst" />} />
          <Route path="/projects/learning" element={<CategoryPage category="learning" />} />
          <Route path="/projects/mini-projects" element={<CategoryPage category="mini-projects" />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>
);