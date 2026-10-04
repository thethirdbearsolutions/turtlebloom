# Turtle Bloom

A cel-shaded Logo garden. Write `fd`, `rt 90`, `repeat 4 [ … ]`, `to … end`; the turtle walks a
floating island, blooms flowers, paints the dotted squares (and only those), and pushes marbles
into cups. Fewer words, more stars.

Live at https://turtlebloom.vercel.app (Vercel project `turtlebloom`, team `thirdbear`; deploys on push to `main`).

One file, no build: open `index.html`. Three.js 0.170 comes from jsdelivr via an import map.

`node tools/check.mjs` runs every level's reference solution through the game logic and must
show `ok` at par before a level ships.
