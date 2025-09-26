# Foráneo

**Foráneo** es una aplicación multiplataforma (móvil y web) que centraliza en un solo lugar los servicios turísticos de Nicaragua. Permite planificar viajes, reservar hospedajes, contratar transporte, encontrar experiencias culturales y gastronómicas, y pagar de manera segura. El objetivo es **simplificar el turismo interno** conectando a viajeros con pequeños negocios locales.

## Descripción

La aplicación surge para resolver la fragmentación de servicios turísticos en el país: en lugar de consultar varias páginas, los usuarios pueden encontrar y reservar hospedaje, transporte y actividades desde la misma plataforma. Al mismo tiempo, los negocios turísticos mejoran su visibilidad y tienen un canal digital para gestionar reservas.

## Funcionalidades principales

* **Exploración de destinos:** búsqueda por ciudad, categoría o actividad, con fotos, descripciones y opiniones.
* **Reservas integradas:** reserva de hospedajes, tours y transporte desde la misma aplicación con confirmación en tiempo real.
* **Itinerarios personalizados:** creación de rutas y agendas según preferencias (por ejemplo, “fin de semana en Somoto”).
* **Sistema de reseñas y recompensas:** los usuarios pueden calificar experiencias y ganar puntos.
* **Seguridad y soporte:** contactos de emergencia, mapas offline y chat con proveedores.

## Tecnología

La aplicación está desarrollada con **Flutter**, un framework de Google que permite crear aplicaciones móviles y web desde una sola base de código【169749691836257†L44-L63】. Flutter utiliza el lenguaje **Dart** y ofrece las siguientes ventajas:

- Compila a código nativo en Android, iOS, web y escritorio.
- Proporciona **hot reload**, lo que permite ver los cambios inmediatamente sin recompilar【169749691836257†L56-L58】.
- Incluye widgets basados en Material Design y tiene su propio motor de renderizado【169749691836257†L59-L64】.
- Cuenta con una comunidad amplia y en crecimiento【169749691836257†L66-L68】.

Para el backend se utiliza **Node.js** con el framework **Express**, y se conecta a una base de datos relacional (por ejemplo PostgreSQL o MySQL) según el modelo de datos definido.

## Estructura del proyecto

```
foraneo/
├── lib/                  # Código Dart de la aplicación Flutter
│   ├── main.dart         # Punto de entrada
│   ├── screens/          # Pantallas (Inicio, Explorar, Detalle, Reservas, Perfil)
│   ├── widgets/          # Componentes reutilizables
│   └── services/         # Cliente REST para consumir la API backend
├── assets/               # Imágenes, fuentes y otros recursos estáticos
├── README_foraneo.md     # Este documento
└── backend/              # Proyecto backend (Node.js + Express)
    ├── app.js
    ├── routes/
    ├── models/
    └── ...
```

## Requisitos

- **Flutter** 3.13 o superior.
- **Node.js** 16+ y **npm** para el backend.
- **Base de datos** (p. ej. PostgreSQL o MySQL).
- **Git** para control de versiones.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/foraneo.git
   cd foraneo
   ```

2. Instala las dependencias de Flutter:

   ```bash
   flutter pub get
   ```

3. (Opcional) Habilita el soporte web de Flutter:

   ```bash
   flutter config --enable-web
   ```

4. Configura y ejecuta el backend:

   ```bash
   cd backend
   npm install
   cp .env.example .env   # configura las variables DB_HOST, DB_USER, DB_PASS, etc.
   npm start
   ```

5. Ejecuta la aplicación móvil:

   ```bash
   flutter run
   ```

6. Ejecuta la aplicación web:

   ```bash
   flutter run -d chrome
   ```

## Uso

- En la pantalla de **Inicio** se muestran destinos destacados y categorías.
- En **Explorar** puedes filtrar por ciudad o tipo de experiencia.
- En **Detalle** ves información completa del servicio y puedes reservar.
- La sección **Reservas** muestra tus reservas vigentes y su estado.
- En **Perfil** se gestiona la cuenta, las reseñas y el programa de recompensas.

## Contribuir

Se utiliza Git y GitHub como control de versiones. Para colaborar:

1. **Forkea** este repositorio o clónalo si formas parte del equipo.
2. Crea una **rama nueva** para tu funcionalidad o corrección (`feature/nueva-funcionalidad`).
3. Realiza commits con mensajes descriptivos.
4. Abre un **pull request** y describe los cambios. Alguien del equipo revisará y fusionará la rama.

## Licencia

Este proyecto se publica bajo la licencia MIT.
