// Field map data. Each bed has lengthM (meters).
// Long lines (355m) on LEFT, short lines (215m) on RIGHT.
// Beds numbered right to left (1 = rightmost).

export const MALES_700_MAP = {
  name: '700 Males',
  totalLengthM: 180,
  lengthLong: '180m',
  area: '8.65 dunam',
  bedWidthCm: 192,
  bedGroups: [
    // Group A (app-left, RTL cols AJ→AD): 7 beds unplanted
    {
      id: 'g4',
      beds: [
        { id: 25, lengthM: 120, tooltip: '1300 plants, 16/04/26', color: '#FBCBA7', variety: 'Male', varietyNo: '2247' },
        { id: 24, lengthM: 180, tooltip: '1300 plants, 16/04/26', color: '#FBCBA7', variety: 'Male', varietyNo: '2247' },
        { id: 23, lengthM: 180, tooltip: '1300 plants, 16/04/26', color: '#FBCBA7', variety: 'Male', varietyNo: '2247' },
        { id: 22, lengthM: 80, futureLengthM: 100, futureAlignTop: true, tooltip: '1300 plants, 16/04/26', futureTooltip: '600 plants, 16/04/26', color: '#FBCBA7', futureColor: '#A855F8', variety: 'Male', varietyNo: '2247' },
        { id: 21, lengthM: 40, futureLengthM: 140, futureAlignTop: true, tooltip: '2050 plants, 06/04/26', futureTooltip: '600 plants, 16/04/26', color: '#A855F8', futureColor: '#A855F8', variety: 'Male', varietyNo: '2045' },
        { id: 20, lengthM: 180, tooltip: '2050 plants, 06/04/26', color: '#A855F8', variety: 'Male', varietyNo: '2045' },
        { id: 19, lengthM: 180, tooltip: '2050 plants, 06/04/26', color: '#A855F8', variety: 'Male', varietyNo: '2045' },
      ],
    },
    // Group B (RTL cols AB→V): 7 beds unplanted
    {
      id: 'g3',
      beds: [
        { id: 18, lengthM: 180, tooltip: '2050 plants, 06/04/26', color: '#A855F8', variety: 'Male', varietyNo: '2045' },
        { id: 17, lengthM: 180, tooltip: '2050 plants, 06/04/26', color: '#A855F8', variety: 'Male', varietyNo: '2045' },
        { id: 16, lengthM: 100, futureLengthM: 80, tooltip: '420 plants, 06/04/26', futureColor: '#A855F8', futureTooltip: '2050 plants, 06/04/26', color: '#FEF08A', variety: 'Male', varietyNo: '2309' },
        { id: 15, lengthM: 90, futureLengthM: 90, tooltip: '420 plants, 06/04/26', futureColor: '#3B82F6', futureTooltip: '1050 plants, 30/03/26', color: '#FEF08A', variety: 'Male', varietyNo: '2309' },
        { id: 14, lengthM: 180, tooltip: '1050 plants, 30/03/26', color: '#3B82F6', variety: 'Male', varietyNo: '2177' },
        { id: 13, lengthM: 20, futureLengthM: 160, tooltip: '1250 plants, 23/03/26', futureColor: '#3B82F6', futureTooltip: '1050 plants, 30/03/26', color: '#3B82F6', variety: 'Male', varietyNo: '2177' },
        { id: 12, lengthM: 180, tooltip: '1250 plants, 23/03/26', color: '#3B82F6', variety: 'Male', varietyNo: '2177' },
      ],
    },
    // Group C (RTL cols T→N): T,S,R unplanted + Q,P,O planted + N partial (17/03)
    {
      id: 'g2',
      beds: [
        { id: 11, lengthM: 180, tooltip: '1250 plants, 23/03/26', color: '#3B82F6', variety: 'Male', varietyNo: '2177' },
        { id: 10, lengthM: 50, futureLengthM: 130, tooltip: '550 plants, 23/03/26', futureColor: '#3B82F6', futureTooltip: '1250 plants, 23/03/26', color: '#92400E', variety: 'Male', varietyNo: '2037' },
        { id: 9,  lengthM: 90, futureLengthM: 90, tooltip: '550 plants, 23/03/26', futureColor: '#3B82F6', futureTooltip: '1050 plants, 30/03/26', color: '#92400E', variety: 'Male', varietyNo: '2037' },
        { id: 8,  lengthM: 180, tooltip: '1570 plants, 17/03/26', color: '#92400E', variety: 'Male', varietyNo: '2037' },
        { id: 7,  lengthM: 180, tooltip: '1570 plants, 17/03/26', color: '#92400E', variety: 'Male', varietyNo: '2037' },
        { id: 6,  lengthM: 180, tooltip: '1570 plants, 17/03/26', color: '#92400E', variety: 'Male', varietyNo: '2037' },
        { id: 5,  lengthM: 90, futureLengthM: 90, futureColor: '#92400E', tooltip: '1980 plants, 09/03/26', futureTooltip: '1570 plants, 17/03/26', color: '#92400E', variety: 'Male', varietyNo: '2037' },
      ],
    },
    // Group D (RTL cols L→I): fully planted (09/03)
    {
      id: 'g1',
      beds: [
        { id: 4, lengthM: 180, tooltip: '1980 plants, 09/03/26', color: '#92400E', variety: 'Male', varietyNo: '2037' },
        { id: 3, lengthM: 180, tooltip: '1980 plants, 09/03/26', color: '#92400E', variety: 'Male', varietyNo: '2037' },
        { id: 2, lengthM: 180, tooltip: '1980 plants, 09/03/26', color: '#92400E', variety: 'Male', varietyNo: '2037' },
        { id: 1, lengthM: 180, tooltip: '1980 plants, 09/03/26', color: '#92400E', variety: 'Male', varietyNo: '2037' },
      ],
    },
  ],
}

