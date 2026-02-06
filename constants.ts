import { ClassItem, Trainer, PricingPlan } from './types';

export const CLASSES: ClassItem[] = [
  { id: 'm1', name: 'Powerlifting Élite', instructor: 'Marcos Vane', time: '08:00', day: 'Lunes', intensity: 'High', category: 'Strength' },
  { id: 'm2', name: 'Yoga Vanguardia', instructor: 'Elena Sterling', time: '09:30', day: 'Lunes', intensity: 'Low', category: 'Yoga' },
  { id: 'm3', name: 'Cross-Training', instructor: 'Javi Rico', time: '11:00', day: 'Lunes', intensity: 'High', category: 'HIIT' }
];

export const TRAINERS: Trainer[] = [
  {
    id: 't1',
    name: 'Marcos Vane',
    specialty: 'Powerlifting y Hipertrofia',
    bio: 'Ex-atleta olímpico. Especialista en fuerza bruta con control absoluto.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800'
  },
  {
    id: 't2',
    name: 'Elena Sterling',
    specialty: 'Yoga y Movilidad',
    bio: 'Maestra de bienestar. Combina calma y motivación para tu salud física.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-2960c8bad477?w=800'
  },
  {
    id: 't3',
    name: 'Javi Rico',
    specialty: 'HIIT Cross-Funcional',
    bio: 'Energía pura de Cangas. Especialista en WODs explosivos y metabolismo.',
    imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fe?w=800'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  { id: 'p1', name: 'Esencial', price: 39, features: ['Acceso al Gimnasio', '2 Clases/Mes'] },
  { id: 'p2', name: 'Élite', price: 69, features: ['Acceso Ilimitado', 'Todas las Clases'], isPopular: true },
  { id: 'p3', name: 'Forza Premium', price: 119, features: ['Acceso 24/7', 'Entrenamiento Personal'] }
];
