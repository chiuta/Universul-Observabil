// Compară cataloagele 1D și 2D (și copia din hub) și generează docs/DISCREPANTE.md.
// NU alege valori: listează ce spune fiecare aplicație și o verificare internă de consistență
// (distanța de comoving calculată din z-ul din catalog, ΛCDM plat, Ωm=0,315), care NU este o sursă.
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
export function markdown(a, b) {
  const rows = diff(a, b), dd = rows.filter(r => r.f.d), zz = rows.filter(r => r.f.z);
  let m = `# Discrepanțe între cataloagele 1D și 2D (generat de \`tools/compare-catalogs.mjs\`)\n\n`;
  m += `Catalog 1D: ${a.length} intrări · catalog 2D: ${b.length} intrări · diferă ${rows.length} intrări.\n\n`;
  m += `**Nu s-a ales nicio valoare.** Regula acestui depozit: o discrepanță se rezolvă doar cu surse verificate (NED, SIMBAD, articole). În sesiunea care a scris acest fișier gazdele NED/SIMBAD/arXiv nu erau accesibile, deci nimic nu a fost corectat în aplicații; ambele valori rămân cum sunt.\n\n`;
  m += `## 1. Distanțe diferite (\`d\` și \`lb\`, în Mly / Mani)\n\n`;
  m += `Coloanele „consistență internă" sunt distanța de comoving calculată din **z-ul din catalog** (ΛCDM plat, Ωm = 0,315; H0 = 67,4 și 73 km/s/Mpc). Este doar o verificare de coerență a aplicației cu ea însăși: **nu este o sursă** și nu înlocuiește NED/SIMBAD (z-ul poate avea el însuși de verificat, iar o distanță din catalog poate fi o distanță de lumină-parcursă, nu de comoving).\n\n`;
  m += `| Obiect | z (catalog) | d 1D | d 2D | comoving din z, H0=67,4 | H0=73 | lookback din z, H0=67,4 (Mani) |\n|---|---|---|---|---|---|---|\n`;
  for (const r of dd) m += `| ${r.n} | ${r.z} | ${fmt(r.f.d[0])} | ${fmt(r.f.d[1])} | ${fmt(comovingMly(r.z))} | ${fmt(comovingMly(r.z, 73))} | ${fmt(lookbackMyr(r.z))} |\n`;
  m += `\n(\`lb\` este egal cu \`d\` în aceste intrări, în ambele aplicații, deci și timpul de lookback diferă.)\n\n**Observație (aritmetică, nu sursă):** valorile 1D coincid, în limita a ~1 %, cu timpul de lookback calculat din z-ul din propriul catalog (ultima coloană), în toate cele 8 cazuri; valorile 2D nu. Asta arată doar că 1D este coerent intern cu convenția „d = lookback în Mly"; nu dovedește că z-urile sunt corecte. Corectarea 2D nu s-a făcut fără sursă verificată.\n\n## 2. Semnul redshift-ului\n\n`;
  for (const r of zz) m += `- **${r.n}**: z = ${r.f.z[0]} în 1D, z = ${r.f.z[1]} în 2D. Textul descriptiv al galaxiei, identic în ambele aplicații, spune că Andromeda „vine spre noi" (approaching us), ceea ce ar corespunde unui z negativ; dar acesta este un text din aplicații, nu o sursă. De confirmat cu SIMBAD/NED înainte de orice modificare.\n`;
  m += `\n## 3. Alte observații\n\n- Hub-ul conține o copie a catalogului 1D (câmpurile \`n, ra, dec, d, t, z, lb\`); \`tests/versions.test.mjs\` verifică că rămâne identică.\n- 3D are catalog propriu (118 intrări, alte nume și unități), care nu conține aceste 8 obiecte; dintre intrările cu discrepanțe, doar Andromeda apare și acolo (distanța 2,537 Mly, ca în 1D și 2D).\n- Unificarea într-un singur fișier de date NU s-a făcut: ar fi trebuit să alegem una dintre valori.\n`;
  return m;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [d1, d2] = process.argv.slice(2).filter(x => !x.startsWith('--') && !fs.existsSync(x) || fs.existsSync(path.join(x, 'index.html')));
  const a = loadGalaxies(path.join(d1, 'index.html')), b = loadGalaxies(path.join(d2, 'index.html')), md = markdown(a, b);
  const i = process.argv.indexOf('--md'), c = process.argv.indexOf('--check');
  if (i > 0) fs.writeFileSync(process.argv[i + 1], md); else if (c > 0) { const cur = fs.readFileSync(process.argv[c + 1], 'utf8'); if (cur !== md) { console.error('DISCREPANTE.md nu mai corespunde cataloagelor'); process.exit(1); } console.log('ok'); } else process.stdout.write(md);
}
