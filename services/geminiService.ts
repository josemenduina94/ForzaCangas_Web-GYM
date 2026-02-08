
import { GoogleGenAI } from "@google/genai";

export async function generateFitnessAdvice(goal: string, activityLevel: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Actúa como el Head Coach de Forza Cangas (Cangas do Morrazo).
    ATLETA: Nivel ${activityLevel}. 
    OBJETIVO: ${goal}.

    Genera un plan estratégico profesional de aproximadamente 180 palabras.
    
    REGLAS ESTRICTAS DE CONTENIDO:
    1. ANÁLISIS TÉCNICO: Proporcione una evaluación técnica específica para el nivel ${activityLevel}.
    2. PROGRAMA FORZA: Define 3 pilares clave del entrenamiento. PROHIBIDO usar la palabra 'Metcons'. Cámbiala por 'Acondicionamiento Metabólico' o 'Circuitos de Alta Intensidad'.
    3. NUTRICIÓN: Incluye un consejo nutricional clave y práctico para lograr el objetivo: ${goal}.
    4. MENSAJE FINAL: Termina con una frase potente y motivadora que refleje el espíritu de Cangas. NO incluyas encabezados como "MENSAJE FINAL:" ni títulos de sección. La frase debe ser el párrafo final del texto.

    ESTILO: Español de España, tono experto, enérgico y profesional. No utilices anglicismos innecesarios.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        temperature: 0.75,
      }
    });

    const text = response.text;
    if (!text) throw new Error("Respuesta vacía del modelo");
    
    return text;
  } catch (error) {
    console.error("Error en Coach AI:", error);
    // Fallback de alta calidad que simula un plan profesional en caso de error de red/API
    return `¡Atleta! En Forza Cangas nos tomamos tu objetivo de "${goal}" muy en serio. Para tu nivel ${activityLevel}, nuestra recomendación inmediata es priorizar la técnica en los movimientos básicos y programar tres sesiones semanales de alta intensidad. Pásate por el box de Cangas para que realicemos una evaluación biométrica completa y te entreguemos tu plan detallado en mano. ¡El cambio empieza en la arena de Cangas! ¡Fuerza!`;
  }
}

export async function generateGoalVisual(goal: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Professional cinematic fitness photography of an athlete achieving ${goal} in a premium high-end gym, red neon lighting accents, industrial luxury style, 8k resolution.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200';
  } catch (error) {
    console.error("Error visual:", error);
    return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200';
  }
}

export async function generateHeroImage() {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = "Cinematic wide shot of a high-end luxury fitness studio in Cangas, modern industrial design, dark aesthetic with warm and red lighting, 4k.";
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
            config: { imageConfig: { aspectRatio: "16:9" } }
        });
        
        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
              if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
              }
          }
        }
    } catch (e) {
        console.error("Error hero image:", e);
    }
    return 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1920';
}
