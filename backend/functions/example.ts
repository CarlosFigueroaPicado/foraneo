import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve((req) => {
  return new Response(JSON.stringify({ message: "Hola desde Foráneo!" }), {
    headers: { "Content-Type": "application/json" },
  });
});
