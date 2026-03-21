// Maps parent number → variety number
export const PARENT_TO_VARIETY = {
  '2024': '089',
  '2037': '089',
  '2106': '318',
  '2048': '208',
  '2210': '337',
  '2247': '323A',
}

// Returns "2024 (089)" format
export function formatParent(parentNo) {
  const variety = PARENT_TO_VARIETY[parentNo]
  return variety ? `${parentNo} (${variety})` : parentNo
}
