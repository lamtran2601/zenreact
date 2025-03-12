/**
 * @pattern ApplicationEntry
 * @rule ApplicationIntegration
 * Main application entry point with provider integration
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PerformanceMonitoringProvider } from './utils/PerformanceMonitoringProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PerformanceMonitoringProvider>
      <App />
    </PerformanceMonitoringProvider>
  </React.StrictMode>,
)
