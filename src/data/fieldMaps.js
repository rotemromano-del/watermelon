// Field map data. Each bed has lengthM (meters).
// Long lines (355m) on LEFT, short lines (215m) on RIGHT.
// Beds numbered right to left (1 = rightmost).

export const ABEND_FEMALE_MAP = {
  name: 'Abend Female',
  totalLengthM: 355,   // full field length (long beds)
  lengthLong: '355m',
  lengthShort: '215m',
  area: '10.2 dunam',
  bedGroups: [
    // ── LEFT: long beds (355m) ───────────────────────────────
    // cols AE–AJ
    {
      id: 'g5',
      beds: [
        { id: 29, lengthM: 355, color: null },
        { id: 28, lengthM: 355, color: null },
        { id: 27, lengthM: 355, color: null },
        { id: 26, lengthM: 355, color: null },
        { id: 25, lengthM: 355, color: null },
        { id: 24, lengthM: 355, color: null },
      ],
    },
    // cols X–AC
    {
      id: 'g4',
      beds: [
        { id: 23, lengthM: 355, color: null },
        { id: 22, lengthM: 355, color: null },
        { id: 21, lengthM: 355, color: null },
        { id: 20, lengthM: 355, color: null },
        { id: 19, lengthM: 355, color: null },
        { id: 18, lengthM: 355, color: null },
      ],
    },
    // cols T–V (355m) + cols S–Q (short: Q=105m, R&S=215m)
    {
      id: 'g3',
      beds: [
        { id: 17, lengthM: 355, color: null },
        { id: 16, lengthM: 355, color: null },
        { id: 15, lengthM: 355, color: null },
        { id: 14, lengthM: 215, color: null },
        { id: 13, lengthM: 215, color: null },
        { id: 12, lengthM: 105, futureLengthM: 110, color: '#92400E', variety: 'Brown', varietyNo: '2024' },
      ],
    },
    // ── RIGHT: short beds (215m) ─────────────────────────────
    // cols J–O
    {
      id: 'g2',
      beds: [
        { id: 11, lengthM: 215, color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 10, lengthM: 215, color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 9,  lengthM: 215, color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 8,  lengthM: 215, color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 7,  lengthM: 215, color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 6,  lengthM: 215, color: '#92400E', variety: 'Brown', varietyNo: '2024' },
      ],
    },
    // cols D–H
    {
      id: 'g1',
      beds: [
        { id: 5, lengthM: 215, color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 4, lengthM: 215, color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 3, lengthM: 215, color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 2, lengthM: 215, color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 1, lengthM: 215, color: '#92400E', variety: 'Brown', varietyNo: '2024' },
      ],
    },
  ],
}
