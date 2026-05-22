// Questo è l'oggetto principale chiamato "data". Contiene tutte le informazioni della dashboard.
const data = {

  // 1. DESCRIZIONE DELL'IDEA
  // Una semplice stringa di testo che descrive il progetto SaaS. •	SaaS (con due A): È solo l'idea di business della tua app (Software ad abbonamento).
  ideaDescription: "Piattaforma software (SaaS) basata su intelligenza artificiale per l'ottimizzazione automatica delle campagne di marketing sui social media per e-commerce...",

  // 2. SUCCESS SCORE (Il cerchio con la percentuale)
  // È un oggetto che raggruppa tre informazioni correlate al punteggio di successo.
  successScore: {
    score: 88,              // Il numero che vedi al centro del cerchio neon
    maxScore: 100,          // Il limite massimo del punteggio (/100)
    label: "Potenziale Elevato" // Il testo che si trova subito sotto il numero 88
  },

  // 3. VERDETTO VALIDAZIONE (Il box in basso a destra con il pulsante verde)
  // Un altro oggetto che racchiude i dati del responso algoritmico.
  verdettoValidazione: {
    status: "GO",           // Il testo verde gigante dentro al pulsante ("VERDETTO: GO")
    description: "L'analisi algoritmica ha elaborato la fattibilità di esecuzione, i concorrenti di riferimento e le barriere commerciali. Il verdetto indica se l'idea possiede i presupposti per avanzare alla fase operativa."
  },

  // 4. ANALISI DIFFICOLTÀ (Le sfide principali)
  // Questo è un ARRAY (indicato dalle parentesi quadre [ ]) perché contiene una LISTA di elementi.
  // Ogni elemento della lista è un oggetto con ID, Titolo e Descrizione.
  analisiDifficolta: [
    {
      id: "01",
      title: "Elevata Complessità Algoritmica",
      description: "La stabilità del prodotto richiede ingenti investimenti iniziali nello sviluppo del codice e nell'integrazione di API robuste. Mantenere bassi i costi computazionali garantendo al contempo risposte veloci all'utente finale rappresenta la sfida principale."
    },
    {
      id: "02",
      title: "Customer Churn e Adozione",
      description: "Gli utenti software abbandonano rapidamente i tool che non mostrano un valore immediato (time-to-value). L'interfaccia deve eliminare qualsiasi attrito cognitivo nei primi 3 minuti di utilizzo, guidando l'utente verso la prima azione di successo (l'effetto wow)."
    }
  ],

  // 5. MAPPATURA COMPETITOR (La tabella dei rivali)
  // Anche questo è un ARRAY di oggetti. Perfetto per essere ciclato e trasformato in una tabella HTML.
  mappaturaCompetitor: [
    {
      name: "Platform Giants",
      coreBusiness: "Suite aziendali all-in-one a pacchetto chiuso",
      puntoDebole: "ECCESSIVA COMPLESSITÀ DI CONFIGURAZIONE E TEMPI DI ONBOARDING LUNGHI PER TEAM AGILI"
    },
    {
      name: "Micro-Tools SaaS",
      coreBusiness: "Single-feature utility focalizzate",
      puntoDebole: "MANCANZA DI INTEGRAZIONI E NECESSITÀ DI ABBONARSI A MOLTEPLICI SERVIZI PER COMPLETARE UN PROCESSO"
    },
    {
      name: "Open Source Frameworks",
      coreBusiness: "Librerie di codice gratuite autogestite",
      puntoDebole: "RICHIEDONO UN TEAM DI SVILUPPO INTERNO DEDICATO ALLA MANUTENZIONE DEL SERVER E DEI BUG"
    }
  ],

  // 6. TARGET USER PERSONAS (I tre profili utente in fondo)
  // Un array finale che contiene i dati di Valeria, Federico e Chiara.
  targetUserPersonas: [
    {
      name: "Valeria",
      role: "PRODUCT OWNER",
      avatar: "V", // La lettera che apparirà nel cerchietto blu del profilo
      quote: "Ho bisogno di integrare micro-servizi AI senza stravolgere la nostra infrastruttura.",
      description: "Responsabile del rilascio di nuove funzionalità, cerca costantemente integrazioni SaaS che non richiedano mesi di sviluppo per validare metriche d'uso."
    },
    {
      name: "Federico",
      role: "GROWTH MARKETER",
      avatar: "F",
      quote: "I test di acquisizione canali richiedono troppi script personalizzati e lunghi.",
      description: "Focalizzato sull'acquisizione utenti, ha bisogno di dashboard con dati in tempo reale e API stabili per ottimizzare i flussi di conversione automatizzati."
    },
    {
      name: "Chiara",
      role: "RESPONSABILE OPERATIONS",
      avatar: "C",
      quote: "L'allineamento dei team remoti su fogli condivisi sta rallentando il nostro lavoro.",
      description: "Cerca software in grado di centralizzare i flussi di lavoro di team distribuiti, abbattendo i tempi morti di comunicazione asincrona."
    }
  ]
};