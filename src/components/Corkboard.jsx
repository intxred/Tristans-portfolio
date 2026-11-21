import { useState, useEffect } from 'react'
import { ArrowLeft, Plus, Heart, X, Search, Trash2, ShieldCheck, Key } from 'lucide-react'

const NOTE_COLORS = [
  { id: 'yellow', label: 'Silver', bg: 'bg-[#ECEDF0] text-[#0F1012] border-[#FFFFFF]' },
  { id: 'pink', label: 'Platinum', bg: 'bg-[#D3D5DA] text-[#0F1012] border-[#E6E7EA]' },
  { id: 'cyan', label: 'Steel', bg: 'bg-[#A9ADB6] text-[#0A0A0B] border-[#C4C7CE]' },
  { id: 'mint', label: 'Graphite', bg: 'bg-[#2A2C31] text-[#F2F3F5] border-[#3E4048]' },
  { id: 'lavender', label: 'Slate', bg: 'bg-[#41444C] text-white border-[#5A5D66]' },
  { id: 'parchment', label: 'Carbon', bg: 'bg-[#121316] text-[#F2F3F5] border-[#34363C]' },
]

const PIN_ICONS = ['📌', '📍', '⭐', '🦔', '☕', '💡', '🚀', '🎨']
const STICKERS = ['None', '❤️', '🔥', '⚡', '💯', '✨', '☕', '🚀', '🦔', '🎉']

const DEFAULT_NOTES = [
  {
    id: 'note-1',
    author: 'Red (Developer)',
    text: 'Welcome to my Corkboard! 📌 Feel free to leave a note, drop a greeting, critique the portfolio, or share what you are building. I read all messages!',
    color: 'yellow',
    pin: '📌',
    sticker: '🦔',
    date: 'Aug 2026',
    likes: 24,
    rotate: -2,
    isOwner: true,
  },
  {
    id: 'note-2',
    author: 'Dev from Tokyo',
    text: 'Love the retro-editorial aesthetic and the smooth 3D orbit system! Super clean typography and great attention to detail.',
    color: 'cyan',
    pin: '📍',
    sticker: '🚀',
    date: 'Yesterday',
    likes: 12,
    rotate: 2.5,
  },
  {
    id: 'note-3',
    author: 'Sarah M.',
    text: 'The Messenger Order Bot case study is inspiring. Turning chaotic chat threads into automated state machines is brilliant!',
    color: 'pink',
    pin: '⭐',
    sticker: '💯',
    date: '2 days ago',
    likes: 8,
    rotate: -1.5,
  },
  {
    id: 'note-4',
    author: 'Coffee & Code',
    text: 'Dropping by from Manila! Keep building and shipping awesome software ☕⚡',
    color: 'mint',
    pin: '☕',
    sticker: '❤️',
    date: '3 days ago',
    likes: 15,
    rotate: 3,
  },
  {
    id: 'note-5',
    author: 'Alex K.',
    text: 'Found your portfolio on GitHub. Love how fast and snappy everything loads with Vite & Tailwind. 10/10.',
    color: 'lavender',
    pin: '💡',
    sticker: '✨',
    date: '4 days ago',
    likes: 9,
    rotate: -3,
  },
]

