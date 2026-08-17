# Zahnarztpraxis am Rosental — Website

Statische Website der Zahnarztpraxis am Rosental, Leipzig.
Basis ist der offizielle Webflow-Code-Export; extern gehostete Abhängigkeiten wurden lokalisiert.

## Seiten

| Datei                      | Route                  |
| -------------------------- | ---------------------- |
| `index.html`               | `/`                    |
| `intraoralscanner.html`    | `/intraoralscanner`    |
| `impressum.html`           | `/impressum`           |
| `datenschutzerklarung.html`| `/datenschutzerklarung`|
| `404.html`                 | Fehlerseite            |

`cleanUrls` in `vercel.json` liefert die Routen ohne `.html`-Endung aus.

## Struktur

```
css/      normalize.css, webflow.css, projektspezifisches Webflow-CSS
js/       webflow.js (Interaktionen) + vendor/ (GSAP, ScrollTrigger, split-type, jQuery)
fonts/    Junicode, Montserrat — lokal per @font-face, kein Google-Fonts-Request
images/   Bilder, Icons, Favicon
documents/navbar.json, Arrow-Animate.json (Lottie)
```

## Lokal ansehen

```bash
python3 -m http.server 4000
```

Dann http://localhost:4000 öffnen.

## Deployment

Push auf `main` deployt automatisch über Vercel. Pull Requests erzeugen Preview-Deployments.

## Externe Dienste

Eingebunden ist Google Analytics (`G-JLC9ESFDT4`) sowie das Consent-Tool CookieYes.
Google Maps ist als Zwei-Klick-Lösung eingebunden (`js/maps-consent.js`,
`css/maps-consent.css`): Ohne Zustimmung geht kein Request an Google. Erst ein
Klick auf "Karte laden" setzt das iframe ein; "Laden und merken" hinterlegt die
Entscheidung in localStorage (Schlüssel `zar:maps-consent`).

## Änderungen pflegen

Die Seite stammt aus Webflow. Bei einem erneuten Webflow-Export müssen die
Lokalisierungen (Vendor-Skripte, Webflow-CDN-Assets) erneut angewendet werden —
siehe Commit-Historie des ersten Aufräum-Commits.
