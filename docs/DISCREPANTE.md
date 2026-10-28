# Discrepanțe între cataloagele 1D și 2D (generat de `tools/compare-catalogs.mjs`)

Catalog 1D: 112 intrări · catalog 2D: 112 intrări · diferă acum 0 intrări.

**Stare (recenzia 3, 2026-10-28): toate cele 9 discrepanțe din tura 2 sunt rezolvate. Recenzia 4 (2026-10-28): 8 dintre cele 12 intrări cu abatere z ↔ lookback > 3 % sunt rezolvate cu surse (secțiunea 1b), 3 sunt verificate și neschimbate, 1 rămâne nerezolvată (secțiunea 4); un obiect confundat (Pandora) a fost corectat.** Regula: o discrepanță se rezolvă doar cu ≥ 2 surse independente sau cu o derivare corectă din redshift-ul măsurat, cu formula și parametrii scriși mai jos. Sursele sunt pagini citite în sesiune (Wikipedia, ESA/Hubble, arXiv, Chandra); NED/SIMBAD nu au fost consultate direct (Wikipedia le citează pentru Andromeda).

## Convenția aplicațiilor

ΛCDM plat, Planck 2018: H0 = 67,4 km/s/Mpc, Ωm = 0,315, ΩΛ = 0,685 (constantele COSMO din 1D și 2D); d = lb = lookback(z) în Mly. Valorile din surse depind de modelul folosit de autori (H0 = 69–71, Ωm = 0,27–0,3), deci se compară aici în aceeași convenție (lookback / comobilă / luminozitate), nu brut. Formula: lookback(z) = (977 792 / H0) · ∫₀ᶻ dz' / [(1+z')·√(Ωm(1+z')³ + ΩΛ)] Mani; comobilă D_C = (c / H0) · ∫₀ᶻ dz' / √(Ωm(1+z')³ + ΩΛ); D_L = (1+z)·D_C. Integrare Simpson, 2000 pași.

## 1. Distanțe: rezolvate (d = lb, în Mly / Mani)

| Obiect | z | 1D | 2D (vechi) | 2D acum | lookback(z), H0=67,4 | comobilă | D_L | 2D vechi / lookback |
|---|---|---|---|---|---|---|---|---|
| NGC 1132 (Relicvă Fosil) | 0.0232 | 330 | 1,020 | 330 | 331 | 335 | 342 | 3.08× |
| IC 310 (Perseus) | 0.0189 | 270 | 780 | 270 | 270 | 273 | 278 | 2.88× |
| 3C 48 | 0.367 | 4,150 | 5,200 | 4,150 | 4,149 | 4,845 | 6,623 | 1.25× |
| Abell 370 (Arc gravitational) | 0.375 | 4,200 | 5,900 | 4,200 | 4,218 | 4,940 | 6,792 | 1.40× |
| CL 0024+1654 | 0.395 | 4,400 | 5,500 | 4,400 | 4,388 | 5,175 | 7,219 | 1.25× |
| SDSS J1004+4112 (Cvintuplu quasar) | 1.734 | 10,050 | 7,000 | 10,050 | 10,049 | 15,969 | 43,659 | 0.70× |
| IC 4296 | 0.0124 | 180 | 130 | 180 | 178 | 179 | 182 | 0.73× |
| Abell 1689 (Lentilă) | 0.183 | 2,330 | 7,200 | 2,330 | 2,333 | 2,537 | 3,001 | 3.09× |

1D și 2D au acum aceeași valoare (330 · 270 · 4,150 · 4,200 · 4,400 · 10,050 · 180 · 2,330). Valoarea păstrată este cea din 1D, care coincide (±1 %) cu lookback(z) în convenția aplicațiilor; valorile vechi din 2D nu coincid cu lookback, comobila sau distanța de luminozitate la z-ul măsurat.

### NGC 1132 (Relicvă Fosil)

- **Rezolvare:** d = lb = 330 Mly (z = 0.0232); lookback(z) = 331 Mly; 2D avea 1,020.
- **Surse pentru z:**
  - Wikipedia, NGC 1132 (infobox: 0,023189): https://en.wikipedia.org/wiki/NGC_1132
  - arXiv:1106.5804 (z = 0,023, după Collobert et al. 2006): https://ar5iv.arxiv.org/html/1106.5804
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - ESA/Hubble heic0804: „300 million light years”: https://esahubble.org/images/heic0804a/
  - Wikipedia (citând Phys.org, Nowakowski 2017): „about 318 million light-years”: https://en.wikipedia.org/wiki/NGC_1132
  - arXiv:1106.5804: distanță de luminozitate 99,5 Mpc (≈ 324 Mly; H0 = 71, Ωm = 0,27): https://ar5iv.arxiv.org/html/1106.5804
- **Note:** Sursele dau 300–324 Mly (H0 ≈ 70–71); 330 Mly vine din H0 = 67,4 (diferența de ~4 % este modelul cosmologic). Nicio sursă nu susține 1 020 Mly. Infobox-ul Wikipedia mai conține și „263,9 Mly”, fără sursă; ignorat.

### IC 310 (Perseus) (fost „Perseus (BCG IC 310)”)

- **Rezolvare:** d = lb = 270 Mly (z = 0.0189); lookback(z) = 270 Mly; 2D avea 780.
- **Surse pentru z:**
  - arXiv:1009.2155, MAGIC (z = 0,019): https://arxiv.org/pdf/1009.2155
  - Wikipedia, IC 310 (z = 0,018849; „265 million light-years”): https://en.wikipedia.org/wiki/IC_310
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, IC 310: 265 Mly (81,2 Mpc), în acord cu lookback 260–263 Mly la H0 = 70: https://en.wikipedia.org/wiki/IC_310
- **Note:** IDENTIFICARE: IC 310 NU este BCG-ul roiului Perseus. arXiv:1009.2155: „located in the Perseus cluster at 0.6° (corresponding to ~1 Mpc) from the cluster’s central galaxy, NGC 1275”; Wikipedia: „IC 310 belongs to the NGC 1275 group, which is part of the Perseus Cluster”. NGC 1275 are intrare separată („NGC 1275 (Perseus A)”, z = 0,0176). Coordonatele (49,2; 41,3) și z = 0,0189 sunt cele ale lui IC 310, deci s-a corectat doar eticheta: „Perseus (BCG IC 310)” → „IC 310 (Perseus)” (în 1D, 2D și hub, inclusiv cheile din dicționarele de traducere).

### 3C 48

- **Rezolvare:** d = lb = 4,150 Mly (z = 0.367); lookback(z) = 4,149 Mly; 2D avea 5,200.
- **Surse pentru z:**
  - Wikipedia, 3C 48 (z = 0,367; Greenstein & Matthews 1963, Nature 197, 1041): https://en.wikipedia.org/wiki/3C_48
  - Kellermann, prezentare 50 de ani de quasari (scrisoarea Bolton 1960: „the redshift is 0.367”): https://crasr.aut.ac.nz/__data/assets/pdf_file/0017/32615/Ken-Kellermann-NZ_quasars_50_KIK.pdf
  - perseus.gr (z = 0,367): https://www.perseus.gr/Astro-DSO-QSO-3C48.htm
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, 3C 48: 3,9 Gly „light travel time”, 4,5 Gly „present” (cosmologie nespecificată): https://en.wikipedia.org/wiki/3C_48
  - perseus.gr: „3.95 billion light-years”: https://www.perseus.gr/Astro-DSO-QSO-3C48.htm
- **Note:** Lookback la H0 = 70, Ωm = 0,3: 4 009 Mly (surse: 3 900–3 950, ~2–3 % diferență de model). 5 200 Mly nu corespunde niciunei convenții la z = 0,367.

### Abell 370 (Arc gravitational)

- **Rezolvare:** d = lb = 4,200 Mly (z = 0.375); lookback(z) = 4,218 Mly; 2D avea 5,900.
- **Surse pentru z:**
  - arXiv:1611.01513, MUSE (z = 0,375): https://ar5iv.arxiv.org/html/1611.01513
  - arXiv:0910.5553, HST (z = 0,375): https://arxiv.org/pdf/0910.5553
  - Wikipedia, Abell 370 (z = 0,375): https://en.wikipedia.org/wiki/Abell_370
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, Abell 370: 1,464 Gpc (4,775 Gly), h = 0,705 (tipul distanței nespecificat; coincide cu comobila la H0 = 70,5, Ωm = 0,27: 4 780 Mly): https://en.wikipedia.org/wiki/Abell_370
- **Note:** Verificare de coerență a lui z: comobilă la H0 = 70,5, Ωm = 0,27 = 4 780 Mly vs 4 775 Mly în Wikipedia. 5 900 Mly nu este nici lookback (4 218), nici comobilă (4 940), nici distanță de luminozitate (6 793) la parametrii aplicației.

### CL 0024+1654

- **Rezolvare:** d = lb = 4,400 Mly (z = 0.395); lookback(z) = 4,388 Mly; 2D avea 5,500.
- **Surse pentru z:**
  - arXiv:1605.01058 („z = 0.395”): https://arxiv.org/pdf/1605.01058
  - ESA/Hubble heic0709 și Wikipedia (z = 0,39): https://esahubble.org/images/heic0709b/ · https://en.wikipedia.org/wiki/CL0024%2B17
  - arXiv:astro-ph/0112409 (z = 0,39): https://ar5iv.arxiv.org/html/astro-ph/0112409
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, CL0024+17: „about 4 billion light years distant” (fără metodă): https://en.wikipedia.org/wiki/CL0024%2B17
- **Note:** z = 0,39–0,395 în surse (rotunjire); lookback 4 346 Mly (z = 0,39) – 4 388 Mly (z = 0,395); s-a păstrat 4 400 din 1D. Sursa de distanță („~4 Gly”) este vagă, deci rezolvarea se sprijină pe z. 5 500 Mly nu este susținut.

### SDSS J1004+4112 (Cvintuplu quasar)

- **Rezolvare:** d = lb = 10,050 Mly (z = 1.734); lookback(z) = 10,049 Mly; 2D avea 7,000.
- **Surse pentru z:**
  - Inada et al. 2003, Nature 426, 810, arXiv:astro-ph/0312427 (quasar z = 1,734 ± 0,002; roi la z ≈ 0,68): https://arxiv.org/pdf/astro-ph/0312427
  - Ota et al. 2006, Chandra, arXiv:astro-ph/0601700 („z = 1.734 quasar … cluster … at z = 0.68”): https://arxiv.org/pdf/astro-ph/0601700
- **Note:** Nicio sursă citabilă de distanță găsită; rezolvarea este derivarea din z măsurat (2 surse independente pentru z). Lookback la z = 1,734 = 10 049 Mly (H0 = 67,4); 7 000 Mly ar corespunde lui z ≈ 0,78, incompatibil cu z-ul măsurat. Comobilă: 15 969 Mly (nu e convenția aplicațiilor).

### IC 4296

- **Rezolvare:** d = lb = 180 Mly (z = 0.0124); lookback(z) = 178 Mly; 2D avea 130.
- **Surse pentru z:**
  - arXiv:2106.05340 (z heliocentric = 0,01247 ± 0,00003, Smith et al. 2000): https://arxiv.org/pdf/2106.05340
  - arXiv:astro-ph/9906023 (viteză heliocentrică 3 785 ± 19 km/s ⇒ z = 0,0126): https://arxiv.org/pdf/astro-ph/9906023
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - arXiv:2106.05340: distanțe SBF 49,4 Mpc (Lauer 1998) și 49 Mpc (Mei 2000) ≈ 160 Mly: https://arxiv.org/pdf/2106.05340
  - Chandra Early-Type Galaxy Atlas: 50,8 Mpc ≈ 166 Mly: https://cxc.cfa.harvard.edu/GalaxyAtlas/NGA/v1/nga_target_I4296_90101.html
- **Note:** ATENȚIE: distanța din z (178–180 Mly) este cu ~8–10 % mai mare decât distanțele SBF independente (160–166 Mly): articolul avertizează că „the redshift distance may differ significantly from the actual distance” (viteză proprie). Aplicațiile folosesc convenția z → lookback, deci 180 e coerent cu ele; 130 Mly (≈ 40 Mpc) nu e susținut de nicio sursă. z-ul din catalog (0,0124) este rotunjit în jos față de 0,01247 (diferență < 1 Mly, neschimbat).

### Abell 1689 (Lentilă)

- **Rezolvare:** d = lb = 2,330 Mly (z = 0.183); lookback(z) = 2,333 Mly; 2D avea 7,200.
- **Surse pentru z:**
  - Wikipedia, Abell 1689 (z = 0,1832): https://en.wikipedia.org/wiki/Abell_1689
  - ESA/Hubble opo0301 („z=0.183”): https://esahubble.org/images/opo0301a/
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - ESA/Hubble: „2.2 billion light-years” (lookback 2 243 Mly la H0 = 70,5): https://esahubble.org/images/opo0301a/
  - Wikipedia: 754 Mpc (2 459 Mly), „over 2.3 billion light-years” (comobilă la H0 = 70,5, Ωm = 0,27: 2 440 Mly): https://en.wikipedia.org/wiki/Abell_1689
- **Note:** 7 200 Mly nu este susținut de nicio sursă (3× mai mare).

## 1b. Recenzia 4 (2026-10-28): abateri z ↔ lookback > 3 % rezolvate cu surse (d = lb, în Mly)

În recenzia 3 auditul z ↔ lookback a listat intrările de mai jos ca NEverificate. Acum fiecare are ≥ 2 surse citite în sesiune (WebSearch, apoi WebFetch pe URL-urile returnate) și valoarea nouă este lookback(z) în convenția aplicațiilor, rotunjit la 10 Mly; 1D, 2D și hub au aceleași valori.

| Obiect | z | înainte (1D = 2D) | acum (1D = 2D = hub) | lookback(z), H0=67,4 | înainte / lookback |
|---|---|---|---|---|---|
| 3C 273 (Quasar) | 0.158 | 2,440 | 2,050 / 2,050 | 2,049 | 1.19× |
| Mrk 421 | 0.03 | 397 | 430 / 430 | 426 | 0.93× |
| 3C 279 | 0.536 | 5,800 | 5,470 / 5,470 | 5,467 | 1.06× |
| PKS 2155-304 | 0.116 | 1,400 | 1,550 / 1,550 | 1,549 | 0.90× |
| TON 618 | 2.219 | 10,400 | 10,840 / 10,840 | 10,844 | 0.96× |
| MACS J0025 (Glonț) | 0.586 | 5,200 | 5,810 / 5,810 | 5,806 | 0.90× |
| Abell 2744 (Pandora) (fost „RXCJ0232 (Pandora)”) | 0.308 | 4,700 | 3,620 / 3,620 | 3,615 | 1.30× |
| NGC 1277 (BH gigant) | 0.0169 | 220 | 240 / 240 | 242 | 0.91× |

### 3C 273 (Quasar)

- **Rezolvare:** d = lb = 2,050 Mly (z = 0.158); lookback(z) = 2,049 Mly; înainte (1D = 2D) 2,440.
- **Surse pentru z:**
  - Wikipedia, 3C 273 (z = 0,158339 ± 0,000067; textul: 0,158, Schmidt 1963): https://en.wikipedia.org/wiki/3C_273
  - Astronomy.com, „101 Must-See Cosmic Objects: Quasar 3C 273” („a redshift of 0.158”): https://www.astronomy.com/observing/101-must-see-cosmic-objects-quasar-3c-273/
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, 3C 273: distanță de luminozitate 2,443 Gly (749 Mpc, Uchiyama et al. 2006); distanță unghiulară 1,80 Gly (552 Mpc, Wang et al. 2020): https://en.wikipedia.org/wiki/3C_273
  - Astronomy.com: „a distance of 2.443 billion light-years”: https://www.astronomy.com/observing/101-must-see-cosmic-objects-quasar-3c-273/
- **Note:** Vechiul 2 440 Mly este distanța de LUMINOZITATE citată în literatură (2,443 Gly), nu lookback; convenția aplicațiilor este d = lb = lookback(z) (ca la Abell 1689, 3C 48 etc.). lookback(0,158) = 2 049 Mly (z = 0,158339: 2 053). Comobilă 2 205 Mly, D_L la parametrii aplicației 2 553 Mly (altă convenție decât cea din surse, H0 ≈ 70+).

### Mrk 421

- **Rezolvare:** d = lb = 430 Mly (z = 0.03); lookback(z) = 426 Mly; înainte (1D = 2D) 397.
- **Surse pentru z:**
  - arXiv:1003.1674, tabelul 1 (z[real] = 0,030): https://arxiv.org/pdf/1003.1674
  - arXiv:2009.02263 (z = 0,0308, Ulrich et al. 1975): https://arxiv.org/pdf/2009.02263
  - arXiv:2507.18445 („z = 0.031 or a distance of 122 Mpc”): https://arxiv.org/pdf/2507.18445
  - arXiv:1310.4973 („BL Lacertae object at z = 0.031”): https://arxiv.org/pdf/1310.4973
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, Markarian 421: infobox z = 0,030021; text z = 0,0308 și 397 Mly (122 Mpc) citând NED; „434 million light-years (133 Mpc)” citând NED „Distance Results”: https://en.wikipedia.org/wiki/Markarian_421
- **Note:** z în surse: 0,0300–0,0308 (rotunjit 0,031); catalogul păstrează 0,030. lookback: 426 Mly (z = 0,030) – 437 Mly (z = 0,0308) – 440 Mly (z = 0,031); adoptat 430 (+0,9 % față de 0,030; −1,6 % față de 0,0308). 397 Mly = 122 Mpc corespunde lui cz/H0 cu H0 ≈ 76 (0,0308·c/122 Mpc = 75,7; derivare proprie), nu convenției Planck 2018; distanța NED corectată cosmologic este 434 Mly (133 Mpc), în acord cu 430.

### 3C 279

- **Rezolvare:** d = lb = 5,470 Mly (z = 0.536); lookback(z) = 5,467 Mly; înainte (1D = 2D) 5,800.
- **Surse pentru z:**
  - arXiv:2001.06512 (z = 0,5362 „now commonly accepted”, Marziani et al. 1996): https://arxiv.org/pdf/2001.06512
  - Wikipedia, 3C 279 (z = 0,5362 ± 0,0004): https://en.wikipedia.org/wiki/3C_279
  - arXiv:1003.1674, tabelul 1 (z[real] = 0,536): https://arxiv.org/pdf/1003.1674
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, 3C 279: „5.0 Gly” (tipul distanței nespecificat, fără citare în infobox; NU se folosește): https://en.wikipedia.org/wiki/3C_279
- **Note:** lookback(0,536) = 5 467 Mly; lookback(0,5362) = 5 469 Mly; adoptat 5 470. 5 800 Mly nu e susținut de nicio sursă citită (nici lookback, nici cele 5,0 Gly din Wikipedia; comobila este 6 755 Mly).

### PKS 2155-304

- **Rezolvare:** d = lb = 1,550 Mly (z = 0.116); lookback(z) = 1,549 Mly; înainte (1D = 2D) 1,400.
- **Surse pentru z:**
  - arXiv:1612.05111 (z = 0,116, Ganguly et al. 2013): https://arxiv.org/pdf/1612.05111
  - arXiv:2009.02263 (z = 0,116 ± 0,002 din spectroscopia galaxiilor din câmp, Falomo et al. 1993): https://arxiv.org/pdf/2009.02263
  - arXiv:1003.1674, tabelul 1 (z[real] = 0,116): https://arxiv.org/pdf/1003.1674
  - arXiv:astro-ph/0411582, H.E.S.S. (z = 0,117): https://arxiv.org/pdf/astro-ph/0411582
- **Note:** Nicio sursă citită nu dă o distanță fizică; rezolvarea este derivarea din z. lookback(0,116) = 1 549 Mly (z = 0,117: 1 561 Mly); adoptat 1 550. 1 400 Mly nu e susținut (corespunde lui z ≈ 0,104).

### TON 618

- **Rezolvare:** d = lb = 10,840 Mly (z = 2.219); lookback(z) = 10,844 Mly; înainte (1D = 2D) 10,400.
- **Surse pentru z:**
  - arXiv:astro-ph/0406559, Shemmer et al. 2004, tabelul 1 (z = 2,219 din NED; z sistemic din [O III] = 2,226): https://arxiv.org/pdf/astro-ph/0406559
  - arXiv:1903.08830, Ge et al. 2019, tabelul 2 (z_fit = 2,219, „adopted from NED”): https://arxiv.org/pdf/1903.08830
  - Wikipedia, TON 618 (z = 2,219): https://en.wikipedia.org/wiki/TON_618
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, TON 618: „light-travel distance” 3,31 Gpc (10,8 Gly); distanță comobilă 5,59 Gpc (18,2 Gly): https://en.wikipedia.org/wiki/TON_618
- **Note:** ATENȚIE: cele două articole arXiv iau z din NED (nu sunt măsurători independente între ele); z sistemic [O III] = 2,226 dă lookback 10 853 Mly (+0,1 %). lookback(2,219) = 10 844 Mly, în acord cu 10,8 Gly (light-travel) din Wikipedia; adoptat 10 840. 10 400 Mly nu e susținut.

### MACS J0025 (Glonț)

- **Rezolvare:** d = lb = 5,810 Mly (z = 0.586); lookback(z) = 5,806 Mly; înainte (1D = 2D) 5,200.
- **Surse pentru z:**
  - arXiv:0806.2320, Bradač et al. 2008 („two merging subclusters … at z = 0.586”; ΛCDM H0 = 70, Ωm = 0,3): https://arxiv.org/pdf/0806.2320
  - Wikipedia, MACS J0025.4-1222 (infobox z = 0,586): https://en.wikipedia.org/wiki/MACS_J0025.4-1222
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, MACS J0025.4-1222: „6.07 Gly / 1.725 Gpc” (tipul distanței nespecificat, necitat; NU se folosește): https://en.wikipedia.org/wiki/MACS_J0025.4-1222
- **Note:** lookback(0,586) = 5 806 Mly; adoptat 5 810. 5 200 Mly era cu 10,4 % sub lookback și nu e susținut de nicio sursă.

### Abell 2744 (Pandora) (fost „RXCJ0232 (Pandora)”)

- **Rezolvare:** d = lb = 3,620 Mly (z = 0.308); lookback(z) = 3,615 Mly; înainte (1D = 2D) 4,700.
- **Surse pentru z:**
  - Frontier Fields, Abell 2744 (z = 0,308; RA 00:14:21,2, Dec −30:23:50,1; „approximately 3.5 billion light-years”; „Pandora’s Cluster”): https://frontierfields.org/meet-the-frontier-fields/abell-2744/
  - ESO eso1120c, Pandora’s Cluster (z = 0,308; RA 0 14 20,51, Dec −30° 23′ 57,19″): https://www.eso.org/public/france/images/eso1120c
  - NASA/Chandra via astropix, „Pandora’s Cluster (Abell 2744)” (z = 0,308; 3,5 Gly; RA 0h14m20,5s, Dec −30°23′59,4″): https://www.astropix.org/image/chandra/485
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Frontier Fields și Chandra: ≈ 3,5 miliarde de ani-lumină (lookback(0,308) = 3 615 Mly, diferență ≈ 3 % de model): https://frontierfields.org/meet-the-frontier-fields/abell-2744/
  - arXiv:2103.09057, RXCJ0232.2-4420 (z = 0,2836; RA 02 32 16,8, Dec −44 20 51; nu menționează Pandora): https://arxiv.org/pdf/2103.09057
- **Note:** IDENTIFICARE: intrarea „RXCJ0232 (Pandora)” amesteca două obiecte. „Pandora’s Cluster” este Abell 2744 (3 surse: RA 3,59°, Dec −30,4°, z = 0,308), iar descrierea din catalog (coliziune multi-corp, „mai complexă decât Bullet Cluster”) este cea a lui Abell 2744. RXCJ0232.2-4420 este alt roi (z = 0,2836, Dec −44,35°). Valorile vechi (RA 38,0°; Dec −20,1°; z = 0,4) nu corespund niciunuia: RA seamănă cu RXCJ0232, Dec și z cu nimic. S-a corectat obiectul păstrând descrierea: nume → „Abell 2744 (Pandora)” (în 1D, 2D și hub, inclusiv cheile din dicționarele de traducere), RA/Dec = 3,59°/−30,4°, z = 0,308, d = lb = 3 620 Mly (lookback(0,308) = 3 615). Un eventual favorit salvat sub numele vechi nu se mai potrivește.

### NGC 1277 (BH gigant)

- **Rezolvare:** d = lb = 240 Mly (z = 0.0169); lookback(z) = 242 Mly; înainte (1D = 2D) 220.
- **Surse pentru z:**
  - Wikipedia, NGC 1277 (z = 0,016898; 5 066 km/s): https://en.wikipedia.org/wiki/NGC_1277
  - arXiv:1310.6367, Trujillo et al. (z = 0,0169; „corresponds to a galaxy distance of 73.3 Mpc”, H0 = 70, Ωm = 0,3): https://arxiv.org/pdf/1310.6367
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, NGC 1277: „73 Mpc (240 Mly)”, citând Trujillo et al. 2014: https://en.wikipedia.org/wiki/NGC_1277
  - arXiv:1310.6367: 73,3 Mpc ≈ 239 Mly: https://arxiv.org/pdf/1310.6367
- **Note:** z din catalog 0,017 → 0,0169 (ambele surse). lookback(0,0169) = 242 Mly; adoptat 240, identic cu cele două distanțe din literatură. 220 Mly nu e susținut de nicio sursă citită. Galaxia face parte din roiul Perseus (viteze proprii de ordinul sutelor de km/s), deci incertitudinea e de câteva procente.

## 2. Semnul redshift-ului: rezolvat

- **Andromeda (M31)**: M31 este spre albastru (se apropie de noi), deci z este **negativ**: z = v/c = −301 / 299 792 = −0,001004. Catalog acum: 1D z = -0.001, 2D z = -0.001 (2D avea +0,001). Ambele aplicații afișează acum z negativ (2D: „-0.0010 (blueshift)” și săgeata albastră; verificat în browser de `tests/blueshift.test.mjs` din depozitele 1D și 2D).
  - Wikipedia, Andromeda Galaxy: viteză radială heliocentrică −301 ± 1 km/s, z = −0,001004 („negative sign indicates blueshift”), citând NED: https://en.wikipedia.org/wiki/Andromeda_Galaxy
  - Sky & Telescope: M31 se apropie de noi cu ~300 km/s față de Soare: https://skyandtelescope.org/astronomy-resources/astronomy-questions-answers/is-it-true-that-the-andromeda-galaxy-is-blueshifted-and-moving-toward-us
  - van der Marel et al. 2012, arXiv:1205.6864: viteza radială față de Calea Lactee −109,3 ± 4,4 km/s (alt cadru de referință; nu se folosește pentru z): https://arxiv.org/abs/1205.6864v1

## 3. Diferențe rămase între 1D și 2D

Nicio diferență în câmpurile `ra, dec, d, t, z, lb` pentru cele 112 intrări comune.

## 4. Verificate cu surse, NEmodificate (sau nerezolvate), cu motiv

Acestea sunt intrările rămase cu abatere > 3 % față de lookback(z) propriu. Pentru obiecte apropiate din roiuri/grupuri, lookback(z) nu e o distanță fiabilă (viteze proprii de sute–mii de km/s), iar valoarea din catalog se sprijină pe distanțe din literatură.

### NGC 4874

- **Stare:** verificat, neschimbat (d = lb = 321 Mly; z = 0.0239; lookback(z) = 341 Mly).
- **Surse:**
  - Wikipedia, NGC 4874 (z = 0,023907; 7 167 km/s; „about 97 megaparsecs (316,000,000 light-years)”, NED): https://en.wikipedia.org/wiki/NGC_4874
  - arXiv:astro-ph/9508070, Colless & Dunn (NGC 4874: cz = 7 152 km/s; media celor 465 de membri ai roiului Coma: cz = 6 917 ± 47 km/s ⇒ z = 0,02307): https://arxiv.org/pdf/astro-ph/9508070
- **Note:** lookback(z propriu 0,0239) = 341 Mly (−5,8 %), dar NGC 4874 este cD într-un roi legat: z-ul ei diferă de media roiului cu ~235 km/s (mișcare proprie în roi), deci distanța fiabilă este cea a roiului: lookback(0,02307) = 329 Mly (321 este −2,4 %, sub pragul de 3 %), iar NED dă 316 Mly. Valoarea 321 e între cele două și rămâne.

### Stephan's Quintet

- **Stare:** verificat, neschimbat (d = lb = 280 Mly; z = 0.0215; lookback(z) = 307 Mly).
- **Surse:**
  - ESA/Hubble heic0007 („about 270 million light-years”; NGC 7320 prim-plan, 35 Mly; membrii ~6 000 km/s, NGC 7320 ~800 km/s): https://esahubble.org/news/heic0007/
  - NASA Webb, Stephan’s Quintet („290 million light-years (89 million parsecs)”; NGC 7320 la 40 Mly): https://science.nasa.gov/asset/webb/stephans-quintet-nircam-and-miri-composite-image/
  - arXiv:1712.07145 („a distance of 85 Mpc”, H0 = 75 ⇒ ≈ 277 Mly): https://arxiv.org/pdf/1712.07145
  - arXiv:astro-ph/0601084 (viteze HI 5 699–6 647 km/s; intrus la ~1 000 km/s): https://arxiv.org/pdf/astro-ph/0601084
- **Note:** Nu am găsit o distanță independentă (Cefeide/TRGB/SBF) pentru grup; toate distanțele din surse derivă din z cu H0 ≈ 70–75 (270–290 Mly), iar 280 e în acest interval. lookback(0,0215) = 307 Mly (+9,6 %), dar vitezele membrilor (HI 5 699–6 647 km/s ⇒ z = 0,019–0,022 ⇒ lookback ≈ 272–316 Mly) și intrusul de ~1 000 km/s fac din lookback(z) o distanță nefiabilă pentru grup. Păstrat 280, neschimbat. NGC 7320 (prim-plan, 35–40 Mly) este deja menționat în descriere.

### NGC 1275 (Perseus A)

- **Stare:** NEREZOLVAT, neschimbat (d = lb = 236 Mly; z = 0.0176; lookback(z) = 252 Mly).
- **Surse:**
  - Wikipedia, NGC 1275 (z = 0,017670; 5 264 km/s; NED: 225,19 ± 10,29 Mly = 69,0 ± 3,2 Mpc): https://en.wikipedia.org/wiki/NGC_1275
- **Note:** NEREZOLVAT: o singură sursă citită (Wikipedia). lookback(0,01767) = 253 Mly, distanța NED din aceeași pagină este 225 Mly (corecție cosmologică), deci sursele diferă între ele cu ~12 %, iar 236 se află între ele (−6,7 % față de lookback). Fără o a doua sursă pentru z sau o distanță independentă, nu se modifică. Membru al roiului Perseus (viteze proprii mari).

### Arp 220

- **Stare:** verificat, neschimbat (d = lb = 250 Mly; z = 0.0181; lookback(z) = 259 Mly).
- **Surse:**
  - ESA/Hubble heic0810bf („about 250 million light-years away”): https://esahubble.org/images/heic0810bf/
  - Wikipedia, Arp 220 (z = 0,01840; 5 434 km/s; „250 million light years away”): https://en.wikipedia.org/wiki/Arp_220
- **Note:** Cele 250 Mly sunt susținute de două surse (modelul lor, H0 ≈ 70). lookback(0,0181) = 259 Mly (−3,5 %); lookback(0,0184, z din Wikipedia) = 263 Mly (−5,1 %). Diferența e de model/z rotunjit, nu o eroare; neschimbat. z-ul din catalog (0,0181) diferă de 0,0184 (o singură sursă), neschimbat.

## 5. Audit z ↔ lookback rămas (automat)

Intrări cu z > 0,01 al căror `lb` diferă cu > 3 % de lookback(z) calculat în convenția aplicațiilor (aceleași în 1D și 2D). Nu sunt surse: tabelul trebuie să conțină DOAR intrări explicate la secțiunea 4 (verificat de test). Intrările cu z ≤ 0,01 (Grupul Local, Virgo, Fornax etc.) sunt excluse din audit: acolo lookback(z) nu e o distanță, iar valorile `d` vin din metode independente (Cefeide, TRGB, SBF etc.); nu au fost reverificate în această tură.

| Obiect | z | lb în catalog | lookback(z) | diferență |
|---|---|---|---|---|
| NGC 4874 | 0.0239 | 321 | 341 | -5.8 % |
| NGC 1275 (Perseus A) | 0.0176 | 236 | 252 | -6.4 % |
| Arp 220 | 0.0181 | 250 | 259 | -3.5 % |
| Stephan's Quintet | 0.0215 | 280 | 307 | -8.8 % |

## 6. Alte observații

- Hub-ul conține o copie a catalogului 1D (câmpurile `n, ra, dec, d, t, z, lb`); `tests/versions.test.mjs` verifică că rămâne identică, iar `tests/catalog-consistency.test.mjs` verifică valorile corectate și coerența 1D ↔ 2D ↔ hub.
- 3D are catalog propriu (118 intrări, alte nume și unități), care nu a fost verificat în această tură: dacă conține obiecte corectate aici (3C 273, Mrk 421, 3C 279, PKS 2155-304, TON 618, MACS J0025, Pandora, NGC 1277), valorile lui trebuie aliniate într-o tură viitoare (depozitul 3D nu a fost deschis; nu se afirmă nimic despre conținutul lui). Andromeda apare și acolo (distanța 2,537 Mly, ca în 1D și 2D).
- Cataloagele 1D și 2D nu mai au valori în conflict, deci o unificare într-un fișier de date comun ar fi acum posibilă fără a alege între valori; NU s-a făcut în această tură (ar schimba structura a trei aplicații single-file fără pas de build comun).