export default function Corkboard({ onBack }) {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('red_portfolio_corkboard_notes')
      if (saved) return JSON.parse(saved)
    } catch {
      // ignore
    }
    return DEFAULT_NOTES
  })

  // Track note IDs created on this device / browser session
  const [myNoteIds, setMyNoteIds] = useState(() => {
    try {
      const saved = localStorage.getItem('red_portfolio_my_notes_ids')
      if (saved) return JSON.parse(saved)
    } catch {
      // ignore
    }
    return []
  })

  // Admin / Owner Mode state
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminModalOpen, setAdminModalOpen] = useState(false)
  const [adminPasscode, setAdminPasscode] = useState('')
  const [adminError, setAdminError] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [filterColor, setFilterColor] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // New note form state
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [selectedColor, setSelectedColor] = useState('yellow')
  const [selectedPin, setSelectedPin] = useState('📌')
  const [selectedSticker, setSelectedSticker] = useState('None')

  useEffect(() => {
    try {
      localStorage.setItem('red_portfolio_corkboard_notes', JSON.stringify(notes))
    } catch {
      // ignore
    }
  }, [notes])

  useEffect(() => {
    try {
      localStorage.setItem('red_portfolio_my_notes_ids', JSON.stringify(myNoteIds))
    } catch {
      // ignore
    }
  }, [myNoteIds])

  function handleAddNote(e) {
    e.preventDefault()
    if (!text.trim()) return

    const randomRotation = Number(((Math.random() * 6) - 3).toFixed(1))
    const noteId = `note-${Date.now()}`

    const newNote = {
      id: noteId,
      author: author.trim() || 'Anonymous Visitor',
      text: text.trim(),
      color: selectedColor,
      pin: selectedPin,
      sticker: selectedSticker === 'None' ? null : selectedSticker,
      date: 'Just now',
      likes: 1,
      rotate: randomRotation,
      userCreated: true,
    }

    setNotes([newNote, ...notes])
    setMyNoteIds((prev) => [...prev, noteId])

    setAuthor('')
    setText('')
    setSelectedColor('yellow')
    setSelectedPin('📌')
    setSelectedSticker('None')
    setModalOpen(false)
  }

  function handleLike(id, e) {
    e.stopPropagation()
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, likes: n.likes + 1 } : n))
    )
  }

  function handleDelete(id, e) {
    e.stopPropagation()
    const confirmDelete = window.confirm('Are you sure you want to delete this note?')
    if (!confirmDelete) return

    setNotes((prev) => prev.filter((n) => n.id !== id))
    setMyNoteIds((prev) => prev.filter((myId) => myId !== id))
  }

  function handleAdminUnlock(e) {
    e.preventDefault()
    // Passcode: "admin" or "red"
    if (adminPasscode.trim().toLowerCase() === 'admin' || adminPasscode.trim().toLowerCase() === 'red') {
      setIsAdmin(true)
      setAdminModalOpen(false)
      setAdminPasscode('')
      setAdminError(false)
    } else {
      setAdminError(true)
    }
  }

  const filteredNotes = notes.filter((n) => {
    const matchesColor = filterColor === 'all' || n.color === filterColor
    const matchesSearch =
      searchQuery === '' ||
      n.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesColor && matchesSearch
  })

  const activeColorObj = NOTE_COLORS.find((c) => c.id === selectedColor) || NOTE_COLORS[0]

  return (
    <div className="min-h-screen text-ink pb-20 pt-4 px-4 sm:px-6 lg:px-8">
      {/* Top Header Bar */}
      <div className="max-w-[1240px] mx-auto mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="btn-ghost font-mono text-xs font-bold tracking-[0.08em] uppercase px-4 py-2.5 rounded-full
            border border-ink text-ink inline-flex items-center gap-2 bg-paper transition-all hover:bg-ink hover:text-paper shadow-sm cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Portfolio
        </button>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Note Counter */}
          <div className="font-mono text-[11px] uppercase tracking-wider text-ink-soft bg-card/80 border border-line px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <b>{notes.length}</b> Pinned Notes
          </div>

          {/* Owner / Admin Toggle */}
          <button
            onClick={() => {
              if (isAdmin) {
                setIsAdmin(false)
              } else {
                setAdminModalOpen(true)
              }
            }}
            className={`font-mono text-[11px] tracking-wider uppercase px-3 py-1.5 rounded-full border transition-all inline-flex items-center gap-1.5 cursor-pointer ${
              isAdmin
                ? 'bg-[#E4E6EA] text-[#0A0A0B] border-brand-red font-bold shadow-xs'
                : 'bg-card/80 border-line text-ink-soft hover:text-ink hover:border-ink'
            }`}
            title={isAdmin ? 'Click to exit Admin Mode' : 'Owner / Admin Moderation Access'}
          >
            {isAdmin ? (
              <>
                <ShieldCheck size={13} />
                <span>Admin Active (Delete Any)</span>
              </>
            ) : (
              <>
                <Key size={12} />
                <span>Owner Mod</span>
              </>
            )}
          </button>

          {/* Pin a Note CTA */}
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary font-mono text-xs font-bold tracking-[0.08em] uppercase px-5 py-2.5 rounded-full
              border border-[#E4E6EA] bg-[#E4E6EA] text-[#0A0A0B] inline-flex items-center gap-2 transition-transform
              hover:shadow-[0_10px_24px_rgba(210,214,222,0.35)] shadow-md cursor-pointer"
          >
            <Plus size={15} /> Pin a Note 📌
          </button>
        </div>
      </div>

      {/* Main Corkboard Frame Container */}
      <div className="max-w-[1240px] mx-auto">
        {/* Wooden Frame */}
        <div
          className="rounded-[28px] p-3 sm:p-5 lg:p-7
            border-[8px] sm:border-[12px] border-[#1a1b1f]
            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),inset_0_6px_30px_rgba(0,0,0,0.6),0_0_90px_-10px_rgba(190,196,208,0.22)] relative"
          style={{
            background: 'linear-gradient(150deg, #17181c 0%, #0b0c0e 55%, #060607 100%)',
          }}
        >
          {/* Subtle Cork Texture Grid Overlay */}
          <div
            className="absolute inset-0 rounded-[14px] pointer-events-none opacity-[.07]"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Corkboard Banner / Title Ribbon with WHITE TEXT */}
          <div className="relative z-10 bg-[#0d0e11] border border-white/10 rounded-2xl p-4 sm:p-6 mb-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase bg-[#E4E6EA] text-[#0A0A0B] px-2.5 py-0.5 rounded-full font-bold">
                  COMMUNITY BOARD
                </span>
                <span className="font-mono text-[11px] tracking-wider text-white/70">
                  EST. 2026
                </span>
                {isAdmin && (
                  <span className="font-mono text-[10px] tracking-wider uppercase bg-white text-black px-2 py-0.5 rounded-full font-bold">
                    👑 MODERATOR ACCESS
                  </span>
                )}
              </div>

              {/* Title in Pure White */}
              <h1 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Visitor Pinboard &amp; Guestbook
              </h1>

              {/* Subtitle in Pure White */}
              <p className="text-[13.5px] text-white/95 mt-1 max-w-[60ch] leading-relaxed">
                Leave a random message, say hi from your country, drop project feedback, or share a cool idea.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <div className="relative flex-1 md:w-48">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notes…"
                  className="w-full bg-white/[.06] border border-white/12 text-white placeholder:text-white/50 rounded-full pl-8 pr-3 py-1.5 text-xs outline-none focus:border-brand-red"
                />
              </div>

              <div className="flex items-center gap-1 bg-white/[.06] border border-white/12 rounded-full p-1">
                <button
                  onClick={() => setFilterColor('all')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono uppercase transition-all cursor-pointer ${
                    filterColor === 'all' ? 'bg-white text-black font-bold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  All
                </button>
                {NOTE_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setFilterColor(c.id)}
                    title={`Filter ${c.label}`}
                    className={`w-5 h-5 rounded-full border border-white/20 transition-transform cursor-pointer ${
                      filterColor === c.id ? 'scale-125 ring-2 ring-brand-red' : 'hover:scale-110 opacity-85'
                    }`}
                    style={{
                      background: c.id === 'yellow' ? '#ECEDF0' : c.id === 'pink' ? '#D3D5DA' : c.id === 'cyan' ? '#A9ADB6' : c.id === 'mint' ? '#2A2C31' : c.id === 'lavender' ? '#41444C' : '#121316'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Notes Grid on the Corkboard */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start">
            {/* "Add New Note" Callout Tile */}
            <button
              onClick={() => setModalOpen(true)}
              className="group border-2 border-dashed border-white/25 hover:border-white/60 rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center bg-white/[.03] hover:bg-white/[.07] transition-all hover:scale-[1.02] cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[#E4E6EA] text-[#0A0A0B] flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <span className="font-sans font-bold text-base text-white mb-1">
                Pin Your Own Note
              </span>
              <span className="text-xs text-ink-soft max-w-[24ch]">
                Click to choose your paper color, pushpin, sticker &amp; write your message!
              </span>
            </button>

            {/* Render Pinned Sticky Notes */}
            {filteredNotes.map((note) => {
              const colorInfo = NOTE_COLORS.find((c) => c.id === note.color) || NOTE_COLORS[0]
              const isMyNote = myNoteIds.includes(note.id) || note.userCreated
              const canDelete = isAdmin || isMyNote

              return (
                <div
                  key={note.id}
                  className={`relative rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.03] hover:z-20
                    shadow-[0_12px_24px_rgba(0,0,0,0.18)] ${colorInfo.bg}`}
                  style={{
                    transform: `rotate(${note.rotate}deg)`,
                  }}
                >
                  {/* Push Pin Header */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 text-2xl select-none filter drop-shadow-[0_3px_3px_rgba(0,0,0,0.35)]">
                    {note.pin || '📌'}
                  </div>

                  {/* Optional Sticker in top right */}
                  {note.sticker && (
                    <div className="absolute top-2 right-2 text-xl select-none rotate-12 opacity-90">
                      {note.sticker}
                    </div>
                  )}

                  {/* Top Bar: Author & Date */}
                  <div className="flex items-center justify-between gap-2 pt-2 mb-2.5 border-b border-[rgba(128,128,128,0.28)] pb-1.5">
                    <span className="font-mono text-[11px] font-bold tracking-wide truncate max-w-[170px] flex items-center gap-1">
                      {note.isOwner ? '👑 ' : ''}{note.author}
                      {isMyNote && (
                        <span className="text-[9px] bg-[rgba(128,128,128,0.2)] px-1.5 py-0.5 rounded font-normal opacity-80">
                          You
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-[10px] opacity-75">
                      {note.date}
                    </span>
                  </div>

                  {/* Note Message Body */}
                  <p className="font-sans text-[13.5px] leading-relaxed whitespace-pre-wrap mb-4 min-h-[70px]">
                    {note.text}
                  </p>

                  {/* Bottom Bar: Reactions & Delete Action */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[rgba(128,128,128,0.28)] text-xs">
                    <button
                      onClick={(e) => handleLike(note.id, e)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[rgba(128,128,128,0.2)] hover:bg-[rgba(128,128,128,0.34)] transition-all font-mono text-[11px] font-bold cursor-pointer"
                      title="Leave a like"
                    >
                      <Heart size={12} className="fill-current text-current" />
                      <span>{note.likes}</span>
                    </button>

                    {/* Delete button: Visible if user owns the note OR if site owner in Admin mode */}
                    {canDelete && (
                      <button
                        onClick={(e) => handleDelete(note.id, e)}
                        className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-md transition-colors cursor-pointer ${
                          isAdmin && !isMyNote
                            ? 'bg-brand-red/15 text-brand-red font-bold hover:bg-[#E4E6EA] hover:text-black'
                            : 'opacity-70 hover:opacity-100 hover:text-brand-red hover:bg-[rgba(128,128,128,0.2)]'
                        }`}
                        title={isAdmin && !isMyNote ? 'Delete note as Admin' : 'Delete your note'}
                      >
                        <Trash2 size={11} />
                        <span>{isAdmin && !isMyNote ? 'Delete (Mod)' : 'Delete'}</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {filteredNotes.length === 0 && (
            <div className="relative z-10 py-16 text-center text-ink-soft font-mono text-sm">
              No notes match your filter. Be the first to pin one!
            </div>
          )}
        </div>
      </div>

      {/* Composer Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div className="w-full max-w-[500px] bg-card border border-line rounded-[24px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="text-xl">📌</span>
                <h3 className="font-sans font-bold text-lg text-ink normal-case tracking-normal">
                  Pin a Note to the Corkboard
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-ink-soft hover:text-ink hover:bg-card transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Note Preview Box */}
            <form onSubmit={handleAddNote} className="p-5 space-y-4">
              <div>
                <label className="block font-mono text-[11px] tracking-wider uppercase text-ink-soft mb-1.5">
                  Live Sticky Note Preview
                </label>
                <div
                  className={`rounded-2xl p-4 border relative shadow-md transition-colors ${activeColorObj.bg}`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl filter drop-shadow-sm">
                    {selectedPin}
                  </div>
                  {selectedSticker !== 'None' && (
                    <div className="absolute top-2 right-2 text-lg">
                      {selectedSticker}
                    </div>
                  )}
                  <div className="pt-2 font-mono text-[11px] font-bold opacity-80 mb-1 truncate">
                    {author.trim() || 'Your Name'}
                  </div>
                  <p className="text-[13px] leading-relaxed min-h-[50px] whitespace-pre-wrap">
                    {text.trim() || 'Type your message below…'}
                  </p>
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block font-mono text-[11px] tracking-wider uppercase text-ink-soft mb-1">
                  Message <span className="text-brand-red">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={240}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Leave a thought, greeting, idea, or random shoutout…"
                  className="w-full bg-paper border border-line rounded-xl p-3 text-sm text-ink placeholder:text-ink-soft outline-none focus:border-brand-red resize-none"
                />
                <div className="flex justify-between text-[10.5px] font-mono text-ink-soft mt-1">
                  <span>Be kind &amp; creative</span>
                  <span>{text.length}/240</span>
                </div>
              </div>

              {/* Author Input */}
              <div>
                <label className="block font-mono text-[11px] tracking-wider uppercase text-ink-soft mb-1">
                  Your Name / Handle (Optional)
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Alex from Manila, @github_user, or Anonymous"
                  className="w-full bg-paper border border-line rounded-xl px-3 py-2 text-sm text-ink placeholder:text-ink-soft outline-none focus:border-brand-red"
                />
              </div>

              {/* Color Picker */}
              <div>
                <label className="block font-mono text-[11px] tracking-wider uppercase text-ink-soft mb-1.5">
                  Paper Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {NOTE_COLORS.map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setSelectedColor(c.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer ${
                        selectedColor === c.id
                          ? 'ring-2 ring-brand-red font-bold scale-105 shadow-sm'
                          : 'opacity-70 hover:opacity-100'
                      } ${c.bg}`}
                    >
                      <span>{c.label.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pin & Sticker Customization */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] tracking-wider uppercase text-ink-soft mb-1">
                    Pushpin Icon
                  </label>
                  <div className="flex gap-1.5 flex-wrap">
                    {PIN_ICONS.map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setSelectedPin(p)}
                        className={`w-8 h-8 rounded-lg border text-base flex items-center justify-center transition-all cursor-pointer ${
                          selectedPin === p
                            ? 'bg-card border-brand-red scale-110 shadow-xs'
                            : 'border-line/60 hover:bg-card'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] tracking-wider uppercase text-ink-soft mb-1">
                    Badge Sticker
                  </label>
                  <div className="flex gap-1.5 flex-wrap">
                    {STICKERS.slice(0, 6).map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setSelectedSticker(s)}
                        className={`px-2 py-1 rounded-lg border text-xs font-mono flex items-center justify-center transition-all cursor-pointer ${
                          selectedSticker === s
                            ? 'bg-card border-brand-red font-bold shadow-xs'
                            : 'border-line/60 hover:bg-card text-ink-soft'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!text.trim()}
                  className="w-full btn-primary font-mono text-xs font-bold tracking-[0.08em] uppercase py-3.5 rounded-full
                    border border-[#E4E6EA] bg-[#E4E6EA] text-[#0A0A0B] flex items-center justify-center gap-2 transition-transform
                    disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_10px_24px_rgba(210,214,222,0.35)] cursor-pointer"
                >
                  <Plus size={16} /> Pin to Corkboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Owner / Admin Unlock Modal */}
      {adminModalOpen && (
        <div
          className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setAdminModalOpen(false)}
        >
          <div className="w-full max-w-[380px] bg-card border border-line rounded-[22px] overflow-hidden shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">👑</span>
                <h3 className="font-sans font-bold text-lg text-ink normal-case tracking-normal">
                  Owner Moderation Access
                </h3>
              </div>
              <button
                onClick={() => {
                  setAdminModalOpen(false)
                  setAdminError(false)
                }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-ink-soft hover:text-ink cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-ink-soft mb-4">
              Enter your passcode to enable Owner Mode and delete or moderate any message on the board.
            </p>

            <form onSubmit={handleAdminUnlock} className="space-y-3">
              <div>
                <input
                  type="password"
                  autoFocus
                  value={adminPasscode}
                  onChange={(e) => {
                    setAdminPasscode(e.target.value)
                    setAdminError(false)
                  }}
                  placeholder="Enter passcode (e.g. admin)"
                  className="w-full bg-paper border border-line rounded-xl px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-red"
                />
                {adminError && (
                  <p className="text-[11px] text-brand-red font-mono mt-1">
                    Incorrect passcode. (Try: admin)
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full btn-primary font-mono text-xs font-bold tracking-[0.08em] uppercase py-2.5 rounded-full
                  border border-[#E4E6EA] bg-[#E4E6EA] text-[#0A0A0B] flex items-center justify-center gap-1.5 transition-transform"
              >
                <ShieldCheck size={15} /> Unlock Admin Mode
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
