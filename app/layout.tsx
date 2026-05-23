import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulseFit Tracker",
  description: "Tracker visual de gimnasio, fuerza y progreso fisico."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
