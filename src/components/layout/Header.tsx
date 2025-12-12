import React, { useState } from 'react';
import { Menu, Search, User, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '首页' },
    { id: 'box-list', label: '盒子大全' },
    { id: 'game-library', label: '游戏库' },
    { id: 'guides', label: '攻略资讯' },
    { id: 'discounts', label: '福利中心' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo */}
        <div 
          className="mr-8 flex items-center gap-2 font-bold text-xl text-white cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            G
          </div>
          <span>GameBox</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`transition-colors hover:text-white ${
                currentPage === item.id ? 'text-white' : 'text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search - Desktop */}
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="搜索游戏、盒子、攻略..."
              className="pl-9 bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-blue-500"
            />
          </div>

          {/* Search - Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* User Profile */}
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <User className="h-5 w-5" />
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-950 border-slate-800 text-slate-100">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`text-lg font-medium text-left px-4 py-2 rounded-md hover:bg-slate-900 ${
                      currentPage === item.id ? 'text-white bg-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden border-t border-slate-800 p-4 bg-slate-950">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="搜索..."
              className="pl-9 bg-slate-900 border-slate-800 text-slate-100"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
