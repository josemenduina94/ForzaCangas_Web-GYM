
import React, { useState } from 'react';
import { generateFitnessAdvice, generateGoalVisual } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('Intermedio');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ advice: string; image: string } | null>(null);

  const quickGoals = [
    "Perder 10kg de grasa",
    "Aumentar masa muscular",
    "Peso Muerto 200kg",
    "Correr mi primera 10k",
    "Mejorar flexibilidad"
  ];

  const handleSubmit = async (e?: React.FormEvent, presetGoal?: string) => {
    if (e) e.preventDefault();
    const targetGoal = presetGoal || goal;
    if (!targetGoal) return;
    
    setLoading(true);
    try {
      const [advice, image] = await Promise.all([
        generateFitnessAdvice(targetGoal, level),
        generateGoalVisual(targetGoal)
      ]);
      setResult({ advice, image });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-consult" className="py-24 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-24">
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Coach de Rendimiento <span className="text-red-500">AI</span></h2>
            <p className="text-zinc-400 mb-8 text-lg">
              Nuestro motor de inteligencia deportiva genera planes únicos. No son plantillas: es ciencia de datos aplicada a tu objetivo.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6 glass-morphism p-8 rounded-[2.5rem] border border-red-500/20 shadow-2xl mb-8">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-zinc-500 tracking-widest ml-1">¿Cuál es tu objetivo?</label>
                <input 
                  required
                  type="text" 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Ej: Powerlifting avanzado, definición..."
                  className="w-full bg-zinc-800 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-white font-medium"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {quickGoals.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => { setGoal(q); }}
                    className="text-[10px] uppercase font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-red-500/50 transition-colors text-zinc-400 hover:text-white"
                  >
                    {q}
                  </button>
                ))}
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-zinc-500 tracking-widest ml-1">Nivel de Condición Física</label>
                <select 
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-white font-medium appearance-none"
                >
                  <option>Principiante</option>
                  <option>Intermedio</option>
                  <option>Avanzado</option>
                  <option>Atleta de Élite</option>
                </select>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 py-5 rounded-2xl font-black text-lg uppercase tracking-tighter transition-all flex items-center justify-center space-x-3 disabled:opacity-50 shadow-xl shadow-red-600/20"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Analizando Variables Técnicas...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-brain"></i>
                    <span>Generar Plan Maestro</span>
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="min-h-[600px] flex items-start justify-center">
            {result ? (
              <div className="space-y-6 animate-fade-in w-full">
                <div className="relative group overflow-hidden rounded-[2.5rem] aspect-video shadow-2xl border border-white/10">
                  <img src={result.image} alt="Tu Meta Visualizada" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-8">
                    <span className="bg-red-600 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Previsualización AI</span>
                  </div>
                </div>
                
                <div className="glass-morphism p-10 rounded-[2.5rem] relative overflow-hidden border border-red-500/30">
                  <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-widest text-red-500">FORZA MASTER PLAN</h3>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Generado automáticamente para nivel {level}</p>
                    </div>
                    <i className="fas fa-bolt text-red-500 text-2xl"></i>
                  </div>
                  
                  <div className="text-zinc-200 text-base md:text-lg font-medium leading-relaxed whitespace-pre-line custom-scrollbar">
                    {result.advice}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-20 glass-morphism rounded-[2.5rem] border-2 border-dashed border-white/10 w-full group transition-all hover:border-red-500/30">
                <div className="bg-zinc-800 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner transform group-hover:scale-110 transition-transform border border-white/5">
                  <i className="fas fa-robot text-5xl text-red-500"></i>
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Análisis en Espera</h3>
                <p className="text-zinc-500 max-w-sm mx-auto text-lg leading-relaxed">
                  Completa el formulario de la izquierda. Nuestra IA procesará tu nivel y objetivos para entregarte una hoja de ruta técnica completa.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConsultant;
