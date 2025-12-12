import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { BoxListPage } from './pages/BoxListPage';
import { GameComparePage } from './pages/GameComparePage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'guides':
        return <ArticlePage />;
      case 'box-list':
        return <BoxListPage />;
      case 'game-library':
        return <GameComparePage />; // Using Compare Page as Game Detail Demo
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <Layout onNavigate={handleNavigate} currentPage={currentPage}>
        {renderPage()}
      </Layout>
      <Toaster />
    </>
  );
}
