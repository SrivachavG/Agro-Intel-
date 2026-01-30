
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6 text-white">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-lg">
                <i className="fa-solid fa-leaf"></i>
              </div>
              <span className="text-xl font-bold tracking-tight">Agro<span className="text-emerald-600">Intel</span></span>
            </div>
            <p className="max-w-xs leading-relaxed">
              Global leaders in agricultural intelligence. Empowering farmers with the next generation of AI-driven tools.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#advisor" className="hover:text-emerald-400 transition-colors">AI Advisor</a></li>
              <li><a href="#diagnose" className="hover:text-emerald-400 transition-colors">Disease Diagnosis</a></li>
              <li><a href="#dashboard" className="hover:text-emerald-400 transition-colors">Market Trends</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Agronomy Blog</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Weather API</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Global Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2024 AgroIntel Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
