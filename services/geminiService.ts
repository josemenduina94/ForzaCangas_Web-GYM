import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

export async function generateFitnessAdvice(goal: string, activityLevel: string) {
  // 1. Inicializamos la llave DENTRO de la función para evitar el error de "TR"
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenAI(apiKey);

  const prompt = `Actúa como el Head Coach de Forza Cangas. 
  Cliente nivel: ${activityLevel}. Objetivo: ${goal}.
  
  PROPORCIONA UNA RESPUESTA DE 400 PALABRAS:
  1. ANÁLISIS BIOMECÁNICO.
  2. PROGRAMACIÓN EN FORZA CANGAS.
  3. NUTRICIÓN Y RECUPERACIÓN.
  4. MINDSET.
  5. CIERRE CON FUERZA GALLEGA.

  Responde en ESPAÑOL, con tono épico y profesional.`;

  try {
    // 2. Usamos directamente el modelo aquí
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) throw new Error("Respuesta vacía");
    return text;

  } catch (error: any) {
    console.error("Error detallado:", error);
    // Si el error persiste, nos dirá exactamente por qué
    return `Error técnico: ${error.message}. ¡Reintenta en Forza Cangas!`;
  }
}

export async function generateGoalVisual(goal: string) {
  return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200';
}

export async function generateHeroImage() {
  return 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1920';
}
