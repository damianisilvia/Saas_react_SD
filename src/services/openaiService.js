import { GoogleGenerativeAI } from "@google/generative-ai";

export async function analyzeIdeaWithAI(userIdea) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Chiave API mancante nel file .env!");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // 🎯 PROMPT SUPER-BLINDATO SUL TUO SCHEMA DI INPUT/OUTPUT
  const systemPrompt = `Sei un esperto analista di marketing e business. Analizza l'idea inviata dall'utente e restituisci TASSATIVAMENTE un unico oggetto JSON in lingua italiana, attenendoti a questo schema preciso:

  {
    "sintesi": "string (Massimo 150 caratteri di sintesi dell'idea)",
    "score": "number (Un punteggio numerico di successo da 1 a 100)",
    "verdict": "string ('GO' se lo score è uguale o maggiore di 60, oppure 'NO GO' se lo score è inferiore a 60)",
    "diffParagraph1Title": "string (Titolo breve sulla prima barriera o difficoltà di mercato)",
    "diffParagraph1Text": "string (Paragrafo esplicativo della prima difficoltà)",
    "diffParagraph2Title": "string (Titolo breve sulla sostenibilità o seconda difficoltà)",
    "diffParagraph2Text": "string (Paragrafo esplicativo della seconda difficoltà)",
    "personas": [
      { "name": "string", "role": "string", "quote": "string", "description": "string" },
      { "name": "string", "role": "string", "quote": "string", "description": "string" },
      { "name": "string", "role": "string", "quote": "string", "description": "string" }
    ],
    "competitors": [
      { "name": "string", "core": "string", "weakness": "string" },
      { "name": "string", "core": "string", "weakness": "string" },
      { "name": "string", "core": "string", "weakness": "string" }
    ]
  }

  REGOLE CRITICHE:
  1. Restituisci SOLO il JSON puro, senza blocchi di codice markdown (\`\`\`json ... \`\`\`) e senza testo prima o dopo.
  2. Genera ESATTAMENTE 3 personas e ESATTAMENTE 3 competitors realistici per la nicchia dell'idea.
  3. Sii coerente: se lo score è basso (es. meno di 50), il verdetto DEVE essere 'NO GO'.`;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(`${systemPrompt}\n\nEcco l'idea da analizzare:\n${userIdea}`);
    const response = await result.response;
    const content = response.text().trim();

    const parsedData = JSON.parse(content);

    // 🛡️ DOPPIO CONTROLLO DI SICUREZZA IN CODE (Se l'AI sgarra la logica matematica)
    if (parsedData.score < 60) {
      parsedData.verdict = "NO GO";
    } else {
      parsedData.verdict = "GO";
    }

    return parsedData;

  } catch (error) {
    console.error("Errore durante l'analisi dell'idea con Gemini:", error);
    throw error;
  }
}