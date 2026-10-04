// Runs every level's reference solution through the real game logic.
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const src = html.match(/<script id="logic">([\s\S]*?)<\/script>/)[1];
const TB = new Function(src + '; return TB;')();
let bad = 0;
TB.LEVELS.forEach((lv, i) => {
  const r = TB.run(lv, lv.sol);
  const ok = r.result === 'win' && r.count === lv.par;
  if (!ok) bad++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${String(i + 1).padStart(2)} ${lv.name.padEnd(15)} ${r.result.padEnd(10)} words ${r.count} par ${lv.par}  ${JSON.stringify(r.progress)}`);
});
// a few rules worth pinning
const t = (lv, src) => TB.run(lv, src).result;
const L = TB.LEVELS;
const expect = (got, want, what) => { if (got !== want) { bad++; console.log(`FAIL ${what}: ${got} != ${want}`); } };
expect(t(L[0], 'rt 90 fd 2'), 'fall', 'walk off edge');
expect(t(L[3], 'pd fd 5'), 'incomplete', 'stray paint blocks win');
expect(t(L[6], 'fd 4'), 'incomplete', 'marble stops at cup... turtle bonks filled? ');
expect(t(L[6], 'rt 90 fd lt 90 fd 2 lt 90 fd lt 90 fd 2'), 'incomplete', 'pushing marble sideways');
expect(t(L[2], 'to side fd 4 rt 90 end repeat 4 [side]'), 'win', 'procedures');
try { TB.run(L[0], 'repeat 4 [fd'); bad++; } catch (e) { console.log('err ok:', e.message); }
try { TB.run(L[0], 'jump'); bad++; } catch (e) { console.log('err ok:', e.message); }
try { TB.run(L[0], 'to f f end f'); bad++; } catch (e) { console.log('err ok:', e.message); }
process.exit(bad ? 1 : 0);
