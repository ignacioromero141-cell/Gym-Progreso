import { LucideIcon } from "lucide-react";

export function StatCard({ icon: Icon, label, value, detail, tone = "text-limefit" }: { icon: LucideIcon; label: string; value: string; detail: string; tone?: string }) {
  return (
    <article className="glass rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-400">{label}</p>
          <strong className="mt-2 block text-2xl font-semibold tracking-tight text-white">{value}</strong>
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] ${tone}`}>
          <Icon size={20} />
        </span>
      </div>
      <p className="mt-4 text-sm text-zinc-400">{detail}</p>
    </article>
  );
}
