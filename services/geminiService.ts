
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getGeminiAdvisor = async (prompt: string, imageBase64?: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const modelName = imageBase64 ? 'gemini-3-flash-preview' : 'gemini-3-flash-preview';
    
    let contents: any;
    if (imageBase64) {
      contents = {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: imageBase64.split(',')[1] } },
          { text: `As a professional agronomist, analyze this crop image. Identify the plant and any visible diseases or pests. Provide clear diagnosis and treatment recommendations. Prompt: ${prompt}` }
        ]
      };
    } else {
      contents = `You are an expert agronomist advisor named AgroIntel. Provide concise, scientifically-backed agricultural advice for the following user query: ${prompt}`;
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI advisor is currently unavailable. Please ensure your API key is correctly configured and try again later.";
  }
};
