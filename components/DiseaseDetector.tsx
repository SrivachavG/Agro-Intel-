
import React, { useState } from 'react';
import { getGeminiAdvisor } from '../services/geminiService';

export const DiseaseDetector: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const diagnosis = await getGeminiAdvisor("Please analyze this plant image for diseases or pests.", image);
      setResult(diagnosis);
    } catch (error) {
      setResult("Diagnosis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-stone-800">Instant Disease Diagnosis</h2>
        <p className="text-stone-500 mt-2">Upload a clear photo of your plant's leaves or affected areas for AI-powered analysis.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className={`relative aspect-square rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden ${
            image ? 'border-emerald-500' : 'border-stone-200 bg-stone-50'
          }`}>
            {image ? (
              <>
                <img src={image} className="w-full h-full object-cover" alt="Upload preview" />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center text-stone-400 group">
                <i className="fa-solid fa-cloud-arrow-up text-5xl mb-4 group-hover:text-emerald-500 transition-colors"></i>
                <span className="font-semibold text-stone-600">Click to upload photo</span>
                <span className="text-sm mt-1">Supports JPG, PNG</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            )}
          </div>
          
          <button 
            onClick={analyzeImage}
            disabled={!image || isAnalyzing}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-lg shadow-emerald-200 flex items-center justify-center gap-3"
          >
            {isAnalyzing ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i>
                Analyzing Leaf...
              </>
            ) : (
              <>
                <i className="fa-solid fa-magnifying-glass"></i>
                Run Diagnosis
              </>
            )}
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm min-h-[400px] flex flex-col">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <i className="fa-solid fa-stethoscope text-emerald-600"></i>
            Diagnosis Report
          </h3>
          
          {result ? (
            <div className="prose prose-stone max-w-none">
               <p className="whitespace-pre-wrap leading-relaxed text-stone-700">{result}</p>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-stone-400 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center text-2xl">
                <i className="fa-solid fa-file-lines"></i>
              </div>
              <p>Upload an image and run analysis to see the detailed report here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
