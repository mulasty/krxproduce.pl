# 🎬 KRX Produce

> Filmowanie &bull; Montaż &bull; Projektowanie Graficzne &bull; Identyfikacja Wizualna

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)](https://vercel.com)

🌐 **Strona internetowa**: [krxproduce.pl](https://krxproduce.pl)

---

## 📖 O projekcie

**KRX Produce** to nowoczesna, jednostronicowa strona portfolio (SPA) stworzona dla polskiej firmy specjalizującej się w **produkcji video**, **montażu**, **postprodukcji** oraz **projektowaniu graficznym**. Strona została zaprojektowana z myślą o maksymalnym efekcie wizualnym &mdash; łączy pełnoekranowe tło video, płynne animacje oraz elegancki, ciemny motyw (dark mode).

### ✨ Kluczowe cechy

- **Pełnoekranowe tło video** &mdash; imersyjna sekcja hero z zapętlonym wideo 4K
- **Animacje Framer Motion** &mdash; płynne przejścia, fade-in, parallax i mikrointerakcje
- **Bento-grid portfolio** &mdash; nowoczesny układ galerii z efektami hover i lazy-loadingiem obrazów
- **Osadzone video YouTube** &mdash; zintegrowany odtwarzacz z API (play/pause/mute)
- **Dark mode** &mdash; elegancki, filmowy wygląd dopasowany do branży kreatywnej
- **W pełni responsywny** &mdash; Mobile-first, zoptymalizowany pod wszystkie rozdzielczości
- **SEO-ready** &mdash; Open Graph, Twitter Cards, JSON-LD structured data, canonical URLs
- **PWA-ready** &mdash; manifest.webmanifest, ikony Apple/Android, favicony we wszystkich formatach
- **Wydajność** &mdash; Next.js Image optimization, font subsetting (Geist), statyczna generacja

### 🎯 Oferowane usługi

| Kategoria | Usługi |
|---|---|
| 🎥 **Produkcja video** | Filmowanie, montaż, postprodukcja, reklamy video |
| 🎨 **Grafika** | Logo, banery, ulotki, wizytówki, plakaty, materiały social media |
| 🏷️ **Branding** | Identyfikacja wizualna, księgi znaku, projektowanie marki |
| 🖨️ **DTP / druk** | Przygotowanie plików pod druk, skład, korekta kolorystyczna |

---

## 🛠️ Stack technologiczny

| Warstwa | Technologia | Wersja |
|---|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | 16.2 |
| **Język** | [TypeScript](https://www.typescriptlang.org/) | 5.x |
| **Biblioteka UI** | [React](https://react.dev/) | 19.2 |
| **Stylizacja** | [Tailwind CSS](https://tailwindcss.com/) | 4.x |
| **Animacje** | [Framer Motion](https://www.framer.com/motion/) | 11.x |
| **PostCSS** | [@tailwindcss/postcss](https://tailwindcss.com/docs/installation/using-postcss) | 4.x |
| **Czcionki** | [Geist](https://vercel.com/font) (Sans + Mono) | zmienne |
| **Linting** | [ESLint](https://eslint.org/) + [eslint-config-next](https://nextjs.org/docs/app/api-reference/config/eslint) | 9.x |
| **Hosting** | [Vercel](https://vercel.com/) | &mdash; |

---

## 📁 Struktura projektu

```
krxproduce.pl/
├── app/
│   ├── favicon.ico
│   ├── globals.css          # Tailwind v4 + dark mode variables
│   ├── layout.tsx           # Root layout — metadata, fonts, JSON-LD
│   └── page.tsx             # Home page (kompozycja komponentów)
├── components/
│   ├── about.tsx            # Sekcja "O mnie" + YouTube player
│   ├── footer.tsx           # Stopka z social mediami i copyright
│   ├── hero.tsx             # Sekcja hero z tłem video
│   └── portfolio.tsx        # Galeria portfolio (bento grid)
├── public/
│   ├── images/portfolio/    # Zdjęcia portfolio (12 plików)
│   ├── videos/              # Plik wideo 4K (tło hero)
│   ├── logo-krx.png         # Logo marki
│   └── og-image.png         # Open Graph / social share image
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── LICENSE
└── README.md
```

---

## ⚡ Szybki start

### Wymagania

- **Node.js** &ge; 18.17 (zalecane 20 LTS lub nowsze)
- **npm** &ge; 9 (lub yarn / pnpm)

### Instalacja

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/mulasty/krxproduce.pl.git
cd krxproduce.pl

# 2. Zainstaluj zależności
npm install

# 3. Uruchom serwer deweloperski
npm run dev
```

Aplikacja będzie dostępna pod adresem **[http://localhost:3000](http://localhost:3000)**.

Hot Module Replacement (HMR) działa automatycznie &mdash; zmiany w kodzie są widoczne natychmiast bez przeładowania strony.

### Dostępne skrypty

| Komenda | Opis |
|---|---|
| `npm run dev` | Uruchamia tryb deweloperski z HMR na `localhost:3000` |
| `npm run build` | Buduje wersję produkcyjną (optymalizacja, minifikacja, ISR/SSG) |
| `npm start` | Uruchamia zbudowaną wersję produkcyjną |
| `npm run lint` | Sprawdza kod pod kątem błędów ESLint |

---

## 🏗️ Build i deployment

### Build produkcyjny lokalnie

```bash
npm run build
npm start
```

Build produkcyjny Next.js automatycznie:
- Optymalizuje obrazy (WebP/AVIF, srcset)
- Minifikuje CSS i JS (Tree shaking)
- Generuje statyczne strony gdzie to możliwe
- Dzieli kod na chunki (code splitting)
- Prefetchuje linki w viewport

### Deployment na Vercel (rekomendowany)

1. Połącz repozytorium GitHub z kontem [Vercel](https://vercel.com/)
2. Vercel automatycznie wykryje projekt Next.js i skonfiguruje build
3. Każdy push na gałąź `main` / `master` automatycznie triggeruje deployment
4. Domenę `krxproduce.pl` należy skonfigurować w panelu Vercel (Settings &rarr; Domains)

**Pliki konfiguracyjne Vercel:**
- `next.config.ts` &mdash; konfiguracja Next.js (w razie potrzeby dodaj `output: 'standalone'` dla Docker)
- Framework preset: **Next.js** (wykrywany automatycznie)
- Build command: `next build`
- Output directory: `.next`

### Deployment alternatywny (Docker / VPS)

```dockerfile
# Przykładowy Dockerfile dla Next.js standalone
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 🔗 Social media

| Platforma | Link |
|---|---|
| 🌐 **Strona** | [krxproduce.pl](https://krxproduce.pl) |
| 📘 **Facebook** | [facebook.com/KRXPRODUCE](https://www.facebook.com/KRXPRODUCE) |
| 📸 **Instagram** | [instagram.com/krxproduce](https://www.instagram.com/krxproduce/) |
| ▶️ **YouTube** | [youtube.com/@merol1](https://www.youtube.com/@merol1) |

---

## 📄 Licencja

Projekt udostępniony na licencji **MIT** &mdash; pełna treść znajduje się w pliku [LICENSE](./LICENSE).

Copyright &copy; 2026 **KRX Produce**. Wszelkie prawa zastrzeżone.

> ⚠️ **Uwaga**: Kod źródłowy strony objęty jest licencją MIT. Prawa autorskie do grafik, zdjęć, video i treści zamieszczonych w katalogu `public/` należą wyłącznie do **KRX Produce** i nie podlegają tej licencji.

---

## 👤 Autorzy

- **Strona internetowa**: [**MulaGroup**](https://mulagroupwww.vercel.app/) &mdash; projekt, development i wdrożenie
- **Projekty graficzne i video**: **KRX Produce** &mdash; wszystkie materiały wizualne, zdjęcia portfolio oraz video

---

<p align="center">
  <sub>Zbudowano z ❤️ przy użyciu Next.js &bull; Hostowane na Vercel</sub>
</p>
