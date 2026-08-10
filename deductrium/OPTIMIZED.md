# Deductrium optimized build

This static build keeps the original game rules and proof checking, while
reducing retained proof metadata and repeated type-kernel work. It does not
contain achievement-specific shortcuts.

The geometry layer opens on the full-node planar overview. The original
hyperbolic view remains available from the geometry switch.

Browser saves are intentionally isolated from other Deductrium copies hosted
on the same origin:

- survival: `deductrium-optimized-save`
- creative: `deductrium-optimized-creative-save`

Exported text saves remain compatible with the original game's import/export
format.

Type-check timeout choices are 10, 30, 300, and 1800 seconds plus infinity.
The optimized build defaults to 300 seconds, persists the selected value across
the reload performed by file import, and records it as an optional trailing
save field. Older builds safely ignore that extra field.
