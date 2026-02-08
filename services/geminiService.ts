
import { GoogleGenAI } from "@google/genai";

// Función auxiliar para obtener la IA de forma segura
const getAIInstance = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY no configurada. Por favor, asegúrate de que la variable de entorno esté presente.");
  }
  return new GoogleGenAI({ apiKey });
};

export async function generateFitnessAdvice(goal: string, activityLevel: string) {
  try {
    const ai = getAIInstance();
    
    const prompt = `Actúa como el Head Coach de Forza Cangas (Cangas do Morrazo).
    ATLETA: Nivel ${activityLevel}. 
    OBJETIVO: ${goal}.

    Genera un plan estratégico profesional y directo (máximo 200 palabras).
    
    REGLAS DE ORO:
    1. ANÁLISIS TÉCNICO: Evaluación para nivel ${activityLevel}.
    2. PROGRAMA FORZA: 3 pilares clave. PROHIBIDO usar la palabra 'Metcons'. Cámbiala por 'Entrenamiento de Acondicionamiento Metabólico' o 'Circuitos de Alta Intensidad'.
    3. NUTRICIÓN: Un consejo de nutrición real.
    4. MENSAJE FINAL: Termina con una frase potente y motivadora de Cangas. NO pongas el título "CIERRE MOTIVADOR" ni "MENSAJE FINAL". Solo escribe la frase al final del párrafo.

    ESTILO: Todo en español de España, tono enérgico, experto y motivador.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        temperature: 0.8,
        maxOutputTokens: 800 
      }
    });

    return response.text || "¡Atleta! Tu plan está listo. Te esperamos en el box para empezar el cambio.";
  } catch (error) {
    console.error("Error en Coach AI:", error);
    return `¡Atleta! Tu meta de "${goal}" es nuestra prioridad. Para evitar problemas técnicos de red, lo mejor es que vengas directamente a Forza Cangas. Evaluaremos tu nivel ${activityLevel} en persona y te daremos tu plan maestro de inmediato. ¡Fuerza!`;
  }
}

export async function generateGoalVisual(goal: string) {
  try {
    const ai = getAIInstance();
    const prompt = `Professional sports photography, intense athlete focused on ${goal}, industrial luxury gym style, cinematic lighting, 8k.`;
    
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
    return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200';
  }
}

export async function generateHeroImage() {
    try {
        const ai = getAIInstance();
        const prompt = "Cinematic interior of a high-end luxury gym in Cangas, modern equipment, dark aesthetic with red neon accents, 4k.";
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
