import { BodyMetric, Goal, PhotoProgress, Workout } from "@/lib/types";

export const workouts: Workout[] = [
  {
    id: "w1",
    date: "2026-05-04",
    routine: "Push",
    durationMin: 68,
    effort: 8,
    exercises: [
      { id: "e1", name: "Press banca", muscle: "Pecho", sets: [{ reps: 8, weight: 55, rir: 2 }, { reps: 7, weight: 57.5, rir: 1 }, { reps: 6, weight: 60, rir: 1 }], notes: "Mejor tecnica en la segunda serie." },
      { id: "e2", name: "Press militar", muscle: "Hombros", sets: [{ reps: 8, weight: 32.5, rir: 2 }, { reps: 8, weight: 32.5, rir: 2 }, { reps: 6, weight: 35, rir: 1 }] },
      { id: "e3", name: "Fondos", muscle: "Triceps", sets: [{ reps: 10, weight: 0, rir: 2 }, { reps: 9, weight: 0, rir: 1 }, { reps: 8, weight: 0, rir: 1 }] }
    ]
  },
  {
    id: "w2",
    date: "2026-05-06",
    routine: "Pull",
    durationMin: 61,
    effort: 7,
    exercises: [
      { id: "e4", name: "Peso muerto", muscle: "Espalda", sets: [{ reps: 5, weight: 100, rir: 2 }, { reps: 5, weight: 105, rir: 1 }, { reps: 4, weight: 110, rir: 1 }] },
      { id: "e5", name: "Dominadas", muscle: "Espalda", sets: [{ reps: 8, weight: 0, rir: 2 }, { reps: 7, weight: 0, rir: 1 }, { reps: 6, weight: 0, rir: 1 }] },
      { id: "e6", name: "Curl biceps", muscle: "Biceps", sets: [{ reps: 10, weight: 15, rir: 2 }, { reps: 9, weight: 17.5, rir: 1 }, { reps: 8, weight: 17.5, rir: 1 }] }
    ]
  },
  {
    id: "w3",
    date: "2026-05-08",
    routine: "Piernas",
    durationMin: 72,
    effort: 9,
    exercises: [
      { id: "e7", name: "Sentadilla", muscle: "Piernas", sets: [{ reps: 8, weight: 75, rir: 2 }, { reps: 7, weight: 80, rir: 1 }, { reps: 6, weight: 82.5, rir: 1 }] },
      { id: "e8", name: "Prensa", muscle: "Piernas", sets: [{ reps: 12, weight: 150, rir: 2 }, { reps: 10, weight: 160, rir: 1 }, { reps: 10, weight: 160, rir: 1 }] },
      { id: "e9", name: "Plancha", muscle: "Core", sets: [{ reps: 45, weight: 0, rir: 3 }, { reps: 40, weight: 0, rir: 2 }] }
    ]
  },
  {
    id: "w4",
    date: "2026-05-11",
    routine: "Push",
    durationMin: 66,
    effort: 8,
    exercises: [
      { id: "e10", name: "Press banca", muscle: "Pecho", sets: [{ reps: 8, weight: 57.5, rir: 2 }, { reps: 7, weight: 60, rir: 1 }, { reps: 5, weight: 62.5, rir: 1 }] },
      { id: "e11", name: "Aperturas", muscle: "Pecho", sets: [{ reps: 12, weight: 12.5, rir: 2 }, { reps: 12, weight: 12.5, rir: 2 }, { reps: 10, weight: 15, rir: 1 }] },
      { id: "e12", name: "Extensiones triceps", muscle: "Triceps", sets: [{ reps: 12, weight: 25, rir: 2 }, { reps: 10, weight: 27.5, rir: 1 }, { reps: 10, weight: 27.5, rir: 1 }] }
    ]
  },
  {
    id: "w5",
    date: "2026-05-13",
    routine: "Pull",
    durationMin: 64,
    effort: 8,
    exercises: [
      { id: "e13", name: "Peso muerto", muscle: "Espalda", sets: [{ reps: 5, weight: 105, rir: 2 }, { reps: 4, weight: 112.5, rir: 1 }, { reps: 3, weight: 115, rir: 1 }] },
      { id: "e14", name: "Remo barra", muscle: "Espalda", sets: [{ reps: 9, weight: 60, rir: 2 }, { reps: 8, weight: 62.5, rir: 1 }, { reps: 8, weight: 62.5, rir: 1 }] },
      { id: "e15", name: "Curl biceps", muscle: "Biceps", sets: [{ reps: 10, weight: 17.5, rir: 2 }, { reps: 8, weight: 20, rir: 1 }, { reps: 8, weight: 20, rir: 1 }] }
    ]
  },
  {
    id: "w6",
    date: "2026-05-15",
    routine: "Piernas",
    durationMin: 75,
    effort: 9,
    exercises: [
      { id: "e16", name: "Sentadilla", muscle: "Piernas", sets: [{ reps: 8, weight: 80, rir: 2 }, { reps: 6, weight: 85, rir: 1 }, { reps: 5, weight: 87.5, rir: 1 }] },
      { id: "e17", name: "Peso muerto rumano", muscle: "Piernas", sets: [{ reps: 10, weight: 70, rir: 2 }, { reps: 9, weight: 75, rir: 1 }, { reps: 8, weight: 75, rir: 1 }] },
      { id: "e18", name: "Elevaciones piernas", muscle: "Core", sets: [{ reps: 15, weight: 0, rir: 2 }, { reps: 12, weight: 0, rir: 1 }, { reps: 12, weight: 0, rir: 1 }] }
    ]
  },
  {
    id: "w7",
    date: "2026-05-18",
    routine: "Upper",
    durationMin: 70,
    effort: 8,
    exercises: [
      { id: "e19", name: "Press banca", muscle: "Pecho", sets: [{ reps: 8, weight: 60, rir: 2 }, { reps: 6, weight: 62.5, rir: 1 }, { reps: 4, weight: 65, rir: 1 }] },
      { id: "e20", name: "Dominadas", muscle: "Espalda", sets: [{ reps: 9, weight: 0, rir: 2 }, { reps: 8, weight: 0, rir: 1 }, { reps: 7, weight: 0, rir: 1 }] },
      { id: "e21", name: "Press militar", muscle: "Hombros", sets: [{ reps: 8, weight: 35, rir: 2 }, { reps: 7, weight: 35, rir: 1 }, { reps: 6, weight: 37.5, rir: 1 }] }
    ]
  },
  {
    id: "w8",
    date: "2026-05-20",
    routine: "Lower",
    durationMin: 73,
    effort: 9,
    exercises: [
      { id: "e22", name: "Sentadilla", muscle: "Piernas", sets: [{ reps: 8, weight: 82.5, rir: 2 }, { reps: 6, weight: 87.5, rir: 1 }, { reps: 4, weight: 90, rir: 1 }] },
      { id: "e23", name: "Prensa", muscle: "Piernas", sets: [{ reps: 12, weight: 165, rir: 2 }, { reps: 10, weight: 170, rir: 1 }, { reps: 9, weight: 175, rir: 1 }] },
      { id: "e24", name: "Plancha", muscle: "Core", sets: [{ reps: 55, weight: 0, rir: 2 }, { reps: 50, weight: 0, rir: 1 }] }
    ]
  }
];

export const bodyMetrics: BodyMetric[] = [
  { date: "2026-05-03", bodyWeight: 72.4, chest: 96, waist: 82, arm: 33, thigh: 56 },
  { date: "2026-05-10", bodyWeight: 72.9, chest: 96.5, waist: 81.5, arm: 33.5, thigh: 56.5 },
  { date: "2026-05-17", bodyWeight: 73.2, chest: 97, waist: 81, arm: 34, thigh: 57 },
  { date: "2026-05-22", bodyWeight: 73.4, chest: 97.5, waist: 80.8, arm: 34.2, thigh: 57.2 }
];

export const goals: Goal[] = [
  { id: "g1", title: "Press banca", current: 65, target: 80, unit: "kg" },
  { id: "g2", title: "Sentadilla", current: 90, target: 110, unit: "kg" },
  { id: "g3", title: "Entrenar por semana", current: 4, target: 5, unit: "dias" }
];

export const photos: PhotoProgress[] = [
  { id: "p1", date: "2026-05-03", label: "Inicio", tone: "from-cyanfit/40 to-white/10" },
  { id: "p2", date: "2026-05-17", label: "Semana 3", tone: "from-limefit/40 to-white/10" }
];
