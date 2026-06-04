import OpenAI from 'openai';

const openai = new OpenAI({
  // URL per Google Cloud Vertex AI (sostituisci us-central1 se la region è diversa)
  baseURL: "https://us-central1-aiplatform.googleapis.com/v1beta1/projects/801168236466/locations/us-central1/endpoints/openapi",
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // La chiave AQ... dal file .env
  dangerouslyAllowBrowser: true
});

export async function analyzeIdeaWithAI(userIdea) {
  const systemPrompt = "Sei un esperto analista di marketing e business. Analizza l'idea e restituisci SOLO un oggetto JSON con queste chiavi: sintesi, score (numero), verdict (GO o NO GO), diffParagraph1Title, diffParagraph1Text, diffParagraph2Title, diffParagraph2Text, personas (array di 3 oggetti con name, role, quote, description), competitors (array di 3 oggetti con name, core, weakness). Non aggiungere markdown o testo extra.";

  const response = await openai.chat.completions.create({
    model: "gemini-1.5-flash", // Assicurati di usare un modello valido come gemini-1.5-flash
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userIdea }
    ],
    response_format: { type: "json_object" }
  });

  let content = response.choices[0].message.content.trim();

  content = content.replaceAll("```json", "").replaceAll("```", "").trim();

  return JSON.parse(content);
}