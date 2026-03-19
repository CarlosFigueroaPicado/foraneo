# Integración de Claude AI - Guía de Configuración

## Problema Resuelto

Este documento explica cómo se resolvió el problema: "no puedo usar claude en mi chat de copilot, me dice upgrade y ya tengo cuenta de pro"

### Causa del Problema

El problema se debía a:
1. **Falta de integración con Claude**: El botón "Probar ahora" del Planificador Inteligente no tenía funcionalidad
2. **Sin verificación de suscripción**: No existía lógica para verificar si un usuario tenía cuenta Pro
3. **Sin API configurada**: No había endpoints para comunicarse con Claude API
4. **Sin base de datos de usuarios Pro**: Faltaba la estructura de datos para manejar suscripciones

### Solución Implementada

Se implementaron los siguientes componentes:

## 1. Pantalla de Chat con IA (`/front/app/AIChat.tsx`)

Una interfaz completa de chat que:
- Muestra historial de conversaciones
- Envía mensajes al backend
- Maneja estados de carga
- Diseño responsive con NativeWind

## 2. Backend API (`/backend/functions/chat.ts`)

Edge function de Supabase que:
- Se conecta con Claude API (claude-3-5-sonnet-20241022)
- Verifica el nivel de suscripción del usuario
- Guarda historial en la base de datos
- Proporciona respuestas contextuales sobre Nicaragua

## 3. Base de Datos

Nueva migración SQL que agrega:
- Campo `subscription_tier` en tabla `profiles` (free/pro)
- Tabla `chat_history` para almacenar conversaciones
- Políticas RLS para seguridad

## 4. Servicio de Suscripciones (`/backend/subscriptionService.ts`)

Servicio TypeScript para:
- Verificar tier de suscripción
- Actualizar estado Pro/Free
- Obtener usuario actual

## Configuración Necesaria

### 1. Variables de Entorno

Agregar a tu archivo `.env`:

```bash
EXPO_PUBLIC_SUPABASE_URL=tu_url_de_supabase
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
EXPO_PUBLIC_API_URL=https://tu-proyecto.supabase.co/functions/v1
EXPO_PUBLIC_CLAUDE_API_KEY=tu_clave_de_claude
```

### 2. Configurar Claude API

1. Obtener API key de Anthropic:
   - Visita https://console.anthropic.com/
   - Crea una cuenta o inicia sesión
   - Genera una API key
   - **IMPORTANTE**: Esta clave debe configurarse en Supabase, NO en el frontend

2. Configurar en Supabase:
   ```bash
   supabase secrets set CLAUDE_API_KEY=tu_clave_aqui
   ```

### 3. Ejecutar Migración de Base de Datos

```bash
# Conectar a tu proyecto de Supabase
supabase link --project-ref tu-proyecto-ref

# Ejecutar la migración
supabase db push
```

O ejecutar manualmente el SQL en el Dashboard de Supabase:
- Ve a SQL Editor
- Copia el contenido de `/backend/migrations/add_chat_and_subscription.sql`
- Ejecuta la query

### 4. Desplegar Edge Function

```bash
# Desplegar la función chat
supabase functions deploy chat
```

### 5. Dar Cuenta Pro a un Usuario

Para dar acceso Pro a un usuario (resolver el problema del "upgrade"):

**Opción A: SQL directo**
```sql
UPDATE profiles
SET subscription_tier = 'pro'
WHERE id = 'usuario_id_aqui';
```

**Opción B: Usando el servicio**
```typescript
import { subscriptionService } from './backend/subscriptionService';

await subscriptionService.updateSubscriptionTier(userId, 'pro');
```

## Verificar que Funciona

1. **Verificar usuario tiene Pro**:
   ```sql
   SELECT id, email, subscription_tier
   FROM profiles
   WHERE email = 'tu@email.com';
   ```

2. **Probar la función chat**:
   ```bash
   curl -X POST https://tu-proyecto.supabase.co/functions/v1/chat \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer tu_token_de_usuario" \
     -d '{"message": "Recomiéndame lugares en Granada"}'
   ```

3. **Verificar en la app**:
   - Abre la app
   - Navega a Home
   - Haz clic en "Probar ahora"
   - Deberías ver la pantalla de chat
   - Envía un mensaje
   - Si tienes cuenta Pro, recibirás recomendaciones detalladas

## Flujo de Autenticación

```
Usuario → Frontend (AIChat.tsx)
    ↓
    Envía mensaje con Authorization header
    ↓
Backend (chat.ts)
    ↓
    Verifica token con Supabase Auth
    ↓
    Consulta subscription_tier del usuario
    ↓
    Envía request a Claude API con contexto Pro/Free
    ↓
    Guarda en chat_history
    ↓
    Retorna respuesta al frontend
```

## Diferencias Pro vs Free

### Usuario Free
- Recibe respuestas estándar
- Recomendaciones básicas
- Sin historial persistente en el frontend

### Usuario Pro
- Respuestas más detalladas y personalizadas
- Recomendaciones premium
- Acceso completo al historial
- Prioridad en el sistema

## Troubleshooting

### Error: "upgrade" aparece aún con cuenta Pro

1. Verificar en base de datos:
   ```sql
   SELECT subscription_tier FROM profiles WHERE id = 'tu_user_id';
   ```

2. Si es 'free', actualizar:
   ```sql
   UPDATE profiles SET subscription_tier = 'pro' WHERE id = 'tu_user_id';
   ```

### Error: "Claude API key no configurada"

```bash
# Verificar secrets en Supabase
supabase secrets list

# Si no está, agregar
supabase secrets set CLAUDE_API_KEY=sk-ant-...
```

### Error: "Error al comunicarse con Claude API"

1. Verificar que la API key es válida
2. Verificar que tienes créditos en tu cuenta de Anthropic
3. Revisar logs de Supabase:
   ```bash
   supabase functions logs chat
   ```

### Chat no abre al hacer clic en "Probar ahora"

1. Verificar que el archivo `AIChat.tsx` existe en `/front/app/`
2. Verificar que no hay errores de compilación:
   ```bash
   cd front
   npm start
   ```

## Próximos Pasos

1. **Integrar con Stripe**: Permitir que usuarios compren suscripción Pro
2. **Panel de administración**: Para gestionar suscripciones
3. **Métricas**: Trackear uso del chat para usuarios Pro/Free
4. **Límites de uso**: Implementar rate limiting para usuarios Free

## Soporte

Si tienes problemas:
1. Revisa los logs de Supabase
2. Verifica las variables de entorno
3. Confirma que la migración se ejecutó correctamente
4. Contacta a soporte@foraneo.com
