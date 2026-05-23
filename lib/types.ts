export type MuscleGroup =
  | "Pecho"
  | "Espalda"
  | "Piernas"
  | "Hombros"
  | "Biceps"
  | "Triceps"
  | "Core";

export type RoutineType = "Push" | "Pull" | "Piernas" | "Upper" | "Lower" | "Personalizada";

export type ExerciseSet = {
  reps: number;
  weight: number;
  rir: number;
};

export type ExerciseLog = {
  id: string;
  name: string;
  muscle: MuscleGroup;
  sets: ExerciseSet[];
  notes?: string;
};

export type Workout = {
  id: string;
  date: string;
  routine: RoutineType;
  durationMin: number;
  effort: number;
  exercises: ExerciseLog[];
};

export type BodyMetric = {
  date: string;
  bodyWeight: number;
  chest: number;
  waist: number;
  arm: number;
  thigh: number;
};

export type Goal = {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
};

export type PhotoProgress = {
  id: string;
  date: string;
  label: string;
  tone: string;
};