export const ABEND_FEMALE_MAP = {
  name: 'Abend Female',
  totalLengthM: 355,   // full field length (long beds)
  lengthLong: '355m',
  lengthShort: '215m',
  area: '10.2 dunam',
  bedWidthCm: 192,
  bedGroups: [
    // ── LEFT: long beds (355m) ───────────────────────────────
    // cols AE–AJ
    {
      id: 'g5',
      beds: [
        { id: 29, lengthM: 355, tooltip: '3050 plants, 06/04/26', color: '#3B82F6', variety: '318', varietyNo: '2106' },
        { id: 28, lengthM: 355, tooltip: '3050 plants, 06/04/26', color: '#3B82F6', variety: '318', varietyNo: '2106' },
        { id: 27, lengthM: 355, tooltip: '3050 plants, 06/04/26', color: '#3B82F6', variety: '318', varietyNo: '2106' },
        { id: 26, lengthM: 185, futureLengthM: 170, tooltip: '3100 plants, 30/03/26', futureTooltip: '3050 plants, 06/04/26', color: '#3B82F6', futureColor: '#3B82F6', variety: '318', varietyNo: '2106' },
        { id: 25, lengthM: 355, tooltip: '3100 plants, 30/03/26', color: '#3B82F6', variety: '318', varietyNo: '2106' },
        { id: 24, lengthM: 355, tooltip: '3100 plants, 30/03/26', color: '#3B82F6', variety: '318', varietyNo: '2106' },
      ],
    },
    // cols X–AC
    {
      id: 'g4',
      beds: [
        { id: 23, lengthM: 355, tooltip: '3100 plants, 30/03/26', color: '#3B82F6', variety: '318', varietyNo: '2106' },
        { id: 22, lengthM: 355, tooltip: '1700 plants, 30/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 21, lengthM: 20, futureLengthM: 335, tooltip: '6650 plants, 23/03/26', futureTooltip: '1700 plants, 30/03/26', color: '#92400E', futureColor: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 20, lengthM: 355, tooltip: '6650 plants, 23/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 19, lengthM: 355, tooltip: '6650 plants, 23/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 18, lengthM: 355, tooltip: '6650 plants, 23/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
      ],
    },
    // cols T–V (355m) + cols S–Q (short: Q=105m, R&S=215m)
    {
      id: 'g3',
      beds: [
        { id: 17, lengthM: 355, tooltip: '6650 plants, 23/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 16, lengthM: 355, tooltip: '6650 plants, 23/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 15, lengthM: 355, tooltip: '6650 plants, 23/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 14, lengthM: 215, tooltip: '6650 plants, 23/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 13, lengthM: 215, tooltip: '6650 plants, 23/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 12, lengthM: 215, tooltip: '6150 plants, 16/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
      ],
    },
    // ── RIGHT: short beds (215m) ─────────────────────────────
    // cols J–O
    {
      id: 'g2',
      beds: [
        { id: 11, lengthM: 215, tooltip: '6150 plants, 16/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 10, lengthM: 215, tooltip: '6150 plants, 16/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 9,  lengthM: 215, tooltip: '6150 plants, 16/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 8,  lengthM: 215, tooltip: '6150 plants, 16/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 7,  lengthM: 215, tooltip: '6150 plants, 16/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 6,  lengthM: 215, tooltip: '6150 plants, 16/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
      ],
    },
    // cols D–H
    {
      id: 'g1',
      beds: [
        { id: 5, lengthM: 215, tooltip: '6150 plants, 16/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 4, lengthM: 215, tooltip: '6150 plants, 16/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 3, lengthM: 215, tooltip: '6150 plants, 16/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 2, lengthM: 215, tooltip: '6150 plants, 16/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
        { id: 1, lengthM: 215, tooltip: '6150 plants, 16/03/26', color: '#92400E', variety: 'Brown', varietyNo: '2024' },
      ],
    },
  ],
}

export const FIFTY_WEST_FEMALE_MAP = {
  name: '50 West',
  totalLengthM: 270,
  lengthLong: '270m',
  area: '9.3 dunam',
  bedWidthCm: 192,
  bedGroups: [
    // cols leftmost (west) — beds 18–17
    {
      id: 'g4',
      beds: [
        { id: 18, lengthM: 270, color: '#A855F8', variety: '208', varietyNo: '2048' },
        { id: 17, lengthM: 120, color: '#A855F8', variety: '208', varietyNo: '2048' },
      ],
    },
    // beds 16–11
    {
      id: 'g3',
      beds: [
        { id: 16, lengthM: 270, color: '#A855F8', variety: '208', varietyNo: '2048' },
        { id: 15, lengthM: 270, color: '#A855F8', variety: '208', varietyNo: '2048' },
        { id: 14, lengthM: 270, color: '#A855F8', variety: '208', varietyNo: '2048' },
        { id: 13, lengthM: 270, color: '#A855F8', variety: '208', varietyNo: '2048' },
        { id: 12, lengthM: 270, color: '#A855F8', variety: '208', varietyNo: '2048' },
        { id: 11, lengthM: 270, color: '#A855F8', variety: '208', varietyNo: '2048' },
      ],
    },
    // beds 10–5
    {
      id: 'g2',
      beds: [
        { id: 10, lengthM: 270, color: '#A855F8', variety: '208', varietyNo: '2048' },
        { id: 9,  lengthM: 270, color: '#A855F8', variety: '208', varietyNo: '2048' },
        { id: 8,  lengthM: 215, futureLengthM: 55, color: '#A855F8', futureColor: '#A855F8', variety: '208', varietyNo: '2048' },
        { id: 7,  lengthM: 270, color: '#FEF08A', variety: '337', varietyNo: '2210' },
        { id: 6,  lengthM: 270, color: '#FEF08A', variety: '337', varietyNo: '2210' },
        { id: 5,  lengthM: 20,  color: '#3B82F6', variety: '318', varietyNo: '2177' },
      ],
    },
    // beds 4–1 (rightmost/east)
    {
      id: 'g1',
      beds: [
        { id: 4, lengthM: 270, color: '#3B82F6', variety: '318', varietyNo: '2177' },
        { id: 3, lengthM: 270, color: '#3B82F6', variety: '318', varietyNo: '2177' },
        { id: 2, lengthM: 250, futureLengthM: 20, color: '#3B82F6', variety: '318', varietyNo: '2177' },
        { id: 1, lengthM: 250, futureLengthM: 20, color: '#3B82F6', variety: '318', varietyNo: '2177' },
      ],
    },
  ],
}

// Returns sorted bed IDs from female maps that are planted with the given varietyNo
export function getFemaleBedIds(varietyNo) {
  const ids = []
  for (const map of [ABEND_FEMALE_MAP, FIFTY_WEST_FEMALE_MAP]) {
    for (const group of map.bedGroups) {
      for (const bed of group.beds) {
        if (bed.color && bed.varietyNo === varietyNo) ids.push(bed.id)
      }
    }
  }
  return ids.sort((a, b) => a - b)
}
