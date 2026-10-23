// Universul Observabil — regresii din auditul adversarial (octombrie 2026): calculator (intrare strictă), prefers-reduced-motion, ținte tactile.
// Rulare: node tests/audit-2026-10.test.mjs   (Playwright din /opt/node-tools, Chromium din /opt/pw-browsers; rețea blocată)
import {createRequire} from 'module'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
const require = createRequire('/opt/node-tools/package.json'); const {chromium} = require('playwright');
const FILE = 'file://' + path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
let ok = 0, bad = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x ?? ''); } };
const b = await chromium.launch({executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']});
async function open(opts = {}) {
  const ctx = await b.newContext({viewport: {width: 390, height: 800}, locale: 'en-US', ...opts});
  await ctx.route(/^https?:/, r => r.abort());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(FILE); await p.waitForTimeout(1200); return {ctx, p, errs};
}
console.log('--- calculator cosmic: doar zecimale simple');
{
  const {ctx, p, errs} = await open();
  const out = async v => { await p.fill('#calcZ', v); await p.waitForTimeout(60); return p.textContent('#calcOut'); };
  for (const v of ['0x10', '1e1', '0b11', '+5', '1,2,3']) t(`"${v}" respins`, /Enter a number/.test(await out(v)), v);
  for (const v of ['14.44', '14,44', '0', '20', '.5', ' 7 ']) t(`"${v}" acceptat`, /Comoving|Lookback/.test(await out(v)), v);
  t('z = 14.44: distanță comovantă 33.85 Gly', /33\.85 Gly/.test(await out('14.44')));
  t('fără erori', errs.length === 0, errs);
  await ctx.close();
}
console.log('--- prefers-reduced-motion: animațiile din JS');
{
  const grab = async p => p.evaluate(() => document.getElementById('cstr').toDataURL().length + ':' + document.getElementById('cneb').toDataURL().length);
  const R = await open({reducedMotion: 'reduce'});
  await R.p.waitForTimeout(1000); const a1 = await R.p.textContent('#ttext'); const c1 = await grab(R.p); await R.p.waitForTimeout(2500);
  const a2 = await R.p.textContent('#ttext'); const c2 = await grab(R.p);
  t('tastare statică (textul nu se schimbă în 2,5 s)', a1 === a2 && a1.length > 3, [a1, a2]);
  t('stele și nebuloasă statice (canvas identic)', c1 === c2, [c1, c2]);
  await R.p.mouse.click(200, 400); await R.p.waitForTimeout(150);
  t('clic fără explozie de particule', await R.p.evaluate(() => { const c = document.getElementById('cpar'); const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; for (let i = 3; i < d.length; i += 4) if (d[i]) return false; return true; }));
  t('contor final imediat (118)', await R.p.evaluate(() => { const e = document.getElementById('sgal'); e.scrollIntoView(); return new Promise(r => setTimeout(() => r(e.textContent === '118'), 300)); }));
  t('fără erori', R.errs.length === 0, R.errs);
  await R.ctx.close();
  const N = await open({reducedMotion: 'no-preference'});
  const b1 = await N.p.textContent('#ttext'); await N.p.waitForTimeout(1500); const b2 = await N.p.textContent('#ttext');
  t('control: fără preferință, textul se tastează în continuare', b1 !== b2, [b1, b2]);
  await N.ctx.close();
}
console.log('--- ținte tactile (pointer: coarse)');
{
  const {ctx, p} = await open({hasTouch: true, isMobile: true});
  const sizes = await p.evaluate(() => ['a.nav-logo', '#nhome', '#langSel', '.calc-chip', '.cmp-tab', '.mlink', 'a.dmir'].map(s => { const e = document.querySelector(s); const r = e && e.getBoundingClientRect(); return [s, r ? r.height : -1]; }));
  t('legături, selector, chip-uri, taburi ≥ 44 px', sizes.every(([, h]) => h >= 43.5), sizes.filter(([, h]) => h < 43.5));
  await ctx.close();
}
await b.close(); console.log(`\n${ok} ok / ${bad} eșuate`); process.exit(bad ? 1 : 0);
