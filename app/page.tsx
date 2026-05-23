"use client";

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  Camera,
  CheckCircle2,
  Flame,
  Gauge,
  Plus,
  RotateCcw,
  Ruler,
  Scale,
  Sparkles,
  Target,
  Trophy
} from "lucide-react";
import { AppShell, ViewId } from "@/components/shell";
import { StatCard } from "@/components/stat-card";
import { BodyWeightChart, MuscleBarChart, StrengthChart, VolumeAreaChart } from "@/components/charts";
import { HumanMuscleMap } from "@/components/human-muscle-map";
import { bodyMetrics, goals, photos, workouts } from "@/data/mock";
import { detectWeakSpots, fatigueByMuscle, personalRecords, strengthProgress, totalSetsByMuscle, volumeByMuscle, weeklySummary, workoutVolume } from "@/lib/metrics";

const summary = weeklySummary(workouts);
const records = personalRecords(workouts);
const weakSpots = detectWeakSpots(workouts);
const volumeTrend = workouts.map((workout) => ({ date: workout.date.slice(5), volume: workoutVolume(workout) }));

export default function Home() {
  return <AppShell renderView={(view) => <View view={view} />} />;
}

function View({ view }: { view: ViewId }) {
  if (view === "workout") return <WorkoutScreen />;
  if (view === "history") return <HistoryScreen />;
  if (view === "stats") return <StatsScreen />;
  if (view === "profile") return <ProfileScreen />;
  if (view === "calendar") return <CalendarScreen />;
  if (view === "settings") return <SettingsScreen />;
  return <Dashboard />;
}

function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <header className="mb-5 flex flex-col gap-4 rounded-lg border border-line bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-limefit">PulseFit Tracker</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{subtitle}</p>
      </div>
      {action}
    </header>
  );
}

