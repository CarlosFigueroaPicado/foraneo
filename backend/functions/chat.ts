import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const claudeApiKey = Deno.env.get("CLAUDE_API_KEY") ?? "";

    if (!claudeApiKey) {
      throw new Error("Claude API key no configurada");
    }

    const authHeader = req.headers.get("Authorization");
    const supabase = createClient(supabaseUrl, supabaseKey);

    let userId = null;
    let isPro = false;

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (user) {
        userId = user.id;

        const { data: profile } = await supabase
          .from("profiles")
          .select("subscription_tier")
          .eq("id", userId)
          .single();

        isPro = profile?.subscription_tier === "pro";
      }
    }

    const { message, history = [] }: ChatRequest = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Mensaje inválido" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const messages = [
      {
        role: "user",
        content: `Eres un asistente de viajes experto en Nicaragua. Tu nombre es Foráneo AI.
Ayudas a los viajeros a planificar itinerarios, recomendar destinos, sugerir actividades,
encontrar hospedajes y más. Sé amigable, informativo y conciso.
Enfócate en promover el turismo responsable y los pequeños negocios locales en Nicaragua.

${isPro ? "Este usuario tiene una cuenta Pro, así que ofrece recomendaciones premium y detalladas." : "Este usuario tiene una cuenta gratuita."}`,
      },
      ...history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: message,
      },
    ];

    const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": claudeApiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: messages.filter(msg => msg.role !== "system"),
        system: messages.find(msg => msg.role === "system")?.content || messages[0].content,
      }),
    });

    if (!claudeResponse.ok) {
      const errorData = await claudeResponse.text();
      console.error("Error de Claude API:", errorData);
      throw new Error("Error al comunicarse con Claude API");
    }

    const claudeData = await claudeResponse.json();
    const assistantMessage = claudeData.content[0]?.text || "Lo siento, no pude procesar tu solicitud.";

    if (userId) {
      await supabase.from("chat_history").insert({
        user_id: userId,
        message: message,
        response: assistantMessage,
        is_pro: isPro,
      });
    }

    return new Response(
      JSON.stringify({
        response: assistantMessage,
        isPro: isPro,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error en función chat:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Error interno del servidor",
        response: "Lo siento, hubo un problema procesando tu solicitud. Por favor, intenta de nuevo.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
