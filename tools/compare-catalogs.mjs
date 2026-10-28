// Compară cataloagele 1D și 2D (și copia din hub) și generează docs/DISCREPANTE.md.
// Din 2026-10-28 (recenzia 3) discrepanțele cunoscute sunt REZOLVATE în `RESOLVED` (cu surse citabile și derivare
// din z); fișierul generat mai listează diferențele rămase între 1D și 2D (ar trebui să fie zero) și un audit
// z ↔ lookback (ΛCDM plat Planck 2018, H0=67,4, Ωm=0,315) care NU este o sursă, doar o verificare de coerență.
// Rulare: node tools/compare-catalogs.mjs <dir-1D> <dir-2D> [--md docs/DISCREPANTE.md] [--check docs/DISCREPANTE.md]
import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
export function loadGalaxies(file) {
  const s = fs.readFileSync(file, 'utf8'), i = s.indexOf('const GALAXIES = [');
  if (i < 0) throw new Error('GALAXIES lipsește în ' + file);
  let d = 0, k = i + 17;
  for (; k < s.length; k++) { const c = s[k]; if (c === '[') d++; else if (c === ']') { d--; if (!d) break; } }
  return (0, eval)('(' + s.slice(i + 17, k + 1) + ')');
}
export function loadHub(file) {
  const s = fs.readFileSync(file, 'utf8'), i = s.indexOf('const XG=[['), e = s.indexOf('.map(r=>({n:r[0]', i);
  return (0, eval)(s.slice(i + 7, e)).map(r => ({n: r[0], ra: r[1], dec: r[2], d: r[3], t: r[4], z: r[5], lb: r[6]}));
}
// distanța de comoving (Mly), ΛCDM plat; integrare Simpson
export function comovingMly(z, H0 = 67.4, Om = 0.315) {
  if (z <= 0) return 0; const n = 2000, h = z / n, f = x => 1 / Math.sqrt(Om * (1 + x) ** 3 + (1 - Om));
  let s = f(0) + f(z); for (let i = 1; i < n; i++) s += f(i * h) * (i % 2 ? 4 : 2);
  const dcMpc = 299792.458 / H0 * s * h / 3; return dcMpc * 3.261563777;
}
// timpul de lookback (Mani), ΛCDM plat; Simpson
export function lookbackMyr(z, H0 = 67.4, Om = 0.315) {
  if (z <= 0) return 0; const n = 2000, h = z / n, f = x => 1 / ((1 + x) * Math.sqrt(Om * (1 + x) ** 3 + (1 - Om)));
  let s = f(0) + f(z); for (let i = 1; i < n; i++) s += f(i * h) * (i % 2 ? 4 : 2);
  return 977792 / H0 * s * h / 3;
}
export function diff(a, b) {
  const mb = new Map(b.map(g => [g.n, g])), out = [];
  for (const g of a) { const h = mb.get(g.n); if (!h) continue; const f = {};
    for (const k of ['ra', 'dec', 'd', 't', 'z', 'lb']) if (g[k] !== h[k]) f[k] = [g[k], h[k]];
    if (Object.keys(f).length) out.push({n: g.n, f, z: g.z}); }
  return out;
}
const fmt = x => new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(x);
const dec = (x, n = 5) => String(+x.toFixed(n));
// Convenția aplicațiilor: d = lb = timp de privire înapoi (Mani) = distanța parcursă de lumină (Mly), ΛCDM plat, Planck 2018.
export const CONVENTION = {H0: 67.4, Om: 0.315, note: 'ΛCDM plat, Planck 2018: H0 = 67,4 km/s/Mpc, Ωm = 0,315, ΩΛ = 0,685 (constantele COSMO din 1D și 2D); d = lb = lookback(z) în Mly'};
// Discrepanțele rezolvate. `name` = numele din catalog după recenzia 3; `adopted` = valoarea d = lb (Mly) păstrată (cea din 1D).
// `old2d` = valoarea veche din 2D. Sursele sunt URL-uri citite în sesiunea din 2026-10-28 (nu din memorie).
export const RESOLVED = [
  {name: 'NGC 1132 (Relicvă Fosil)', z: 0.0232, adopted: 330, old2d: 1020,
   zSrc: ['Wikipedia, NGC 1132 (infobox: 0,023189): https://en.wikipedia.org/wiki/NGC_1132', 'arXiv:1106.5804 (z = 0,023, după Collobert et al. 2006): https://ar5iv.arxiv.org/html/1106.5804'],
   litSrc: ['ESA/Hubble heic0804: „300 million light years”: https://esahubble.org/images/heic0804a/', 'Wikipedia (citând Phys.org, Nowakowski 2017): „about 318 million light-years”: https://en.wikipedia.org/wiki/NGC_1132', 'arXiv:1106.5804: distanță de luminozitate 99,5 Mpc (≈ 324 Mly; H0 = 71, Ωm = 0,27): https://ar5iv.arxiv.org/html/1106.5804'],
   note: 'Sursele dau 300–324 Mly (H0 ≈ 70–71); 330 Mly vine din H0 = 67,4 (diferența de ~4 % este modelul cosmologic). Nicio sursă nu susține 1 020 Mly. Infobox-ul Wikipedia mai conține și „263,9 Mly”, fără sursă; ignorat.'},
  {name: 'IC 310 (Perseus)', z: 0.0189, adopted: 270, old2d: 780, renamed: 'Perseus (BCG IC 310)',
   zSrc: ['arXiv:1009.2155, MAGIC (z = 0,019): https://arxiv.org/pdf/1009.2155', 'Wikipedia, IC 310 (z = 0,018849; „265 million light-years”): https://en.wikipedia.org/wiki/IC_310'],
   litSrc: ['Wikipedia, IC 310: 265 Mly (81,2 Mpc), în acord cu lookback 260–263 Mly la H0 = 70: https://en.wikipedia.org/wiki/IC_310'],
   note: 'IDENTIFICARE: IC 310 NU este BCG-ul roiului Perseus. arXiv:1009.2155: „located in the Perseus cluster at 0.6° (corresponding to ~1 Mpc) from the cluster’s central galaxy, NGC 1275”; Wikipedia: „IC 310 belongs to the NGC 1275 group, which is part of the Perseus Cluster”. NGC 1275 are intrare separată („NGC 1275 (Perseus A)”, z = 0,0176). Coordonatele (49,2; 41,3) și z = 0,0189 sunt cele ale lui IC 310, deci s-a corectat doar eticheta: „Perseus (BCG IC 310)” → „IC 310 (Perseus)” (în 1D, 2D și hub, inclusiv cheile din dicționarele de traducere).'},
  {name: '3C 48', z: 0.367, adopted: 4150, old2d: 5200,
   zSrc: ['Wikipedia, 3C 48 (z = 0,367; Greenstein & Matthews 1963, Nature 197, 1041): https://en.wikipedia.org/wiki/3C_48', 'Kellermann, prezentare 50 de ani de quasari (scrisoarea Bolton 1960: „the redshift is 0.367”): https://crasr.aut.ac.nz/__data/assets/pdf_file/0017/32615/Ken-Kellermann-NZ_quasars_50_KIK.pdf', 'perseus.gr (z = 0,367): https://www.perseus.gr/Astro-DSO-QSO-3C48.htm'],
   litSrc: ['Wikipedia, 3C 48: 3,9 Gly „light travel time”, 4,5 Gly „present” (cosmologie nespecificată): https://en.wikipedia.org/wiki/3C_48', 'perseus.gr: „3.95 billion light-years”: https://www.perseus.gr/Astro-DSO-QSO-3C48.htm'],
   note: 'Lookback la H0 = 70, Ωm = 0,3: 4 009 Mly (surse: 3 900–3 950, ~2–3 % diferență de model). 5 200 Mly nu corespunde niciunei convenții la z = 0,367.'},
  {name: 'Abell 370 (Arc gravitational)', z: 0.375, adopted: 4200, old2d: 5900,
   zSrc: ['arXiv:1611.01513, MUSE (z = 0,375): https://ar5iv.arxiv.org/html/1611.01513', 'arXiv:0910.5553, HST (z = 0,375): https://arxiv.org/pdf/0910.5553', 'Wikipedia, Abell 370 (z = 0,375): https://en.wikipedia.org/wiki/Abell_370'],
   litSrc: ['Wikipedia, Abell 370: 1,464 Gpc (4,775 Gly), h = 0,705 (tipul distanței nespecificat; coincide cu comobila la H0 = 70,5, Ωm = 0,27: 4 780 Mly): https://en.wikipedia.org/wiki/Abell_370'],
   note: 'Verificare de coerență a lui z: comobilă la H0 = 70,5, Ωm = 0,27 = 4 780 Mly vs 4 775 Mly în Wikipedia. 5 900 Mly nu este nici lookback (4 218), nici comobilă (4 940), nici distanță de luminozitate (6 793) la parametrii aplicației.'},
  {name: 'CL 0024+1654', z: 0.395, adopted: 4400, old2d: 5500,
   zSrc: ['arXiv:1605.01058 („z = 0.395”): https://arxiv.org/pdf/1605.01058', 'ESA/Hubble heic0709 și Wikipedia (z = 0,39): https://esahubble.org/images/heic0709b/ · https://en.wikipedia.org/wiki/CL0024%2B17', 'arXiv:astro-ph/0112409 (z = 0,39): https://ar5iv.arxiv.org/html/astro-ph/0112409'],
   litSrc: ['Wikipedia, CL0024+17: „about 4 billion light years distant” (fără metodă): https://en.wikipedia.org/wiki/CL0024%2B17'],
   note: 'z = 0,39–0,395 în surse (rotunjire); lookback 4 346 Mly (z = 0,39) – 4 388 Mly (z = 0,395); s-a păstrat 4 400 din 1D. Sursa de distanță („~4 Gly”) este vagă, deci rezolvarea se sprijină pe z. 5 500 Mly nu este susținut.'},
  {name: 'SDSS J1004+4112 (Cvintuplu quasar)', z: 1.734, adopted: 10050, old2d: 7000,
   zSrc: ['Inada et al. 2003, Nature 426, 810, arXiv:astro-ph/0312427 (quasar z = 1,734 ± 0,002; roi la z ≈ 0,68): https://arxiv.org/pdf/astro-ph/0312427', 'Ota et al. 2006, Chandra, arXiv:astro-ph/0601700 („z = 1.734 quasar … cluster … at z = 0.68”): https://arxiv.org/pdf/astro-ph/0601700'],
   litSrc: [],
   note: 'Nicio sursă citabilă de distanță găsită; rezolvarea este derivarea din z măsurat (2 surse independente pentru z). Lookback la z = 1,734 = 10 049 Mly (H0 = 67,4); 7 000 Mly ar corespunde lui z ≈ 0,78, incompatibil cu z-ul măsurat. Comobilă: 15 969 Mly (nu e convenția aplicațiilor).'},
  {name: 'IC 4296', z: 0.0124, adopted: 180, old2d: 130,
   zSrc: ['arXiv:2106.05340 (z heliocentric = 0,01247 ± 0,00003, Smith et al. 2000): https://arxiv.org/pdf/2106.05340', 'arXiv:astro-ph/9906023 (viteză heliocentrică 3 785 ± 19 km/s ⇒ z = 0,0126): https://arxiv.org/pdf/astro-ph/9906023'],
   litSrc: ['arXiv:2106.05340: distanțe SBF 49,4 Mpc (Lauer 1998) și 49 Mpc (Mei 2000) ≈ 160 Mly: https://arxiv.org/pdf/2106.05340', 'Chandra Early-Type Galaxy Atlas: 50,8 Mpc ≈ 166 Mly: https://cxc.cfa.harvard.edu/GalaxyAtlas/NGA/v1/nga_target_I4296_90101.html'],
   note: 'ATENȚIE: distanța din z (178–180 Mly) este cu ~8–10 % mai mare decât distanțele SBF independente (160–166 Mly): articolul avertizează că „the redshift distance may differ significantly from the actual distance” (viteză proprie). Aplicațiile folosesc convenția z → lookback, deci 180 e coerent cu ele; 130 Mly (≈ 40 Mpc) nu e susținut de nicio sursă. z-ul din catalog (0,0124) este rotunjit în jos față de 0,01247 (diferență < 1 Mly, neschimbat).'},
  {name: 'Abell 1689 (Lentilă)', z: 0.183, adopted: 2330, old2d: 7200,
   zSrc: ['Wikipedia, Abell 1689 (z = 0,1832): https://en.wikipedia.org/wiki/Abell_1689', 'ESA/Hubble opo0301 („z=0.183”): https://esahubble.org/images/opo0301a/'],
   litSrc: ['ESA/Hubble: „2.2 billion light-years” (lookback 2 243 Mly la H0 = 70,5): https://esahubble.org/images/opo0301a/', 'Wikipedia: 754 Mpc (2 459 Mly), „over 2.3 billion light-years” (comobilă la H0 = 70,5, Ωm = 0,27: 2 440 Mly): https://en.wikipedia.org/wiki/Abell_1689'],
   note: '7 200 Mly nu este susținut de nicio sursă (3× mai mare).'},
];
// ---- Recenzia 4 (2026-10-28): abateri z ↔ lookback > 3 % din auditul anterior. Surse = pagini citite în sesiune (WebSearch, apoi WebFetch pe URL-urile returnate). ----
// `old` = valoarea d = lb dinainte (identică în 1D și 2D). `adopted` = valoarea d = lb nouă (lookback(z) rotunjit la 10 Mly).
RESOLVED.push(
  {round: 4, name: '3C 273 (Quasar)', z: 0.158, adopted: 2050, old: 2440,
   zSrc: ['Wikipedia, 3C 273 (z = 0,158339 ± 0,000067; textul: 0,158, Schmidt 1963): https://en.wikipedia.org/wiki/3C_273', 'Astronomy.com, „101 Must-See Cosmic Objects: Quasar 3C 273” („a redshift of 0.158”): https://www.astronomy.com/observing/101-must-see-cosmic-objects-quasar-3c-273/'],
   litSrc: ['Wikipedia, 3C 273: distanță de luminozitate 2,443 Gly (749 Mpc, Uchiyama et al. 2006); distanță unghiulară 1,80 Gly (552 Mpc, Wang et al. 2020): https://en.wikipedia.org/wiki/3C_273', 'Astronomy.com: „a distance of 2.443 billion light-years”: https://www.astronomy.com/observing/101-must-see-cosmic-objects-quasar-3c-273/'],
   note: 'Vechiul 2 440 Mly este distanța de LUMINOZITATE citată în literatură (2,443 Gly), nu lookback; convenția aplicațiilor este d = lb = lookback(z) (ca la Abell 1689, 3C 48 etc.). lookback(0,158) = 2 049 Mly (z = 0,158339: 2 053). Comobilă 2 205 Mly, D_L la parametrii aplicației 2 553 Mly (altă convenție decât cea din surse, H0 ≈ 70+).'},
  {round: 4, name: 'Mrk 421', z: 0.03, adopted: 430, old: 397,
   zSrc: ['arXiv:1003.1674, tabelul 1 (z[real] = 0,030): https://arxiv.org/pdf/1003.1674', 'arXiv:2009.02263 (z = 0,0308, Ulrich et al. 1975): https://arxiv.org/pdf/2009.02263', 'arXiv:2507.18445 („z = 0.031 or a distance of 122 Mpc”): https://arxiv.org/pdf/2507.18445', 'arXiv:1310.4973 („BL Lacertae object at z = 0.031”): https://arxiv.org/pdf/1310.4973'],
   litSrc: ['Wikipedia, Markarian 421: infobox z = 0,030021; text z = 0,0308 și 397 Mly (122 Mpc) citând NED; „434 million light-years (133 Mpc)” citând NED „Distance Results”: https://en.wikipedia.org/wiki/Markarian_421'],
   note: 'z în surse: 0,0300–0,0308 (rotunjit 0,031); catalogul păstrează 0,030. lookback: 426 Mly (z = 0,030) – 437 Mly (z = 0,0308) – 440 Mly (z = 0,031); adoptat 430 (+0,9 % față de 0,030; −1,6 % față de 0,0308). 397 Mly = 122 Mpc corespunde lui cz/H0 cu H0 ≈ 76 (0,0308·c/122 Mpc = 75,7; derivare proprie), nu convenției Planck 2018; distanța NED corectată cosmologic este 434 Mly (133 Mpc), în acord cu 430.'},
  {round: 4, name: '3C 279', z: 0.536, adopted: 5470, old: 5800,
   zSrc: ['arXiv:2001.06512 (z = 0,5362 „now commonly accepted”, Marziani et al. 1996): https://arxiv.org/pdf/2001.06512', 'Wikipedia, 3C 279 (z = 0,5362 ± 0,0004): https://en.wikipedia.org/wiki/3C_279', 'arXiv:1003.1674, tabelul 1 (z[real] = 0,536): https://arxiv.org/pdf/1003.1674'],
   litSrc: ['Wikipedia, 3C 279: „5.0 Gly” (tipul distanței nespecificat, fără citare în infobox; NU se folosește): https://en.wikipedia.org/wiki/3C_279'],
   note: 'lookback(0,536) = 5 467 Mly; lookback(0,5362) = 5 469 Mly; adoptat 5 470. 5 800 Mly nu e susținut de nicio sursă citită (nici lookback, nici cele 5,0 Gly din Wikipedia; comobila este 6 755 Mly).'},
  {round: 4, name: 'PKS 2155-304', z: 0.116, adopted: 1550, old: 1400,
   zSrc: ['arXiv:1612.05111 (z = 0,116, Ganguly et al. 2013): https://arxiv.org/pdf/1612.05111', 'arXiv:2009.02263 (z = 0,116 ± 0,002 din spectroscopia galaxiilor din câmp, Falomo et al. 1993): https://arxiv.org/pdf/2009.02263', 'arXiv:1003.1674, tabelul 1 (z[real] = 0,116): https://arxiv.org/pdf/1003.1674', 'arXiv:astro-ph/0411582, H.E.S.S. (z = 0,117): https://arxiv.org/pdf/astro-ph/0411582'],
   litSrc: [],
   note: 'Nicio sursă citită nu dă o distanță fizică; rezolvarea este derivarea din z. lookback(0,116) = 1 549 Mly (z = 0,117: 1 561 Mly); adoptat 1 550. 1 400 Mly nu e susținut (corespunde lui z ≈ 0,104).'},
  {round: 4, name: 'TON 618', z: 2.219, adopted: 10840, old: 10400,
   zSrc: ['arXiv:astro-ph/0406559, Shemmer et al. 2004, tabelul 1 (z = 2,219 din NED; z sistemic din [O III] = 2,226): https://arxiv.org/pdf/astro-ph/0406559', 'arXiv:1903.08830, Ge et al. 2019, tabelul 2 (z_fit = 2,219, „adopted from NED”): https://arxiv.org/pdf/1903.08830', 'Wikipedia, TON 618 (z = 2,219): https://en.wikipedia.org/wiki/TON_618'],
   litSrc: ['Wikipedia, TON 618: „light-travel distance” 3,31 Gpc (10,8 Gly); distanță comobilă 5,59 Gpc (18,2 Gly): https://en.wikipedia.org/wiki/TON_618'],
   note: 'ATENȚIE: cele două articole arXiv iau z din NED (nu sunt măsurători independente între ele); z sistemic [O III] = 2,226 dă lookback 10 853 Mly (+0,1 %). lookback(2,219) = 10 844 Mly, în acord cu 10,8 Gly (light-travel) din Wikipedia; adoptat 10 840. 10 400 Mly nu e susținut.'},
  {round: 4, name: 'MACS J0025 (Glonț)', z: 0.586, adopted: 5810, old: 5200,
   zSrc: ['arXiv:0806.2320, Bradač et al. 2008 („two merging subclusters … at z = 0.586”; ΛCDM H0 = 70, Ωm = 0,3): https://arxiv.org/pdf/0806.2320', 'Wikipedia, MACS J0025.4-1222 (infobox z = 0,586): https://en.wikipedia.org/wiki/MACS_J0025.4-1222'],
   litSrc: ['Wikipedia, MACS J0025.4-1222: „6.07 Gly / 1.725 Gpc” (tipul distanței nespecificat, necitat; NU se folosește): https://en.wikipedia.org/wiki/MACS_J0025.4-1222'],
   note: 'lookback(0,586) = 5 806 Mly; adoptat 5 810. 5 200 Mly era cu 10,4 % sub lookback și nu e susținut de nicio sursă.'},
  {round: 4, name: 'Abell 2744 (Pandora)', z: 0.308, adopted: 3620, old: 4700, renamed: 'RXCJ0232 (Pandora)', coords: [3.59, -30.4],
   zSrc: ['Frontier Fields, Abell 2744 (z = 0,308; RA 00:14:21,2, Dec −30:23:50,1; „approximately 3.5 billion light-years”; „Pandora’s Cluster”): https://frontierfields.org/meet-the-frontier-fields/abell-2744/', 'ESO eso1120c, Pandora’s Cluster (z = 0,308; RA 0 14 20,51, Dec −30° 23′ 57,19″): https://www.eso.org/public/france/images/eso1120c', 'NASA/Chandra via astropix, „Pandora’s Cluster (Abell 2744)” (z = 0,308; 3,5 Gly; RA 0h14m20,5s, Dec −30°23′59,4″): https://www.astropix.org/image/chandra/485'],
   litSrc: ['Frontier Fields și Chandra: ≈ 3,5 miliarde de ani-lumină (lookback(0,308) = 3 615 Mly, diferență ≈ 3 % de model): https://frontierfields.org/meet-the-frontier-fields/abell-2744/', 'arXiv:2103.09057, RXCJ0232.2-4420 (z = 0,2836; RA 02 32 16,8, Dec −44 20 51; nu menționează Pandora): https://arxiv.org/pdf/2103.09057'],
   note: 'IDENTIFICARE: intrarea „RXCJ0232 (Pandora)” amesteca două obiecte. „Pandora’s Cluster” este Abell 2744 (3 surse: RA 3,59°, Dec −30,4°, z = 0,308), iar descrierea din catalog (coliziune multi-corp, „mai complexă decât Bullet Cluster”) este cea a lui Abell 2744. RXCJ0232.2-4420 este alt roi (z = 0,2836, Dec −44,35°). Valorile vechi (RA 38,0°; Dec −20,1°; z = 0,4) nu corespund niciunuia: RA seamănă cu RXCJ0232, Dec și z cu nimic. S-a corectat obiectul păstrând descrierea: nume → „Abell 2744 (Pandora)” (în 1D, 2D și hub, inclusiv cheile din dicționarele de traducere), RA/Dec = 3,59°/−30,4°, z = 0,308, d = lb = 3 620 Mly (lookback(0,308) = 3 615). Un eventual favorit salvat sub numele vechi nu se mai potrivește.'},
  {round: 4, name: 'NGC 1277 (BH gigant)', z: 0.0169, adopted: 240, old: 220,
   zSrc: ['Wikipedia, NGC 1277 (z = 0,016898; 5 066 km/s): https://en.wikipedia.org/wiki/NGC_1277', 'arXiv:1310.6367, Trujillo et al. (z = 0,0169; „corresponds to a galaxy distance of 73.3 Mpc”, H0 = 70, Ωm = 0,3): https://arxiv.org/pdf/1310.6367'],
   litSrc: ['Wikipedia, NGC 1277: „73 Mpc (240 Mly)”, citând Trujillo et al. 2014: https://en.wikipedia.org/wiki/NGC_1277', 'arXiv:1310.6367: 73,3 Mpc ≈ 239 Mly: https://arxiv.org/pdf/1310.6367'],
   note: 'z din catalog 0,017 → 0,0169 (ambele surse). lookback(0,0169) = 242 Mly; adoptat 240, identic cu cele două distanțe din literatură. 220 Mly nu e susținut de nicio sursă citită. Galaxia face parte din roiul Perseus (viteze proprii de ordinul sutelor de km/s), deci incertitudinea e de câteva procente.'},
);
// Intrări verificate cu surse dar NEmodificate (sau nerezolvate), cu motiv. `kept` = valoarea din catalog (d = lb); `resolved` = true dacă ≥ 2 surse susțin valoarea.
export const KEPT = [
  {name: 'NGC 4874', z: 0.0239, kept: 321, resolved: true,
   src: ['Wikipedia, NGC 4874 (z = 0,023907; 7 167 km/s; „about 97 megaparsecs (316,000,000 light-years)”, NED): https://en.wikipedia.org/wiki/NGC_4874', 'arXiv:astro-ph/9508070, Colless & Dunn (NGC 4874: cz = 7 152 km/s; media celor 465 de membri ai roiului Coma: cz = 6 917 ± 47 km/s ⇒ z = 0,02307): https://arxiv.org/pdf/astro-ph/9508070'],
   note: 'lookback(z propriu 0,0239) = 341 Mly (−5,8 %), dar NGC 4874 este cD într-un roi legat: z-ul ei diferă de media roiului cu ~235 km/s (mișcare proprie în roi), deci distanța fiabilă este cea a roiului: lookback(0,02307) = 329 Mly (321 este −2,4 %, sub pragul de 3 %), iar NED dă 316 Mly. Valoarea 321 e între cele două și rămâne.'},
  {name: "Stephan's Quintet", z: 0.0215, kept: 280, resolved: true,
   src: ['ESA/Hubble heic0007 („about 270 million light-years”; NGC 7320 prim-plan, 35 Mly; membrii ~6 000 km/s, NGC 7320 ~800 km/s): https://esahubble.org/news/heic0007/', 'NASA Webb, Stephan’s Quintet („290 million light-years (89 million parsecs)”; NGC 7320 la 40 Mly): https://science.nasa.gov/asset/webb/stephans-quintet-nircam-and-miri-composite-image/', 'arXiv:1712.07145 („a distance of 85 Mpc”, H0 = 75 ⇒ ≈ 277 Mly): https://arxiv.org/pdf/1712.07145', 'arXiv:astro-ph/0601084 (viteze HI 5 699–6 647 km/s; intrus la ~1 000 km/s): https://arxiv.org/pdf/astro-ph/0601084'],
   note: 'Nu am găsit o distanță independentă (Cefeide/TRGB/SBF) pentru grup; toate distanțele din surse derivă din z cu H0 ≈ 70–75 (270–290 Mly), iar 280 e în acest interval. lookback(0,0215) = 307 Mly (+9,6 %), dar vitezele membrilor (HI 5 699–6 647 km/s ⇒ z = 0,019–0,022 ⇒ lookback ≈ 272–316 Mly) și intrusul de ~1 000 km/s fac din lookback(z) o distanță nefiabilă pentru grup. Păstrat 280, neschimbat. NGC 7320 (prim-plan, 35–40 Mly) este deja menționat în descriere.'},
  {name: 'NGC 1275 (Perseus A)', z: 0.0176, kept: 236, resolved: false,
   src: ['Wikipedia, NGC 1275 (z = 0,017670; 5 264 km/s; NED: 225,19 ± 10,29 Mly = 69,0 ± 3,2 Mpc): https://en.wikipedia.org/wiki/NGC_1275'],
   note: 'NEREZOLVAT: o singură sursă citită (Wikipedia). lookback(0,01767) = 253 Mly, distanța NED din aceeași pagină este 225 Mly (corecție cosmologică), deci sursele diferă între ele cu ~12 %, iar 236 se află între ele (−6,7 % față de lookback). Fără o a doua sursă pentru z sau o distanță independentă, nu se modifică. Membru al roiului Perseus (viteze proprii mari).'},
  {name: 'Arp 220', z: 0.0181, kept: 250, resolved: true,
   src: ['ESA/Hubble heic0810bf („about 250 million light-years away”): https://esahubble.org/images/heic0810bf/', 'Wikipedia, Arp 220 (z = 0,01840; 5 434 km/s; „250 million light years away”): https://en.wikipedia.org/wiki/Arp_220'],
   note: 'Cele 250 Mly sunt susținute de două surse (modelul lor, H0 ≈ 70). lookback(0,0181) = 259 Mly (−3,5 %); lookback(0,0184, z din Wikipedia) = 263 Mly (−5,1 %). Diferența e de model/z rotunjit, nu o eroare; neschimbat. z-ul din catalog (0,0181) diferă de 0,0184 (o singură sursă), neschimbat.'},
];
export const ANDROMEDA = {name: 'Andromeda (M31)', z: -0.001, src: ['Wikipedia, Andromeda Galaxy: viteză radială heliocentrică −301 ± 1 km/s, z = −0,001004 („negative sign indicates blueshift”), citând NED: https://en.wikipedia.org/wiki/Andromeda_Galaxy', 'Sky & Telescope: M31 se apropie de noi cu ~300 km/s față de Soare: https://skyandtelescope.org/astronomy-resources/astronomy-questions-answers/is-it-true-that-the-andromeda-galaxy-is-blueshifted-and-moving-toward-us', 'van der Marel et al. 2012, arXiv:1205.6864: viteza radială față de Calea Lactee −109,3 ± 4,4 km/s (alt cadru de referință; nu se folosește pentru z): https://arxiv.org/abs/1205.6864v1']};
export function audit(G) { // intrări cu |lb − lookback(z)| > 3 % (z > 0,01): NU sunt surse, doar coerență internă
  const out = []; for (const g of G) if (g.z > 0.01) { const L = lookbackMyr(g.z), r = (g.lb - L) / L; if (Math.abs(r) > 0.03) out.push({n: g.n, z: g.z, lb: g.lb, calc: L, r}); } return out;
}
export function markdown(a, b) {
  const rows = diff(a, b), A = new Map(a.map(g => [g.n, g])), B = new Map(b.map(g => [g.n, g]));
  let m = `# Discrepanțe între cataloagele 1D și 2D (generat de \`tools/compare-catalogs.mjs\`)\n\n`;
  m += `Catalog 1D: ${a.length} intrări · catalog 2D: ${b.length} intrări · diferă acum ${rows.length} intrări.\n\n`;
  m += `**Stare (recenzia 3, 2026-10-28): toate cele 9 discrepanțe din tura 2 sunt rezolvate. Recenzia 4 (2026-10-28): 8 dintre cele 12 intrări cu abatere z ↔ lookback > 3 % sunt rezolvate cu surse (secțiunea 1b), 3 sunt verificate și neschimbate, 1 rămâne nerezolvată (secțiunea 4); un obiect confundat (Pandora) a fost corectat.** Regula: o discrepanță se rezolvă doar cu ≥ 2 surse independente sau cu o derivare corectă din redshift-ul măsurat, cu formula și parametrii scriși mai jos. Sursele sunt pagini citite în sesiune (Wikipedia, ESA/Hubble, arXiv, Chandra); NED/SIMBAD nu au fost consultate direct (Wikipedia le citează pentru Andromeda).\n\n`;
  m += `## Convenția aplicațiilor\n\n${CONVENTION.note}. Valorile din surse depind de modelul folosit de autori (H0 = 69–71, Ωm = 0,27–0,3), deci se compară aici în aceeași convenție (lookback / comobilă / luminozitate), nu brut. Formula: lookback(z) = (977 792 / H0) · ∫₀ᶻ dz' / [(1+z')·√(Ωm(1+z')³ + ΩΛ)] Mani; comobilă D_C = (c / H0) · ∫₀ᶻ dz' / √(Ωm(1+z')³ + ΩΛ); D_L = (1+z)·D_C. Integrare Simpson, 2000 pași.\n\n`;
  m += `## 1. Distanțe: rezolvate (d = lb, în Mly / Mani)\n\n`;
  m += `| Obiect | z | 1D | 2D (vechi) | 2D acum | lookback(z), H0=67,4 | comobilă | D_L | 2D vechi / lookback |\n|---|---|---|---|---|---|---|---|---|\n`;
  const R3 = RESOLVED.filter(r => !r.round), R4 = RESOLVED.filter(r => r.round === 4);
  for (const r of R3) { const lb = lookbackMyr(r.z), co = comovingMly(r.z), g1 = A.get(r.name), g2 = B.get(r.name);
    m += `| ${r.name} | ${r.z} | ${g1 ? fmt(g1.d) : '—'} | ${fmt(r.old2d)} | ${g2 ? fmt(g2.d) : '—'} | ${fmt(lb)} | ${fmt(co)} | ${fmt((1 + r.z) * co)} | ${(r.old2d / lb).toFixed(2)}× |\n`; }
  m += `\n1D și 2D au acum aceeași valoare (${R3.map(r => fmt(r.adopted)).join(' · ')}). Valoarea păstrată este cea din 1D, care coincide (±1 %) cu lookback(z) în convenția aplicațiilor; valorile vechi din 2D nu coincid cu lookback, comobila sau distanța de luminozitate la z-ul măsurat.\n\n`;
  const detail = r => {
    m += `### ${r.name}${r.renamed ? ` (fost „${r.renamed}”)` : ''}\n\n- **Rezolvare:** d = lb = ${fmt(r.adopted)} Mly (z = ${r.z}); lookback(z) = ${fmt(lookbackMyr(r.z))} Mly; ${r.round ? `înainte (1D = 2D) ${fmt(r.old)}` : `2D avea ${fmt(r.old2d)}`}.\n- **Surse pentru z:**\n${r.zSrc.map(x => `  - ${x}`).join('\n')}\n`;
    if (r.litSrc.length) m += `- **Distanțe din literatură (convenții/cosmologii proprii):**\n${r.litSrc.map(x => `  - ${x}`).join('\n')}\n`;
    m += `- **Note:** ${r.note}\n\n`;
  };
  for (const r of R3) detail(r);
  m += `## 1b. Recenzia 4 (2026-10-28): abateri z ↔ lookback > 3 % rezolvate cu surse (d = lb, în Mly)\n\nÎn recenzia 3 auditul z ↔ lookback a listat intrările de mai jos ca NEverificate. Acum fiecare are ≥ 2 surse citite în sesiune (WebSearch, apoi WebFetch pe URL-urile returnate) și valoarea nouă este lookback(z) în convenția aplicațiilor, rotunjit la 10 Mly; 1D, 2D și hub au aceleași valori.\n\n| Obiect | z | înainte (1D = 2D) | acum (1D = 2D = hub) | lookback(z), H0=67,4 | înainte / lookback |\n|---|---|---|---|---|---|\n`;
  for (const r of R4) { const lb = lookbackMyr(r.z), g1 = A.get(r.name), g2 = B.get(r.name); m += `| ${r.name}${r.renamed ? ` (fost „${r.renamed}”)` : ''} | ${r.z} | ${fmt(r.old)} | ${g1 && g2 ? `${fmt(g1.d)} / ${fmt(g2.d)}` : '—'} | ${fmt(lb)} | ${(r.old / lb).toFixed(2)}× |\n`; }
  m += `\n`;
  for (const r of R4) detail(r);
  m += `## 2. Semnul redshift-ului: rezolvat\n\n`;
  const za = A.get(ANDROMEDA.name), zb = B.get(ANDROMEDA.name);
  m += `- **${ANDROMEDA.name}**: M31 este spre albastru (se apropie de noi), deci z este **negativ**: z = v/c = −301 / 299 792 = −0,001004. Catalog acum: 1D z = ${za ? za.z : '—'}, 2D z = ${zb ? zb.z : '—'} (2D avea +0,001). Ambele aplicații afișează acum z negativ (2D: „-0.0010 (blueshift)” și săgeata albastră; verificat în browser de \`tests/blueshift.test.mjs\` din depozitele 1D și 2D).\n${ANDROMEDA.src.map(x => `  - ${x}`).join('\n')}\n\n`;
  m += `## 3. Diferențe rămase între 1D și 2D\n\n`;
  if (!rows.length) m += `Nicio diferență în câmpurile \`ra, dec, d, t, z, lb\` pentru cele ${Math.min(a.length, b.length)} intrări comune.\n\n`;
  else { m += `| Obiect | câmpuri (1D → 2D) |\n|---|---|\n`; for (const r of rows) m += `| ${r.n} | ${Object.entries(r.f).map(([k, v]) => `${k}: ${v[0]} → ${v[1]}`).join('; ')} |\n`; m += `\n`; }
  const aud = audit(a), aud2 = audit(b), same = JSON.stringify(aud.map(x => x.n)) === JSON.stringify(aud2.map(x => x.n));
  m += `## 4. Verificate cu surse, NEmodificate (sau nerezolvate), cu motiv\n\nAcestea sunt intrările rămase cu abatere > 3 % față de lookback(z) propriu. Pentru obiecte apropiate din roiuri/grupuri, lookback(z) nu e o distanță fiabilă (viteze proprii de sute–mii de km/s), iar valoarea din catalog se sprijină pe distanțe din literatură.\n\n`;
  for (const k of KEPT) { m += `### ${k.name}\n\n- **Stare:** ${k.resolved ? 'verificat, neschimbat' : 'NEREZOLVAT, neschimbat'} (d = lb = ${fmt(k.kept)} Mly; z = ${k.z}; lookback(z) = ${fmt(lookbackMyr(k.z))} Mly).\n- **Surse:**\n${k.src.map(x => `  - ${x}`).join('\n')}\n- **Note:** ${k.note}\n\n`; }
  m += `## 5. Audit z ↔ lookback rămas (automat)\n\nIntrări cu z > 0,01 al căror \`lb\` diferă cu > 3 % de lookback(z) calculat în convenția aplicațiilor${same ? ' (aceleași în 1D și 2D)' : ' (1D și 2D diferă: vezi mai jos)'}. Nu sunt surse: tabelul trebuie să conțină DOAR intrări explicate la secțiunea 4 (verificat de test). Intrările cu z ≤ 0,01 (Grupul Local, Virgo, Fornax etc.) sunt excluse din audit: acolo lookback(z) nu e o distanță, iar valorile \`d\` vin din metode independente (Cefeide, TRGB, SBF etc.); nu au fost reverificate în această tură.\n\n| Obiect | z | lb în catalog | lookback(z) | diferență |\n|---|---|---|---|---|\n`;
  for (const x of aud) m += `| ${x.n} | ${x.z} | ${fmt(x.lb)} | ${fmt(x.calc)} | ${(x.r * 100).toFixed(1)} % |\n`;
  if (!same) m += `\n(2D: ${aud2.map(x => x.n).join(', ')})\n`;
  m += `\n## 6. Alte observații\n\n- Hub-ul conține o copie a catalogului 1D (câmpurile \`n, ra, dec, d, t, z, lb\`); \`tests/versions.test.mjs\` verifică că rămâne identică, iar \`tests/catalog-consistency.test.mjs\` verifică valorile corectate și coerența 1D ↔ 2D ↔ hub.\n- 3D are catalog propriu (118 intrări, alte nume și unități), care nu a fost verificat în această tură: dacă conține obiecte corectate aici (3C 273, Mrk 421, 3C 279, PKS 2155-304, TON 618, MACS J0025, Pandora, NGC 1277), valorile lui trebuie aliniate într-o tură viitoare (depozitul 3D nu a fost deschis; nu se afirmă nimic despre conținutul lui). Andromeda apare și acolo (distanța 2,537 Mly, ca în 1D și 2D).\n- Cataloagele 1D și 2D nu mai au valori în conflict, deci o unificare într-un fișier de date comun ar fi acum posibilă fără a alege între valori; NU s-a făcut în această tură (ar schimba structura a trei aplicații single-file fără pas de build comun).\n`;
  return m;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [d1, d2] = process.argv.slice(2).filter(x => !x.startsWith('--') && !fs.existsSync(x) || fs.existsSync(path.join(x, 'index.html')));
  const a = loadGalaxies(path.join(d1, 'index.html')), b = loadGalaxies(path.join(d2, 'index.html')), md = markdown(a, b);
  const i = process.argv.indexOf('--md'), c = process.argv.indexOf('--check');
  if (i > 0) fs.writeFileSync(process.argv[i + 1], md); else if (c > 0) { const cur = fs.readFileSync(process.argv[c + 1], 'utf8'); if (cur !== md) { console.error('DISCREPANTE.md nu mai corespunde cataloagelor'); process.exit(1); } console.log('ok'); } else process.stdout.write(md);
}