function Dashboard() {
  return (
    <>
      <PageHeader
        title="Tu progreso, claro y motivante"
        subtitle="Resumen semanal con volumen, fuerza, fatiga, PRs y recomendaciones automaticas para entrenar mejor."
        action={
          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-limefit px-4 font-semibold text-ink transition hover:brightness-110">
            <Plus size={18} />
            Nuevo entreno
          </button>
        }
      />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Flame} label="Racha activa" value="12 dias" detail="4 entrenos esta semana" tone="text-rosefit" />
        <StatCard icon={Gauge} label="Volumen total" value={`${Math.round(summary.totalVolume).toLocaleString("es-AR")} kg`} detail="+8.4% vs semana anterior" tone="text-cyanfit" />
        <StatCard icon={Trophy} label="PR destacado" value="Sentadilla 90 kg" detail="Mejor serie registrada" tone="text-goldfit" />
        <StatCard icon={Activity} label="Esfuerzo medio" value={`${summary.avgEffort}/10`} detail="Fatiga controlada" />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Progreso de fuerza" subtitle="Press banca, mejor peso por sesion">
          <StrengthChart data={strengthProgress(workouts, "Press banca")} />
        </Panel>
        <Panel title="Mapa muscular" subtitle="Series, frecuencia y fatiga semanal">
          <HumanMuscleMap data={fatigueByMuscle(workouts)} />
        </Panel>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Volumen por sesion" subtitle="Peso movido total">
          <VolumeAreaChart data={volumeTrend} />
        </Panel>
        <Panel title="Recomendaciones" subtitle="Lectura automatica">
          <div className="space-y-3">
            <Insight icon={Sparkles} title="Progresion sugerida" text="Si el press banca se siente con RIR 2, subi 2.5 kg la proxima sesion." />
            <Insight icon={RotateCcw} title="Balance muscular" text={weakSpots.length ? `Dale prioridad a ${weakSpots.join(", ")} esta semana.` : "Tu balance de series esta parejo."} />
            <Insight icon={CheckCircle2} title="Resumen semanal" text={`${summary.days} dias entrenados, ${summary.totalSets} series y buen nivel de constancia.`} />
          </div>
        </Panel>
        <Panel title="Records personales" subtitle="Tus mejores marcas">
          <div className="space-y-2">
            {records.map((record) => (
              <div key={record.name} className="flex items-center justify-between rounded-lg border border-line bg-white/[0.04] p-3">
                <div>
                  <p className="font-medium text-white">{record.name}</p>
                  <p className="text-xs text-zinc-500">{record.date}</p>
                </div>
                <strong className="text-limefit">{record.weight || record.reps} {record.weight ? "kg" : "reps"}</strong>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </>
  );
}

function WorkoutScreen() {
  const current = workouts[workouts.length - 1];
  return (
    <>
      <PageHeader title="Entrenamiento rapido" subtitle="Pensado para cargar datos en el gym sin perder tiempo entre series." />
      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Rutina de hoy" subtitle="Lower, fuerza y volumen">
          <div className="grid gap-3 sm:grid-cols-2">
            {["Push", "Pull", "Piernas", "Upper", "Lower", "Personalizada"].map((routine) => (
              <button key={routine} className="rounded-lg border border-line bg-white/[0.04] p-4 text-left transition hover:border-limefit hover:bg-limefit/10">
                <p className="font-semibold text-white">{routine}</p>
                <p className="mt-1 text-sm text-zinc-500">Crear dia {routine.toLowerCase()}</p>
              </button>
            ))}
          </div>
          <button className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-limefit font-semibold text-ink">
            <Plus size={18} />
            Agregar ejercicio
          </button>
        </Panel>
        <Panel title={current.routine} subtitle={`${current.date} | ${current.durationMin} min | esfuerzo ${current.effort}/10`}>
          <div className="space-y-3">
            {current.exercises.map((exercise) => (
              <div key={exercise.id} className="rounded-lg border border-line bg-white/[0.04] p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{exercise.name}</p>
                    <p className="text-sm text-zinc-500">{exercise.muscle}</p>
                  </div>
                  <span className="rounded-md bg-white/[0.06] px-2 py-1 text-xs text-zinc-300">{exercise.sets.length} series</span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2 text-center text-sm">
                  <span className="text-zinc-500">Serie</span>
                  <span className="text-zinc-500">Reps</span>
                  <span className="text-zinc-500">Kg</span>
                  <span className="text-zinc-500">RIR</span>
                  {exercise.sets.map((set, index) => (
                    <RowCells key={`${exercise.id}-${index}`} index={index} reps={set.reps} weight={set.weight} rir={set.rir} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </>
  );
}

function HistoryScreen() {
  return (
    <>
      <PageHeader title="Historial" subtitle="Cada entrenamiento queda guardado para comparar semanas y detectar avances reales." />
      <section className="space-y-3">
        {workouts.slice().reverse().map((workout) => (
          <article key={workout.id} className="glass rounded-lg p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-zinc-500">{workout.date}</p>
                <h2 className="text-xl font-semibold text-white">{workout.routine}</h2>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <Mini label="Ejercicios" value={String(workout.exercises.length)} />
                <Mini label="Volumen" value={`${Math.round(workoutVolume(workout)).toLocaleString("es-AR")} kg`} />
                <Mini label="Duracion" value={`${workout.durationMin}m`} />
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function StatsScreen() {
  return (
    <>
      <PageHeader title="Estadisticas" subtitle="Graficos semanales y mensuales para entender fuerza, volumen, frecuencia y balance muscular." />
      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Volumen por musculo" subtitle="Kg totales acumulados">
          <MuscleBarChart data={volumeByMuscle(workouts)} />
        </Panel>
        <Panel title="Series por musculo" subtitle="Cantidad de trabajo semanal">
          <MuscleBarChart data={totalSetsByMuscle(workouts)} />
        </Panel>
        <Panel title="Sentadilla" subtitle="Progreso de fuerza">
          <StrengthChart data={strengthProgress(workouts, "Sentadilla")} />
        </Panel>
        <Panel title="Peso muerto" subtitle="Progreso de fuerza">
          <StrengthChart data={strengthProgress(workouts, "Peso muerto")} />
        </Panel>
      </section>
    </>
  );
}

function ProfileScreen() {
  const latest = bodyMetrics[bodyMetrics.length - 1];
  return (
    <>
      <PageHeader title="Perfil fisico" subtitle="Peso corporal, medidas, fotos de progreso y objetivos principales." />
      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Peso corporal" subtitle="Promedio semanal">
          <BodyWeightChart data={bodyMetrics} />
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Mini label="Peso" value={`${latest.bodyWeight} kg`} />
            <Mini label="Pecho" value={`${latest.chest} cm`} />
            <Mini label="Cintura" value={`${latest.waist} cm`} />
            <Mini label="Brazo" value={`${latest.arm} cm`} />
          </div>
        </Panel>
        <Panel title="Objetivos" subtitle="Metas visibles y medibles">
          <div className="space-y-3">
            {goals.map((goal) => (
              <div key={goal.id} className="rounded-lg border border-line bg-white/[0.04] p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">{goal.title}</p>
                  <p className="text-sm text-zinc-400">{goal.current}/{goal.target} {goal.unit}</p>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/[0.06]">
                  <div className="h-2 rounded-full bg-limefit" style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Fotos de progreso" subtitle="Mock visual listo para conectar a storage">
          <div className="grid gap-3 sm:grid-cols-2">
            {photos.map((photo) => (
              <div key={photo.id} className={`flex aspect-[4/5] flex-col justify-between rounded-lg border border-line bg-gradient-to-br ${photo.tone} p-4`}>
                <Camera className="text-white/75" />
                <div>
                  <p className="font-semibold text-white">{photo.label}</p>
                  <p className="text-sm text-white/65">{photo.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Medidas corporales" subtitle="Ultimo registro">
          <div className="grid gap-3 sm:grid-cols-2">
            <Measure icon={Scale} label="Peso" value={`${latest.bodyWeight} kg`} />
            <Measure icon={Ruler} label="Pecho" value={`${latest.chest} cm`} />
            <Measure icon={Ruler} label="Cintura" value={`${latest.waist} cm`} />
            <Measure icon={Ruler} label="Pierna" value={`${latest.thigh} cm`} />
          </div>
        </Panel>
      </section>
    </>
  );
}

function CalendarScreen() {
  const days = Array.from({ length: 28 }, (_, index) => index + 1);
  const trained = new Set(workouts.map((workout) => Number(workout.date.slice(-2))));
  return (
    <>
      <PageHeader title="Calendario" subtitle="Vista mensual de entrenamientos, rachas y dias de descanso." />
      <Panel title="Mayo 2026" subtitle="Frecuencia de entrenamiento">
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div key={day} className={`flex aspect-square flex-col justify-between rounded-lg border p-2 ${trained.has(day) ? "border-limefit bg-limefit text-ink" : "border-line bg-white/[0.04] text-zinc-400"}`}>
              <span className="text-sm font-semibold">{day}</span>
              {trained.has(day) && <DumbbellDot />}
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function SettingsScreen() {
  return (
    <>
      <PageHeader title="Configuracion" subtitle="Preferencias basicas para una app lista para crecer con datos reales." />
      <section className="grid gap-4 lg:grid-cols-2">
        <Panel title="Datos" subtitle="Persistencia">
          <Setting label="Modo mock" value="Activo" />
          <Setting label="Supabase" value="Listo para conectar" />
          <Setting label="Unidad de peso" value="Kilogramos" />
        </Panel>
        <Panel title="Inteligencia" subtitle="Reglas simples y claras">
          <Setting label="Progresion automatica" value="Activada" />
          <Setting label="Alertas de fatiga" value="Activadas" />
          <Setting label="Resumen semanal" value="Domingos" />
        </Panel>
      </section>
    </>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="glass rounded-lg p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
          <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
        </div>
        <ArrowUpRight className="text-zinc-500" size={18} />
      </div>
      {children}
    </section>
  );
}

function Insight({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-lg border border-line bg-white/[0.04] p-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <Icon size={17} className="text-limefit" />
        {title}
      </div>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-white/[0.04] px-3 py-2">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function Measure({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-white/[0.04] p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] text-cyanfit">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-sm text-zinc-500">{label}</p>
        <p className="font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-3 last:border-b-0">
      <span className="text-zinc-300">{label}</span>
      <span className="rounded-md bg-white/[0.06] px-2 py-1 text-sm text-limefit">{value}</span>
    </div>
  );
}

function DumbbellDot() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink text-limefit">
      <CalendarDays size={15} />
    </span>
  );
}

function RowCells({ index, reps, weight, rir }: { index: number; reps: number; weight: number; rir: number }) {
  return (
    <>
      <span className="rounded-md bg-black/20 py-2">{index + 1}</span>
      <span className="rounded-md bg-black/20 py-2">{reps}</span>
      <span className="rounded-md bg-black/20 py-2">{weight}</span>
      <span className="rounded-md bg-black/20 py-2">{rir}</span>
    </>
  );
}
