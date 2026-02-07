import { ClassItem, Trainer, PricingPlan } from './types';

export const CLASSES: ClassItem[] = [
  // Lunes - Mañana
  { id: 'm1', name: 'Powerlifting Élite', instructor: 'Marcos Vane', time: '08:00', day: 'Lunes', intensity: 'High', category: 'Strength' },
  { id: 'm2', name: 'Yoga Vanguardia', instructor: 'Elena Sterling', time: '09:30', day: 'Lunes', intensity: 'Low', category: 'Yoga' },
  { id: 'm3', name: 'Cross-Training Mañana', instructor: 'Javi Rico', time: '11:00', day: 'Lunes', intensity: 'High', category: 'HIIT' },
  // Lunes - Tarde
  { id: 't1', name: 'HIIT Metabólico', instructor: 'Javi Rico', time: '17:00', day: 'Lunes', intensity: 'High', category: 'HIIT' },
  { id: 't2', name: 'Zumba & Cardio', instructor: 'Elena Sterling', time: '18:30', day: 'Lunes', intensity: 'Medium', category: 'Cardio' },
  { id: 't3', name: 'Fuerza Total', instructor: 'Marcos Vane', time: '20:00', day: 'Lunes', intensity: 'High', category: 'Strength' },
  
  // Martes - Mañana
  { id: 'm4', name: 'Movilidad Articular', instructor: 'Elena Sterling', time: '08:30', day: 'Martes', intensity: 'Low', category: 'Yoga' },
  { id: 'm5', name: 'Fuerza Funcional', instructor: 'Marcos Vane', time: '10:00', day: 'Martes', intensity: 'Medium', category: 'Strength' },
  { id: 'm6', name: 'Cardio Box Mañana', instructor: 'Javi Rico', time: '11:30', day: 'Martes', intensity: 'High', category: 'Cardio' },
  // Martes - Tarde
  { id: 't4', name: 'Pilates Tarde', instructor: 'Elena Sterling', time: '17:30', day: 'Martes', intensity: 'Low', category: 'Yoga' },
  { id: 't5', name: 'Spartan WOD', instructor: 'Javi Rico', time: '19:00', day: 'Martes', intensity: 'High', category: 'HIIT' },
  { id: 't6', name: 'Levantamiento Olímpico', instructor: 'Marcos Vane', time: '20:30', day: 'Martes', intensity: 'High', category: 'Strength' },
];

export const TRAINERS: Trainer[] = [
  {
    id: 't1',
    name: 'Marcos Vane',
    specialty: 'Powerlifting y Hipertrofia',
    bio: 'Ex-atleta olímpico. Especialista en técnica de peso muerto y fuerza bruta con control absoluto.',
    imageUrl: 'https://images.unsplash.com/photo-1633706961726-c67a0b691734?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 't2',
    name: 'Elena Sterling',
    specialty: 'Yoga y Movilidad',
    bio: 'Maestra de bienestar. Elena combina la calma del yoga con una sonrisa motivadora para mejorar tu salud física.',
    imageUrl: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 't3',
    name: 'Javi Rico',
    specialty: 'HIIT Cross-Funcional',
    bio: 'Energía pura de Cangas. Especialista en WODs explosivos y acondicionamiento metabólico extremo.',
    imageUrl: 'https://images.unsplash.com/photo-1639496908204-6f949b0f46e1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SW5zdHJ1Y3RvciUyMGRlJTIwZml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'p1',
    name: 'Esencial',
    price: 39,
    features: ['Acceso al Gimnasio', 'Vestuarios Premium', '2 Clases/Mes', 'App Móvil']
  },
  {
    id: 'p2',
    name: 'Élite',
    price: 69,
    features: ['Acceso Ilimitado', 'Todas las Clases Incluidas', '1 Sesión de Entrenamiento Personal', 'Plan de Nutrición'],
    isPopular: true
  },
  {
    id: 'p3',
    name: 'Forza Premium',
    price: 119,
    features: ['Acceso 24/7 Prioritario', 'Entrenamiento Personal Semanal', 'Plan de Comidas AI', 'Zona Spa y Recuperación']
  }
];