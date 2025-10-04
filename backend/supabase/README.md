# Supabase

## Cómo probar

### 1. Crear una reserva

```bash
curl -X POST \
  "http://localhost:54321/functions/v1/reservations" \
  -H "Content-Type: application/json" \
  -d '{
    "service_id": "SERVICE_UUID",
    "reservation_time": "2025-01-01T10:00:00Z"
  }'
```

### 2. Escuchar webhooks de Stripe

```bash
stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook
```

### 3. Desplegar funciones de Edge

```bash
npm run sb:func:deploy
```

Variables de entorno necesarias para las funciones:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
