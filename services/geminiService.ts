
import { GoogleGenAI, Type } from "@google/genai";
import type { DiagnosisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const diagnosisSchema = {
  type: Type.OBJECT,
  properties: {
    possibleDiagnoses: {
      type: Type.ARRAY,
      description: "A list of potential medical conditions based on the symptoms. Provide 2-4 possibilities.",
      items: {
        type: Type.OBJECT,
        properties: {
          condition: {
            type: Type.STRING,
            description: "The name of the potential medical condition.",
          },
          description: {
            type: Type.STRING,
            description: "A brief, easy-to-understand explanation of the condition and why it might be relevant to the user's symptoms.",
          },
          likelihood: {
            type: Type.STRING,
            description: "An estimated likelihood (e.g., 'High', 'Medium', 'Low') based on the provided symptoms.",
          },
        },
        required: ["condition", "description", "likelihood"],
      },
    },
    recommendations: {
      type: Type.ARRAY,
      description: "A list of 2-5 actionable next steps for the user, such as consulting a specialist, trying home remedies, or monitoring symptoms.",
      items: {
        type: Type.STRING,
      },
    },
    disclaimer: {
      type: Type.STRING,
      description: "A mandatory disclaimer stating this is not medical advice and the user must consult a healthcare professional for a real diagnosis.",
    },
  },
  required: ["possibleDiagnoses", "recommendations", "disclaimer"],
};

export const getDiagnosis = async (symptoms: string): Promise<DiagnosisResult> => {
  const systemInstruction = `You are a helpful medical AI assistant. Your goal is to analyze user-provided symptoms and offer a list of potential diagnoses and recommended next steps. 
  You must not provide a definitive diagnosis. Your tone should be caring, professional, and informative.
  Always include a clear disclaimer that your analysis is not a substitute for professional medical advice and the user should consult a doctor.
  Do not use markdown in your response.`;
  
  const userPrompt = `Please analyze the following symptoms: "${symptoms}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: diagnosisSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Basic validation to ensure the response matches the expected structure
    if (!result.possibleDiagnoses || !result.recommendations || !result.disclaimer) {
        throw new Error("Invalid response structure from API.");
    }
    
    return result as DiagnosisResult;
  } catch (error) {
    console.error("Error fetching diagnosis from Gemini API:", error);
    throw new Error("Failed to get a valid response from the AI. Please try again.");
  }
};
