# Mocked Monkey — sito web

Sito statico multi-pagina (HTML/CSS/JS puro, nessuna build necessaria), ospitato su GitHub Pages.

## Struttura

```
index.html      Home
marasma.html     Album Marasma
about.html       Bio / storia del progetto
shows.html       Prossimi live (mostra "no shows" finché non aggiungi date)
video.html       Foto e video
epk.html         EPK web
press.html       Recensioni
contact.html     Contatti
css/style.css    Stile
js/main.js       Menu mobile + waveform decorativa + logica Shows
sitemap.xml      Per Google Search Console
robots.txt       Permette l'indicizzazione
assets/data/shows.json   Dati degli eventi (vedi sotto)
assets/images/           Foto del sito
```

## Come aggiornare il sito (eventi, foto, testi)

Non serve nessun pannello o account: **basta chiederlo a Claude in chat**. Manda un messaggio tipo:
- "Aggiungi un concerto il 15 ottobre al Locomotiv Club di Bologna, link biglietti: ..."
- "Carica questa foto come copertina di Marasma" (allegando l'immagine)
- "Cambia questo testo nella pagina About"

Serve solo un **token GitHub temporaneo** per pubblicare le modifiche (fine-grained, scope Contents: Read and write, solo su questo repo, scadenza 7 giorni). Te lo richiedo io quando serve, con le istruzioni passo passo. Dopo puoi revocarlo su GitHub → Settings → Developer settings → Personal access tokens.

### Formato di assets/data/shows.json (per riferimento)

```json
{
  "shows": [
    {
      "date": "2026-09-15",
      "displayDate": "15.09.26",
      "venue": "Locomotiv Club",
      "city": "Bologna, Italy",
      "link": "https://example.com/tickets",
      "linkLabel": "Tickets"
    }
  ]
}
```

Le date passate spariscono da sole dalla pagina Shows (ordinamento e filtro automatico via JS).

### Foto

Le immagini nel sito sono già collegate ai percorsi giusti in `assets/images/` (copertina Marasma, ritratto, gallery, foto stampa). Finché il file reale non è presente, il sito mostra automaticamente un riquadro placeholder al posto della foto rotta, così non si vede mai un'icona di errore.

## Canale fan (WhatsApp Broadcast)

Su ogni pagina c'è una fascia "Join the fan channel" con un bottone "Coming soon" disattivato. Quando il canale è pronto, basta chiedere a Claude di collegare il link: lo aggiorna su tutte le pagine in un colpo solo.

## Dominio personalizzato (mockedmonkey.com)

Il sito resta su GitHub Pages, risponde anche su mockedmonkey.com senza bisogno di lasciare GitHub:

1. Dal pannello DNS del tuo registrar, aggiungi:
   - 4 record **A** sull'apex (`@`) verso: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 record **CNAME** per `www` verso `sunboat89.github.io`
2. Su GitHub → Settings → Pages → Custom domain → conferma `mockedmonkey.com` → attendi la verifica DNS → attiva "Enforce HTTPS"

Nota: appena il file `CNAME` è presente nel repo, GitHub reindirizza automaticamente `sunboat89.github.io/mockedmonkey-site/` verso il tuo dominio, quindi da quel momento non potrai più testare l'URL github.io finché il DNS non è configurato. Aggiungilo solo quando sei pronto a completare anche il lato DNS.

## Form contatti

GitHub Pages non gestisce form lato server. La pagina `contact.html` è pronta per [Formspree](https://formspree.io) (gratis fino a 50 messaggi/mese): crea un account, crea un form, e sostituisci `YOUR_FORM_ID` nell'attributo `action` con il tuo ID.

## EPK in PDF

Carica il tuo PDF in `assets/docs/mocked-monkey-epk.pdf` (il link nella pagina EPK punta già lì).

## Come ripubblicare manualmente su GitHub Pages (se non passi da Claude)

```bash
git add .
git commit -m "Aggiornamento sito"
git push origin main
```

Impostazioni Pages: **Settings → Pages → Source: Deploy from branch → main / (root)**.

## Perché questa struttura aiuta la SEO rispetto a Carrd

- Ogni pagina ha un proprio `<title>` e `meta description` (Carrd ne aveva uno solo per tutto il sito)
- `sitemap.xml` + `robots.txt` per Google Search Console
- Dati strutturati `schema.org` (`MusicGroup` in home, `MusicAlbum` in marasma.html): aiutano Google a capire chi sei e a mostrare rich result
- HTML semantico, heading gerarchici, `alt` sulle immagini
- URL puliti e distinti per ogni sezione, invece di ancore su una singola pagina
