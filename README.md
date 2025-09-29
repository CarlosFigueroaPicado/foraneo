# Foráneo

Foráneo es una aplicación multiplataforma (móvil y web) diseñada para simplificar el turismo interno en Nicaragua. Conecta a viajeros con pequeños negocios turísticos y centraliza en un solo lugar la planificación y reserva de servicios, fomentando un consumo responsable y el fortalecimiento de la economía local.

## Objetivo

- Reducir la fragmentación de los servicios turísticos, concentrando información y reservas en una sola aplicación.
- Mejorar la visibilidad de los pequeños negocios turísticos y promover el turismo comunitario.
- Incentivar el consumo responsable y brindar una experiencia de viaje integrada y segura.

## Funcionalidades principales

- **Exploración de destinos** con filtros por ciudad, categoría y calificaciones.
- **Reservas en tiempo real** de hospedajes, tours, transporte y otros servicios.
- **Itinerarios personalizados** que pueden guardarse y consultarse offline.
- **Reseñas y recompensas** para promover la calidad de los servicios.
- **Pagos integrados** con soporte para tarjetas, Apple/Google Pay y moneda local a través de Stripe.
- **Seguridad y soporte** con contactos de emergencia, chat con proveedores y mapas offline.

## Tecnologías

### Frontend

- **Expo (React Native)** y **React Native Web** para soporte móvil y web.
- Diseño con **NativeWind/Tamagui**.
- Mapas con **react-native-mapbox-gl/maps** y APIs de **Mapbox**.
- Manejo de estado con **React Query** y **Zustand**.
- Formularios con **React Hook Form** y validación con **Zod**.
- Internacionalización con **react-i18next**.

### Backend

- **Supabase** (PostgreSQL + PostGIS) para base de datos, autenticación, almacenamiento y funciones edge.
- Autenticación con OTP/email y proveedores externos (Google/Apple).
- Integración con **Stripe** para pagos seguros.
- Lógica de reservas implementada con políticas RLS y transacciones.

## Requisitos

- **Node.js 18** o superior.
- **Expo CLI** instalado globalmente.
- Cuentas en **Supabase**, **Stripe** y **Mapbox** para habilitar servicios.
- Definir variables de entorno en un archivo `.env` (ver `.env.example`).

## Instalación y ejecución

1. Clonar este repositorio:
   ```bash
   git clone https://github.com/CarlosFigueroaPicado/foraneo.git
   cd foraneo
   ```
2. Instalar dependencias del frontend:
   ```bash
   cd frontend
   npm install
   ```
3. Copiar `.env.example` a `.env` y completar las variables con tus credenciales de Supabase, Stripe y Mapbox.
4. Ejecutar la aplicación en desarrollo:
   ```bash
   npm start
   ```
   Usa Expo Go en tu dispositivo o abre en web.
5. Para compilar la aplicación:
   ```bash
   npx expo export --platform web
   npx eas build -p android --profile preview
   ```

## Estructura del repositorio

```
.
├── frontend/           # Código de la aplicación móvil/web con Expo
│   ├── package.json    # Dependencias y scripts del frontend
│   ├── app.json        # Configuración de Expo
│   ├── babel.config.js # Configuración de Babel
│   ├── tailwind.config.js # Configuración de Tailwind/NativeWind
│   ├── tsconfig.json   # Configuración de TypeScript
│   ├── src/            # Componentes, pantallas y lógica de negocio
│   └─…
└— backend/            # Backend (Supabase y funciones edge)
    ├— README.md       # Documentación del backend
    ├— supabaseClient.ts # Inicialización de Supabase
    └— functions/      # Funciones edge/Serverless
```

## Contribución

1. Haz un fork de este repositorio y crea una rama para tu feature o corrección.
2. Sigue la guía de estilos del proyecto y asegúrate de que tu código pase las pruebas.
3. Envía un Pull Request describiendo tus cambios.

## Licencia

MIT License
