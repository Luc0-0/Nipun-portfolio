import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'
import App from './App.jsx'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import CategoryPage from './pages/CategoryPage'
import CertificationsPage from './pages/CertificationsPage'
import TimelinePage from './pages/TimelinePage'
import AutoProjectShowcase from './components/AutoProjectShowcase'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/projects/:category" element={<CategoryPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/live-projects" element={<AutoProjectShowcase />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);