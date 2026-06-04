import { GoogleGenerativeAI } from "@google/generative-ai";

export async function analyzeIdeaWithAI(userIdea) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  // Log di controllo visibile in console (F12)
  console.log("DEBUG - Chiave rilevata nel file .env:", apiKey);

  if (!apiKey) {
    throw new Error("Chiave API mancante nel file .env! Controlla VITE_OPENAI_API_KEY");
  }

  // Inizializzazione standard con la classe corretta
  const genAI = new GoogleGenerativeAI(apiKey);

  const systemPrompt = "Sei un esperto analista di marketing e business. Analizza l'idea e restituisci SOLO un oggetto JSON con queste chiavi: sintesi, score (numero), verdict (GO o NO GO), diffParagraph1Title, diffParagraph1Text, diffParagraph2Title, diffParagraph2Text, personas (array di 3 oggetti con name, role, quote, description), competitors (array di 3 oggetti con name, core, weakness). Non aggiungere markdown o testo extra.";

  try {
    // Configurazione del modello secondo le specifiche dell'SDK
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(`${systemPrompt}\n\nEcco l'idea da analizzare:\n${userIdea}`);
    const response = await result.response;
    const content = response.text().trim();

    return JSON.parse(content);

  } catch (error) {
    console.error("Errore durante la chiamata a Gemini:", error);
    throw error;
  }
}