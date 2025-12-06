import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
// useTheme hook imported in components from './contexts/useTheme'
import ErrorBoundary from './components/ErrorBoundary'
import App from './App.jsx'
import WorkPage from './pages/WorkPage'
import WritingPage from './pages/WritingPage'
import AboutPage from './pages/AboutPage'
import TimelineResumePage from './pages/TimelineResumePage'
import ContactPage from './pages/ContactPage'
import LabPage from './pages/LabPage'
import AchievementsPage from './pages/AchievementsPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:projectId" element={<WorkPage />} />
            <Route path="/writing" element={<WritingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/timeline" element={<TimelineResumePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/lab" element={<Suspense fallback={<div className="w-full h-screen bg-black" />}><LabPage /></Suspense>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);