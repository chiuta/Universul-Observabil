// Universul Observabil 2.0.0 — explorator unificat 1D·2D·3D și compararea a două modele cosmologice. Playwright, Chromium headless, rețea blocată.
// Rulare: node tests/explorer.test.mjs
import {createRequire} from 'module'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url); const {chromium} = require('playwright');
const FILE = 'file://' + path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
let ok = 0, bad = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x === undefined ? '' : JSON.stringify(x).slice(0, 300)); } };
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox']});
async function open(hash = '', opts = {}) {
  const ctx = await b.newContext({viewport: {width: 1280, height: 900}, locale: 'en-US', ...opts});
  await ctx.route(/^https?:/, r => r.abort());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' || /Content Security Policy/.test(m.text())) errs.push(m.text()); });
  await p.goto(FILE + hash); await p.waitForTimeout(900);
  await p.evaluate(() => document.getElementById('xsec').scrollIntoView()); await p.waitForTimeout(500);
  return {ctx, p, errs};
}
console.log('--- explorator: date și selecție sincronă');
{
  const {ctx, p, errs} = await open();
  t('112 obiecte în listă, pornire la Andromeda', await p.evaluate(() => document.querySelectorAll('#xSel option').length === 112 && /Andromeda/.test(XG[X.sel].n)));
  const ring = async () => p.evaluate(() => [0, 1, 2].map(ci => { const c = document.getElementById(['x1', 'x2', 'x3'][ci]), q = X.pts[ci][X.sel], d = c.getContext('2d').getImageData(Math.round((q[0] + 9) * (devicePixelRatio || 1)), Math.round(q[1] * (devicePixelRatio || 1)), 1, 1).data; return d[0] > 180 && d[1] > 130 && d[2] < 140; }));
  t('inelul auriu al selecției apare în toate cele trei vederi', (await ring()).every(Boolean), await ring());
  // clic în 1D pe alt obiect
  const isolated = ci => p.evaluate(ci => { const pts = X.pts[ci]; let best = null, bd = -1; for (const q of pts) { if (q[2] === X.sel) continue; let m = 1e9; for (const o of pts) if (o[2] !== q[2]) m = Math.min(m, Math.hypot(o[0] - q[0], o[1] - q[1])); if (m > bd) { bd = m; best = q; } } const r = document.getElementById(['x1', 'x2', 'x3'][ci]).getBoundingClientRect(); return {i: best[2], x: r.left + best[0], y: r.top + best[1], gap: bd}; }, ci);
  const target = await isolated(0);
  await p.mouse.click(target.x, target.y); await p.waitForTimeout(150);
  t('clic în 1D: obiectul e ales și în 2D/3D (X.sel, listă, card)', await p.evaluate(i => X.sel === i && +document.getElementById('xSel').value === i && document.querySelector('#xCard .x-name').textContent === XG[i].n, target.i), target);
  t('selecția e evidențiată în toate cele trei vederi', (await ring()).every(Boolean), await ring());
  // clic în 2D
  const t2 = await isolated(1);
  await p.mouse.click(t2.x, t2.y); await p.waitForTimeout(150);
  t('clic în 2D schimbă selecția peste tot', await p.evaluate(i => X.sel === i && document.querySelector('#xCard .x-name').textContent === XG[i].n, t2.i), t2);
  // listă
  await p.selectOption('#xSel', '40'); await p.waitForTimeout(100);
  t('schimbarea din listă actualizează vederile', await p.evaluate(() => X.sel === 40 && document.querySelector('#xCard .x-name').textContent === XG[40].n));
  // tastatură
  await p.focus('#x2'); await p.keyboard.press('ArrowRight');
  t('săgeată dreapta pe un canvas trece la galaxia următoare', await p.evaluate(() => X.sel === 41));
  await p.keyboard.press('ArrowLeft'); await p.keyboard.press('ArrowLeft');
  t('săgeată stânga merge înapoi', await p.evaluate(() => X.sel === 39));
  // 3D: tragere = rotație, fără selecție
  const before = await p.evaluate(() => ({yaw: X.yaw, sel: X.sel})); const r3 = await p.locator('#x3').boundingBox();
  await p.mouse.move(r3.x + 40, r3.y + 120); await p.mouse.down(); await p.mouse.move(r3.x + 140, r3.y + 130, {steps: 5}); await p.mouse.up();
  const after = await p.evaluate(() => ({yaw: X.yaw, sel: X.sel}));
  t('3D: tragerea rotește (yaw se schimbă) fără să schimbe selecția', Math.abs(after.yaw - before.yaw) > 0.3 && after.sel === before.sel, [before, after]);
  t('aria-label pe canvasuri conține galaxia aleasă', await p.evaluate(() => ['x1', 'x2', 'x3'].every(id => document.getElementById(id).getAttribute('aria-label').includes(XG[X.sel].n))));
  // rotația automată
  const y0 = await p.evaluate(() => X.yaw); await p.waitForTimeout(700); const y1 = await p.evaluate(() => X.yaw);
  t('3D se rotește singur (fără preferința reduced-motion)', y1 > y0, [y0, y1]);
  t('fără erori', errs.length === 0, errs);
  await ctx.close();
}
console.log('--- reduced motion');
{
  const {ctx, p, errs} = await open('', {reducedMotion: 'reduce'});
  const y0 = await p.evaluate(() => X.yaw); await p.waitForTimeout(700);
  t('cu reduced-motion: fără rotație automată, fără bucla de animație', (await p.evaluate(() => X.yaw)) === y0 && (await p.evaluate(() => X.raf)) === 0);
  t('fără erori', errs.length === 0, errs); await ctx.close();
}
console.log('--- aceeași cosmologie ca în calculator; compararea a două modele');
{
  const {ctx, p, errs} = await open();
  const gi = await p.evaluate(() => XG.findIndex(g => /GN-z11/.test(g.n)));
  await p.selectOption('#xSel', String(gi)); await p.waitForTimeout(150);
  const z = await p.evaluate(i => XG[i].z, gi);
  const card = await p.evaluate(() => [...document.querySelectorAll('#xCard tbody tr')].map(tr => [...tr.children].map(td => td.textContent)));
  t('cardul are 4 rânduri × 4 coloane (mărime, Planck, SH0ES, diferență)', card.length === 4 && card.every(r => r.length === 4), card);
  const calc = await p.evaluate(zz => { const a = cosmo(zz, 67.4), c = cosmo(zz, 73.0); return {pDc: a.dcGly, sDc: c.dcGly, pLb: a.lb, sLb: c.lb, pT0: a.t0, sT0: c.t0}; }, z);
  const num = s => parseFloat(s.replace(/[^\d.,-]/g, '').replace(',', '.'));
  t('comoving din card = cosmo() din calculator (Planck și SH0ES)', Math.abs(num(card[1][1]) - calc.pDc) < 0.006 && Math.abs(num(card[1][2]) - calc.sDc) < 0.006, [card[1], calc]);
  t('lookback din card = calculator', Math.abs(num(card[0][1]) - calc.pLb) < 0.006 && Math.abs(num(card[0][2]) - calc.sLb) < 0.006, [card[0], calc]);
  t('SH0ES: Universul mai tânăr azi (≈12,7 Gyr față de ≈13,8) și diferența negativă', calc.sT0 < calc.pT0 && /−/.test(card[3][3]) && Math.abs(num(card[3][1]) - calc.pT0) < 0.006, [card[3], calc]);
  // calculatorul: același număr pe care îl vede utilizatorul în tile
  await p.fill('#calcZ', String(z)); await p.selectOption('#calcH', '67.4'); await p.waitForTimeout(100);
  t('tile-ul calculatorului arată aceeași distanță comobilă ca în card', (await p.textContent('#calcOut')).includes(card[1][1].replace(' Gly', '')), [await p.textContent('#calcOut'), card[1][1]]);
  // mod comparare în calculator
  await p.check('#calcCmp'); await p.waitForTimeout(100);
  const ct = await p.evaluate(() => [...document.querySelectorAll('#calcCmpT tbody tr')].map(tr => [...tr.children].map(td => td.textContent)));
  t('modul de comparare adaugă tabelul cu două modele (4 rânduri)', ct.length === 4 && ct.every(r => r.length === 4), ct);
  t('tabelul din calculator urmează valoarea z introdusă', await (async () => { await p.fill('#calcZ', '1'); await p.waitForTimeout(100); const a = await p.evaluate(() => cosmo(1, 67.4).dcGly), r = await p.evaluate(() => document.querySelectorAll('#calcCmpT tbody tr')[1].children[1].textContent); return Math.abs(num(r) - a) < 0.006; })());
  await p.fill('#calcZ', 'abc'); await p.waitForTimeout(100);
  t('z invalid: nici tabel de comparare, doar mesajul de eroare', (await p.evaluate(() => document.querySelectorAll('#calcCmpT tbody tr').length)) === 0 && /Enter a number/.test(await p.textContent('#calcOut')));
  await p.uncheck('#calcCmp'); await p.fill('#calcZ', '6'); await p.waitForTimeout(100);
  t('comparare dezactivată: tabelul dispare', (await p.evaluate(() => document.getElementById('calcCmpT').children.length)) === 0);
  // obiect local și CMB: valori din catalog
  for (const re of ['Andromeda', 'CMB']) {
    const i = await p.evaluate(r => XG.findIndex(g => new RegExp(r).test(g.n)), re); await p.selectOption('#xSel', String(i)); await p.waitForTimeout(100);
    const note = await p.textContent('#xCard .x-note'); const rows = await p.evaluate(() => [...document.querySelectorAll('#xCard tbody tr')].map(tr => [...tr.children].map(td => td.textContent)));
    t(re + ': valori din catalog (diferență 0 între modele) și notă explicativă', rows[0][3].replace(/[^\d]/g, '').replace(/0/g, '') === '' && /do not depend on H₀/.test(note), [rows[0], note]);
  }
  t('fără erori', errs.length === 0, errs); await ctx.close();
}
console.log('--- legături și permalink');
{
  const {ctx, p, errs} = await open('#x=5');
  t('#x=5 restaurează selecția', await p.evaluate(() => X.sel === 5));
  const L = await p.evaluate(() => [...document.querySelectorAll('#xCard .x-links a')].map(a => ({h: a.href, r: a.rel, t: a.target})));
  t('trei legături (1D, 2D, 3D) cu noopener și _blank', L.length === 3 && L.every(l => /noopener/.test(l.r) && l.t === '_blank'), L);
  const g = await p.evaluate(() => XG[5].n);
  const d1 = JSON.parse(decodeURIComponent(escape(Buffer.from(L[0].h.split('#s=')[1], 'base64').toString('binary'))));
  t('1D: #s=<base64{gn:nume}> cu numele galaxiei', L[0].h.startsWith('https://chiuta.github.io/Universul-Observabil-1D/#s=') && d1.gn === g, d1);
  t('2D: #g=…&gn=<nume>&from=uo-hub', L[1].h.startsWith('https://chiuta.github.io/Universul-Observabil-2D/#g=0&z=3&gn=' + encodeURIComponent(g)) && /from=uo-hub$/.test(L[1].h), L[1].h);
  t('3D: fără selecție (aplicația 3D nu are legătură pentru o galaxie)', L[2].h === 'https://chiuta.github.io/Universul-Observabil-3D/', L[2].h);
  await p.selectOption('#xSel', '9'); await p.waitForTimeout(100);
  t('alegerea din listă actualizează hash-ul #x=', await p.evaluate(() => location.hash === '#x=9'));
  t('fără erori', errs.length === 0, errs); await ctx.close();
  for (const h of ['#x=999', '#x=abc', '#x=-1', '#x=1e9', '#x=%00']) { const r = await open(h); t(h + ': ignorat, fără erori, selecția implicită', (await r.p.evaluate(() => /Andromeda/.test(XG[X.sel].n))) && r.errs.length === 0, r.errs); await r.ctx.close(); }
}
console.log('--- limbi');
{
  const {ctx, p, errs} = await open();
  for (const l of ['ro', 'en', 'fr', 'it', 'es', 'pt', 'de', 'hu']) {
    await p.selectOption('#langSel', l); await p.waitForTimeout(120);
    const r = await p.evaluate(() => ({h: document.querySelector('[data-i18n="x1"]').textContent, th: [...document.querySelectorAll('#xCard thead th')].map(e => e.textContent), raw: /(^|\s)x\d{1,2}(\s|$)/.test(document.getElementById('xsec').textContent + document.getElementById('calcsec').textContent), cmp: document.querySelector('label[for="calcCmp"]').textContent, al: document.getElementById('x1').getAttribute('aria-label')}));
    t(l + ': titlu, antet de tabel, etichetă comparare și aria-label traduse, fără chei brute', r.h.length > 8 && r.th.length === 4 && r.th.every(x => x.length > 2) && !r.raw && r.cmp.length > 10 && r.al.length > 20, r);
  }
  const titles = await p.evaluate(() => ['ro', 'en', 'fr', 'it', 'es', 'pt', 'de', 'hu'].map(l => I18N.x1[l])); t('titluri distincte în cele 8 limbi (≥ 7 diferite)', new Set(titles).size >= 7, titles);
  t('fără erori', errs.length === 0, errs); await ctx.close();
}
console.log('--- mobil 360 px');
{
  const {ctx, p, errs} = await open('', {viewport: {width: 360, height: 740}});
  const m = await p.evaluate(() => ({sw: document.documentElement.scrollWidth, w: innerWidth, c: ['x1', 'x2', 'x3'].map(id => document.getElementById(id).getBoundingClientRect().width)}));
  t('fără defilare orizontală, canvasuri încadrate', m.sw <= m.w + 1 && m.c.every(w => w > 200 && w <= m.w), m);
  t('fără erori', errs.length === 0, errs); await ctx.close();
}
await b.close(); console.log(bad ? `${bad} eșecuri, ${ok} reușite` : `${ok} reușite, toate trecute`); process.exit(bad ? 1 : 0);
