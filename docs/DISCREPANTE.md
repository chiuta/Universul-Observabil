# Discrepanțe între cataloagele 1D și 2D (generat de `tools/compare-catalogs.mjs`)

Catalog 1D: 112 intrări · catalog 2D: 112 intrări · diferă 9 intrări.

**Nu s-a ales nicio valoare.** Regula acestui depozit: o discrepanță se rezolvă doar cu surse verificate (NED, SIMBAD, articole). În sesiunea care a scris acest fișier gazdele NED/SIMBAD/arXiv nu erau accesibile, deci nimic nu a fost corectat în aplicații; ambele valori rămân cum sunt.

## 1. Distanțe diferite (`d` și `lb`, în Mly / Mani)

Coloanele „consistență internă" sunt distanța de comoving calculată din **z-ul din catalog** (ΛCDM plat, Ωm = 0,315; H0 = 67,4 și 73 km/s/Mpc). Este doar o verificare de coerență a aplicației cu ea însăși: **nu este o sursă** și nu înlocuiește NED/SIMBAD (z-ul poate avea el însuși de verificat, iar o distanță din catalog poate fi o distanță de lumină-parcursă, nu de comoving).

| Obiect | z (catalog) | d 1D | d 2D | comoving din z, H0=67,4 | H0=73 | lookback din z, H0=67,4 (Mani) |
|---|---|---|---|---|---|---|
| NGC 1132 (Relicvă Fosil) | 0.0232 | 330 | 1,020 | 335 | 309 | 331 |
| Perseus (BCG IC 310) | 0.0189 | 270 | 780 | 273 | 252 | 270 |
| 3C 48 | 0.367 | 4,150 | 5,200 | 4,845 | 4,473 | 4,149 |
| Abell 370 (Arc gravitational) | 0.375 | 4,200 | 5,900 | 4,940 | 4,561 | 4,218 |
| CL 0024+1654 | 0.395 | 4,400 | 5,500 | 5,175 | 4,778 | 4,388 |
| SDSS J1004+4112 (Cvintuplu quasar) | 1.734 | 10,050 | 7,000 | 15,969 | 14,744 | 10,049 |
| IC 4296 | 0.0124 | 180 | 130 | 179 | 166 | 178 |
| Abell 1689 (Lentilă) | 0.183 | 2,330 | 7,200 | 2,537 | 2,342 | 2,333 |

(`lb` este egal cu `d` în aceste intrări, în ambele aplicații, deci și timpul de lookback diferă.)

**Observație (aritmetică, nu sursă):** valorile 1D coincid, în limita a ~1 %, cu timpul de lookback calculat din z-ul din propriul catalog (ultima coloană), în toate cele 8 cazuri; valorile 2D nu. Asta arată doar că 1D este coerent intern cu convenția „d = lookback în Mly"; nu dovedește că z-urile sunt corecte. Corectarea 2D nu s-a făcut fără sursă verificată.

## 2. Semnul redshift-ului

- **Andromeda (M31)**: z = -0.001 în 1D, z = 0.001 în 2D. Textul descriptiv al galaxiei, identic în ambele aplicații, spune că Andromeda „vine spre noi" (approaching us), ceea ce ar corespunde unui z negativ; dar acesta este un text din aplicații, nu o sursă. De confirmat cu SIMBAD/NED înainte de orice modificare.

## 3. Alte observații

- Hub-ul conține o copie a catalogului 1D (câmpurile `n, ra, dec, d, t, z, lb`); `tests/versions.test.mjs` verifică că rămâne identică.
- 3D are catalog propriu (118 intrări, alte nume și unități), care nu conține aceste 8 obiecte; dintre intrările cu discrepanțe, doar Andromeda apare și acolo (distanța 2,537 Mly, ca în 1D și 2D).
- Unificarea într-un singur fișier de date NU s-a făcut: ar fi trebuit să alegem una dintre valori.
