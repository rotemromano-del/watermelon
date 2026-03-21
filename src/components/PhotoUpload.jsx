import { useRef } from 'react'

export default function PhotoUpload({ photos, onChange }) {
  const inputRef = useRef(null)
  const cameraRef = useRef(null)

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return

    const newPhotos = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      description: '',
    }))

    onChange([...photos, ...newPhotos])
    // Reset input so same file can be re-selected
    e.target.value = ''
  }

  const handleDescriptionChange = (id, value) => {
    onChange(photos.map((p) => (p.id === id ? { ...p, description: value } : p)))
  }

  const handleRemove = (id) => {
    const photo = photos.find((p) => p.id === id)
    if (photo?.preview) URL.revokeObjectURL(photo.preview)
    onChange(photos.filter((p) => p.id !== id))
  }

  return (
    <div>
      {/* Photo thumbnails */}
      {photos.length > 0 && (
        <div className="flex flex-col gap-3 mb-3">
          {photos.map((photo) => (
            <div key={photo.id} className="flex gap-3 bg-slate-50 rounded-xl p-2 border border-slate-200">
              {/* Thumbnail */}
              <div className="relative flex-shrink-0">
                <img
                  src={photo.preview}
                  alt="upload preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(photo.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white
                             flex items-center justify-center shadow-md active:scale-90 transition-transform"
                  aria-label="Remove photo"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <div className="flex-1 flex flex-col justify-center">
                <label className="field-label text-xs mb-1">Caption (optional)</label>
                <textarea
                  value={photo.description}
                  onChange={(e) => handleDescriptionChange(photo.id, e.target.value)}
                  placeholder="Describe this photo..."
                  rows={2}
                  className="field-input text-sm resize-none py-2"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload buttons */}
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileSelect} />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => cameraRef.current?.click()}
          className="btn-secondary flex-1"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Camera
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="btn-secondary flex-1"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Gallery
        </button>
      </div>
    </div>
  )
}
