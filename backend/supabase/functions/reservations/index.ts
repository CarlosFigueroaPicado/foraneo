// @ts-nocheck

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@16.4.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1?target=deno';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!STRIPE_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing required environment variables for reservations function.');
}

const stripe = new Stripe(STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_SERVICE_ROLE_KEY ?? '', {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

serve(async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: { Allow: 'POST' },
    });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch (error) {
    console.error('Invalid JSON payload', error);
    return new Response('Invalid JSON', { status: 400 });
  }

  const serviceId = payload.service_id;
  const reservationTime = payload.reservation_time;

  if (!serviceId || !reservationTime) {
    return new Response('Missing service_id or reservation_time', { status: 400 });
  }

  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('id, price_cents, currency')
    .eq('id', serviceId)
    .maybeSingle();

  if (serviceError) {
    console.error('Error fetching service data', serviceError);
    return new Response('Service lookup failed', { status: 500 });
  }

  if (!service) {
    return new Response('Service not found', { status: 404 });
  }

  const amount = service.price_cents ?? 0;
  if (!amount) {
    return new Response('Service price is not configured', { status: 422 });
  }

  const currency = service.currency ?? 'usd';

  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        service_id: String(serviceId),
        reservation_time: String(reservationTime),
      },
    });
  } catch (stripeError) {
    console.error('Error creating payment intent', stripeError);
    return new Response('Stripe payment intent error', { status: 500 });
  }

  const { data: reservation, error: reservationError } = await supabase
    .from('reservations')
    .insert({
      service_id: serviceId,
      reservation_time: reservationTime,
      status: 'pending',
      payment_intent_id: paymentIntent.id,
    })
    .select('id')
    .single();

  if (reservationError) {
    console.error('Error inserting reservation', reservationError);
    return new Response('Reservation insert failed', { status: 500 });
  }

  return new Response(
    JSON.stringify({
      reservation_id: reservation.id,
      client_secret: paymentIntent.client_secret,
    }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    },
  );
});
