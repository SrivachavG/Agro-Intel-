
import React from 'react';

export const Hero: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 pt-24 pb-32 text-white">
      {/* Animated Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Powered by Gemini AI
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1]">
            Empowering Agriculture <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Through Intelligence
            </span>
          </h1>
          <p className="text-stone-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Harness the power of world-class AI to optimize your yields, detect diseases instantly, and navigate market trends with precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button 
              onClick={() => onNavigate('advisor')}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-emerald-600/20"
            >
              Consult AI Advisor
            </button>
            <button 
              onClick={() => onNavigate('diagnose')}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all"
            >
              Analyze Crops
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/40 transform hover:scale-[1.02] transition-transform duration-500 border border-white/10">
            <img 
              src="https://picsum.photos/id/10/800/600" 
              alt="Farm landscape" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-60"></div>
          </div>
          
          {/* Floating Stats Card */}
          <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl shadow-xl max-w-[200px] border border-emerald-500/20 text-stone-900">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                   <i className="fa-solid fa-cloud-sun"></i>
                </div>
                <span className="font-bold">Weather Ready</span>
             </div>
             <p className="text-sm text-stone-600">Optimal planting conditions detected in your region.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
