
import React, { useState, useEffect } from 'react';
import { AdvisorChat } from './components/AdvisorChat';
import { DiseaseDetector } from './components/DiseaseDetector';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setActiveTab(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'advisor':
        return <AdvisorChat />;
      case 'diagnose':
        return <DiseaseDetector />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return (
          <div className="animate-in fade-in duration-700">
            <Hero onNavigate={(tab) => {
               window.location.hash = tab;
               setActiveTab(tab);
            }} />
            <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon="fa-robot" 
                title="AI Expert Advisor" 
                desc="Chat with our advanced agronomist AI for tailored crop management strategies." 
                color="emerald"
                onClick={() => window.location.hash = 'advisor'}
              />
              <FeatureCard 
                icon="fa-magnifying-glass-leaf" 
                title="Disease Diagnosis" 
                desc="Upload photos of your crops for instant pest and disease identification." 
                color="amber"
                onClick={() => window.location.hash = 'diagnose'}
              />
              <FeatureCard 
                icon="fa-chart-line" 
                title="Market Analysis" 
                desc="Stay ahead with real-time market trends and yield projections." 
                color="sky"
                onClick={() => window.location.hash = 'dashboard'}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} setActiveTab={(tab) => {
        window.location.hash = tab;
        setActiveTab(tab);
      }} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string, title: string, desc: string, color: string, onClick: () => void }> = ({ icon, title, desc, color, onClick }) => {
  const colors: Record<string, string> = {
    emerald: 'bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-100 text-amber-600',
    sky: 'bg-sky-100 text-sky-600'
  };

  return (
    <div 
      onClick={onClick}
      className="p-8 rounded-2xl bg-white border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-2xl ${colors[color]}`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-600 transition-colors">{title}</h3>
      <p className="text-stone-500 leading-relaxed">{desc}</p>
      <div className="mt-6 flex items-center text-sm font-semibold text-emerald-600">
        Get Started <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
      </div>
    </div>
  );
};

export default App;
