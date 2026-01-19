import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateModelDeepDive(modelTitle: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain the mental model "${modelTitle}" in the style of Charlie Munger. Keep it witty, rational, and focused on practical wisdom. Highlight one specific way to apply it to investing and one way to apply it to everyday life.`,
    config: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    }
  });
  return response.text;
}

// Upgrade to gemini-3-pro-preview for advanced reasoning/problem solving as per guidelines.
export async function solveWithModel(modelTitle: string, userProblem: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Apply the mental model "${modelTitle}" to the following problem: "${userProblem}". Give a clear, step-by-step rational analysis based on this model's logic.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: { type: Type.STRING },
          steps: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          conclusion: { type: Type.STRING }
        },
        required: ["analysis", "steps", "conclusion"]
      }
    }
  });
  
  try {
    // Correct way to extract text and trim before parsing JSON.
    return JSON.parse(response.text.trim());
  } catch (e) {
    return { analysis: response.text, steps: [], conclusion: "" };
  }
}

export async function getRandomWisdom() {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Provide a profound, rarely cited Charlie Munger piece of wisdom or a unique application of a mental model. Format as a single paragraph.",
  });
  return response.text;
}