
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateFitnessAdvice(goal: string, activityLevel: string) {
  const prompt = `Actúa como el Director Técnico de Forza Cangas. Eres un experto en fisiología y psicología deportiva. 
  
  CONTEXTO DEL ATLETA:
  - Nivel actual: ${activityLevel}
  - Objetivo declarado: ${goal}

  INSTRUCCIONES DE RESPUESTA AUTOMÁTICA SEGÚN NIVEL:
  - Si es PRINCIPIANTE: Enfócate en la base técnica, la adherencia y la seguridad. Usa un tono motivador y protector.
  - Si es INTERMEDIO: Habla de sobrecarga progresiva, variaciones de ejercicios y nutrición para el rendimiento.
  - Si es AVANZADO/ÉLITE: Sé extremadamente técnico. Habla de microciclos, RPE/RIR, optimización de sustratos energéticos y detalles biomecánicos finos.

  ESTRUCTURA OBLIGATORIA DEL MENSAJE (Extenso y detallado):
  1. ANALISIS DEL RETO: Evalúa la viabilidad de "${goal}" para un nivel "${activityLevel}".
  2. BLUEPRINT DE ENTRENAMIENTO: Diseña una semana tipo (frecuencia, intensidad, ejercicios específicos de Forza Cangas).
  3. NUTRICIÓN DE PRECISIÓN: Macros recomendados y timing de nutrientes para este objetivo.
  4. FACTOR MENTAL: Un consejo psicológico para no abandonar.
  5. EL SELLO FORZA: Termina con un cierre potente y auténtico de Cangas.

  REGLAS DE FORMATO:
  - Mínimo 350 palabras.
  - Usa un lenguaje profesional pero con "chispa" y energía.
  - Responde en Español.
  - Usa saltos de línea dobles para separar secciones claramente.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 10000 },
        temperature: 0.8
      }
    });
    return response.text || "Tu plan está listo en nuestra base de datos. ¡Vamos a por ello!";
  } catch (error) {
    console.error("Error generating advice:", error);
    return "La tecnología está procesando tu potencia. Mientras tanto, recuerda: la disciplina es el puente entre tus metas y tus logros. ¡Nos vemos en el box!";
  }
}

export async function generateGoalVisual(goal: string) {
  const prompt = `High-end commercial fitness photography of an athlete achieving ${goal}. Hyper-realistic, dramatic rim lighting, particles of chalk and sweat in the air, deep shadows, cinematic teal and orange color grading, 8k, bokeh background showing a premium gym atmosphere.`;
  
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
    return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200';
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
