import { useState, useRef, useEffect } from 'react'
import { formatParent } from '../data/varieties'

const COLORS = [
  'Yellow',
  'Purple',
  'Blue',
  'Brown',
  'Peach',
]

const COLOR_VARIETY = {
  Brown: '2024',
  Blue: '2106',
  Purple: '2048',
  Yellow: '2210',
  Peach: '2247',
}

const COLOR_STYLE = {
  Yellow: { bg: '#FEF08A', text: '#713F12' },
  Purple: { bg: '#A855F8', text: '#ffffff' },
  Blue:   { bg: '#3B82F6', text: '#ffffff' },
  Brown:  { bg: '#92400E', text: '#ffffff' },
  Peach:  { bg: '#FBCBA7', text: '#7C2D12' },
}

function ColorPicker({ value, onChange, hasError }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selected = value ? COLOR_STYLE[value] : null
  const selectedLabel = value ? formatParent(COLOR_VARIETY[value]) : null

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`field-input pr-10 text-left flex items-center gap-2 ${hasError ? 'border-red-400 ring-1 ring-red-400' : ''}`}
        style={selected ? { backgroundColor: selected.bg, color: selected.text, borderColor: selected.bg } : {}}
      >
        {selectedLabel ? (
          <span className="font-medium">{selectedLabel}</span>
        ) : (
          <span className="text-slate-400">Select...</span>
        )}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
          style={selected ? { color: selected.text } : { color: '#94a3b8' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 left-0 right-0 mt-1 rounded-xl overflow-hidden shadow-lg border border-slate-200">
          {COLORS.map((c) => {
            const style = COLOR_STYLE[c]
            return (
              <button
                key={c}
                type="button"
                onClick={() => { onChange(c); setOpen(false) }}
                className="w-full text-left px-4 py-3 font-medium text-sm flex items-center gap-2 transition-opacity active:opacity-70"
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                {formatParent(COLOR_VARIETY[c])}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ColorEntry({ entry, index, totalEntries, errors, onChange, onRemove }) {
  const handleChange = (field, value) => {
    if (field === 'color') {
      onChange({ ...entry, color: value, varietyNumber: COLOR_VARIETY[value] ?? '' })
    } else {
      onChange({ ...entry, [field]: value })
    }
  }

  return (
    <div className="relative">
      {/* Entry header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-primary-700 uppercase tracking-wider">
          Entry {index + 1}
        </span>
        {totalEntries > 1 && (
          <button
            type="button"
            onClick={onRemove}
            className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center
                       active:scale-90 transition-transform focus:outline-none"
            aria-label="Remove entry"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Single variety picker (full width) */}
        <div>
          <label className="field-label">
            Variety <span className="text-red-400">*</span>
          </label>
          <ColorPicker
            value={entry.color}
            onChange={(val) => handleChange('color', val)}
            hasError={!!errors?.color}
          />
          {errors?.color && <p className="error-text">{errors.color}</p>}
        </div>

        {/* Line + Pollinations side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="field-label">
              Line <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              inputMode="numeric"
              min="0"
              value={entry.lines}
              onChange={(e) => handleChange('lines', e.target.value)}
              placeholder="0"
              className={`field-input ${errors?.lines ? 'border-red-400 ring-1 ring-red-400' : ''}`}
            />
            {errors?.lines && <p className="error-text">{errors.lines}</p>}
          </div>

          <div>
            <label className="field-label">
              Pollinations <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              inputMode="numeric"
              min="0"
              value={entry.pollinations}
              onChange={(e) => handleChange('pollinations', e.target.value)}
              placeholder="0"
              className={`field-input ${errors?.pollinations ? 'border-red-400 ring-1 ring-red-400' : ''}`}
            />
            {errors?.pollinations && <p className="error-text">{errors.pollinations}</p>}
          </div>
        </div>
      </div>

      {/* Divider (not on last item) */}
      {index < totalEntries - 1 && (
        <div className="mt-4 border-t border-dashed border-slate-200" />
      )}
    </div>
  )
}
