import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorCompo from './components/ErrorCOmpo.jsx'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary fallback={ErrorCompo} onReset={()=>window.location.replace("/")}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
