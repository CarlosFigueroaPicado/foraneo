# Backend

Este directorio contiene el código backend de Foráneo, construido sobre Supabase y funciones edge.

## Estructura

- `supabaseClient.ts`: Inicializa el cliente de Supabase utilizando las variables de entorno definidas en `.env`.
- `functions/`: Carpeta que contiene las edge functions. Cada función define un endpoint que la aplicación puede consumir.
- `functions/example.ts`: Ejemplo de una función edge.

## Requisitos

- Node.js ≥ 18
- Cuenta de Supabase con base de datos PostgreSQL y PostGIS.
- Claves de Supabase y otras credenciales definidas en el archivo `.env` (ver `.env.example`).

## Despliegue

1. Configura tus variables de entorno.
2. Usa la CLI de Supabase para probar localmente (`supabase functions serve`).
3. Despliega las funciones con `supabase functions deploy <function_name>`.
