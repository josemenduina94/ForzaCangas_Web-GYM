import { GoogleGenAI } from "@google/genai";

// Configuración profesional para Vercel
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function generateFitnessAdvice(goal: string, activityLevel: string) {
  const prompt = `Actúa como el Head Coach de Forza Cangas, un experto con 20 años de experiencia en entrenamiento de élite, biomecánica y nutrición deportiva avanzada.
  Un cliente con un nivel de condición física "${activityLevel}" se ha marcado el siguiente objetivo: "${goal}".

  Tu misión es proporcionarle una respuesta EXTREMADAMENTE DETALLADA y PROFESIONAL. No te limites a consejos genéricos. Tu respuesta debe incluir:

  1. ANÁLISIS BIOMECÁNICO Y FISIOLÓGICO: Explica qué procesos ocurrirán en su cuerpo al perseguir este objetivo considerando su nivel actual. Sé técnico pero comprensible.
  2. PROGRAMACIÓN ESTRATÉGICA: Define una estructura de microciclo. ¿Qué días debería priorizar fuerza? ¿Cuándo el trabajo metabólico? Menciona ejercicios específicos clave que no pueden faltar en Forza Cangas.
  3. PROTOCOLO DE RECUPERACIÓN Y NUTRICIÓN: No solo qué comer, sino cuándo y por qué. Habla de la importancia del sueño y suplementación básica si aplica.
  4. MINDSET Y PSICOLOGÍA: Cómo superar el muro mental que vendrá a las primeras semanas.
  5. CIERRE MOTIVACIONAL: Un mensaje potente con fuerza gallega, recordándole que en Cangas no solo entrenamos, forjamos versiones imparables.

  REGLAS DE FORMATO:
  - Extensión: Al menos 300-400 palabras.
  - Tono: Épico, profesional, técnico y motivador.
  - Idioma: Español.
  - Usa saltos de línea claros entre secciones.
  - Evita el uso excesivo de negritas.`;

  try {
    // Usamos el modelo 1.5-flash que es el más estable para entornos web
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en el Coach:", error);
    return "En Forza Cangas forjamos versiones imparables. El sistema está ajustando tu plan de élite, ¡hablemos en el box para empezar hoy mismo!";
  }
}

export async function generateGoalVisual(goal: string) {
  // Nota: El modelo Flash no genera imágenes directamente, 
  // así que devolvemos una foto de alta calidad de stock relacionada con el gimnasio
  return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200';
}

export async function generateHeroImage() {
  return 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1920';
}
