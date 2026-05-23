"use client";

import { Activity, BarChart3, CalendarDays, Dumbbell, History, Settings, UserRound } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Activity },
  { id: "workout", label: "Entreno", icon: Dumbbell },
  { id: "history", label: "Historial", icon: History },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "profile", label: "Perfil", icon: UserRound },
  { id: "calendar", label: "Calendario", icon: CalendarDays },
  { id: "settings", label: "Ajustes", icon: Settings }
] as const;

export type ViewId = (typeof navItems)[number]["id"];

export function AppShell({ renderView }: { renderView: (view: ViewId) => React.ReactNode }) {
  const [active, setActive] = useState<ViewId>("dashboard");

  return (
    <main className="min-h-screen soft-grid">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-4 px-3 py-3 sm:px-5 lg:px-6">
        <aside className="sticky top-3 hidden h-[calc(100vh-24px)] w-24 shrink-0 flex-col items-center justify-between rounded-lg border border-line bg-white/[0.04] py-4 lg:flex">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-limefit text-ink shadow-glow">
            <Dumbbell size={22} />
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  title={item.label}
                  onClick={() => setActive(item.id)}
                  className={clsx(
                    "flex h-12 w-12 items-center justify-center rounded-lg border transition",
                    active === item.id ? "border-limefit bg-limefit text-ink" : "border-transparent text-zinc-400 hover:border-line hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <Icon size={20} />
                </button>
              );
            })}
          </nav>
          <div className="h-11 w-11 rounded-full border border-line bg-gradient-to-br from-cyanfit/70 to-rosefit/70" />
        </aside>

        <section className="min-w-0 flex-1 pb-24 lg:pb-3">{renderView(active)}</section>

        <nav className="fixed bottom-3 left-3 right-3 z-30 grid grid-cols-7 gap-1 rounded-lg border border-line bg-ink/90 p-2 shadow-panel backdrop-blur-xl lg:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                title={item.label}
                onClick={() => setActive(item.id)}
                className={clsx("flex h-11 items-center justify-center rounded-md transition", active === item.id ? "bg-limefit text-ink" : "text-zinc-400")}
              >
                <Icon size={19} />
              </button>
            );
          })}
        </nav>
      </div>
    </main>
  );
}
