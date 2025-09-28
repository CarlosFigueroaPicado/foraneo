# Foráneo

**Foráneo** es una aplicación multiplataforma (móvil y web) que centraliza en un solo lugar los servicios turísticos de Nicaragua. Permite planificar viajes, reservar hospedajes, contratar transporte, encontrar experiencias culturales y gastronómicas, y pagar de manera segura. El objetivo es simplificar el turismo interno conectando a viajeros con pequeños negocios locales.

---

## 🚀 Descripción
La aplicación surge para resolver la fragmentación de servicios turísticos en el país: en lugar de consultar varias páginas, los usuarios pueden encontrar y reservar hospedaje, transporte y actividades desde la misma plataforma. Al mismo tiempo, los negocios turísticos mejoran su visibilidad y tienen un canal digital para gestionar reservas.

---

## 🎯 Objetivo
Simplificar el turismo interno y receptivo en Nicaragua, conectando viajeros con pequeños negocios locales y ofreciendo una experiencia integrada para planificar y reservar servicios, incentivando el consumo responsable y fortaleciendo la economía local.

---

## 📌 Funcionalidades principales
- **Exploración de destinos:** búsqueda por ciudad, categoría o tipo de actividad, con fotografías, descripciones y reseñas de viajeros.
- **Reservas integradas:** hospedajes, tours y transporte con disponibilidad en tiempo real.
- **Itinerarios personalizados:** creación de rutas turísticas y agendas, con opción de guardarlas offline.
- **Sistema de reseñas y recompensas:** calificación de experiencias y puntos acumulables.
- **Seguridad y soporte:** contactos de emergencia, chat con proveedores y mapas offline.
- **Pagos integrados:** procesamiento seguro con Stripe (tarjetas, Apple/Google Pay, moneda local).

---

## 🛠️ Tecnología y requisitos técnicos

### Front-end
- [Expo](https://expo.dev/) (React Native) con soporte para web mediante React Native Web.
- UI: NativeWind (Tailwind RN) o Tamagui.
- Mapas y geolocalización:
  - `expo-location` para ubicación.
  - `react-native-mapbox-gl/maps` + APIs de Mapbox para mapas, direcciones y rutas offline.
- Estado y formularios: React Query, Zustand, React Hook Form, Zod.
- Internacionalización: react-i18next.

**Requisitos de desarrollo:**
- Node.js 18 o superior
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- Cuenta de Mapbox

### Back-end
- [Supabase](https://supabase.com/): PostgreSQL + PostGIS, Auth, Storage, Realtime y Edge Functions.
- Autenticación con OTP/email y Google/Apple.
- Reservas y disponibilidad gestionadas con transacciones y políticas RLS.
- Pagos integrados con Stripe.

**Requisitos de desarrollo:**
- Cuenta en Supabase y Stripe
- Variables de entorno: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `STRIPE_KEY`, `MAPBOX_TOKEN`

---

## ⚙️ Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/foraneo.git
   cd foraneo
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   # Editar .env con claves de Supabase, Stripe y Mapbox
   ```

4. Ejecutar en desarrollo:
   ```bash
   npx expo start
   ```

5. Compilar para web:
   ```bash
   npx expo export --platform web
   ```

6. Compilar APK (Android):
   ```bash
   eas build -p android --profile preview
   ```

---

## 📱 Uso de la aplicación
- **Inicio:** destinos destacados y categorías.
- **Explorar:** filtrar por ciudad/tipo de experiencia (aventura, gastronomía, naturaleza).
- **Detalle del servicio:** descripción, fotos, precios, reseñas y reservas.
- **Reservas:** gestión de reservas con estado (confirmada, pendiente, cancelada).
- **Mapa de rutas:** creación y almacenamiento offline de rutas turísticas.
- **Perfil:** gestión de cuenta, reseñas y recompensas.

---

## 🤝 Contribución y licencia
El proyecto usa Git y GitHub para control de versiones.
- Haz un fork o crea una rama, realiza commits descriptivos y abre un Pull Request.
- Licencia: **MIT**.

