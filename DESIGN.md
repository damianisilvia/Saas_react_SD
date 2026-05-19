---
name: Progetto Marketing
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#d1bcff'
  on-secondary: '#3c0090'
  secondary-container: '#7000ff'
  on-secondary-container: '#ddcdff'
  tertiary: '#fff5de'
  on-tertiary: '#3b2f00'
  tertiary-container: '#fed639'
  on-tertiary-container: '#715d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d1bcff'
  on-secondary-fixed: '#23005b'
  on-secondary-fixed-variant: '#5700c9'
  tertiary-fixed: '#ffe179'
  tertiary-fixed-dim: '#eac324'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#554500'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

Questo design system è concepito per un'assistente di marketing ad alte prestazioni, dove la precisione algoritmica incontra un'estetica futuristica e raffinata. La personalità del brand è autorevole, innovativa e focalizzata sui dati, evocando un senso di intelligenza artificiale avanzata ma accessibile.

Lo stile visivo fonde il **Minimalismo** con tocchi di **Glassmorphism** e accenti **High-Tech**. L'interfaccia si presenta come un cruscotto di comando sofisticato:
- **Minimalismo Tecnico:** Ampio spazio negativo bilanciato da linee sottili e tipografia nitida per ridurre il carico cognitivo.
- **Estetica Dark:** Una base profonda che permette agli accenti neon di guidare l'azione senza sovraccaricare l'utente.
- **Layering Avanzato:** Utilizzo di trasparenze calibrate e sfocature dello sfondo per creare una gerarchia spaziale senza l'uso di ombre pesanti o texture fisiche.

## Colors

La tavolozza cromatica è rigorosamente scura per massimizzare il contrasto e la leggibilità degli elementi critici.

- **Background (Neutral):** Utilizziamo `#0A0A0A` come tela di base, con `#121212` per i contenitori di superficie (Surface Containers). Questa sottile distinzione crea profondità senza interrompere l'oscurità del sistema.
- **Primary (Electric Cyan):** Il colore `#00F0FF` è riservato esclusivamente alle Call-to-Action primarie, agli stati attivi e ai punti dati fondamentali. La sua natura vibrante deve tagliare il buio come un segnale laser.
- **Secondary (Digital Violet):** Un viola elettrico `#7000FF` viene utilizzato per differenziare i flussi di dati secondari e per creare gradienti di profondità negli elementi grafici CSS.
- **Status Colors:** Verde neon per il successo, Rosso elettrico per gli errori, mantenendo la saturazione alta per coerenza con il tema high-tech.

## Typography

Il sistema tipografico bilancia l'espressività geometrica con la leggibilità funzionale.

- **Headlines:** Utilizziamo **Sora** per la sua struttura geometrica e moderna. Le testate devono avere un peso deciso e una spaziatura tra le lettere leggermente ridotta per un look impattante e compatto.
- **Body & Interface:** **Inter** gestisce tutta la lettura prolungata e gli elementi dell'interfaccia. È scelta per la sua neutralità e la chiarezza dei glifi su schermi scuri.
- **Labels:** Per micro-copy e metadati, le etichette in maiuscolo con spaziatura aumentata rafforzano il carattere tecnico del sistema, richiamando la precisione dei cruscotti di monitoraggio dati.

## Layout & Spacing

Il layout segue un modello a griglia fluido ma rigoroso, progettato per organizzare flussi di informazioni complessi.

- **Griglia:** Sistema a 12 colonne per desktop, 4 colonne per mobile. Le sezioni principali sono separate da spazi generosi (`lg` o `xl`) per enfatizzare il minimalismo.
- **Ritmo Verticale:** Basato su un modulo di 8px. Tutti i padding e i margini interni devono essere multipli di 8 per garantire allineamenti matematicamente perfetti.
- **Contenitori:** Utilizziamo margini laterali ampi su desktop per mantenere il contenuto centrale focalizzato, riducendo l'affaticamento visivo durante l'analisi dei dati di marketing.

## Elevation & Depth

La gerarchia in questo design system non è definita da ombre pesanti, ma da differenze di luminanza e trasparenza.

- **Tonal Layering:** I livelli più alti sono visivamente più chiari. La base è `#0A0A0A`, i pannelli sono `#121212`.
- **Glassmorphism:** Le schede e i menu a comparsa utilizzano un effetto `backdrop-filter: blur(12px)` combinato con un riempimento semi-trasparente (`rgba(255, 255, 255, 0.03)`).
- **Bordi Tecnici:** Ogni contenitore elevato possiede un bordo sottile (1px) con un gradiente lineare quasi impercettibile, che simula un riflesso di luce sui bordi di un pannello di vetro scuro.
- **Accento Glow:** Solo per gli elementi critici (come il bottone primario attivo), viene utilizzato un debole bagliore esterno (drop-shadow) del colore dell'accento per simulare un'emissione di luce neon.

## Shapes

Il linguaggio delle forme è controllato e architettonico.

- **Angoli:** Utilizziamo una rotondità minima (`0.25rem` o 4px) per bottoni e input, trasmettendo un senso di precisione industriale.
- **Contenitori Grandi:** Le schede principali possono salire a `0.5rem` (8px) per ammorbidire leggermente l'interfaccia nei punti di aggregazione dei dati.
- **Elementi Geometrici:** Utilizziamo linee rette e angoli netti per i divisori, evitando decorazioni organiche o forme circolari a meno che non siano icone funzionali.

## Components

Tutti i componenti devono riflettere la natura "high-tech" dell'applicazione.

- **Buttons:**
  - *Primario:* Sfondo Cyan (`#00F0FF`), testo nero per il massimo contrasto. Nessun arrotondamento eccessivo.
  - *Secondario:* Solo bordo Cyan (1px) con testo Cyan. Effetto hover con riempimento al 10% di opacità.
- **Input Fields:** Sfondo scuro (`#050505`), bordo grigio scuro che diventa Cyan all'attivazione (focus). Etichette sempre sopra l'input in `label-sm`.
- **Cards:** Sfondo `#121212`, bordo 1px `rgba(255,255,255,0.1)`. In hover, il bordo diventa leggermente più luminoso o assume il colore dell'accento.
- **Chips & Tags:** Piccoli elementi rettangolari con bordi minimi, utilizzati per indicare categorie o canali di marketing (es: "Social", "Email").
- **Grafici (CSS-based):** Utilizzare linee sottili e gradienti lineari che sfumano verso la trasparenza. Le linee dei dati devono avere l'effetto "neon" tramite `box-shadow` o `filter: drop-shadow`.
- **Lists:** Liste pulite senza divisori a tutta larghezza; utilizzare piccoli indicatori geometrici (quadrati di 4px) al posto dei bullet tradizionali.
