import { ExerciseLog, MuscleGroup, Workout } from "@/lib/types";

export const muscles: MuscleGroup[] = ["Pecho", "Espalda", "Piernas", "Hombros", "Biceps", "Triceps", "Core"];

export function setVolume(exercise: ExerciseLog) {
  return exercise.sets.reduce((total, set) => total + set.reps * Math.max(set.weight, 1), 0);
}

export function workoutVolume(workout: Workout) {
  return workout.exercises.reduce((total, exercise) => total + setVolume(exercise), 0);
}

export function totalSetsByMuscle(workouts: Workout[]) {
  return muscles.map((muscle) => ({
    muscle,
    sets: workouts.reduce((total, workout) => {
      return total + workout.exercises.filter((exercise) => exercise.muscle === muscle).reduce((sum, exercise) => sum + exercise.sets.length, 0);
    }, 0)
  }));
}

export function volumeByMuscle(workouts: Workout[]) {
  return muscles.map((muscle) => ({
    muscle,
    volume: workouts.reduce((total, workout) => {
      return total + workout.exercises.filter((exercise) => exercise.muscle === muscle).reduce((sum, exercise) => sum + setVolume(exercise), 0);
    }, 0)
  }));
}

export function strengthProgress(workouts: Workout[], exerciseName: string) {
  return workouts
    .map((workout) => {
      const exercise = workout.exercises.find((item) => item.name === exerciseName);
      if (!exercise) return null;
      const best = Math.max(...exercise.sets.map((set) => set.weight));
      const volume = setVolume(exercise);
      return { date: workout.date.slice(5), peso: best, volumen: volume };
    })
    .filter(Boolean) as { date: string; peso: number; volumen: number }[];
}

export function personalRecords(workouts: Workout[]) {
  const records = new Map<string, { name: string; weight: number; reps: number; date: string }>();
  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        const current = records.get(exercise.name);
        if (!current || set.weight > current.weight || (set.weight === current.weight && set.reps > current.reps)) {
          records.set(exercise.name, { name: exercise.name, weight: set.weight, reps: set.reps, date: workout.date });
        }
      });
    });
  });
  return Array.from(records.values()).sort((a, b) => b.weight - a.weight).slice(0, 5);
}

export function weeklySummary(workouts: Workout[]) {
  const totalVolume = workouts.reduce((total, workout) => total + workoutVolume(workout), 0);
  const totalSets = workouts.reduce((total, workout) => total + workout.exercises.reduce((sum, exercise) => sum + exercise.sets.length, 0), 0);
  const avgEffort = workouts.reduce((total, workout) => total + workout.effort, 0) / workouts.length;
  return {
    totalVolume,
    totalSets,
    days: workouts.length,
    avgEffort: Number(avgEffort.toFixed(1))
  };
}

export function fatigueByMuscle(workouts: Workout[]) {
  return totalSetsByMuscle(workouts).map((item) => {
    const fatigue = Math.min(100, Math.round(item.sets * 4.8));
    return { ...item, fatigue };
  });
}

export function detectWeakSpots(workouts: Workout[]) {
  const sets = totalSetsByMuscle(workouts);
  const average = sets.reduce((sum, item) => sum + item.sets, 0) / sets.length;
  return sets.filter((item) => item.sets < average * 0.72).map((item) => item.muscle);
}
