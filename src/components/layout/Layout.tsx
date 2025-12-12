import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Layout({ children, onNavigate, currentPage }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header onNavigate={onNavigate} currentPage={currentPage} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
