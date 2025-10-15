
import { GoogleGenAI } from "@google/genai";

const fileToGenerativePart = async (file: File) => {
  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

export const extractTextFromImages = async (imageFiles: File[], t: (key: string) => string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const model = 'gemini-2.5-flash';
  const prompt = "Extract all handwritten text from this image accurately. Preserve the original language and line breaks. Provide only the text content.";

  let allTexts: string[] = [];

  for (const file of imageFiles) {
    const imagePart = await fileToGenerativePart(file);
    const result = await ai.models.generateContent({
        model: model,
        contents: { parts: [{ text: prompt }, imagePart] },
    });
    
    const text = result.text;
    if (text) {
      allTexts.push(text);
    }
  }

  return allTexts.join('\n\n---\n\n');
};
