# Mocked Monkey — sito web (bozza)

Sito statico multi-pagina (HTML/CSS/JS puro, nessuna build necessaria), pensato per GitHub Pages.

## Struttura

```
index.html      Home
marasma.html     Album Marasma
about.html       Bio / storia del progetto
live.html        Foto e video
epk.html         EPK web
press.html       Recensioni
contact.html     Contatti
css/style.css    Stile
js/main.js       Menu mobile + waveform decorativa
sitemap.xml      Per Google Search Console
robots.txt       Permette l'indicizzazione
```

## Cosa devi fare prima di pubblicare

1. **Immagini** — al posto dei riquadri tratteggiati "img-slot" (placeholder), inserisci le tue foto reali in `assets/images/` con questi nomi/percorsi (o cambia i percorsi negli HTML):
   - `assets/images/marasma-cover.jpg` (copertina disco)
   - `assets/images/portrait.jpg` (foto ritratto, pagina About)
   - `assets/images/gallery/01.jpg` ... `06.jpg` (foto live/busking)
   - `assets/images/press/press-01.jpg` ... `03.jpg` (foto stampa alta risoluzione)
   - `assets/images/share.jpg` (immagine di anteprima per condivisioni social, 1200×630px consigliata)

   Poi, in ogni file HTML, sostituisci il blocco `<div class="img-slot">...</div>` con un normale `<img src="..." alt="...">`.

2. **EPK in PDF** — carica il tuo PDF esistente in `assets/docs/mocked-monkey-epk.pdf` (il link nella pagina EPK punta già lì).

3. **Form contatti** — GitHub Pages non gestisce form lato server. La pagina `contact.html` è pronta per [Formspree](https://formspree.io) (gratis fino a 50 messaggi/mese): crea un account, crea un form, e sostituisci `YOUR_FORM_ID` nell'attributo `action` con il tuo ID.

4. **Dominio personalizzato** — se vuoi mantenere `mockedmonkey.com` su GitHub Pages, aggiungi un file `CNAME` con dentro solo `mockedmonkey.com`, e configura i DNS del dominio (record A verso gli IP di GitHub Pages o CNAME verso `<tuo-utente>.github.io`).

## Come pubblicare su GitHub Pages

```bash
git init
git add .
git commit -m "Sito Mocked Monkey"
git branch -M main
git remote add origin https://github.com/<tuo-utente>/<repo>.git
git push -u origin main
```

Poi su GitHub: **Settings → Pages → Source: Deploy from branch → main / (root)**.

## Perché questa struttura aiuta la SEO rispetto a Carrd

- Ogni pagina ha un proprio `<title>` e `meta description` (Carrd ne aveva uno solo per tutto il sito)
- `sitemap.xml` + `robots.txt` per Google Search Console
- Dati strutturati `schema.org` (`MusicGroup` in home, `MusicAlbum` in marasma.html) — aiutano Google a capire chi sei e a mostrare rich result
- HTML semantico, heading gerarchici, `alt` sulle immagini (da aggiungere quando carichi le foto reali)
- URL puliti e distinti per ogni sezione (es. `/marasma.html`, `/press.html`), invece di ancore su una singola pagina
