
import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xl">
            <i className="fa-solid fa-leaf"></i>
          </div>
          <span className="text-2xl font-bold tracking-tight text-stone-800">Agro<span className="text-emerald-600">Intel</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink active={activeTab === 'home'} onClick={() => setActiveTab('home')}>Home</NavLink>
          <NavLink active={activeTab === 'advisor'} onClick={() => setActiveTab('advisor')}>AI Advisor</NavLink>
          <NavLink active={activeTab === 'diagnose'} onClick={() => setActiveTab('diagnose')}>Diagnosis</NavLink>
          <NavLink active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>Market</NavLink>
        </nav>

        <button 
          onClick={() => setActiveTab('advisor')}
          className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-emerald-700 transition-all shadow-md hover:shadow-emerald-200"
        >
          Consult AI
        </button>
      </div>
    </header>
  );
};

const NavLink: React.FC<{ active: boolean, onClick: () => void, children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button 
    onClick={onClick}
    className={`font-medium transition-colors hover:text-emerald-600 ${active ? 'text-emerald-600' : 'text-stone-500'}`}
  >
    {children}
  </button>
);
