import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { BasicExamplesPage } from './pages/BasicExamplesPage';
import { FormExamplesPage } from './pages/FormExamplesPage';
import { StylingExamplesPage } from './pages/StylingExamplesPage';
import { AdvancedExamplesPage } from './pages/AdvancedExamplesPage';
import { IOSFeaturesPage } from './pages/IOSFeaturesPage';
import { PerformancePage } from './pages/PerformancePage';
import { AccessibilityPage } from './pages/AccessibilityPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/basic" element={<BasicExamplesPage />} />
          <Route path="/forms" element={<FormExamplesPage />} />
          <Route path="/styling" element={<StylingExamplesPage />} />
          <Route path="/advanced" element={<AdvancedExamplesPage />} />
          <Route path="/ios-features" element={<IOSFeaturesPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;