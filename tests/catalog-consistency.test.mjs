// Hub 2.1.1 — valorile corectate în recenzia 3 (2026-10-28) și coerența catalogului între 1D, 2D și hub.
// Rulare: node tests/catalog-consistency.test.mjs  [UO_SIBLINGS=/cale/cu/Universul-Observabil-1D,-2D,-3D]
// Fără depozitele vecine, verificările care le cer sunt SĂRITE explicit (nu trec în tăcere).
import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
import {loadGalaxies, loadHub, lookbackMyr, RESOLVED, ANDROMEDA, markdown} from '../tools/compare-catalogs.mjs';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.join(HERE, '..'), SIB = process.env.UO_SIBLINGS || path.join(ROOT, '..');
let ok = 0, bad = 0, skip = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x === undefined ? '' : JSON.stringify(x).slice(0, 300)); } };
const dirs = {'1d': 'Universul-Observabil-1D', '2d': 'Universul-Observabil-2D', '3d': 'Universul-Observabil-3D'}, file = k => path.join(SIB, dirs[k], 'index.html'), have = k => fs.existsSync(file(k));
// tabelul de rezolvări: fiecare cu ≥ 2 surse pentru z (sau o derivare documentată) și URL-uri https
for (const r of RESOLVED) t(r.name + ': ≥ 2 surse pentru z, toate cu URL https', r.zSrc.length >= 2 && r.zSrc.every(s => /https:\/\//.test(s)), r.zSrc.length);
for (const r of RESOLVED) { const L = lookbackMyr(r.z); t(r.name + ': valoarea adoptată ' + r.adopted + ' Mly în ±1,5 % din lookback(z) = ' + Math.round(L), Math.abs(r.adopted - L) / L < 0.015, [r.adopted, L]); }
const hub = loadHub(path.join(ROOT, 'index.html'));
t('hub: Andromeda are z negativ (blueshift)', hub.find(g => g.n === ANDROMEDA.name).z < 0);
t('hub: nicio etichetă „Perseus (BCG IC 310)”, există „IC 310 (Perseus)”', !fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').includes('Perseus (BCG IC 310)') && hub.some(g => g.n === 'IC 310 (Perseus)'));
for (const r of RESOLVED) { const g = hub.find(x => x.n === r.name); t('hub: ' + r.name + ' d = lb = ' + r.adopted + ', z = ' + r.z, g && g.d === r.adopted && g.lb === r.adopted && g.z === r.z, g); }
if (have('1d') && have('2d')) {
  const a = loadGalaxies(file('1d')), b = loadGalaxies(file('2d')), B = new Map(b.map(g => [g.n, g]));
  t('1D și 2D: aceleași nume (' + a.length + ')', a.length === b.length && a.every(g => B.has(g.n)));
  t('1D și 2D: ra, dec, d, t, z, lb identice pentru toate intrările', a.every(g => ['ra', 'dec', 'd', 't', 'z', 'lb'].every(f => g[f] === (B.get(g.n) || {})[f])), a.filter(g => B.has(g.n) && ['ra', 'dec', 'd', 't', 'z', 'lb'].some(f => g[f] !== B.get(g.n)[f])).map(g => g.n));
  for (const r of RESOLVED) for (const [k, G] of [['1D', a], ['2D', b]]) { const g = G.find(x => x.n === r.name); t(k + ': ' + r.name + ' = ' + r.adopted + ' Mly', g && g.d === r.adopted && g.lb === r.adopted && g.z === r.z, g); }
  t('1D și 2D: Andromeda z < 0 în ambele', a.find(g => g.n === ANDROMEDA.name).z < 0 && B.get(ANDROMEDA.name).z < 0);
  t('hub = 1D (n, ra, dec, d, t, z, lb)', a.length === hub.length && a.every((g, i) => ['n', 'ra', 'dec', 'd', 't', 'z', 'lb'].every(f => g[f] === hub[i][f])));
  const md = markdown(a, b), D = fs.readFileSync(path.join(ROOT, 'docs', 'DISCREPANTE.md'), 'utf8');
  t('docs/DISCREPANTE.md (hub) corespunde cataloagelor curente', D === md);
  for (const k of ['1d', '2d']) { const f = path.join(SIB, dirs[k], 'docs', 'DISCREPANTE.md'); t('docs/DISCREPANTE.md din ' + dirs[k] + ' = copia din hub', fs.existsSync(f) && fs.readFileSync(f, 'utf8') === D); }
} else { skip++; console.log('  SKIP coerența 1D ↔ 2D ↔ hub (lipsesc depozitele 1D/2D lângă hub)'); }
if (have('3d')) { const s3 = fs.readFileSync(file('3d'), 'utf8'); t('3D: Andromeda la 2,537 Mly (ANDROMEDA_MLY), ca în 1D/2D', /ANDROMEDA_MLY:\s*2\.537/.test(s3)); } else { skip++; console.log('  SKIP 3D (lipsește)'); }
console.log(`${bad} eșecuri, ${ok} reușite, ${skip} sărite`); process.exit(bad ? 1 : 0);
