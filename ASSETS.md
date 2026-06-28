# Lista assetów do obsadzenia — KRX Produce

Poniższe pliki należy przygotować i umieścić w odpowiednich katalogach, aby zastąpić obecne placeholdery / gradienty CSS i dodać finalną warstwę premium.

## 1. Logo & Branding
| Plik | Lokalizacja | Format | Uwagi |
|---|---|---|---|
| Logo główne | `public/images/logo.svg` | SVG (wektor) | Wersja pozioma, monochromatyczna (do użycia na ciemnym tle) |
| Logo symbolem | `public/images/logo-mark.svg` | SVG | Sam znak graficzny bez nazwy (np. ikona/typogram KRX) |
| Favicon | `public/favicon.ico` / `public/favicon.svg` | ICO / SVG | Multi-size favicon |

## 2. Wideo (Hero / Tła)
| Plik | Lokalizacja | Format | Uwagi |
|---|---|---|---|
| Hero background loop | `public/videos/hero-bg.mp4` | MP4 (H.264) | Krótki loop 5-10s, ciemny klimat, showreel filmowy/graficzny, niski bitrate dla webu |
| Showreel | `public/videos/showreel.mp4` | MP4 | Dłuższy reel (30-60s), można podpiąć pod przycisk "Zobacz portfolio" |

## 3. Portfolio — prawdziwe projekty
Zamień obecne gradientowe placeholdery w komponencie `Portfolio` na rzeczywiste miniaturki:

| # | Plik | Lokalizacja | Format | Uwagi |
|---|---|---|---|---|
| 1 | Restauracja branding | `public/images/portfolio/restauracja-branding.jpg` | JPG/WEBP | Mockup identyfikacji (menu, kubki, logo) |
| 2 | Banery social | `public/images/portfolio/social-banners.jpg` | JPG/WEBP | Screenshoty banerów FB/IG w mockupie |
| 3 | Montaż video | `public/images/portfolio/montaz-video.jpg` | JPG/WEBP | Kadr z filmu / timeline z edytora |
| 4 | Wizytówki premium | `public/images/portfolio/wizytowki.jpg` | JPG/WEBP | Fotografia fizycznych wizytówek |
| 5 | Logotyp startup | `public/images/portfolio/logo-tech.jpg` | JPG/WEBP | Prezentacja logo na makieta (laptop, telefon) |
| 6 | Plakat eventowy | `public/images/portfolio/plakat-event.jpg` | JPG/WEBP | Mockup plakatu w przestrzeni miejskiej |
| 7 | Ulotki / foldery | `public/images/portfolio/ulotki.jpg` | JPG/WEBP | Opcjonalnie — dodatkowa pozycja |
| 8 | Animacja motion | `public/images/portfolio/motion.gif` | GIF/WEBP | Klatka z animacji lub krótki loop |

## 4. Zdjęcia / Osobowe
| Plik | Lokalizacja | Format | Uwagi |
|---|---|---|---|
| Zdjęcie profilowe / about | `public/images/about-portrait.jpg` | JPG/WEBP | Profesjonalne zdjęcie do sekcji "O mnie" (opcjonalne, można dodać zamiast statystyk) |

## 5. Modele 3D (opcjonalne — jeśli chcesz mieć customowy obiekt zamiast domyślnych kształtów w Hero)
| Plik | Lokalizacja | Format | Uwagi |
|---|---|---|---|
| Logo 3D | `public/models/krx-logo.glb` | GLB/GLTF | Model 3D logo lub abstrakcyjny obiekt brandowy do wyświetlenia w scenie Three.js |
| Obiekt dekoracyjny | `public/models/deco-abstract.glb` | GLB/GLTF | Drugi obiekt do floatowania w tle Hero |

## Jak podmienić?
1. Umieść pliki w powyższych ścieżkach.
2. W kodzie (np. `components/portfolio.tsx`) zamień atrybuty gradientowe na komponent `<Image src="/images/portfolio/..." ... />`.
3. Jeśli chcesz użyć wideo w Hero, w `components/hero.tsx` dodaj `<video autoPlay muted loop playsInline>` jako tło, a `<Scene />` można opcjonalnie wyłączyć lub nałożyć jako overlay (low opacity).
4. W przypadku modeli 3D — w `components/scene.tsx` zamień `<torusKnotGeometry>` / `<icosahedronGeometry>` na `<Model url="/models/krx-logo.glb" />` używając `useGLTF` z `@react-three/drei`.

---
*Gotowe assetów = finalny, produkcyjny poziom strony.*
