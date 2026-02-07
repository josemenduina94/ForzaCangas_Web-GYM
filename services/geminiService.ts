import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export async function generateFitnessAdvice(goal: string, activityLevel: string) { const prompt = Actúa como el Head Coach de Forza Cangas. Escribe un Plan Maestro de 400 PALABRAS en ESPAÑOL para un nivel "${activityLevel}" con el objetivo "${goal}". Incluye Biomecánica, Programación, Nutrición, Mindset y un cierre motivador gallego. Usa tono épico y profesional.;

try { const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); const result = await model.generateContent(prompt); const response = await result.response; const text = response.text();

} catch (error: any) { return Error técnico: ${error.message}. Revisa la API KEY en Vercel y haz Redeploy.; } }

export async function generateGoalVisual(goal: string) { return ''; }

export async function generateHeroImage() { return ''; }
