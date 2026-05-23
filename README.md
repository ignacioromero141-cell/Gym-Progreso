# PulseFit Tracker

App web/mobile moderna para seguimiento de gimnasio, fuerza y progreso fisico.

## Que incluye

- Dashboard principal con volumen, racha, PRs, esfuerzo y recomendaciones.
- Pantalla de entrenamiento rapido con rutinas Push, Pull, Piernas, Upper, Lower y Personalizada.
- Historial automatico con volumen, duracion y ejercicios.
- Estadisticas con graficos de fuerza, volumen y series por musculo.
- Mapa muscular visual con series y fatiga estimada.
- Perfil fisico con peso corporal, medidas, objetivos y fotos de progreso vacias hasta cargar datos reales.
- Calendario mensual de entrenamientos.
- Capa inicial de Supabase y `supabase/schema.sql`.
- Estado inicial vacio: sin entrenamientos, historial ni estadisticas precargadas.

## Correr localmente

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Conectar Supabase

1. Crear un proyecto en Supabase.
2. Ejecutar el SQL de `supabase/schema.sql`.
3. Copiar `.env.example` a `.env.local`.
4. Completar:

```bash
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

La UI arranca vacia desde `data/initial-state.ts`. El siguiente paso natural es reemplazar ese estado inicial por consultas a Supabase y formularios reales de alta/edicion.
