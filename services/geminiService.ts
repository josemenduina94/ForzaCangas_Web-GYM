
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateFitnessAdvice(goal: string, activityLevel: string) {
  // Prompt refinado para ser directo, en español puro y sin encabezados de cierre.
  const prompt = `Actúa como el Head Coach de Forza Cangas.
  ATLETA: Nivel ${activityLevel}. 
  OBJETIVO: ${goal}.

  Genera un plan estratégico profesional y motivador de unas 150-200 palabras.
  
  REGLAS DE CONTENIDO:
  1. ANÁLISIS TÉCNICO: Evalúa el objetivo para un nivel ${activityLevel}.
  2. PROGRAMA FORZA: Define 3 pilares de entrenamiento. IMPORTANTE: No uses la palabra 'Metcons', usa 'Acondicionamiento Metabólico' o 'Circuitos de Alta Intensidad'.
  3. NUTRICIÓN: Da un consejo nutricional de alto impacto.
  4. CIERRE: Termina con una frase potente de Cangas. NO incluyas títulos como "MENSAJE FINAL" o "CIERRE MOTIVADOR", simplemente escribe la frase al final del texto.

  REGLAS DE FORMATO:
  - Todo en Español.
  - Tono: Experto, serio y enérgico.
  - Sin anglicismos innecesarios.`;

  try {
    // Usamos gemini-3-flash-preview por ser el más rápido. 
    // thinkingBudget: 0 hace que la respuesta sea inmediata.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        temperature: 0.7,
        maxOutputTokens: 1000 // Aumentado para asegurar que no se corte el mensaje
      }
    });

    return response.text || "¡Atleta! Estamos listos para empezar. Tu plan te espera en el box.";
  } catch (error) {
    console.error("Error en Coach AI:", error);
    return `¡Hola! Tu objetivo de "${goal}" es nuestra prioridad. Para evitar cualquier retraso técnico, te invitamos a venir al box de Forza Cangas para realizarte una evaluación física completa y entregarte tu plan de entrenamiento personalizado hoy mismo. ¡Fuerza!`;
  }
}

export async function generateGoalVisual(goal: string) {
  const prompt = `Professional sports photography, intense athlete training for ${goal}, dramatic lighting, high quality gym environment, 8k.`;
  
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
    return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200';
  }
}

export async function generateHeroImage() {
    const prompt = "Modern luxury fitness studio interior, cinematic lighting, 4k.";
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
