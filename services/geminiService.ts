
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function generateFitnessAdvice(goal: string, activityLevel: string) {
  const prompt = `Actúa como un entrenador personal de élite en España. Proporciona un consejo de entrenamiento corto y motivador de máximo 3 frases para alguien cuyo objetivo es "${goal}" y su nivel de actividad actual es "${activityLevel}". Responde siempre en español y sé muy profesional.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "¡Sigue superando tus límites cada día en Cangas!";
  } catch (error) {
    console.error("Error generating advice:", error);
    return "El mejor entrenamiento es el que se hace. ¡Vamos a movernos!";
  }
}

export async function generateGoalVisual(goal: string) {
  const prompt = `A high-quality, cinematic, motivational fitness photography of a modern luxury gym setting in a coastal town like Cangas do Morrazo, representing the goal of "${goal}". Professional lighting, dynamic composition, 4k resolution.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200';
  } catch (error) {
    console.error("Error generating image:", error);
    return 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200';
  }
}

export async function generateHeroImage() {
    const prompt = "Cinematic wide shot of a modern luxury fitness studio in Galicia, Spain, with sea views from the windows, high-end wooden and metal equipment, warm and neon lighting mix, morning light. 4k resolution.";
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
            config: { imageConfig: { aspectRatio: "16:9" } }
        });
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
        }
    } catch (e) {
        return 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1920';
    }
    return 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1920';
}
