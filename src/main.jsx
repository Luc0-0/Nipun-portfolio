import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import TerminalHero from './components/terminal/TerminalHero'
import CommandBar from './components/terminal/CommandBar'
import { preventAutoFocus } from './utils/focusManager'
import ProjectsPage from './components/terminal/ProjectsPage'
import ProjectDetail from './components/terminal/ProjectDetail'
import WritingPage from './pages/WritingPage'
import WritingPost from './pages/WritingPost'
import AboutPage from './pages/AboutPage'
import SkillsPage from './pages/SkillsPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import AchievementsPage from './pages/AchievementsPage'
import OpenSourcePage from './pages/OpenSourcePage'
import MapPage from './pages/MapPage'
import './index.css'

preventAutoFocus();

if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<TerminalHero />} />
          <Route path="/work" element={<ProjectsPage />} />
          <Route path="/work/:projectId" element={<ProjectDetail />} />
          <Route path="/opensource" element={<OpenSourcePage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/writing/:slug" element={<WritingPost />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <CommandBar />
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);
