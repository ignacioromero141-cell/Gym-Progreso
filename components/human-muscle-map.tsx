"use client";

import clsx from "clsx";

type MuscleData = { muscle: string; sets: number; fatigue?: number };

const colors: Record<string, string> = {
  Pecho: "#ff5f8f",
  Espalda: "#52e0ff",
  Piernas: "#b8ff3c",
  Hombros: "#ffc857",
  Biceps: "#a78bfa",
  Triceps: "#fb7185",
  Core: "#f5f7fb"
};

export function HumanMuscleMap({ data }: { data: MuscleData[] }) {
  const max = Math.max(...data.map((item) => item.sets), 1);
  const info = Object.fromEntries(data.map((item) => [item.muscle, item]));
  const opacity = (muscle: string) => 0.18 + ((info[muscle]?.sets ?? 0) / max) * 0.82;

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_220px]">
      <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-line bg-black/20">
        <svg viewBox="0 0 240 420" className="h-[360px] w-full max-w-[260px]" role="img" aria-label="Mapa muscular interactivo">
          <circle cx="120" cy="42" r="28" fill="#20242f" stroke="rgba(255,255,255,0.15)" />
          <path d="M91 86 Q120 66 149 86 L160 178 Q120 204 80 178 Z" fill={colors.Pecho} opacity={opacity("Pecho")} />
          <path d="M81 96 Q56 112 47 164 L34 248 Q51 257 63 244 L77 170 Z" fill={colors.Biceps} opacity={opacity("Biceps")} />
          <path d="M159 96 Q184 112 193 164 L206 248 Q189 257 177 244 L163 170 Z" fill={colors.Triceps} opacity={opacity("Triceps")} />
          <path d="M88 82 Q120 58 152 82 L146 112 Q120 100 94 112 Z" fill={colors.Hombros} opacity={opacity("Hombros")} />
          <path d="M86 182 Q120 206 154 182 L146 234 Q120 248 94 234 Z" fill={colors.Core} opacity={opacity("Core")} />
          <path d="M83 236 Q105 250 116 246 L108 382 Q82 386 72 366 Z" fill={colors.Piernas} opacity={opacity("Piernas")} />
          <path d="M157 236 Q135 250 124 246 L132 382 Q158 386 168 366 Z" fill={colors.Piernas} opacity={opacity("Piernas")} />
          <path d="M92 112 Q120 94 148 112 L154 174 Q120 190 86 174 Z" fill={colors.Espalda} opacity={opacity("Espalda") * 0.8} />
          <path d="M74 386 H112 V402 H70 Z" fill="#20242f" />
          <path d="M128 386 H166 L170 402 H128 Z" fill="#20242f" />
        </svg>
      </div>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.muscle} className="rounded-lg border border-line bg-white/[0.04] p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-sm font-medium text-white">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: colors[item.muscle] }} />
                {item.muscle}
              </span>
              <span className="text-sm text-zinc-300">{item.sets} series</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/[0.06]">
              <div className={clsx("h-2 rounded-full transition-all")} style={{ width: `${Math.min(100, (item.sets / max) * 100)}%`, background: colors[item.muscle] }} />
            </div>
            {item.fatigue !== undefined && <p className="mt-2 text-xs text-zinc-500">Fatiga estimada: {item.fatigue}%</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
