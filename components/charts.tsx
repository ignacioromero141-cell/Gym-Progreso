"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const tooltipStyle = {
  background: "rgba(12,14,20,0.95)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  color: "#f5f7fb"
};

export function StrengthChart({ data }: { data: { date: string; peso: number; volumen: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="date" stroke="#9ca3af" tickLine={false} axisLine={false} />
        <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="peso" stroke="#b8ff3c" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 7 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function VolumeAreaChart({ data }: { data: { date: string; volume: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="volumeFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#52e0ff" stopOpacity={0.55} />
            <stop offset="95%" stopColor="#52e0ff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="date" stroke="#9ca3af" tickLine={false} axisLine={false} />
        <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="volume" stroke="#52e0ff" strokeWidth={3} fill="url(#volumeFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MuscleBarChart({ data }: { data: { muscle: string; sets?: number; volume?: number }[] }) {
  const key = data.some((item) => item.volume !== undefined) ? "volume" : "sets";
  return (
    <ResponsiveContainer width="100%" height={245}>
      <BarChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="muscle" stroke="#9ca3af" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey={key} fill="#ff5f8f" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BodyWeightChart({ data }: { data: { date: string; bodyWeight: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={190}>
      <AreaChart data={data.map((item) => ({ ...item, date: item.date.slice(5) }))}>
        <defs>
          <linearGradient id="weightFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#ffc857" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#ffc857" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" stroke="#9ca3af" tickLine={false} axisLine={false} />
        <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} domain={["dataMin - 1", "dataMax + 1"]} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="bodyWeight" stroke="#ffc857" strokeWidth={3} fill="url(#weightFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
