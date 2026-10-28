// Hub 2.1.2 — valorile corectate în recenziile 3 și 4 (2026-10-28) și coerența catalogului între 1D, 2D și hub.
// Rulare: node tests/catalog-consistency.test.mjs  [UO_SIBLINGS=/cale/cu/Universul-Observabil-1D,-2D,-3D]
// Fără depozitele vecine, verificările care le cer sunt SĂRITE explicit (nu trec în tăcere).
import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
import {loadGalaxies, loadHub, lookbackMyr, audit, RESOLVED, KEPT, ANDROMEDA, markdown} from '../tools/compare-catalogs.mjs';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.join(HERE, '..'), SIB = process.env.UO_SIBLINGS || path.join(ROOT, '..');
let ok = 0, bad = 0, skip = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x === undefined ? '' : JSON.stringify(x).slice(0, 300)); } };
const dirs = {'1d': 'Universul-Observabil-1D', '2d': 'Universul-Observabil-2D', '3d': 'Universul-Observabil-3D'}, file = k => path.join(SIB, dirs[k], 'index.html'), have = k => fs.existsSync(file(k));
// tabelul de rezolvări: fiecare cu ≥ 2 surse pentru z (sau o derivare documentată) și URL-uri https
for (const r of RESOLVED) t(r.name + ': ≥ 2 surse pentru z, toate cu URL https', r.zSrc.length >= 2 && r.zSrc.every(s => /https:\/\//.test(s)), r.zSrc.length);
for (const r of RESOLVED) { const L = lookbackMyr(r.z); t(r.name + ': valoarea adoptată ' + r.adopted + ' Mly în ±1,5 % din lookback(z) = ' + Math.round(L), Math.abs(r.adopted - L) / L < 0.015, [r.adopted, L]); }
// recenzia 4: intrările verificate/nerezolvate (KEPT) au surse https; cele „resolved” cu ≥ 2 surse; rândurile noi au valoarea veche diferită
for (const k of KEPT) t(k.name + ': surse https (' + k.src.length + ')' + (k.resolved ? ', ≥ 2 pentru o valoare păstrată' : ', marcat nerezolvat (1 sursă)'), k.src.length >= 1 && k.src.every(x => /https:\/\//.test(x)) && (!k.resolved || k.src.length >= 2) && !!k.note, k.src.length);
for (const r of RESOLVED.filter(x => x.round === 4)) t(r.name + ': valoarea veche (' + r.old + ') diferă de cea nouă (' + r.adopted + ') cu > 3 % de lookback(z) pentru cea veche', Math.abs(r.old - lookbackMyr(r.z)) / lookbackMyr(r.z) > 0.03 && r.old !== r.adopted);
t('recenzia 4: 8 intrări rezolvate (3C 273, Mrk 421, 3C 279, PKS 2155-304, TON 618, MACS J0025, Abell 2744, NGC 1277)', RESOLVED.filter(x => x.round === 4).map(x => x.name).join('|') === ['3C 273 (Quasar)', 'Mrk 421', '3C 279', 'PKS 2155-304', 'TON 618', 'MACS J0025 (Glonț)', 'Abell 2744 (Pandora)', 'NGC 1277 (BH gigant)'].join('|'));
const hub = loadHub(path.join(ROOT, 'index.html'));
t('hub: „RXCJ0232 (Pandora)” a dispărut din tot fișierul; „Abell 2744 (Pandora)” are RA 3,59, Dec −30,4, z 0,308', !fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').includes('RXCJ0232') && (g => g && g.ra === 3.59 && g.dec === -30.4 && g.z === 0.308)(hub.find(x => x.n === 'Abell 2744 (Pandora)')));
for (const k of KEPT) { const g = hub.find(x => x.n === k.name); t('hub: ' + k.name + ' neschimbat (d = lb = ' + k.kept + ', z = ' + k.z + ')', g && g.d === k.kept && g.lb === k.kept && g.z === k.z, g); }
t('hub: auditul z > 0,01 (abatere > 3 %) conține DOAR intrări explicate în KEPT', audit(hub).every(x => KEPT.some(k => k.name === x.n)) && KEPT.every(k => audit(hub).some(x => x.n === k.name)), audit(hub).map(x => x.n));
t('hub: Andromeda are z negativ (blueshift)', hub.find(g => g.n === ANDROMEDA.name).z < 0);
t('hub: nicio etichetă „Perseus (BCG IC 310)”, există „IC 310 (Perseus)”', !fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').includes('Perseus (BCG IC 310)') && hub.some(g => g.n === 'IC 310 (Perseus)'));
for (const r of RESOLVED) { const g = hub.find(x => x.n === r.name); t('hub: ' + r.name + ' d = lb = ' + r.adopted + ', z = ' + r.z, g && g.d === r.adopted && g.lb === r.adopted && g.z === r.z, g); }
if (have('1d') && have('2d')) {
  const a = loadGalaxies(file('1d')), b = loadGalaxies(file('2d')), B = new Map(b.map(g => [g.n, g]));
  t('1D și 2D: aceleași nume (' + a.length + ')', a.length === b.length && a.every(g => B.has(g.n)));
  t('1D și 2D: ra, dec, d, t, z, lb identice pentru toate intrările', a.every(g => ['ra', 'dec', 'd', 't', 'z', 'lb'].every(f => g[f] === (B.get(g.n) || {})[f])), a.filter(g => B.has(g.n) && ['ra', 'dec', 'd', 't', 'z', 'lb'].some(f => g[f] !== B.get(g.n)[f])).map(g => g.n));
  for (const r of RESOLVED) for (const [k, G] of [['1D', a], ['2D', b]]) { const g = G.find(x => x.n === r.name); t(k + ': ' + r.name + ' = ' + r.adopted + ' Mly', g && g.d === r.adopted && g.lb === r.adopted && g.z === r.z, g); }
  for (const k of KEPT) for (const [n, G] of [['1D', a], ['2D', b]]) { const g = G.find(x => x.n === k.name); t(n + ': ' + k.name + ' neschimbat (' + k.kept + ' Mly)', g && g.d === k.kept && g.lb === k.kept && g.z === k.z, g); }
  for (const [n, G] of [['1D', a], ['2D', b]]) { const g = G.find(x => x.n === 'Abell 2744 (Pandora)'); t(n + ': Abell 2744 (Pandora) RA 3,59, Dec −30,4; vechea intrare RXCJ0232 absentă', g && g.ra === 3.59 && g.dec === -30.4 && !G.some(x => /RXCJ0232/.test(x.n)), g); t(n + ': auditul z > 0,01 conține doar intrări din KEPT', audit(G).every(x => KEPT.some(k => k.name === x.n)), audit(G).map(x => x.n)); }
  t('1D și 2D: Andromeda z < 0 în ambele', a.find(g => g.n === ANDROMEDA.name).z < 0 && B.get(ANDROMEDA.name).z < 0);
  t('hub = 1D (n, ra, dec, d, t, z, lb)', a.length === hub.length && a.every((g, i) => ['n', 'ra', 'dec', 'd', 't', 'z', 'lb'].every(f => g[f] === hub[i][f])));
  const md = markdown(a, b), D = fs.readFileSync(path.join(ROOT, 'docs', 'DISCREPANTE.md'), 'utf8');
  t('docs/DISCREPANTE.md (hub) corespunde cataloagelor curente', D === md);
  for (const k of ['1d', '2d']) { const f = path.join(SIB, dirs[k], 'docs', 'DISCREPANTE.md'); t('docs/DISCREPANTE.md din ' + dirs[k] + ' = copia din hub', fs.existsSync(f) && fs.readFileSync(f, 'utf8') === D); }
} else { skip++; console.log('  SKIP coerența 1D ↔ 2D ↔ hub (lipsesc depozitele 1D/2D lângă hub)'); }
if (have('3d')) { const s3 = fs.readFileSync(file('3d'), 'utf8'); t('3D: Andromeda la 2,537 Mly (ANDROMEDA_MLY), ca în 1D/2D', /ANDROMEDA_MLY:\s*2\.537/.test(s3)); } else { skip++; console.log('  SKIP 3D (lipsește)'); }
console.log(`${bad} eșecuri, ${ok} reușite, ${skip} sărite`); process.exit(bad ? 1 : 0);
