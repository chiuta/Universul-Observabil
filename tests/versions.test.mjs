// Hub 2.1.0 — etichetele „vX.Y · N” citesc versiunea reală; copia catalogului = 1D; DISCREPANTE.md la zi.
// Rulare: node tests/versions.test.mjs  [UO_SIBLINGS=/cale/cu/Universul-Observabil-1D,-2D,-3D]
// Fără depozitele vecine, verificările care le cer sunt SĂRITE explicit (nu trec în tăcere).
import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url'; import {createRequire} from 'node:module';
import {loadGalaxies, loadHub, markdown} from '../tools/compare-catalogs.mjs';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.join(HERE, '..');
const SIB = process.env.UO_SIBLINGS || path.join(ROOT, '..');
let ok = 0, bad = 0, skip = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x === undefined ? '' : JSON.stringify(x).slice(0, 300)); } };
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const apps = JSON.parse(html.match(/const UO_APPS=(\{.*?\});/)[1].replace(/([{,])(\w+):/g, '$1"$2":'));
t('UO_APPS are 1d/2d/3d', ['1d', '2d', '3d'].every(k => apps[k] && /^\d+\.\d+\.\d+$/.test(apps[k].v) && apps[k].n > 100));
t('nicio etichetă veche „v1.0 · 112” / „v5.9 · 112” / „v1.2 · 118” în HTML', !/data-i18n-gx="v(1\.0 · 112|5\.9 · 112|1\.2 · 118)"/.test(html));
const dirs = {'1d': 'Universul-Observabil-1D', '2d': 'Universul-Observabil-2D', '3d': 'Universul-Observabil-3D'};
const have = k => fs.existsSync(path.join(SIB, dirs[k], 'index.html'));
for (const k of Object.keys(dirs)) {
  if (!have(k)) { skip++; console.log('  SKIP versiune ' + k + ' (lipsește ' + dirs[k] + ' lângă hub)'); continue; }
  const h = fs.readFileSync(path.join(SIB, dirs[k], 'index.html'), 'utf8');
  t('versiunea ' + k + ' din hub = application-version real', h.match(/name="application-version" content="([^"]+)"/)[1] === apps[k].v, [apps[k].v, h.match(/name="application-version" content="([^"]+)"/)[1]]);
}
if (have('1d')) {
  const a = loadGalaxies(path.join(SIB, dirs['1d'], 'index.html')), hub = loadHub(path.join(ROOT, 'index.html'));
  t('numărul de intrări 1D = ' + apps['1d'].n, a.length === apps['1d'].n); t('hub are ' + hub.length + ' intrări, ca 1D', hub.length === a.length);
  t('copia din hub = catalogul 1D (n, ra, dec, d, t, z, lb)', a.every((g, i) => ['n', 'ra', 'dec', 'd', 't', 'z', 'lb'].every(f => g[f] === hub[i][f])));
}
if (have('2d')) t('numărul de intrări 2D = ' + apps['2d'].n, loadGalaxies(path.join(SIB, dirs['2d'], 'index.html')).length === apps['2d'].n);
if (have('1d') && have('2d')) {
  const md = markdown(loadGalaxies(path.join(SIB, dirs['1d'], 'index.html')), loadGalaxies(path.join(SIB, dirs['2d'], 'index.html')));
  t('docs/DISCREPANTE.md corespunde cataloagelor curente (nicio valoare aleasă în tăcere)', fs.readFileSync(path.join(ROOT, 'docs', 'DISCREPANTE.md'), 'utf8') === md);
}
// browser: etichetele afișate
const require = createRequire(process.env.PW_ROOT || import.meta.url); let chromium; try { ({chromium} = require('playwright')); } catch { chromium = null; }
if (!chromium) { skip++; console.log('  SKIP etichete în browser (playwright lipsește)'); } else {
  const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox']});
  for (const lang of ['ro', 'en', 'de', 'hu']) {
    const ctx = await b.newContext({viewport: {width: 1280, height: 900}, locale: lang}); await ctx.route(/^https?:/, r => r.abort());
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto('file://' + path.join(ROOT, 'index.html') + '?lang=' + lang); await p.waitForTimeout(700);
    const txt = await p.evaluate(() => [...document.querySelectorAll('.dver')].map(e => e.textContent.trim()));
    t(lang + ': trei etichete cu versiunea reală', txt.length === 3 && txt[0].startsWith('v' + apps['1d'].v + ' · ' + apps['1d'].n) && txt[1].startsWith('v' + apps['2d'].v + ' · ' + apps['2d'].n) && txt[2].startsWith('v' + apps['3d'].v + ' · ' + apps['3d'].n), txt);
    t(lang + ': fără erori JS', errs.length === 0, errs); await ctx.close();
  }
  await b.close();
}
console.log(`${bad} eșecuri, ${ok} reușite, ${skip} sărite`); process.exit(bad ? 1 : 0);
