import { useState } from 'react'
import { formatParent } from '../data/varieties'

const UNIT_W    = 34   // px per bed (1 column wide)
const MAP_H     = 220  // total SVG height in px (= totalLengthM)
const GROUP_GAP = 12   // px gap between bed groups (alleys)
const DIM_PAD   = 36   // px margin for dimension lines

export default function FieldMap({ map }) {
  const [tooltip, setTooltip] = useState(null)
  const { totalLengthM } = map

  const mToPx = (m) => (m / totalLengthM) * MAP_H

  // Lay out all beds: bottom-aligned (beds hang from the bottom of the field)
  const laidOut = []
  let x = DIM_PAD

  map.bedGroups.forEach((group, gi) => {
    group.beds.forEach((bed) => {
      const h = mToPx(bed.lengthM)
      const y = MAP_H - h          // bottom-aligned
      laidOut.push({ ...bed, x, y, w: UNIT_W, h })
      x += UNIT_W
    })
    if (gi < map.bedGroups.length - 1) x += GROUP_GAP
  })

  const bedsRight = x
  const svgWidth  = bedsRight + DIM_PAD

  // Unique varieties for legend
  const varieties = {}
  laidOut.forEach((bed) => {
    if (bed.color && !varieties[bed.color]) {
      varieties[bed.color] = { color: bed.color, variety: bed.variety, varietyNo: bed.varietyNo }
    }
  })

  // Dimension line x positions
  const dimLineX_left  = DIM_PAD - 18
  const dimLineX_right = bedsRight + 18

  // y positions for short (215m) and extra-short (105m) reference lines
  const shortTopY = MAP_H - mToPx(215)

  return (
    <>
<div className="rounded-xl border border-slate-200 bg-slate-50 p-3"
        style={{ overflowX: 'auto', overflowY: 'visible' }}>
        <svg width={svgWidth} height={MAP_H}
          style={{ display: 'block', overflow: 'visible' }}>

          <defs>
            <marker id="arr"    markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" fill="#94a3b8" />
            </marker>
            <marker id="arr-up" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto-start-reverse">
              <path d="M0,0 L4,2 L0,4 Z" fill="#94a3b8" />
            </marker>
          </defs>

          {/* ── Left dimension line: 355m (full height) ── */}
          <line x1={dimLineX_left} y1={4} x2={dimLineX_left} y2={MAP_H - 4}
            stroke="#94a3b8" strokeWidth={1}
            markerStart="url(#arr-up)" markerEnd="url(#arr)" />
          <line x1={dimLineX_left - 4} y1={0}     x2={dimLineX_left + 4} y2={0}     stroke="#94a3b8" strokeWidth={1} />
          <line x1={dimLineX_left - 4} y1={MAP_H} x2={dimLineX_left + 4} y2={MAP_H} stroke="#94a3b8" strokeWidth={1} />
          <text x={dimLineX_left - 4} y={MAP_H / 2}
            textAnchor="middle" fontSize={9} fontFamily="system-ui, sans-serif" fontWeight="600" fill="#64748b"
            transform={`rotate(-90, ${dimLineX_left - 4}, ${MAP_H / 2})`}>
            {map.lengthLong}
          </text>

          {/* ── Right dimension line: short beds (only if map has lengthShort) ── */}
          {map.lengthShort && <>
            <line x1={dimLineX_right} y1={shortTopY + 4} x2={dimLineX_right} y2={MAP_H - 4}
              stroke="#94a3b8" strokeWidth={1}
              markerStart="url(#arr-up)" markerEnd="url(#arr)" />
            <line x1={dimLineX_right - 4} y1={shortTopY} x2={dimLineX_right + 4} y2={shortTopY} stroke="#94a3b8" strokeWidth={1} />
            <line x1={dimLineX_right - 4} y1={MAP_H}     x2={dimLineX_right + 4} y2={MAP_H}     stroke="#94a3b8" strokeWidth={1} />
            <text x={dimLineX_right + 4} y={shortTopY + (MAP_H - shortTopY) / 2}
              textAnchor="middle" fontSize={9} fontFamily="system-ui, sans-serif" fontWeight="600" fill="#64748b"
              transform={`rotate(-90, ${dimLineX_right + 4}, ${shortTopY + (MAP_H - shortTopY) / 2})`}>
              {map.lengthShort}
            </text>
          </>}

          {/* ── Beds ── */}
          {laidOut.map((bed) => {
            const planted = !!bed.color
            const notFull = bed.lengthM < totalLengthM
            const cx = bed.x + bed.w / 2
            return (
              <g key={bed.id}>
                {/* Future (unplanted) portion above the current bed */}
                {bed.futureLengthM > 0 && (() => {
                  const fh = mToPx(bed.futureLengthM)
                  const fy = bed.y - fh
                  return (
                    <rect
                      x={bed.x} y={fy} width={bed.w} height={fh}
                      fill={bed.futureColor ?? '#f1f5f9'}
                      stroke={bed.futureColor ? '#a16207' : '#cbd5e1'}
                      strokeWidth={1}
                      rx={3}
                      style={bed.futureTooltip ? { cursor: 'pointer' } : {}}
                      onMouseMove={bed.futureTooltip ? (e) => setTooltip({ x: e.clientX, y: e.clientY, text: bed.futureTooltip }) : undefined}
                      onMouseLeave={bed.futureTooltip ? () => setTooltip(null) : undefined}
                    />
                  )
                })()}
                <rect
                  x={bed.x} y={bed.y} width={bed.w} height={bed.h}
                  fill={bed.color ?? '#f1f5f9'}
                  stroke={planted ? '#a16207' : '#cbd5e1'}
                  strokeWidth={1}
                  rx={3}
                  style={bed.tooltip ? { cursor: 'pointer' } : {}}
                  onMouseMove={bed.tooltip ? (e) => setTooltip({ x: e.clientX, y: e.clientY, text: bed.tooltip }) : undefined}
                  onMouseLeave={bed.tooltip ? () => setTooltip(null) : undefined}
                />
                {/* Bed number — bottom of bed */}
                <text
                  x={cx} y={bed.y + bed.h - 7}
                  textAnchor="middle" fontSize={9}
                  fontFamily="system-ui, sans-serif" fontWeight="700"
                  fill={planted ? '#ffffff' : '#94a3b8'}
                  transform={`rotate(-90, ${cx}, ${bed.y + bed.h - 7})`}
                >
                  {bed.id}
                </text>
                {/* Meter label — top of bed, only for non-full beds */}
                {notFull && (
                  <text
                    x={cx} y={bed.y + 7}
                    textAnchor="middle" fontSize={8}
                    fontFamily="system-ui, sans-serif" fontWeight="600"
                    fill={planted ? '#ffffff' : '#64748b'}
                    transform={`rotate(-90, ${cx}, ${bed.y + 7})`}
                  >
                    {bed.lengthM}m
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      {Object.values(varieties).length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Varieties</p>
          <div className="flex flex-wrap gap-3">
            {Object.values(varieties).map((v) => (
              <div key={v.color} className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 rounded"
                  style={{ backgroundColor: v.color, border: '1.5px solid #a16207' }} />
                <span className="font-medium text-slate-700">{formatParent(v.varietyNo)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tooltip && (
        <div
          style={{ position: 'fixed', left: tooltip.x + 12, top: tooltip.y + 12, pointerEvents: 'none', zIndex: 9999 }}
          className="bg-slate-800 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap"
        >
          {tooltip.text}
        </div>
      )}
    </>
  )
}
