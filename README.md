# Foráneo Mobile

Base inicial de la aplicación móvil de Foráneo construida con Expo y React Native. Este proyecto arranca sin componentes heredados para que puedas iterar rápidamente sobre las nuevas pantallas y servicios.

## 🚀 Requisitos previos

- **Node.js** 18 o superior
- **npm** 9 o superior (o pnpm/yarn si lo prefieres)
- **Expo CLI** (opcional pero recomendado):
  ```powershell
  npm install -g expo-cli
  ```

## 🧪 Scripts disponibles

```powershell
# Inicia el servidor Metro y abre el menú de Expo
npm start

# Compila y ejecuta en un dispositivo Android conectado
npm run android

# Compila y ejecuta en un simulador de iOS (macOS)
npm run ios

# Vista previa en el navegador
npm run web

# Linter integrado de Expo
npm run lint

# Pruebas con Jest (configuración mínima)
npm test
```

## 📁 Estructura del proyecto

```
.
├── app/
│   ├── _layout.tsx          # Navegación raíz con expo-router
│   ├── index.tsx            # Pantalla principal
│   └── upcoming.tsx         # Sección de roadmap
├── src/
│   ├── components/          # UI reutilizable (layout, tipografía, botones)
│   ├── config/              # Configuración de entornos y claves
│   ├── hooks/               # Hooks personalizados (fetch, etc.)
│   ├── services/            # Cliente HTTP y módulos de dominio
│   ├── store/               # Estado global ligero basado en useSyncExternalStore
│   ├── theme/               # Tokens de diseño (colores, spacing, tipografía)
│   ├── types/               # Tipos compartidos front-back
│   └── utils/               # Utilidades (logger, helpers)
├── assets/                  # Carpeta reservada para íconos y splash
├── app.json                 # Configuración de la app Expo
├── babel.config.js          # Configuración de Babel (aliases incluidos)
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración de TypeScript + paths
└── README.md                # Este archivo
```

## ✅ Próximos pasos sugeridos

1. Personaliza la pantalla principal (`app/index.tsx`) con el contenido real de la app.
2. Añade un sistema de navegación por tabs o stacks según los flujos que necesites.
3. Conecta tu backend o mock API para empezar a trabajar con datos reales.
4. Configura assets propios (icono, splash) y sustituye los colores/base que se incluyen por defecto.

¡Listo! Ya puedes enfocarte en el diseño y las funcionalidades móviles que tenías en mente.
