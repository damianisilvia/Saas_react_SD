/**
 * Analyzes a business idea and returns structured marketing insights in Italian.
 * 
 * @param {string} ideaText - The raw idea description.
 * @returns {Object} An object containing:
 *   - sintesi: string
 *   - score: number
 *   - verdict: 'GO' | 'NO GO'
 *   - diffParagraph1Title: string
 *   - diffParagraph1Text: string
 *   - diffParagraph2Title: string
 *   - diffParagraph2Text: string
 *   - personas: Array<{ name: string, role: string, quote: string, description: string }>
 *   - competitors: Array<{ name: string, core: string, weakness: string }>
 */
export function analyzeIdea(ideaText) {
  const text = (ideaText || '').trim().toLowerCase();
  
  if (!text) {
    return {
      sintesi: "Nessuna idea inserita.",
      score: 1,
      verdict: "NO GO",
      diffParagraph1Title: "Idea mancante",
      diffParagraph1Text: "Non è stato fornito alcun testo da analizzare. Per favore, inserisci un'idea di business nella schermata principale per avviare la validazione marketing.",
      diffParagraph2Title: "Analisi sospesa",
      diffParagraph2Text: "I motori di calcolo dell'assistente marketing richiedono una descrizione, anche sintetica, per poter tracciare i competitor, estrarre le target personas e valutare il successo.",
      personas: [],
      competitors: []
    };
  }

  // Baseline
  let score = 76;
  let verdict = "GO";
  let sintesi = ideaText;
  
  let diffParagraph1Title = "Barriere all'Ingresso";
  let diffParagraph1Text = "L'ingresso in questo settore richiede lo sviluppo di un posizionamento di marca chiaro e di una strategia di differenziazione rispetto alle soluzioni generaliste esistenti. La fedeltà dei clienti verso i brand affermati rappresenta l'ostacolo principale all'ingresso nei primi sei mesi.";
  
  let diffParagraph2Title = "Sostenibilità Economica";
  let diffParagraph2Text = "La gestione dei flussi di cassa iniziali deve focalizzarsi sul contenimento dei costi fissi e sulla validazione rapida del MVP. È raccomandabile lanciare una campagna di pre-vendita per raccogliere capitali iniziali e confermare l'interesse di acquisto prima di investire nello sviluppo su larga scala.";

  let personas = [
    {
      name: "Marco",
      role: "Imprenditore Digitale",
      quote: "Ho bisogno di lanciare micro-servizi pronti sul mercato in pochi giorni.",
      description: "Cerca costantemente strumenti veloci ed efficaci per testare nuovi micro-modelli di business sul mercato senza sprecare budget elevati in analisi tradizionali."
    },
    {
      name: "Giulia",
      role: "Marketing Specialist",
      quote: "La pianificazione delle campagne richiede troppe analisi manuali preliminari.",
      description: "Necessita di automatizzare il reporting per i clienti della sua agenzia e di identificare le debolezze dei competitor prima di strutturare nuove campagne."
    },
    {
      name: "Luca",
      role: "Freelance Creativo",
      quote: "Voglio diversificare le mie entrate tramite un prodotto digitale proprietario.",
      description: "Ha l'obiettivo di lanciare un proprio prodotto a fianco delle attività di consulenza, puntando a flussi di entrate ricorrenti e scalabili."
    }
  ];

  let competitors = [
    {
      name: "Soluzioni Standard Inc.",
      core: "Piattaforme di analisi di mercato generiche",
      weakness: "Processi lenti, report cartacei obsoleti e costi inaccessibili per micro-startup"
    },
    {
      name: "Digital Trend Agency",
      core: "Consulenza strategica tradizionale per PMI",
      weakness: "Mancanza di strumenti di automazione e tempi di consegna dei risultati superiori a un mese"
    },
    {
      name: "DIY Template Market",
      core: "Modelli prefatti di canvas strategici statici",
      weakness: "Richiedono compilazione manuale e non offrono dati dinamici o feedback in tempo reale"
    }
  ];

  // Food / Delivery / Catering / Restaurant
  if (text.includes("cibo") || text.includes("food") || text.includes("ristorante") || text.includes("consegna") || text.includes("delivery") || text.includes("mangiare") || text.includes("ristorazione")) {
    score = 64;
    verdict = "GO";
    sintesi = ideaText.length > 150 ? ideaText.substring(0, 150) + "..." : ideaText;
    diffParagraph1Title = "Bassi Margini e Costi Operativi";
    diffParagraph1Text = "Il settore della ristorazione e del food delivery presenta margini netti ridotti, erosi dall'aumento dei costi delle materie prime e dalle commissioni logistiche. La redditività a lungo termine dipende fortemente dalla capacità di ottimizzare le consegne o di incrementare lo scontrino medio.";
    diffParagraph2Title = "Fidelizzazione della Clientela";
    diffParagraph2Text = "La concorrenza locale è estremamente accesa e i consumatori tendono a cambiare fornitore in base alle offerte promozionali. Sarà indispensabile implementare programmi di loyalty avanzati e personalizzati per garantire un tasso di riacquisto stabile e ridurre il costo di acquisizione.";
    
    personas = [
      {
        name: "Alessandro",
        role: "Ristoratore Indipendente",
        quote: "Le app di delivery tradizionali si prendono oltre il 30% delle mie entrate.",
        description: "Vuole incrementare le vendite a domicilio tagliando i costi delle grandi piattaforme oligopolistiche tramite una gestione interna e localizzata."
      },
      {
        name: "Sofia",
        role: "Food Blogger & Curator",
        quote: "Voglio che i miei consigli gastronomici abbiano un impatto positivo sul territorio.",
        description: "Cerca servizi gastronomici con una forte impronta etica e di sostenibilità, prediligendo prodotti artigianali e packaging ecologici."
      },
      {
        name: "Davide",
        role: "Lavoratore da Remoto",
        quote: "Mangiare in modo sano in pausa pranzo a casa sta diventando noioso e costoso.",
        description: "Cerca soluzioni per pasti sani ed equilibrati da consumare durante la pausa pranzo, con consegne veloci, puntuali e abbonamenti flessibili."
      }
    ];

    competitors = [
      {
        name: "Big Deliverers",
        core: "Consegna di cibo a domicilio di massa",
        weakness: "Commissioni elevate per i piccoli locali ed totale assenza di cura nel packaging personalizzato"
      },
      {
        name: "Supermercati Online",
        core: "Spesa a domicilio con ingredienti freschi",
        weakness: "Nessuna opzione di pasto caldo pronto al consumo istantaneo e slot di consegna rigidi"
      },
      {
        name: "Servizi di Catering Tradizionali",
        core: "Fornitura pasti per eventi e grandi aziende",
        weakness: "Richiedono prenotazioni con giorni di anticipo e sono strutturalmente lenti"
      }
    ];
  } 
  // SaaS / Software / AI / Tech / Platform / Web
  else if (text.includes("app") || text.includes("software") || text.includes("saas") || text.includes("intelligenza") || text.includes("ai") || text.includes("tecnologia") || text.includes("piattaforma") || text.includes("sito") || text.includes("web")) {
    score = 88;
    verdict = "GO";
    sintesi = ideaText.length > 150 ? ideaText.substring(0, 150) + "..." : ideaText;
    diffParagraph1Title = "Elevata Complessità Algoritmica";
    diffParagraph1Text = "La stabilità del prodotto richiede ingenti investimenti iniziali nello sviluppo del codice e nell'integrazione di API robuste. Mantenere bassi i costi computazionali garantendo al contempo risposte veloci all'utente finale rappresenta la sfida principale.";
    diffParagraph2Title = "Customer Churn e Adozione";
    diffParagraph2Text = "Gli utenti software abbandonano rapidamente i tool che non mostrano un valore immediato (time-to-value). L'interfaccia deve eliminare qualsiasi attrito cognitivo nei primi 3 minuti di utilizzo, guidando l'utente verso la prima azione di successo (l'effetto wow).";
    
    personas = [
      {
        name: "Valeria",
        role: "Product Owner",
        quote: "Ho bisogno di integrare micro-servizi AI senza stravolgere la nostra infrastruttura.",
        description: "Responsabile del rilascio di nuove funzionalità, cerca costantemente integrazioni SaaS che non richiedano mesi di sviluppo per validare metriche d'uso."
      },
      {
        name: "Federico",
        role: "Growth Marketer",
        quote: "I test di acquisizione canali richiedono troppi script personalizzati e lunghi.",
        description: "Focalizzato sull'acquisizione utenti, ha bisogno di dashboard con dati in tempo reale e API stabili per ottimizzare i flussi di conversione automatizzati."
      },
      {
        name: "Chiara",
        role: "Responsabile Operations",
        quote: "L'allineamento dei team remoti su fogli condivisi sta rallentando il nostro lavoro.",
        description: "Cerca software in grado di centralizzare i flussi di lavoro di team distribuiti, abbattendo i tempi morti di comunicazione asincrona."
      }
    ];

    competitors = [
      {
        name: "Platform Giants",
        core: "Suite aziendali all-in-one a pacchetto chiuso",
        weakness: "Eccessiva complessità di configurazione e tempi di onboarding lunghi per team agili"
      },
      {
        name: "Micro-Tools SaaS",
        core: "Single-feature utility focalizzate",
        weakness: "Mancanza di integrazioni e necessità di abbonarsi a molteplici servizi per completare un processo"
      },
      {
        name: "Open Source Frameworks",
        core: "Librerie di codice gratuite autogestite",
        weakness: "Richiedono un team di sviluppo interno dedicato alla manutenzione del server e dei bug"
      }
    ];
  } 
  // Fitness / Sport / Health / Wellness
  else if (text.includes("fitness") || text.includes("salute") || text.includes("sport") || text.includes("palestra") || text.includes("benessere") || text.includes("allenamento") || text.includes("dieta")) {
    score = 73;
    verdict = "GO";
    sintesi = ideaText.length > 150 ? ideaText.substring(0, 150) + "..." : ideaText;
    diffParagraph1Title = "Saturazione della Nicchia Wellness";
    diffParagraph1Text = "Il mercato delle app di fitness e dei servizi per il benessere è saturo. La differenziazione deve basarsi su una nicchia estrema (es. atleti senior o problemi posturali post-lavoro) anziché proporsi come soluzione generalista per chiunque.";
    diffParagraph2Title = "Fattore di Coinvolgimento (Engagement)";
    diffParagraph2Text = "La motivazione degli utenti cala drasticamente dopo le prime due settimane. Sarà fondamentale strutturare meccanismi di gamification (livelli, traguardi) ed elementi di community o feedback umano per incentivare un uso prolungato nel tempo.";

    personas = [
      {
        name: "Roberta",
        role: "Personal Trainer",
        quote: "Inviare schede PDF su WhatsApp rende impossibile tracciare i progressi reali.",
        description: "Desidera spostare la sua attività di coaching online per seguire più persone contemporaneamente, tracciando i progressi senza scambiare fogli Excel."
      },
      {
        name: "Matteo",
        role: "Impiegato Sedentario",
        description: "Passa 10 ore seduto alla scrivania, accusa dolori posturali e necessita di brevi routine quotidiane da svolgere sul posto di lavoro senza attrezzi.",
        quote: "Non ho tempo per andare in palestra, ma il mio mal di schiena peggiora ogni giorno."
      },
      {
        name: "Elena",
        role: "Nutrizionista Clinica",
        quote: "I pazienti dimenticano di compilare il diario alimentare cartaceo dopo tre giorni.",
        description: "Cerca un canale integrato per monitorare le abitudini alimentari dei propri pazienti in tempo reale, offrendo supporto motivazionale tempestivo."
      }
    ];

    competitors = [
      {
        name: "Glob-Fitness Apps",
        core: "Applicazioni di allenamento di massa standard",
        weakness: "Totale assenza di personalizzazione reale e di monitoraggio per bisogni specifici di salute o postura"
      },
      {
        name: "Wearable Trackers",
        core: "Dispositivi fisici di raccolta parametri biometrici",
        weakness: "Mostrano i dati grezzi ma non dicono all'utente come usarli per migliorare la propria salute"
      },
      {
        name: "Centri Fitness Locali",
        core: "Corsi fisici e sale pesi tradizionali",
        weakness: "Mancanza di flessibilità oraria e impossibilità di fruire del servizio durante i viaggi di lavoro"
      }
    ];
  } 
  // Generic or Too Short
  else if (text.length < 20) {
    score = 38;
    verdict = "NO GO";
    sintesi = ideaText;
    diffParagraph1Title = "Mancanza di Proposta di Valore";
    diffParagraph1Text = "La descrizione dell'idea è troppo sintetica o generica. Senza un problema chiaro da risolvere e un pubblico di riferimento identificato, il progetto manca di fondamenta ed è destinato a disperdersi nel rumore di fondo del mercato.";
    diffParagraph2Title = "Alto Rischio di Esecuzione";
    diffParagraph2Text = "In assenza di dettagli operativi, si corre il rischio di costruire un prodotto che nessuno desidera. Si consiglia vivamente di espandere l'idea dettagliando come si intende generare ricavi e chi sia il cliente tipo.";
    
    // Minimal or empty states
    personas = [
      {
        name: "N.D.",
        role: "Profilo da definire",
        quote: "Nessuna citazione disponibile.",
        description: "Espandi la descrizione per identificare chi potrebbe trovare interessante questa proposta di business."
      },
      {
        name: "N.D.",
        role: "Profilo da definire",
        quote: "Nessuna citazione disponibile.",
        description: "Espandi la descrizione per identificare chi potrebbe trovare interessante questa proposta di business."
      },
      {
        name: "N.D.",
        role: "Profilo da definire",
        quote: "Nessuna citazione disponibile.",
        description: "Espandi la descrizione per identificare chi potrebbe trovare interessante questa proposta di business."
      }
    ];

    competitors = [
      {
        name: "Competitor Indefiniti",
        core: "Mercato da identificare",
        weakness: "Fornisci maggiori dettagli per mappare il panorama competitivo di questa idea"
      },
      {
        name: "Competitor Indefiniti",
        core: "Mercato da identificare",
        weakness: "Fornisci maggiori dettagli per mappare il panorama competitivo di questa idea"
      },
      {
        name: "Competitor Indefiniti",
        core: "Mercato da identificare",
        weakness: "Fornisci maggiori dettagli per mappare il panorama competitivo di questa idea"
      }
    ];
  }

  return {
    sintesi,
    score,
    verdict,
    diffParagraph1Title,
    diffParagraph1Text,
    diffParagraph2Title,
    diffParagraph2Text,
    personas,
    competitors
  };
}
