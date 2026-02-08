
import { GoogleGenAI } from "@google/genai";

export async function generateFitnessAdvice(goal: string, activityLevel: string) {
  try {
    // Inicialización siguiendo estrictamente las directrices del SDK
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
        temperature: 0.7,
      }
    });

    // Extracción de texto usando la propiedad .text (no método)
    const text = response.text;
    
    if (!text) throw new Error("Respuesta vacía del modelo");
    return text;

  } catch (error) {
    console.error("Error en Coach AI:", error);
    // Fallback de alta calidad para asegurar que siempre haya respuesta en Vercel
    return `¡Atleta! En Forza Cangas nos tomamos tu objetivo de "${goal}" muy en serio. Para tu nivel ${activityLevel}, nuestra recomendación inmediata es priorizar la técnica en los movimientos fundamentales y asegurar una recuperación óptima. Pásate por el box de Cangas para que realicemos una evaluación presencial y te entreguemos tu hoja de ruta personalizada. ¡Fuerza!`;
  }
}

export async function generateGoalVisual(goal: string) {
  // Siguiendo la petición del usuario de usar imágenes de stock para mayor estabilidad y velocidad
  return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200';
}

export async function generateHeroImage() {
  // Imagen de alta calidad predefinida para el fondo principal
  return 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1920';
}
