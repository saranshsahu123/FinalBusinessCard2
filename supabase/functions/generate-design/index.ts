import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { count = 20, businessData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating", count, "design variations");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a professional business card designer. Generate ${count} unique, creative business card design configurations. Each design should have distinct visual characteristics including colors, layouts, typography styles, and decorative elements.

Return a JSON array of ${count} designs. Each design object must have:
{
  "id": "unique-id",
  "name": "Design Name",
  "bgStyle": "background style (gradient, solid, pattern, etc)",
  "bgColors": ["color1", "color2"],
  "textColor": "text color",
  "accentColor": "accent color",
  "layout": "layout type (split, centered, left-aligned, etc)",
  "decoration": "decoration type (circles, lines, shapes, none)",
  "fontWeight": "font weight (normal, bold, light)",
  "borderStyle": "border style (none, solid, dashed, rounded)"
}

Make designs diverse: modern, vintage, minimal, bold, elegant, playful, professional, creative, etc.
Use a wide variety of color combinations and styles.`
          },
          {
            role: "user",
            content: `Generate ${count} unique business card designs.`
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse design data");
    }
    
    const designs = JSON.parse(jsonMatch[0]);
    console.log(`Successfully generated ${designs.length} designs`);

    return new Response(
      JSON.stringify({ designs }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
