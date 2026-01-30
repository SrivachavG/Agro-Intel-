
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getGeminiAdvisor } from '../services/geminiService';

export const AdvisorChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am AgroIntel, your expert agronomist. How can I assist you with your crops today? Whether it is soil quality, planting schedules, or pest management, I am here to help.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await getGeminiAdvisor(input);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col h-[80vh]">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-stone-800">AI Expert Advisor</h2>
        <p className="text-stone-500">Ask anything about farming, soil, or crop management.</p>
      </div>

      <div className="flex-grow bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden flex flex-col">
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-6 bg-stone-50/50"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white border border-stone-200 text-stone-800 shadow-sm rounded-tl-none'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-stone-100">
          <div className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your agricultural question here..."
              className="w-full py-4 pl-6 pr-16 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping}
              className="absolute right-2 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          <div className="mt-3 flex gap-4 text-xs text-stone-400">
            <span>Example: "What is the best fertilizer for tomatoes in clay soil?"</span>
            <span>Example: "Signs of nitrogen deficiency in corn."</span>
          </div>
        </div>
      </div>
    </div>
  );
};
