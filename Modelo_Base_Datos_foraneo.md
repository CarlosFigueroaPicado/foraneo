# Modelo de Base de Datos de Foráneo

El modelo se diseñó en un **sistema relacional** (p. ej. PostgreSQL) para garantizar integridad referencial y facilitar las consultas.  A continuación se describen las tablas principales y sus relaciones.

## Tablas principales

| Tabla            | Descripción | Campos clave |
|------------------|-------------|--------------|
| **usuarios**     | Almacena los datos de los usuarios (viajeros y proveedores) | `id_usuario` (PK), nombre, correo, contraseña hash, teléfono, rol (viajero/proveedor), fecha_creación |
| **negocios**     | Información de los negocios turísticos (hostales, restaurantes, transportistas) | `id_negocio` (PK), id_usuario (FK), nombre_comercial, tipo_negocio, descripción, ubicación (lat, lon), rating_promedio |
| **servicios**    | Servicios ofrecidos por cada negocio (habitaciones, tours, transporte) | `id_servicio` (PK), id_negocio (FK), nombre, categoría, descripción, precio_base, disponibilidad |
| **reservas**     | Registra las reservas realizadas por los usuarios | `id_reserva` (PK), id_usuario (FK), id_servicio (FK), fecha_inicio, fecha_fin, cantidad, total, estado (pendiente/confirmada/cancelada) |
| **reseñas**      | Opiniones y puntuaciones sobre un servicio | `id_reseña` (PK), id_reserva (FK), rating (1‑5), comentario, fecha |
| **recompensas**  | Programa de puntos y recompensas | `id_recompensa` (PK), id_usuario (FK), puntos_acumulados, nivel_actual |

## Relaciones

- Un **usuario** puede ser **proveedor** si tiene asociados uno o más **negocios** (`usuarios.id_usuario` → `negocios.id_usuario`).
- Un **negocio** ofrece varios **servicios** (`negocios.id_negocio` → `servicios.id_negocio`).
- Un **usuario** (viajero) realiza una o más **reservas** de **servicios** (`usuarios.id_usuario` → `reservas.id_usuario`, `servicios.id_servicio` → `reservas.id_servicio`).
- Cada **reserva** puede generar una **reseña** (`reservas.id_reserva` → `reseñas.id_reserva`).
- Los **puntos de recompensa** se acumulan por usuario (`usuarios.id_usuario` → `recompensas.id_usuario`).

## Notas de diseño

- Se recomienda usar **UUID** como claves primarias para mejorar la escalabilidad.
- Para los **servicios** de transporte se pueden añadir campos específicos como origen, destino y horarios.
- El campo `rating_promedio` en la tabla **negocios** se calcula a partir de las reseñas vinculadas a sus servicios.
- El sistema puede ampliarse con tablas adicionales para promociones, mensajes internos o historial de pagos según sea necesario.
