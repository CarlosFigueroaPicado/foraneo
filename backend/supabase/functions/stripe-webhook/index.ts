// @ts-nocheck

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@16.4.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1?target=deno';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing required environment variables for Stripe webhook function.');
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

type SupabaseResponse = Response | Promise<Response>;

type Handler = (request: Request) => SupabaseResponse;

const handler: Handler = async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: { 'Allow': 'POST' },
    });
  }

  if (!STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured.');
    return new Response('Configuration error', { status: 500 });
  }

  const signature = request.headers.get('Stripe-Signature');
  if (!signature) {
    return new Response('Missing Stripe signature', { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error('Stripe signature verification failed', error);
    return new Response('Invalid signature', { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const paymentIntentId =
      paymentIntent.metadata?.payment_intent_id ?? paymentIntent.metadata?.reservation_payment_intent_id ?? paymentIntent.id;

    if (!paymentIntentId) {
      console.warn('Payment intent without metadata identifier.');
    } else {
      const { error } = await supabase
        .from('reservations')
        .update({ status: 'confirmed' })
        .eq('payment_intent_id', paymentIntentId);

      if (error) {
        console.error('Failed to update reservation status', error);
        return new Response('Failed to update reservation', { status: 500 });
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

serve(handler);
