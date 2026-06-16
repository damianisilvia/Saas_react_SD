import { GoogleGenerativeAI } from '@google/generative-ai';

export async function analyzeIdeaWithAI(userIdea) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Chiave API mancante nel file .env!");
  }

  // Inizializziamo l'SDK ufficiale di Google
  const genAI = new GoogleGenerativeAI(apiKey);

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

  let tentativi = 3;
  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  while (tentativi > 0) {
    try {
      // Configuriamo il modello corretto con le istruzioni di sistema
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: systemPrompt,
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      // ✨ CORREZIONE ERRORE 400: Passiamo il contenuto nel formato corretto richiesto da Google!
      const response = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: userIdea }] }]
      });

      const content = response.response.text().trim();
      const parsedData = JSON.parse(content);

      // 🛡️ DOPPIO CONTROLLO DI SICUREZZA IN CODE
      if (Number(parsedData.score) < 60) {
        parsedData.verdict = "NO GO";
      } else {
        parsedData.verdict = "GO";
      }

      return parsedData;

    } catch (error) {
      console.error(`Errore di connessione a Gemini (Tentativi rimasti: ${tentativi - 1}):`, error.message);
      
      // Controllo se l'errore è un 503 (High demand) o un errore di rete temporaneo
      const errorMsg = error?.message?.toLowerCase() || "";
      const isTemporaryError = error?.status === 503 || errorMsg.includes("503") || errorMsg.includes("high demand") || errorMsg.includes("network") || errorMsg.includes("fetch");

      tentativi--;

      if (tentativi === 0 || !isTemporaryError) {
        // Se finiamo i tentativi ed era un errore temporaneo, lanciamo un errore specifico
        if (isTemporaryError) {
          throw new Error("SERVICE_UNAVAILABLE");
        }
        // Altrimenti lanciamo l'errore standard
        throw error;
      }

      // Attendiamo 1.5 secondi prima di riprovare
      await delay(1500); 
    }
  }
}